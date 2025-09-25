import React from 'react';
import { ExternalLink, Github, FileText, Building2, PlayCircle, Palette, Globe, Shield } from 'lucide-react';

export interface Project {
      id: string;
      title: string;
      description: string;
      image: string;
      technologies: string[];
      details: string;

      // legacy (still supported)
      liveUrl?: string;
      githubUrl?: string;

      // new flexible links
      links?: {
            company?: string;   // company / product page
            demo?: string;      // live demo OR video (YouTube/Loom)
            repo?: string;      // GitHub/GitLab
            figma?: string;     // Figma prototype/file
            caseStudy?: string; // PDF / Notion write-up
            docs?: string;      // docs/spec
      };

      // case study content
      isCaseStudy?: boolean;
      caseStudy?: {
            overview: string;
            problemStatement?: string;
            research?: string;
            designProcess?: string;
            iterations?: string;
            testing?: string;
            implementation?: string;
            results?: string;
            images?: string[];
      };

      // NDA
      isNDA?: boolean;
      ndaNote?: string;
}

interface ProjectCardProps {
      project: Project;
      onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
      // unify legacy -> new
      const links = {
            demo: project.liveUrl ?? project.links?.demo,
            repo: project.githubUrl ?? project.links?.repo,
            company: project.links?.company,
            figma: project.links?.figma,
            caseStudy: project.links?.caseStudy,
            docs: project.links?.docs,
      };

      const open = (url?: string) => url && window.open(url, '_blank');

      return (
            <div
                  className="group relative bg-gray-900/40 backdrop-blur-md rounded-xl p-6 border border-gray-700/30 hover:border-white/30 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-white/5"
                  onClick={() => onClick(project)}
            >
                  <div className="relative overflow-hidden rounded-lg mb-4">
                        <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {project.isNDA && (
                              <div className="absolute top-4 right-4 flex items-center gap-1 rounded-md bg-amber-500/95 px-3 py-1 text-xs font-semibold text-black shadow-lg">
                                    <Shield size={14} /> NDA
                              </div>
                        )}
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gray-200 transition-colors duration-300 tracking-tight" style={{ fontFamily: "'Termina Test', sans-serif" }}>
                        {project.title}
                  </h3>

                  <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                              <span key={i} className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full border border-white/20">
                                    {tech}
                              </span>
                        ))}
                        {project.technologies.length > 3 && (
                              <span className="px-3 py-1 bg-gray-600/20 text-gray-400 text-sm rounded-full">
                                    +{project.technologies.length - 3}
                              </span>
                        )}
                  </div>

                  {/* link buttons (do NOT stop click for the label on the right) */}
                  <div className="flex justify-between items-center">
                        <div className="flex flex-wrap gap-2">
                              {links.company && (
                                    <button
                                          onClick={(e) => { e.stopPropagation(); open(links.company); }}
                                          className="p-2 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-colors"
                                          title="Company"
                                    >
                                          <Building2 size={16} />
                                    </button>
                              )}
                              {links.demo && (
                                    <button
                                          onClick={(e) => { e.stopPropagation(); open(links.demo); }}
                                          className="p-2 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-colors"
                                          title="Demo / Video"
                                    >
                                          <PlayCircle size={16} />
                                    </button>
                              )}
                              {links.figma && (
                                    <button
                                          onClick={(e) => { e.stopPropagation(); open(links.figma); }}
                                          className="p-2 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-colors"
                                          title="Figma"
                                    >
                                          <Palette size={16} />
                                    </button>
                              )}
                              {links.caseStudy && (
                                    <button
                                          onClick={(e) => { e.stopPropagation(); open(links.caseStudy); }}
                                          className="p-2 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-colors"
                                          title="Case Study"
                                    >
                                          <FileText size={16} />
                                    </button>
                              )}
                              {links.docs && (
                                    <button
                                          onClick={(e) => { e.stopPropagation(); open(links.docs); }}
                                          className="p-2 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-colors"
                                          title="Docs"
                                    >
                                          <Globe size={16} />
                                    </button>
                              )}
                              {/* Repo (hidden when NDA) */}
                              {!project.isNDA && links.repo && (
                                    <button
                                          onClick={(e) => { e.stopPropagation(); open(links.repo); }}
                                          className="p-2 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-colors"
                                          title="Code"
                                    >
                                          <Github size={16} />
                                    </button>
                              )}
                        </div>

                        <span className="text-gray-300 text-sm font-medium">
                              {project.isCaseStudy ? 'Read Case Study →' : 'View Details →'}
                        </span>
                  </div>
            </div>
      );
};

export default ProjectCard;
