import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as IconsSI from 'react-icons/si';
import * as IconsFA from 'react-icons/fa';
import { profile } from '../../../data/profile';
import BouncyText from '../../ui/BouncyText';

const Skills = () => {
    const [activeTab, setActiveTab] = useState('All Skills');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15
            }
        }
    };

    // Category based colors
    const categoryColors = {
        'All Skills': '#6366f1', // Indigo/Purple
        'ProgrammingLanguages': '#1A535C', // Teal
        'Frontend': '#E8699A',  // Pink
        'Backend': '#F4833D',   // Orange
        'Databases': '#F4C430',  // Gold
        'Tools': '#10b981'       // Emerald
    };

    const activeColor = categoryColors[activeTab] || '#1A535C';

    const allCategories = ['All Skills', ...profile.skills.map(c => c.category)];

    const displayedSkills = activeTab === 'All Skills'
        ? profile.skills.flatMap(c => c.skills)
        : (profile.skills.find(c => c.category === activeTab)?.skills || []);

    return (
        <section id="skills" className="py-10 relative overflow-hidden bg-[#FDFCF0]">
            {/* Background Decorative Elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-accent-teal/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent-pink/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-gold/3 border-[1px] border-dashed border-accent-gold/20 rounded-full animate-spin-slow pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-black mb-5">
                        <BouncyText text="My " />
                        <span className="highlight-pill-teal"><BouncyText text="Skills" colorOffset={3} /></span>
                    </h2>
                    <div className="section-divider" />
                    <p className="max-w-xl mx-auto text-text-secondary font-medium text-lg mt-6">
                        A curated showcase of my technical expertise, spanning frontend magic, backend robustness, and core mastery.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {allCategories.map((catName) => {
                        const isActive = activeTab === catName;
                        const catColor = categoryColors[catName] || '#1A535C';

                        return (
                            <motion.button
                                key={catName}
                                onClick={() => setActiveTab(catName)}
                                whileHover={{ y: -4, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`px-6 py-2.5 font-black text-[13px] uppercase tracking-widest transition-all duration-300 relative overflow-hidden group`}
                                style={{
                                    border: "3px solid #1A1A1A",
                                    borderRadius: "1rem",
                                    background: isActive ? catColor : "white",
                                    color: isActive ? 'white' : '#1A1A1A',
                                    boxShadow: isActive ? `6px 6px 0px #1A1A1A` : `4px 4px 0px #1A1A1A`,
                                }}
                            >
                                <span className="relative z-10">{catName}</span>
                                {!isActive && (
                                    <div
                                        className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                                        style={{ background: `${catColor}15` }}
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Skills Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {displayedSkills.map((skill) => {
                            const IconComponent = IconsSI[skill.icon] || IconsFA[skill.icon];
                            // If showing all skills, use a color mapping or fallback for icons
                            const skillColor = activeTab === 'All Skills' ? '#1A535C' : activeColor;

                            return (
                                <motion.div
                                    key={`${activeTab}-${skill.name}`}
                                    variants={itemVariants}
                                    whileHover={{ y: -8, rotate: 0.5 }}
                                    className="bg-white rounded-3xl p-8 relative overflow-hidden group border-[3px] border-[#1A1A1A]"
                                    style={{
                                        boxShadow: `8px 8px 0px ${skillColor}`
                                    }}
                                >
                                    {/* Decorative elements */}
                                    <div
                                        className="absolute -top-12 -right-12 w-24 h-24 rounded-full opacity-5 group-hover:opacity-10 transition-all duration-500 scale-100 group-hover:scale-150"
                                        style={{ background: skillColor }}
                                    />
                                    <div
                                        className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full opacity-5 group-hover:opacity-10 transition-all duration-500"
                                        style={{ background: skillColor }}
                                    />

                                    <div className="flex justify-between items-end mb-6">
                                        <div className="flex flex-col">
                                            <div className="mb-3 text-3xl transition-transform duration-300 group-hover:scale-110" style={{ color: skillColor }}>
                                                {IconComponent ? <IconComponent /> : <div className="w-8 h-1.5 rounded-full" style={{ background: skillColor }} />}
                                            </div>
                                            <h4 className="text-text-primary font-black text-2xl tracking-tight">{skill.name}</h4>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span
                                                className="text-3xl font-black italic opacity-20 group-hover:opacity-100 transition-opacity duration-500"
                                                style={{ color: skillColor }}
                                            >
                                                {skill.proficiency}%
                                            </span>
                                        </div>
                                    </div>
                                    {/* ... rest of content */}


                                    {/* Progress Bar Container */}
                                    <div className="relative pt-2">
                                        <div className="w-full h-4 bg-bg-primary/50 border-2 border-[#1A1A1A] rounded-full overflow-hidden p-[2px]">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.proficiency}%` }}
                                                transition={{ duration: 1.5, ease: "circOut" }}
                                                viewport={{ once: true }}
                                                className="h-full rounded-full relative overflow-hidden"
                                                style={{ background: skillColor }}
                                            >
                                                {/* Glossy overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />

                                                {/* Animated Shine */}
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full"
                                                    animate={{ x: ['-100%', '100%'] }}
                                                    transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                                                />
                                            </motion.div>
                                        </div>

                                        {/* Tick marker */}
                                        <div
                                            className="absolute -top-4 w-4 h-4 bg-[#1A1A1A] rotate-45 group-hover:scale-125 transition-transform duration-300"
                                            style={{ left: `calc(${skill.proficiency}% - 8px)` }}
                                        />
                                    </div>

                                    <div className="mt-6 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        <span>PROFICIENCY</span>
                                        <span style={{ color: skillColor }}>{skill.proficiency > 85 ? 'Expert' : 'Advanced'}</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Skills;
