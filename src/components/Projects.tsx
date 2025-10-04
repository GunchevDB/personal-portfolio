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
                  title: 'Innerbuddies - Microbiome Health Platform',
                  description: 'Redesign of Innerbuddies` web app for microbiome health tracking and personalized recommendations.',
                  image: '/images/innerbuddies/Inner_Buddies_logo_RGB_copy.avif',
                  technologies: ['Angular 16', 'Python', 'SCSS', 'Jupyter Notebook', 'Vite'],
                  details: '',
                  isCaseStudy: true,
                  isNDA: true,
                  ndaNote: '',
                  links: {
                        company: 'https://www.innerbuddies.com/',
                        figma: 'https://www.figma.com/design/4SHniMfeMYPwMbIPW3YrRS/Company-Work?node-id=3530-2316&p=f',
                  },
                  caseStudy: {
                        overview: `For my internship at InnerBuddies, I focused on redesigning and extending their microbiome health platform. The goal was to improve the usability of their Angular front-end, align it with the company’s new visual identity, and build new features that made it easier for users to track their progress and access personalized insights. By collaborating closely with the team, I worked on streamlining the user journey from receiving their kit to reviewing reports and managing daily habits through tools like the Food Diary and downloadable reports.`,
                        problemStatement: `InnerBuddies faces the challenge of effectively engaging its diverse target demographic of younger and older females through its website design. The current design does not adequately address the varying needs and preferences of these two distinct age groups. This impacts user experience, satisfaction, and ultimately, customer conversion and retention rates. A redesigned website that appeals to both age groups, enhances user experience, and supports easy navigation could significantly boost engagement, leading to increased user acquisition and customer loyalty.`,
                        research: `I worked over multiple research methods during this intership, where I firstly focused on improving and keeping the identity of Innerbuddies color palette, ensuring the consistency between the systems. Then I went into a competitor analysis of several Food diary platforms such as MyFitnessPal, PlateJoy and more to identify their strengths and issues when filling in food intake. Then I made use of a best practices study in order to target to target the readability and accessibility for older audiences where I emphasized on larger fonts, better color contrast and straightforward layouts. Additionally I analyzed the user making use of the CMD 5Ws framework to better understand the users, their goals and hinderances and why the redesign is critical for growth of the brand.`,
                        designProcess: `I started with quick sketches to share early ideas. These covered the Food Diary, Add Item form, and Kit Overview screen. Sketches then moved into Figma prototypes where I refined the UI using the provided fonts, colors, and icons. For the Food Diary, I moved from a two-page process to a single-page view with inline editing and QoL improvements. For the Kit Overview, I explored ways to replace the cramped table with a more visual and intuitive layout. I constantly balanced youthful aesthetics with accessibility for older users by using neutral backgrounds, restrained color accents, and larger type for clarity.`,
                        iterations: `The project featured a lot of iterations and collaborations. Mentors provided daily feedback on designs, which shaped features like the Food Diary, Kit Overviews and PDF Dashboard export.`,
                        testing: `Managed to test constantly with the team and stakeholders, gathering feedback from target group in 2 different testing sessions, where new changes were positively received. Improved workflows for food diary, kit overview and quick downloadable dashboard PDF export to share with personal nitrutionists.`,
                        implementation: `Website used Angular 16 framework with SCSS for styling. I implemented all redesign using component-based architecture, ensuring reusability. Additionally set up the downloadable PDF report feature using Python in a Jupyter Notebook that pulls the header and user data from the frontend.`,
                        results: `AI Generated dashboard results and PDF print out increased user satisfaction and increased profits by 20% (~7000€ in new yearly revenue), also including manual labour reduction by around 5 hours/week. The new Food Diary design sped up the process of filling in the diary by 70% and reduced errors. Created an API endpoint to export Bacteria list in user's sample which helped with the B2B customer productivity by 30%.`,
                        images: [
                              '/images/innerbuddies/food_diary.png',
                              '/images/innerbuddies/kit_overview.png',
                              '/images/innerbuddies/dashboard.png',
                        ]
                  }
            },
            {
                  id: '3',
                  title: 'StackAssist - Stacking & Loading Optimization',
                  description: 'Replacing paper stacking instructions with a 3D interactive web app for logistics workers.',
                  image: '/images/stackassist/StackAssist.jpg',
                  technologies: ['React', 'Three.js', 'WebGL', 'GSAP', 'Vite'],
                  details: '',
                  isCaseStudy: true,
                  links: {
                        company: 'https://faes.nl/',
                        figma: 'https://www.figma.com/design/4SHniMfeMYPwMbIPW3YrRS/Company-Work?node-id=3882-2316&p=f',
                        demo:'https://boxes-stack-threejs.netlify.app/',
                        repo: 'https://github.com/GunchevDB/StackAssist-Netlify'
                  },
                  caseStudy: {
                        overview: `During semester 6 of my studies at Fontys, I collaborated with FAES, a logistics solutions provider, where in a team of 5 we worked to understand the issues FAES workers faced when using StackAssist and improve their day to day operations.`,
                        problemStatement: `FAES workers and their customers who use StackAssist face challenges with their current paper-based stacking instructions. More specifically, they do know how to stack the boxes on top of a palette, but they don't follow the most optimal way of stacking, which leads to inefficient use of space and potential damage during transport.`,
                        research: `At the start of the project, in a team of 5, I worked on research about warehouse workers in the Netherlands to better understand the user. Then focused on researching the software opportunities for a wearable device they can use during stacking, where I saw possibility for a 3D visualisation and went deeper by understanding WebGL possibilities.`,
                        designProcess: `Began brainstorming and tried a new approach, using the Worst-idea where then I continued with storyboards. Early phone wireframes explroed both portrait and landscape views. The idea consisted of replacing the page flipping with a single 3D visualisation on the screen with a step by step.`,
                        iterations: `Improved the controls to be bigger and minimal for warehouse workers who use gloves. Removed the unnecessary rotations and added a progress bar to show how many steps are left. Focused on landscape first UI after stakeholder feedback.`,
                        testing: `Began testing the Three.js prototype with users and stakeholders, where we gave them 2 different stacking instructions that are very similar in difficulty and compared using the app vs paper. Results showed that using the app was 25% faster and had 50% less stacking errors.`,
                        implementation: `Implementation during testing was done using Vanilla JS, Three.js and Vite packaged as a PWA. Later when the rest of the team finished up the UI, we implemented everything together in React. We explored the ability to use StackAssist API to pull stacking instructions and build the GLTF model to showcase in Three.js.`,
                        results: `In the end the application was very positively received by both users and stakeholders. The 3D visualisation made it much easier to understand the stacking instructions at a glance and the application concept was also featured in the Brainport Industry Campus(BIC Eindhoven) innovation expo.`,
                        images: [
                              '/images/stackassist/threejs_demo.png',
                              '/images/stackassist/figma_showcase.png',
                        ]
                  }
            },
            {
                  id: '4',
                  title: 'Maina Town - Local Culture',
                  description: 'Redesign of Maina Town`s website to improve user engagement and showcase local culture.',
                  image: 'images/mainatown/mainatown_hero.png',
                  technologies: ['Wordpress', 'Elementor'],
                  liveUrl: 'https://mainatown.bg',
                  details: 'Passion project to redesign Maina Town`s website during my university studies, focusing on user experience and visual appeal.'
            },
            {
                  id: '5',
                  title: 'RetroSafari - Vintage Car Tours',
                  description: 'Owned by MainaTown, RetroSafari is a website for booking vintage car tours around Plovdiv, Bulgaria.',
                  image: 'images/retrosafari/retrosafari_hero.png',
                  technologies: ['Wordpress'],
                  liveUrl: 'https://retrosafari.bg',
                  details: 'Used a Wordpress template and connected it with an external booking system(Checkfront) to help users book vintage car tours easily.'
            },
            {
                  id: '6',
                  title: 'Personal Portfolio Website',
                  description: 'Interactive 3D portfolio with immersive experiences.',
                  image: '/images/portfolio/portfolio_hero.png',
                  technologies: ['Three.js', 'WebGL', 'GSAP', 'React'],
                  liveUrl: 'https://dimitar-gunchev.com',
                  githubUrl: 'https://github.com/GunchevDB/personal-portfolio',
                  details: 'Personal portfolio showcasing projects with 3D graphics and animations.'
            },
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

export default Projects;