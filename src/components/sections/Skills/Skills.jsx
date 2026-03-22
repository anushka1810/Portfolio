import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as IconsSI from 'react-icons/si';
import * as IconsFA from 'react-icons/fa';
import { FiZap } from 'react-icons/fi';
import gsap from 'gsap';
import { 
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
    ResponsiveContainer, Tooltip 
} from 'recharts';
import { profile } from '../../../data/profile';

const Skills = () => {
    const [activeTab, setActiveTab] = useState('All Skills');
    const chartShellRef = useRef(null);
    const chartGlowRef = useRef(null);
    const chartRingRef = useRef(null);

    // Category based colors (Midnight Bloom Palette)
    const categoryColors = {
        'All Skills': '#FFFFFF',          // Multi-focus
        'ProgrammingLanguages': '#9B5DE5', // Purple
        'Frontend': '#2563eb',             // Neon Pink
        'Backend': '#f59e0b',              // Electric Teal
        'Databases': '#FEE440',            // Yellow
        'Tools': '#4CC9F0'                 // Sky Blue
    };

    const activeColor = categoryColors[activeTab] || '#2563eb';
    const categories = ['All Skills', ...profile.skills.map(c => c.category)];

    useEffect(() => {
        const shell = chartShellRef.current;
        const glow = chartGlowRef.current;
        const ring = chartRingRef.current;
        if (!shell || !glow || !ring) return;

        const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
        floatTl.to(shell, { y: -8, duration: 2.4, ease: 'sine.inOut' });

        gsap.to(glow, {
            opacity: 0.75,
            scale: 1.08,
            duration: 1.8,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
        });

        gsap.to(ring, {
            rotate: 360,
            duration: 18,
            ease: 'none',
            repeat: -1,
        });

        return () => {
            floatTl.kill();
            gsap.killTweensOf([shell, glow, ring]);
        };
    }, []);
    
    // Logic for Chart Data
    let chartData = [];
    let displayedSkills = [];

    if (activeTab === 'All Skills') {
        // Overview: Average of each category
        chartData = profile.skills.map(cat => {
            const avg = Math.round(cat.skills.reduce((acc, s) => acc + s.proficiency, 0) / cat.skills.length);
            return { subject: cat.category === 'ProgrammingLanguages' ? 'Langs' : cat.category, A: avg, fullMark: 100 };
        });
        displayedSkills = profile.skills.flatMap(c => c.skills);
    } else {
        const activeCategoryData = profile.skills.find(c => c.category === activeTab);
        chartData = activeCategoryData?.skills.map(s => ({
            subject: s.name,
            A: s.proficiency,
            fullMark: 100,
        })) || [];
        displayedSkills = activeCategoryData?.skills || [];
    }

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#1A1A1A] border border-slate-700 p-2 rounded-lg shadow-xl backdrop-blur-md">
                    <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1">{payload[0].payload.subject}</p>
                    <p className="text-sm font-bold" style={{ color: activeColor }}>{payload[0].value}%</p>
                </div>
            );
        }
        return null;
    };

    return (
        <section id="skills" className="py-20 relative overflow-hidden bg-[#050505] text-white">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-[#2563eb]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] -right-[10%] w-[40%] h-[40%] bg-[#f59e0b]/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-display font-black mb-5 text-white tracking-tight">
                        My <span className="text-[#2563eb]">Skills</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-[#f59e0b] mx-auto rounded-full shadow-[0_0_18px_rgba(96,165,250,0.35)]" />
                    <p className="max-w-2xl mx-auto text-slate-300 font-medium text-lg mt-6 leading-relaxed">
                        Visualizing technical mastery through data and interactive representation.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((catName) => {
                        const isActive = activeTab === catName;
                        const catColor = categoryColors[catName] || '#2563eb';

                        return (
                            <motion.button
                                key={catName}
                                onClick={() => setActiveTab(catName)}
                                whileHover={{ y: -4, scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-7 py-2.5 font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-300 rounded-full border ${
                                    isActive 
                                    ? 'bg-slate-950/85 text-white border-white shadow-[0_0_26px_rgba(255,255,255,0.38)]' 
                                    : 'bg-slate-900/70 text-slate-300 border-slate-700 hover:border-cyan-300/45 hover:text-white'
                                }`}
                            >
                                {catName === 'ProgrammingLanguages' ? 'Langs' : catName === 'All Skills' ? 'Overview' : catName}
                            </motion.button>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* ── Chart Section ── */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="lg:col-span-5 h-[400px] bg-slate-900/70 backdrop-blur-xl rounded-3xl border border-slate-700 p-6 flex flex-col items-center justify-center relative group smooth-card overflow-hidden"
                        style={{ borderBottom: `4px solid ${activeColor}` }}
                        ref={chartShellRef}
                    >
                        <div
                            ref={chartGlowRef}
                            className="pointer-events-none absolute inset-0 opacity-50"
                            style={{ background: `radial-gradient(circle at 50% 50%, ${activeColor}28 0%, transparent 60%)` }}
                        />
                        <div
                            ref={chartRingRef}
                            className="pointer-events-none absolute inset-5 rounded-full border border-dashed"
                            style={{ borderColor: `${activeColor}66` }}
                        />
                        <div className="absolute top-4 left-6">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">PRO-CHART</span>
                            <h4 className="text-sm font-bold text-white">{activeTab === 'All Skills' ? 'Overall' : activeTab} Mastery</h4>
                        </div>
                        
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="55%" outerRadius="70%" data={chartData}>
                                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                <PolarAngleAxis 
                                    dataKey="subject" 
                                    tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 'bold' }} 
                                />
                                <PolarRadiusAxis 
                                    angle={30} 
                                    domain={[0, 100]} 
                                    tick={false} 
                                    axisLine={false} 
                                />
                                <Radar
                                    name="Proficiency"
                                    dataKey="A"
                                    stroke={activeColor}
                                    fill={activeColor}
                                    fillOpacity={0.4}
                                />
                                <Tooltip content={<CustomTooltip />} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* ── Skills Data/Grid ── */}
                    <div className="lg:col-span-7 pr-0 lg:pr-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4"
                            >
                                {displayedSkills.map((skill, i) => {
                                    const IconComponent = IconsSI[skill.icon] || IconsFA[skill.icon];
                                    // Use original category group color if in All Skills
                                    let skillColor = activeColor;
                                    if (activeTab === 'All Skills') {
                                        const cat = profile.skills.find(c => c.skills.some(s => s.name === skill.name));
                                        skillColor = categoryColors[cat?.category] || activeColor;
                                    }

                                    return (
                                        <motion.div
                                            key={`${activeTab}-${skill.name}`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.02 }}
                                            className="bg-slate-900/70 backdrop-blur-md p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center text-center group transition-all duration-300 hover:-translate-y-2 hover:bg-slate-800/70 hover:border-slate-700 hover:shadow-[0_10px_20px_-5px_rgba(255,255,255,0.1)] smooth-card"
                                        >
                                            <div 
                                                className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center text-white text-xl transition-transform group-hover:scale-110"
                                                style={{ background: `${skillColor}20`, border: `1px solid ${skillColor}40` }}
                                            >
                                                {IconComponent ? <IconComponent /> : <FiZap />}
                                            </div>
                                            <h5 className="text-[11px] font-black uppercase tracking-wider text-white mb-1 leading-tight">{skill.name}</h5>
                                            <div className="w-full flex items-center gap-2 px-1">
                                                <div className="h-1 flex-1 bg-slate-900/70 rounded-full overflow-hidden">
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${skill.proficiency}%` }}
                                                        transition={{ duration: 1 }}
                                                        className="h-full rounded-full"
                                                        style={{ background: skillColor }}
                                                    />
                                                </div>
                                                <span className="text-[9px] font-bold text-gray-500">{skill.proficiency}%</span>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;


