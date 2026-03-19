import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { profile } from '../../../data/profile';
import BouncyText from '../../ui/BouncyText';

const DSAProfile = () => {
    const chartData = profile.dsaStats.map(d => ({ name: d.platform, value: d.problemsSolved }));
    const totalSolved = profile.dsaStats.reduce((acc, curr) => acc + curr.problemsSolved, 0);

    return (
        <section id="dsa" className="py-12 relative overflow-hidden bg-white/50">
            {/* Background Decorations */}
            <div className="absolute top-40 right-10 w-64 h-64 bg-accent-teal/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-48 h-48 bg-accent-gold/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-black mb-5 text-text-primary">
                        <BouncyText text="DSA " />
                        <span className="highlight-pill-teal"><BouncyText text="Statistics" colorOffset={4} /></span>
                    </h2>
                    <div className="section-divider" />
                    <p className="max-w-xl mx-auto text-text-secondary font-medium text-lg mt-6">
                        Tracking my algorithmic progress across major competitive programming platforms.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Platform Cards */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="grid sm:grid-cols-2 gap-6"
                    >
                        {profile.dsaStats.map((stat, i) => (
                            <motion.div
                                key={stat.platform}
                                whileHover={{ y: -10, rotate: i % 2 === 0 ? 0.6 : -0.6 }}
                                className="bg-white rounded-[2.5rem] p-8 relative overflow-hidden group border-[3.5px] border-[#1A1A1A] flex flex-col items-center text-center"
                                style={{
                                    boxShadow: `8px 8px 0px ${stat.color}`,
                                }}
                            >
                                {/* Soft platform glow */}
                                <div
                                    className="absolute -inset-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(120px 120px at 20% 10%, ${stat.color}25, transparent 70%)`,
                                    }}
                                />

                                {/* Decorative platform color bar */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-2"
                                    style={{ background: stat.color }}
                                />

                                <a
                                    href={stat.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xl font-black mb-4 uppercase tracking-widest px-4 py-1 rounded-full text-white transition-all hover:scale-[1.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                                    style={{ background: stat.color, border: '2px solid #1A1A1A', boxShadow: '3px 3px 0 #1A1A1A' }}
                                >
                                    {stat.platform}
                                </a>

                                <div className="text-6xl font-black text-text-primary mb-1 tracking-tighter" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                                    {stat.problemsSolved}
                                </div>
                                <div className="text-text-secondary text-[10px] font-black uppercase tracking-widest opacity-60">Problems Solved</div>

                                <div
                                    className="mt-6 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider border-2 border-[#1A1A1A] bg-white/90"
                                    style={{
                                        backgroundColor: `${stat.color}15`,
                                        color: i === 3 ? '#1A1A1A' : stat.color,
                                        boxShadow: `3px 3px 0px #1A1A1A`
                                    }}
                                >
                                    {stat.rating}
                                </div>

                                {/* Floating icon/emoji based on platform */}
                                <div className="absolute -bottom-4 -right-4 text-4xl opacity-[0.03] group-hover:opacity-10 group-hover:-translate-y-2 transition-all duration-500">
                                    {stat.platform === 'LeetCode' && '🔥'}
                                    {stat.platform === 'GeeksForGeeks' && '🌿'}
                                    {stat.platform === 'HackerRank' && '⭐'}
                                    {stat.platform === 'CodeChef' && '👨‍🍳'}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Chart Area */}
                    <div className="relative p-10 bg-white rounded-[3rem] border-[4px] border-[#1A1A1A] shadow-[12px 12px 0px #1A535C] overflow-hidden group">
                        {/* Decorative Chart Background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-teal/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-gold/10 rounded-full blur-2xl" />

                        <div className="h-[380px] w-full relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={90}
                                        outerRadius={140}
                                        paddingAngle={10}
                                        stroke="none"
                                        dataKey="value"
                                    >
                                        {profile.dsaStats.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.color}
                                                className="hover:opacity-80 transition-opacity cursor-pointer"
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1A1A1A',
                                            border: 'none',
                                            borderRadius: '12px',
                                            padding: '12px 16px',
                                            color: '#fff',
                                            fontFamily: "'Bricolage Grotesque', sans-serif"
                                        }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>

                            {/* Center Content */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    className="relative"
                                >
                                    {/* Rotating Ring around total */}
                                    <div className="absolute -inset-10 rounded-full border-2 border-dashed border-gray-100 animate-spin-slow opacity-50" />

                                    <div className="text-6xl font-black text-text-primary leading-none" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                                        {totalSolved}
                                    </div>
                                    <div className="text-[11px] font-black text-text-secondary uppercase tracking-[0.2em] mt-2 opacity-50">Total<br />Solved</div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Chart Legend / Hint */}
                        <div className="mt-4 flex justify-center gap-6 flex-wrap relative z-10">
                            {profile.dsaStats.map((stat, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ background: stat.color }} />
                                    <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">{stat.platform}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DSAProfile;
