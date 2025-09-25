import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard, { Project } from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
      onProjectSelect: (project: Project) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onProjectSelect }) => {
      const projectsRef = useRef<HTMLDivElement>(null);

      const projects: Project[] = [
            {
                  id: '1',
                  title: 'AddressID – Logistics Address Validation',
                  description: 'Frontend module that standardizes, validates, and corrects addresses with AI + manual review. Designed for Logichainge’s Order Entry customers.',
                  image: '/images/addressid/hero.jpg',
                  technologies: ['Vue 3', 'Tailwind CSS', 'Headless UI', 'Pinia', 'Mapbox', 'Vite'],
                  details: `Built an end-to-end address validation workflow for logistics planners: bulk upload, AI suggestions, inline editing with Input vs Output compare, Mapbox verification, change history, and organization-scoped dashboards. Includes auth + org guards and consistent AppShell for navigation.`,
                  isCaseStudy: true,
                  isNDA: true,
                  ndaNote: '',
                  links: {
                        company: 'https://logichainge.com',
                        figma: 'https://www.figma.com/design/4SHniMfeMYPwMbIPW3YrRS/Company-Work?node-id=0-1&t=NiUsilNspZ1JRozV-1',
                        demo: 'https://www.youtube.com/watch?v=-iKNqzicawI'
                  },
                  caseStudy: {
                        overview: `For my graduation internship at Logichainge, I designed and implemented AddressID — a module that reduces address errors and speeds up order intake for logistics providers. It plugs into Logichainge’s existing Order Entry Module and can run stand-alone. The goals was to merge inconsistent addresses, prevent duplicates and let the logistics experts validate addresses quickly and prepare shipments for delivery.`,
                        problemStatement: `Planners process 30+ orders/day under time pressure. Address data arrives in many formats (typos, spacing, casing, missing fields) that causes duplicates in databases and costly delivery mistakes. Before AddressID, the users had to switch between tabs to use external maps and manually copy data that was slow and prone to errors.`,
                        research: `I combined a Best Practices research, a heuristic evaluation of Logichainge’s current app, competitor analysis (Loqate, Google, BigCommerce), and interviews with logistics experts. Key findings included making errors visible at a glance; Keeping the user in one screen; Give precise inline edits; Validate addresses with a map; Support bulk uploads of addresses and keep track of changes.`,
                        designProcess: `I prototyped a consistent with the previous Logichainge products system across the Login and Organization selection. Then made a fresher and easier to read UI in the Dashboard, Address Validation table, Manual Validation, Bulk Upload and Change History pages. Research results showcased including high-contrast status flags, zebra striped tables with sticky headers, real-time validation messages and map assisted checks that compare the Input vs Output gave users confidence and improved their previous workflows. `,
                        iterations: `Did several peer reviews of my iterations and then two usability testing rounds with company owners and main target group once the design was more polished. Iterated on several issues found from the users like the already added address not including Input vs Output, Ability to click on map to pinpoint exact entrance and better status flags in table. Also brought back the Bulk Upload page as requested by users.`,
                        testing: `During iterations, I ran several tests to see if the users had an improvement when validating addresses compared to their previous workflows. Also created a maze.co test for those unable to participate. Lastly I tested the implemented website with 4 key users, who showed ~60% time saved when validating addresses manually, with ~40% when uploading in Bulk.`,
                        implementation: `Vue 3 + Vite; Tailwind CSS + Headless UI; Pinia stores (auth, org, addresses); Vue Router; Axios/Fetch; Mapbox for geocoding + map preview. Features: Bulk CSV/XLSX upload with inline rules, AI suggestion comparison (Original vs System Output), manual confirm/override, change history with filters, and an organization dashboard. Jira for tracking; GitLab for version control.`,
                        results: `Results from Logichainge showcase that when integrated with their existing Order Entry Module, AddressID saves companies around 30s-1 minute when processing an order and reduces address related errors up to ~50%. After clearing their existing TMS database, there are significantly fewer duplicates. UI keeps logistics planners in one screen, highlighting all the issues immediately and scales easily with large datasets(1000+ addresses).`,
                        images: [
                              '/images/addressid/dashboard.jpg',
                              '/images/addressid/validation.jpg',
                              '/images/addressid/manual.jpg',
                              '/images/addressid/bulk.jpg',
                              '/images/addressid/change.jpg'
                        ]
                  }
            },
            {
                  id: '2',
                  title: 'E-Commerce Platform',
                  description: 'Full-stack e-commerce solution with payment processing.',
                  image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
                  technologies: ['Next.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
                  liveUrl: 'https://example.com',
                  githubUrl: 'https://github.com',
                  details: 'Complete shopping experience with secure payments and inventory management.',
                  isCaseStudy: true,
                  caseStudy: {
                        overview: 'A modern e-commerce platform designed to compete with industry leaders while providing superior user experience and merchant tools.',
                        problemStatement: 'Small to medium businesses needed an affordable e-commerce solution that could scale with their growth. Existing platforms were either too expensive or lacked essential features.',
                        research: 'Surveyed 100+ small business owners and analyzed 20 existing e-commerce platforms. Identified key requirements: easy setup, mobile-first design, integrated payments, and comprehensive analytics.',
                        designProcess: 'Created user journey maps for both customers and merchants. Designed a component-based system in Figma with focus on conversion optimization and accessibility.',
                        iterations: 'Conducted 3 rounds of usability testing with 50+ participants. Major improvements included: streamlined checkout process, enhanced product discovery, and simplified merchant dashboard.',
                        testing: 'Performed extensive A/B testing on checkout flow, product pages, and navigation. Achieved 25% improvement in conversion rates and 40% reduction in cart abandonment.',
                        implementation: 'Built with Next.js for optimal performance and SEO. Used PostgreSQL for robust data management and Stripe for secure payments. Implemented advanced caching strategies and CDN optimization.',
                        results: 'Launched with 100+ merchants in first month. Average conversion rate of 3.2% (industry average 2.1%). 99.9% uptime and sub-2-second page load times.',
                        images: [
                              'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1200',
                              'https://images.pexels.com/photos/3769747/pexels-photo-3769747.jpeg?auto=compress&cs=tinysrgb&w=1200',
                              'https://images.pexels.com/photos/4968630/pexels-photo-4968630.jpeg?auto=compress&cs=tinysrgb&w=1200'
                        ]
                  }
            },
            {
                  id: '3',
                  title: 'Fitness Mobile App',
                  description: 'Cross-platform fitness tracking with social features.',
                  image: 'https://images.pexels.com/photos/4162481/pexels-photo-4162481.jpeg?auto=compress&cs=tinysrgb&w=800',
                  technologies: ['React Native', 'Firebase', 'Redux', 'Expo'],
                  liveUrl: 'https://example.com',
                  githubUrl: 'https://github.com',
                  details: 'Comprehensive fitness tracking with workout plans and social connectivity.'
            },
            {
                  id: '4',
                  title: '3D Portfolio Site',
                  description: 'Interactive 3D portfolio with immersive experiences.',
                  image: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=800',
                  technologies: ['Three.js', 'WebGL', 'GSAP', 'React'],
                  liveUrl: 'https://example.com',
                  githubUrl: 'https://github.com',
                  details: 'Award-winning portfolio showcasing advanced WebGL capabilities.'
            },
            {
                  id: '5',
                  title: 'Chat Platform',
                  description: 'Real-time messaging with video calls and file sharing.',
                  image: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=800',
                  technologies: ['Socket.io', 'WebRTC', 'Node.js', 'MongoDB'],
                  liveUrl: 'https://example.com',
                  githubUrl: 'https://github.com',
                  details: 'Scalable chat platform supporting thousands of concurrent users.'
            },
            {
                  id: '6',
                  title: 'Blockchain Voting',
                  description: 'Secure voting platform built on blockchain technology.',
                  image: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=800',
                  technologies: ['Solidity', 'Web3.js', 'Ethereum', 'React'],
                  liveUrl: 'https://example.com',
                  githubUrl: 'https://github.com',
                  details: 'Transparent and secure voting system using smart contracts.'
            }
      ];

      useEffect(() => {
            if (projectsRef.current) {
                  const cards = projectsRef.current.querySelectorAll('.project-card');
                  gsap.fromTo(
                        cards,
                        { y: 100, opacity: 0 },
                        {
                              y: 0,
                              opacity: 1,
                              duration: 0.8,
                              stagger: 0.15,
                              ease: 'power3.out',
                              scrollTrigger: {
                                    trigger: projectsRef.current,
                                    start: 'top 70%',
                              }
                        }
                  );
            }
      }, []);

      return (
            <section id="projects" className="py-20 px-6 min-h-screen bg-black/20 backdrop-blur-sm">
                  <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight" style={{ fontFamily: "'Termina Test', sans-serif" }}>
                                    Featured Projects
                              </h2>
                              <p className="text-gray-400 text-lg">
                                    A showcase of my creative development work
                              </p>
                        </div>

                        <div
                              ref={projectsRef}
                              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                        >
                              {projects.map((project) => (
                                    <div key={project.id} className="project-card">
                                          <ProjectCard
                                                project={project}
                                                onClick={onProjectSelect}
                                          />
                                    </div>
                              ))}
                        </div>
                  </div>
            </section>
      );
};
// {
//   id: '2',
//   title: 'AddressID – Logistics Address Validation Tool',
//   description: 'AI-powered address validation module for Logichainge’s Order Entry platform.',
//   image: 'https://your-image-host.com/addressid-dashboard.jpg',
//   technologies: ['Vue 3', 'Tailwind CSS', 'Pinia', 'Mapbox'],
//   liveUrl: 'https://your-demo-or-video-link.com',
//   githubUrl: 'https://github.com/yourusername/addressid', // or leave empty if private
//   details: 'Designed and implemented AddressID, a frontend module that standardizes, validates, and corrects delivery addresses for logistics providers.',
//   isCaseStudy: true,
//   caseStudy: {
//     overview: 'AddressID integrates with Logichainge’s Order Entry Module to reduce address errors and processing time. It uses AI to unify inconsistent entries and offers manual validation with real-time suggestions.',
//     problemStatement: 'Logistics planners struggled with inconsistent and error-prone address data, creating delivery delays and higher operational costs.',
//     research: 'Performed heuristic evaluations, best-practice reviews, and interviews with logistics experts. Identified pain points such as frequent tab-switching and unclear error states.',
//     designProcess: 'Prototyped dashboards, validation tables, and bulk upload flows in Figma. Applied color-coded validation states, inline editing, and autocomplete for faster corrections.',
//     iterations: 'Conducted multiple usability tests with company owners and planners. Iterated on table designs, filters, and map integration to streamline workflow.',
//     testing: 'Created a KLM (Keystroke-Level Model) evaluation to predict efficiency gains. Estimated 35+ seconds saved per address versus manual lookup.',
//     implementation: 'Built with Vue 3 Composition API, Tailwind CSS, Pinia, Vue Router, and Mapbox. Integrated authentication guards, bulk upload, change history, and dashboard components.',
//     results: 'Projected to cut address errors by up to 50% and save 5–10 minutes per order, improving efficiency for logistics companies using Logichainge’s platform.',
//     images: [
//       'https://your-image-host.com/addressid-dashboard.jpg',
//       'https://your-image-host.com/addressid-validation.jpg',
//       'https://your-image-host.com/addressid-manual.jpg'
//     ]
//   }
// }

export default Projects;