import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { HiOutlineAcademicCap, HiOutlineCode, HiOutlineLightBulb, HiOutlineStar } from 'react-icons/hi';

const milestones = [
  {
    year: '2023',
    title: 'Began B.Tech at LPU',
    description: 'Started Bachelor of Technology in CSE at Lovely Professional University and focused on Java and DSA.',
    icon: HiOutlineAcademicCap,
    bg: '#F4C430',
    tag: 'ACADEMIC START',
  },
  {
    year: '2024',
    title: 'Full Stack Growth',
    description: 'Built end-to-end full stack projects using React, Node.js, APIs, databases, and deployment workflows.',
    icon: HiOutlineCode,
    bg: '#F4833D',
    tag: 'SKILL UP',
  },
  {
    year: '2025',
    title: 'Real World Solutions',
    description: 'Built Nivana and other full stack apps. Completed intensive DSA training and improved coding speed.',
    icon: HiOutlineLightBulb,
    bg: '#E8699A',
    tag: 'IMPACT',
  },
  {
    year: '2026',
    title: 'Advanced Algorithms',
    description: 'Completed Graph Camp and crossed 550+ DSA problems while strengthening backend architecture skills.',
    icon: HiOutlineStar,
    bg: '#1A535C',
    tag: 'ELITE LEVEL',
  },
];

const TiltCard = ({ children, style, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [6, -6]);
  const rotateY = useTransform(x, [-60, 60], [-6, 6]);
  const sRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const sRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: sRotateX, rotateY: sRotateY, transformStyle: 'preserve-3d', ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Timeline = () => {
  return (
    <div className="relative py-4 px-3 md:px-4 max-w-6xl mx-auto">
      <div className="hidden md:block absolute left-0 right-0 top-[56px] h-[2px] border-t border-dashed border-slate-700 pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-stretch md:justify-between md:gap-4">
        {milestones.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="relative md:w-1/4"
            >
              <div className="flex items-center gap-4 md:flex-col md:items-center md:gap-3 h-full">
                <div className="relative z-20 shrink-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    className="w-11 h-11 rounded-full flex items-center justify-center relative overflow-hidden"
                    style={{ background: `${item.bg}15`, border: `1.5px solid ${item.bg}` }}
                  >
                    <Icon size={20} style={{ color: item.bg }} />
                    <motion.div
                      animate={{ scale: [1, 1.35, 1], opacity: [0.25, 0, 0.25] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full border-2"
                      style={{ borderColor: item.bg }}
                    />
                  </motion.div>
                  <div className="absolute -top-2 -right-2 bg-slate-950 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg border border-slate-600">
                    {item.year}
                  </div>
                </div>

                <div className="flex-1 md:w-full">
                  <TiltCard>
                    <div
                      className="bg-slate-900/70 backdrop-blur-xl p-5 rounded-2xl border border-slate-700 transition-all duration-300 group hover:-translate-y-1.5 hover:bg-slate-800/70 min-h-[220px] md:min-h-[250px] flex flex-col"
                      style={{
                        boxShadow: `0 8px 24px rgba(0,0,0,0.3), inset 0 0 15px ${item.bg}05`,
                        borderTop: `3px solid ${item.bg}`,
                      }}
                    >
                      <div className="mb-2">
                        <span
                          className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md"
                          style={{ background: `${item.bg}15`, color: item.bg }}
                        >
                          {item.tag}
                        </span>
                      </div>
                      <h3 className="text-base md:text-lg font-display font-black text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
                        {item.description}
                      </p>
                    </div>
                  </TiltCard>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center md:hidden">
        <div className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse shadow-[0_0_10px_#f59e0b]" />
      </div>
    </div>
  );
};

export default Timeline;
