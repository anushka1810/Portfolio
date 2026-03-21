import React from 'react';
import { motion } from 'framer-motion';
import Timeline from './Timeline';
import { profile } from '../../../data/profile';
import { HiOutlineLocationMarker, HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineCode } from 'react-icons/hi';

const About = () => {
  const quickFacts = [
    { icon: HiOutlineLocationMarker, label: 'Location', value: 'India' },
    { icon: HiOutlineAcademicCap, label: 'Education', value: 'B.Tech CSE (8.85 CGPA)' },
    { icon: HiOutlineBriefcase, label: 'Experience', value: '1+ Year Developer' },
    { icon: HiOutlineCode, label: 'DSA', value: '550+ Problems Solved' },
  ];

  const hobbies = ['Sketching', 'Music', 'Badminton', 'Traveling', 'Photography', 'Journaling'];

  return (
    <section id="about" className="relative overflow-hidden bg-[#050505] text-white py-16">
      <div className="absolute top-[12%] left-[6%] h-52 w-52 rounded-full bg-[#2563eb]/20 blur-3xl" />
      <div className="absolute bottom-[8%] right-[7%] h-52 w-52 rounded-full bg-[#f59e0b]/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-[1450px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">About</p>
            <h2 className="mt-2 text-4xl md:text-5xl font-black font-display text-white">Who I Am</h2>
          </div>
          <div className="h-[2px] w-24 bg-gradient-to-r from-[#2563eb] to-[#f59e0b] rounded-full" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="xl:col-span-5 rounded-3xl border border-slate-700 bg-slate-900/70 p-7 smooth-card">
            <h3 className="text-2xl font-black text-white">Profile Summary</h3>
            <p className="mt-4 text-slate-300 leading-relaxed">{profile.basics.summary}</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickFacts.map((fact) => (
                <div key={fact.label} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4 smooth-card">
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#2563eb]/20 text-[#2563eb]">
                    <fact.icon size={18} />
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{fact.label}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{fact.value}</p>
                </div>
              ))}
            </div>

          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="xl:col-span-7 rounded-3xl border border-slate-700 bg-slate-900/70 p-7 smooth-card">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-black text-white">Journey Timeline</h3>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">2023 - 2026</p>
            </div>
            <Timeline />

            <div className="mt-8 border-t border-slate-700 pt-6">
              <h4 className="text-sm uppercase tracking-[0.18em] text-slate-400">Hobbies</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {hobbies.map((hobby) => (
                  <span key={hobby} className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1.5 text-xs text-slate-200">
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
