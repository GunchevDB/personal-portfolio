import React, { useEffect, useState, useCallback } from 'react';
import {
  X, Github, ChevronRight,
  FileText, Building2, PlayCircle, Palette, Globe, Shield
} from 'lucide-react';
import { Project } from './ProjectCard';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Lightbox is now an object: images[] + index (no hero ever included)
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  // lock scroll when modal is open
  useEffect(() => {
    const lock = !!project;
    document.body.style.overflow = lock ? 'hidden' : 'unset';
    document.documentElement.style.overflow = lock ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [project]);

  // Lightbox controls
  const openGridImage = useCallback((i: number) => {
    if (!project?.isCaseStudy || !project.caseStudy?.images) return;
    // ONLY case-study images here (no hero)
    setLightbox({ images: project.caseStudy.images, index: i });
  }, [project]);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevImage = useCallback(() => {
    if (!lightbox) return;
    const { images, index } = lightbox;
    setLightbox({ images, index: (index - 1 + images.length) % images.length });
  }, [lightbox]);
  const nextImage = useCallback(() => {
    if (!lightbox) return;
    const { images, index } = lightbox;
    setLightbox({ images, index: (index + 1) % images.length });
  }, [lightbox]);

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightbox) closeLightbox();
        else onClose();
      }
      if (lightbox) {
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
      }
    };
    if (project) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [project, lightbox, closeLightbox, prevImage, nextImage, onClose]);

  if (!project) return null;

  const links = {
    demo: project.liveUrl ?? project.links?.demo,
    repo: project.githubUrl ?? project.links?.repo,
    company: project.links?.company,
    figma: project.links?.figma,
    caseStudy: project.links?.caseStudy,
    docs: project.links?.docs,
  };

  const renderCaseStudy = () => {
    if (!project.isCaseStudy || !project.caseStudy) return null;
    const cs = project.caseStudy;
    const sections = [
      { title: 'Overview', content: cs.overview },
      { title: 'Problem Statement', content: cs.problemStatement },
      { title: 'Research', content: cs.research },
      { title: 'Design Process', content: cs.designProcess },
      { title: 'Iterations', content: cs.iterations },
      { title: 'Testing', content: cs.testing },
      { title: 'Implementation', content: cs.implementation },
      { title: 'Results', content: cs.results },
    ].filter(s => !!s.content);

    return (
      <div className="space-y-8">
        {sections.map((section, i) => (
          <div key={i} className="border-l-2 border-white/20 pl-6">
            <div className="flex items-center gap-2 mb-3">
              <ChevronRight className="text-white/60" size={16} />
              <h3 className="text-xl font-semibold text-white" style={{ fontFamily: "'Termina Test', sans-serif" }}>
                {section.title}
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed">{section.content}</p>
          </div>
        ))}

        {!!cs.images?.length && (
          <div className="border-l-2 border-white/20 pl-6">
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="text-white/60" size={16} />
              <h3 className="text-xl font-semibold text-white" style={{ fontFamily: "'Termina Test', sans-serif" }}>
                Visual Documentation
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cs.images!.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${project.title} - Image ${i + 1}`}
                  className="w-full h-48 object-cover rounded-lg border border-white/10 cursor-zoom-in"
                  onClick={() => openGridImage(i)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-gray-900/95 backdrop-blur-md rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-700/30 shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-colors duration-200"
          >
            <X size={20} />
          </button>

          <div className="overflow-y-auto max-h-[90vh]">
            {/* HERO (not clickable) */}
            <div className="relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 sm:h-64 md:h-80 object-cover select-none"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
              {project.isCaseStudy && (
                <div className="absolute top-4 left-4 flex items-center rounded-md bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 shadow-md">
                  Case Study
                </div>
              )}
              {project.isNDA && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-md bg-amber-500 px-3 py-1 text-xs font-semibold text-black shadow-md">
                  <Shield size={14} className="opacity-90" />
                  NDA
                </div>
              )}
            </div>

            <div className="p-4 sm:p-6 md:p-8 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight" style={{ fontFamily: "'Termina Test', sans-serif" }}>
                  {project.title}
                </h2>
                <p className="text-gray-400 text-base sm:text-lg leading-relaxed">{project.description}</p>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Termina Test', sans-serif" }}>
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {project.technologies.map((t, i) => (
                    <span key={i} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 text-gray-300 text-sm sm:text-base rounded-full border border-white/20 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {project.isCaseStudy ? renderCaseStudy() : (
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Termina Test', sans-serif" }}>
                    Project Details
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed whitespace-pre-line">{project.details}</p>
                </div>
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-4">
                {links.company && (
                  <a href={links.company} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border border-white/30 text-gray-300 rounded-full hover:bg-white/10 transition">
                    <Building2 size={16} /> Company
                  </a>
                )}
                {links.demo && (
                  <a href={links.demo} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-black rounded-full hover:bg-gray-200 transition">
                    <PlayCircle size={16} /> Live Website / Demo
                  </a>
                )}
                {links.figma && (
                  <a href={links.figma} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border border-white/30 text-gray-300 rounded-full hover:bg-white/10 transition">
                    <Palette size={16} /> Figma
                  </a>
                )}
                {links.caseStudy && (
                  <a href={links.caseStudy} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border border-white/30 text-gray-300 rounded-full hover:bg-white/10 transition">
                    <FileText size={16} /> Case Study
                  </a>
                )}
                {links.docs && (
                  <a href={links.docs} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border border-white/30 text-gray-300 rounded-full hover:bg-white/10 transition">
                    <Globe size={16} /> Docs
                  </a>
                )}
                {!project.isNDA && links.repo && (
                  <a href={links.repo} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border border-white/30 text-gray-300 rounded-full hover:bg-white/10 transition">
                    <Github size={16} /> View Code
                  </a>
                )}
                {project.isNDA && (
                  <span className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    <Shield size={16} /> NDA
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX: only case-study images */}
      {lightbox && (
        <div className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-sm flex items-center justify-center">
          <img
            src={lightbox.images[lightbox.index]}
            alt={`Preview ${lightbox.index + 1}`}
            className="max-w-[95vw] max-h-[90vh] object-contain shadow-2xl rounded-lg cursor-zoom-out"
            onClick={nextImage}
          />
          <button onClick={closeLightbox} className="absolute top-5 right-5 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-gray-200">
            ✕
          </button>
          {lightbox.images.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-5 top-1/2 -translate-y-1/2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-gray-200">
                ‹
              </button>
              <button onClick={nextImage} className="absolute right-5 top-1/2 -translate-y-1/2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-gray-200">
                ›
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ProjectModal;
