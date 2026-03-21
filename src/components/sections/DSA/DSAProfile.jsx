import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { profile } from '../../../data/profile';

const DSAProfile = () => {
  const chartData = profile.dsaStats.map((d) => ({ name: d.platform, value: d.problemsSolved }));
  const totalSolved = profile.dsaStats.reduce((acc, curr) => acc + curr.problemsSolved, 0);

  return (
    <section id="dsa" className="relative overflow-hidden bg-[#050505] text-white py-16">
      <div className="absolute top-[10%] left-[7%] h-48 w-48 rounded-full bg-[#2563eb]/20 blur-3xl" />
      <div className="absolute bottom-[10%] right-[7%] h-48 w-48 rounded-full bg-[#f59e0b]/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-[1450px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Performance</p>
            <h2 className="mt-2 text-4xl md:text-5xl font-black font-display text-white">DSA Dashboard</h2>
          </div>
          <div className="h-[2px] w-24 bg-gradient-to-r from-[#2563eb] to-[#f59e0b] rounded-full" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="xl:col-span-4 rounded-3xl border border-slate-700 bg-slate-900/70 p-6 smooth-card">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Total Solved</p>
            <h3 className="mt-3 text-6xl font-black text-white">{totalSolved}</h3>
            <p className="mt-2 text-slate-300">Problems solved across major coding platforms.</p>

            <div className="mt-6 space-y-3">
              {profile.dsaStats.map((stat) => (
                <a key={stat.platform} href={stat.link} target="_blank" rel="noopener noreferrer" className="block rounded-2xl border border-slate-700 bg-slate-950/60 p-4 hover:border-[#f59e0b] transition smooth-card">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">{stat.platform}</p>
                    <span className="text-xs font-medium" style={{ color: stat.color }}>{stat.rating}</span>
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">{stat.problemsSolved} solved</p>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="xl:col-span-8 rounded-3xl border border-slate-700 bg-slate-900/70 p-6 md:p-8 smooth-card">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Platform Distribution</p>
              <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-xs text-slate-300">Live Snapshot</span>
            </div>

            <div className="h-[360px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={95} outerRadius={150} paddingAngle={8} dataKey="value" stroke="none">
                    {profile.dsaStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} className="cursor-pointer" />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
              {profile.dsaStats.map((stat) => (
                <div key={stat.platform} className="rounded-xl border border-slate-700 bg-slate-950/60 p-3 text-center smooth-card">
                  <div className="mx-auto mb-1 h-2 w-10 rounded-full" style={{ background: stat.color }} />
                  <p className="text-xs font-semibold text-slate-200">{stat.platform}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DSAProfile;
