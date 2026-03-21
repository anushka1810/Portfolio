import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineDownload } from 'react-icons/hi';
import { profile } from '../../../data/profile';

const TABS = [
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'certifications', label: 'Certifications' },
];

const Resume = () => {
  const [activeTab, setActiveTab] = useState('education');

  return (
    <section id="resume" className="relative overflow-hidden bg-[#050505] text-white py-16">
      <div className="absolute top-[8%] left-[7%] h-44 w-44 rounded-full bg-[#2563eb]/20 blur-3xl" />
      <div className="absolute bottom-[8%] right-[7%] h-44 w-44 rounded-full bg-[#f59e0b]/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-[1450px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Resume</p>
            <h2 className="mt-2 text-4xl md:text-5xl font-black font-display text-white">Career Snapshot</h2>
          </div>
          <a href={profile.resume.downloadUrl} className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white" download>
            <HiOutlineDownload size={16} />
            Download CV
          </a>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <aside className="xl:col-span-3 rounded-3xl border border-slate-700 bg-slate-900/70 p-4 smooth-card">
            <div className="space-y-2">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                    activeTab === tab.id ? 'bg-[#2563eb] text-white' : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800/70'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </aside>

          <div className="xl:col-span-9 rounded-3xl border border-slate-700 bg-slate-900/70 p-6 smooth-card">
            <AnimatePresence mode="wait">
              {activeTab === 'education' && (
                <motion.div key="education" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="space-y-4">
                  {profile.education.map((edu, idx) => (
                    <div key={`${edu.school}-${idx}`} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5 smooth-card">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-xl font-black text-white">{edu.school}</h3>
                        <span className="text-xs uppercase tracking-[0.18em] text-slate-400">{edu.date}</span>
                      </div>
                      <p className="mt-1 text-sm font-semibold text-slate-300">{edu.location}</p>
                      <p className="mt-3 text-sm text-slate-200">{edu.status}</p>
                      <p className="mt-2 text-sm text-slate-400">{edu.details}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'skills' && (
                <motion.div key="skills" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.skills.map((group) => (
                    <div key={group.label} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5 smooth-card">
                      <h3 className="text-sm uppercase tracking-[0.18em] text-slate-300">{group.category}</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {group.skills.map((item) => (
                          <span key={item.name} className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 bg-slate-900/70">{item.name}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'projects' && (
                <motion.div key="projects" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="space-y-4">
                  {profile.projects.map((proj) => (
                    <div key={proj.title} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5 smooth-card">
                      <h3 className="text-xl font-black text-white">{proj.title}</h3>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">{proj.tech.join(', ')}</p>
                      <p className="mt-3 text-sm text-slate-300">{proj.description}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'achievements' && (
                <motion.div key="achievements" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.achievements.map((achievement) => (
                    <div key={achievement.title} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5 smooth-card">
                      <p className="text-sm font-semibold text-white">{achievement.title}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'certifications' && (
                <motion.div key="certifications" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.certifications.map((cert) => (
                    <div key={cert.title} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5 smooth-card">
                      <p className="text-sm font-semibold text-white">{cert.title}</p>
                      <p className="mt-1 text-xs text-slate-400">{cert.issuer}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
