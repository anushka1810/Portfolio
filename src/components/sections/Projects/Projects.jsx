import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../../../data/profile';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
  const projects = profile.projects;
  const [activeFilter, setActiveFilter] = useState('All Projects');

  const getCategoryFromProject = (project) => {
    const stack = (project.tech || []).map((item) => item.toLowerCase());
    const hasBackend = stack.includes('node.js') || stack.includes('express.js') || stack.includes('php') || stack.includes('mysql') || stack.includes('mongodb');
    const hasFrontend = stack.includes('react.js') || stack.includes('javascript') || stack.includes('html5') || stack.includes('tailwind css');
    const hasData = stack.some((item) => item.includes('algorithm') || item.includes('dijkstra'));
    const hasApi = stack.some((item) => item.includes('api'));

    if (hasBackend && hasFrontend) return 'Full Stack';
    if (hasApi) return 'API Integration';
    if (hasData) return 'Data Visualization';
    if (hasFrontend) return 'Frontend';
    return 'Web App';
  };

  const categoryMap = useMemo(
    () => projects.reduce((acc, project) => {
      acc[project.title] = getCategoryFromProject(project);
      return acc;
    }, {}),
    [projects]
  );

  const categories = ['All Projects', ...new Set(projects.map((project) => categoryMap[project.title]))];
  const filteredProjects = activeFilter === 'All Projects' ? projects : projects.filter((project) => categoryMap[project.title] === activeFilter);

  return (
    <section id="projects" className="relative overflow-hidden bg-[#050505] text-white py-16">
      <div className="absolute top-[10%] left-[8%] h-48 w-48 rounded-full bg-[#2563eb]/20 blur-3xl" />
      <div className="absolute bottom-[8%] right-[8%] h-48 w-48 rounded-full bg-[#f59e0b]/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-[1450px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Selected Work</p>
            <h2 className="mt-2 text-4xl md:text-5xl font-black font-display text-white">Projects</h2>
          </div>
          <div className="h-[2px] w-24 bg-gradient-to-r from-[#2563eb] to-[#f59e0b] rounded-full" />
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => {
            const active = activeFilter === category;
            return (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${active ? 'border-[#2563eb] bg-[#2563eb] text-white' : 'border-slate-700 bg-slate-900/70 text-slate-300 hover:bg-slate-800/70'}`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="space-y-6">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="rounded-3xl border border-slate-700 bg-slate-900/70 p-4 md:p-5 smooth-card"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''}`}>
                <div className="lg:col-span-5 overflow-hidden rounded-2xl border border-slate-700">
                  <img src={project.image} alt={project.title} className="h-full min-h-[240px] w-full object-cover" />
                </div>

                <div className="lg:col-span-7 flex flex-col">
                  <div className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[#f59e0b]">{categoryMap[project.title]}</div>
                  <h3 className="text-3xl font-display font-black text-white">{project.title}</h3>
                  <p className="mt-3 text-slate-300 leading-relaxed">{project.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((item) => (
                      <span key={item} className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-xs text-slate-200">
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.live ? (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-4 py-2.5 text-sm font-semibold text-white">
                        <FaExternalLinkAlt />
                        Live Demo
                      </a>
                    ) : (
                      <span className="inline-flex items-center rounded-xl border border-dashed border-slate-700 px-4 py-2.5 text-sm text-slate-400">Live Demo Unavailable</span>
                    )}
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:border-[#f59e0b] hover:text-[#f59e0b] transition">
                      <FaGithub />
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
