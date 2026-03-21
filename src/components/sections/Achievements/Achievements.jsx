import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../../../data/profile';
import { SiLeetcode, SiHackerrank, SiMongodb } from 'react-icons/si';
import { HiOutlineAcademicCap } from 'react-icons/hi';

const Achievements = () => {
  const getAchievementLogo = (title) => {
    const key = title.toLowerCase();
    if (key.includes('dsa')) return { Icon: SiLeetcode, color: '#f89f1b' };
    if (key.includes('hackerrank') || key.includes('java')) return { Icon: SiHackerrank, color: '#2ec866' };
    if (key.includes('mongodb')) return { Icon: SiMongodb, color: '#13aa52' };
    return { Icon: HiOutlineAcademicCap, color: '#60a5fa' };
  };

  return (
    <section id="achievements" className="relative overflow-hidden bg-[#050505] text-white py-16">
      <div className="absolute top-[8%] left-[7%] h-44 w-44 rounded-full bg-[#2563eb]/20 blur-3xl" />
      <div className="absolute bottom-[8%] right-[7%] h-44 w-44 rounded-full bg-[#f59e0b]/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-[1450px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Highlights</p>
            <h2 className="mt-2 text-4xl md:text-5xl font-black font-display text-white">Achievements</h2>
          </div>
          <div className="h-[2px] w-24 bg-gradient-to-r from-[#2563eb] to-[#f59e0b] rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {profile.achievements.map((achievement, i) => (
            <motion.article
              key={achievement.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/70 p-7 smooth-card"
            >
              {(() => {
                const { Icon, color } = getAchievementLogo(achievement.title);
                return (
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border bg-slate-950/60 text-2xl" style={{ color, borderColor: `${color}55` }}>
                    <Icon />
                  </div>
                );
              })()}
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#2563eb] to-[#f59e0b]" />
              <h3 className="text-2xl font-black font-display text-white">{achievement.title}</h3>
              <p className="mt-3 text-slate-300 leading-relaxed">{achievement.description}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300">
                  {achievement.date}
                </span>
                <span className="text-xs text-slate-500">#{String(i + 1).padStart(2, '0')}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
