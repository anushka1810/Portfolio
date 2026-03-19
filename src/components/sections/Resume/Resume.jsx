import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineDownload } from 'react-icons/hi';
import BouncyText from '../../ui/BouncyText';
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
  const titleParts = profile.resume.hero.title.split(' ');
  const titleLead = titleParts[0] || 'My';
  const titleTail = titleParts.slice(1).join(' ') || 'Resume';

  return (
    <section id="resume" className="py-12 relative overflow-hidden bg-bg-primary">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-display font-black mb-4 text-text-primary">
            <BouncyText text={`${titleLead} `} />
            <span className="highlight-pill-teal">
              <BouncyText text={titleTail} colorOffset={3} />
            </span>
          </h2>
          <div className="section-divider" />
          <p className="max-w-2xl mx-auto text-text-secondary font-medium text-lg mt-5">
            {profile.resume.hero.subtitle}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 text-xs font-black uppercase tracking-widest border-2 border-black rounded-xl transition-all"
                style={{
                  background: isActive ? '#1A535C' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#1A1A1A',
                  boxShadow: isActive ? '6px 6px 0px #1A1A1A' : '4px 4px 0px #1A1A1A',
                }}
              >
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'education' && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="grid grid-cols-1 gap-6 max-w-4xl mx-auto"
            >
              {profile.education.map((edu, idx) => (
                <div
                  key={`${edu.school}-${idx}`}
                  className="bg-white rounded-3xl p-7 border-[3px] border-[#1A1A1A]"
                  style={{ boxShadow: '8px 8px 0px #1A535C' }}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h3 className="text-xl font-black text-text-primary mb-1">{edu.school}</h3>
                      <p className="text-sm font-bold text-text-secondary uppercase tracking-wider">{edu.location}</p>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border-2 border-black bg-bg-secondary/40">
                      {edu.date}
                    </span>
                  </div>
                  <p className="mt-4 text-sm font-bold text-text-primary">{edu.status}</p>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">{edu.details}</p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
            >
              {profile.skills.map((group) => (
                <div
                  key={group.label}
                  className="bg-white rounded-3xl p-6 border-[3px] border-[#1A1A1A]"
                  style={{ boxShadow: '8px 8px 0px #E8699A' }}
                >
                  <h3 className="text-base font-black uppercase tracking-widest text-text-primary mb-4">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((item) => (
                      <span
                        key={item.name}
                        className="px-3 py-1.5 text-xs font-black uppercase tracking-widest border-2 border-black rounded-full bg-[#FAF7F0]"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
            >
              {profile.projects.map((proj) => (
                <div
                  key={proj.title}
                  className="bg-white rounded-3xl p-6 border-[3px] border-[#1A1A1A]"
                  style={{ boxShadow: '8px 8px 0px #F4C430' }}
                >
                  <h3 className="text-lg font-black text-text-primary mb-1">{proj.title}</h3>
                  <p className="text-xs font-black uppercase tracking-widest text-text-secondary mb-3">
                    {proj.tech.join(', ')}
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
            >
              {profile.achievements.map((achievement) => (
                <div
                  key={achievement.title}
                  className="bg-white rounded-3xl p-6 border-[3px] border-[#1A1A1A] flex items-center gap-3"
                  style={{ boxShadow: '8px 8px 0px #E85D4A' }}
                >
                  <span className="w-3 h-3 rounded-full bg-accent-coral border-2 border-black" />
                  <p className="text-sm font-bold text-text-primary">{achievement.title}</p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'certifications' && (
            <motion.div
              key="certifications"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
            >
              {profile.certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="bg-white rounded-3xl p-6 border-[3px] border-[#1A1A1A] flex items-center gap-3"
                  style={{ boxShadow: '8px 8px 0px #1A535C' }}
                >
                  <span className="w-3 h-3 rounded-full bg-accent-teal border-2 border-black" />
                  <p className="text-sm font-bold text-text-primary">{cert.title}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Download CTA */}
        <div className="flex justify-center mt-12">
          <a
            href={profile.resume.downloadUrl}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-widest border-2 border-black rounded-2xl bg-accent-teal text-white shadow-[5px_5px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            download
          >
            <HiOutlineDownload size={16} />
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Resume;
