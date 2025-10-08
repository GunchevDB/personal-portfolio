import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    mountRef.current.querySelectorAll('canvas').forEach(c => c.remove());

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isLowPerformance = isMobile || navigator.hardwareConcurrency <= 4;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isLowPerformance });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isLowPerformance ? 1 : Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    const canvas = renderer.domElement;
    renderer.domElement.style.pointerEvents = 'auto';

    const mouse = new THREE.Vector2();
    const prevMouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    const dragPlane = new THREE.Plane();
    const dragOffset = new THREE.Vector3();
    const temporaryVector3 = new THREE.Vector3();

    let selectedObject: THREE.Object3D | null = null;
    let isDragging = false;
    let dragStartTime = 0;
    let currentHoveredObject: THREE.Object3D | null = null;
    let isInteractingWithObject = false; 

    const velocities = new Map<THREE.Object3D, THREE.Vector3>();

    const toNDC = (event: PointerEvent | MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const createEmojiTexture = (emoji: string) => {
      const c = document.createElement('canvas');
      const ctx = c.getContext('2d')!;
      c.width = 128; c.height = 128;
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.font = '80px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(emoji, c.width / 2, c.height / 2);
      const tex = new THREE.CanvasTexture(c);
      tex.needsUpdate = true;
      return tex;
    };

    const objects: THREE.Object3D[] = [];
    
    const geometryTypes = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.5, 16, 16),
      new THREE.ConeGeometry(0.5, 1, 16),
      new THREE.OctahedronGeometry(0.7),
      new THREE.TetrahedronGeometry(0.8),
      new THREE.CylinderGeometry(0.4, 0.4, 1, 16),
      new THREE.DodecahedronGeometry(0.6),
      new THREE.IcosahedronGeometry(0.6),
      new THREE.TorusGeometry(0.5, 0.2, 12, 48),
    ];
    
    const emojis = ['🚀','⭐','💎','🔥','⚡','🌟','💫','🎯','🎨','🎭','🎪','🎲','🎳'];
    const softColors = ['#ffffff','#f0f0f0','#e8e8e8','#d0d0d0','#c8c8c8','#f5f5dc','#f0f8ff','#f8f8ff','#fffaf0','#f5f5f5'];

    const numObjects = isLowPerformance 
      ? Math.floor(Math.random() * 4) + 6
      : Math.floor(Math.random() * 6) + 10;
    
    for (let i = 0; i < numObjects; i++) {
      let obj: THREE.Object3D;
      if (Math.random() < 0.3) {
        const texture = createEmojiTexture(emojis[Math.floor(Math.random() * emojis.length)]);
        const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.8, alphaTest: 0.1 });
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(1.5, 1.5, 1);
        obj = sprite;
      } else {
        const geometry = geometryTypes[Math.floor(Math.random() * geometryTypes.length)];
        const color = softColors[Math.floor(Math.random() * softColors.length)];
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color(color),
          wireframe: Math.random() < 0.7,
          transparent: true,
          opacity: 0.3 + Math.random() * 0.4,
        }) as THREE.MeshBasicMaterial & { originalColor?: THREE.Color; originalOpacity?: number };
        material.originalColor = material.color.clone();
        material.originalOpacity = material.opacity;
        obj = new THREE.Mesh(geometry, material);
      }

      obj.position.set((Math.random()-0.5)*30, (Math.random()-0.5)*25, (Math.random()-0.5)*20);
      obj.rotation.set(Math.random()*Math.PI*2, Math.random()*Math.PI*2, Math.random()*Math.PI*2);
      const s = 0.7 + Math.random() * 0.6;
      obj.scale.set(s, s, s);

      scene.add(obj);
      objects.push(obj);
      velocities.set(obj, new THREE.Vector3());
    }

    const onPointerMove = (e: PointerEvent) => {
      prevMouse.copy(mouse);
      toNDC(e);

      if (isDragging && selectedObject) {
        e.preventDefault(); 
        
        raycaster.setFromCamera(mouse, camera);
        const p = new THREE.Vector3();
        if (raycaster.ray.intersectPlane(dragPlane, p)) {
          selectedObject.position.copy(p.add(dragOffset));
        }
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      prevMouse.copy(mouse);
      toNDC(e);

      raycaster.setFromCamera(mouse, camera);
      const hit = raycaster.intersectObjects(scene.children, true);

      if (hit.length) {
        isInteractingWithObject = true;
        e.preventDefault(); 
        
        selectedObject = hit[0].object;
        isDragging = true;
        dragStartTime = Date.now();
        canvas.style.cursor = 'grabbing';
        velocities.set(selectedObject, new THREE.Vector3());

        const camNormal = camera.getWorldDirection(temporaryVector3).negate();
        dragPlane.setFromNormalAndCoplanarPoint(camNormal, selectedObject.position);

        const p = new THREE.Vector3();
        raycaster.ray.intersectPlane(dragPlane, p);
        dragOffset.copy(selectedObject.position).sub(p);

        const mat = (selectedObject as THREE.Mesh).material as THREE.Material & { opacity?: number };
        if (mat && typeof mat.opacity === 'number') {
          mat.opacity = Math.min(mat.opacity + 0.4, 1);
        }
      } else {
        isInteractingWithObject = false; 
      }
    };

    const onPointerUp = () => {
      if (selectedObject) {
        const dragDuration = Date.now() - dragStartTime;
        const mouseDelta = new THREE.Vector2().subVectors(mouse, prevMouse);
        const throwMultiplier = Math.max(0.8, 2.5 - dragDuration / 400);
        const throwForce = Math.min(mouseDelta.length() * 20 * throwMultiplier, 20);

        const v = new THREE.Vector3(
          mouseDelta.x * throwForce,
          mouseDelta.y * throwForce,
          (Math.random() - 0.5) * throwForce * 0.5
        );
        velocities.set(selectedObject, v);

        const mat = (selectedObject as THREE.Mesh).material as THREE.Material & { opacity?: number };
        if (mat && typeof mat.opacity === 'number') mat.opacity = Math.max((mat.opacity ?? 0.7) - 0.4, 0.3);

        selectedObject = null;
      }
      isDragging = false;
      isInteractingWithObject = false;
      canvas.style.cursor = 'default';
    };

    const onPointerHover = (e: PointerEvent) => {
      if (isDragging) return;
      toNDC(e);
      raycaster.setFromCamera(mouse, camera);
      const hit = raycaster.intersectObjects(scene.children, true);

      const vibrant = ['#ff9999','#ffcc99','#ffff99','#99ff99','#99ccff','#cc99ff','#ff99cc','#99ffcc','#ffcc99','#ccccff'];

      if (hit.length) {
        const hovered = hit[0].object;
        if (hovered !== currentHoveredObject) {
          if (currentHoveredObject && (currentHoveredObject as THREE.Mesh).material && !(currentHoveredObject instanceof THREE.Sprite)) {
            const m = (currentHoveredObject as THREE.Mesh).material as THREE.MeshBasicMaterial & { originalColor?: THREE.Color; originalOpacity?: number };
            if (m.originalOpacity != null) m.opacity = m.originalOpacity;
            if (m.originalColor) m.color.copy(m.originalColor);
          }
          currentHoveredObject = hovered;

          if ((hovered as THREE.Mesh).material && !(hovered instanceof THREE.Sprite)) {
            const m = (hovered as THREE.Mesh).material as THREE.MeshBasicMaterial & { originalColor?: THREE.Color; originalOpacity?: number };
            m.opacity = Math.min((m.opacity ?? 0.7) + 0.4, 1);
            m.color.setHex(parseInt(vibrant[Math.floor(Math.random()*vibrant.length)].slice(1), 16));
          }
        }
        canvas.style.cursor = 'pointer';
      } else {
        if (currentHoveredObject && (currentHoveredObject as THREE.Mesh).material && !(currentHoveredObject instanceof THREE.Sprite)) {
          const m = (currentHoveredObject as THREE.Mesh).material as THREE.MeshBasicMaterial & { originalColor?: THREE.Color; originalOpacity?: number };
          if (m.originalOpacity != null) m.opacity = m.originalOpacity;
          if (m.originalColor) m.color.copy(m.originalColor);
        }
        currentHoveredObject = null;
        canvas.style.cursor = 'default';
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (isInteractingWithObject) {
        e.preventDefault();
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isInteractingWithObject || isDragging) {
        e.preventDefault();
      }
    };

    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointermove', onPointerHover);
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    const onScroll = () => {
      const y = window.scrollY;
      camera.position.y = y * 0.001;
      camera.rotation.x = y * 0.00005;
      objects.forEach((o, i) => {
        if (o !== selectedObject) o.position.z = -y * 0.0005 * (i + 1);
      });
    };
    window.addEventListener('scroll', onScroll);

    let animationId = 0;
    let lastFrameTime = 0;
    const targetFPS = isLowPerformance ? 30 : 60;
    const frameInterval = 1000 / targetFPS;
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    
    if (mountRef.current) {
      observer.observe(mountRef.current);
    }

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const now = performance.now();
      const elapsed = now - lastFrameTime;
      
      if (elapsed < frameInterval) return;
      lastFrameTime = now - (elapsed % frameInterval);

      objects.forEach((o, i) => {
        const v = velocities.get(o) || new THREE.Vector3();
        if (o !== selectedObject) {
          if (v.length() > 0.01) {
            o.position.add(v);
            v.multiplyScalar(0.98);
            v.y -= 0.002;
            if (o.position.x > 15 || o.position.x < -15) { v.x *= -0.7; o.position.x = Math.max(-15, Math.min(15, o.position.x)); }
            if (o.position.y > 12 || o.position.y < -12) { v.y *= -0.7; o.position.y = Math.max(-12, Math.min(12, o.position.y)); }
            if (o.position.z > 10 || o.position.z < -10) { v.z *= -0.7; o.position.z = Math.max(-10, Math.min(10, o.position.z)); }
            velocities.set(o, v);
          } else {
            const s = 0.003 + (i % 3) * 0.002;
            o.rotation.x += s; o.rotation.y += s * 0.7; o.rotation.z += s * 0.5;
            const t = Date.now() * 0.001;
            o.position.y += Math.sin(t + i * 0.5) * 0.002;
            o.position.x += Math.cos(t * 0.8 + i * 0.3) * 0.001;
            o.position.z += Math.sin(t * 0.6 + i * 0.7) * 0.0005;
          }
        }
        if (v.length() > 0.1) {
          const spin = v.length() * 0.1;
          o.rotation.x += spin; o.rotation.y += spin * 0.7; o.rotation.z += spin * 0.5;
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointermove', onPointerHover);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      scene.clear();
      if (mountRef.current && renderer.domElement.parentElement === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0"
      style={{
        pointerEvents: 'auto',
        background: 'linear-gradient(135deg,#1a1a1a 0%,#2d2d2d 50%,#1a1a1a 100%)'
      }}
    />
  );
};

export default ThreeBackground;