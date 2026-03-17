import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const milestones = [
    {
        year: '2023',
        title: 'Started Coding Journey',
        description: 'Dived into the world of programming with Java and DSA foundations.',
        emoji: '🚀',
        bg: '#F4C430',
        shadow: '#d4a800',
        tag: 'THE BEGINNING',
    },
    {
        year: '2024',
        title: 'Full Stack Exploration',
        description: 'Mastered the MERN stack and built several full-stack applications.',
        emoji: '⚡',
        bg: '#F4833D',
        shadow: '#c45a10',
        tag: 'LEVEL UP',
    },
    {
        year: '2025',
        title: 'Open Source & Projects',
        description: 'Contributing to open source and building scalable real-world solutions.',
        emoji: '🌍',
        bg: '#E8699A',
        shadow: '#b03870',
        tag: 'GOING GLOBAL',
    },
    {
        year: 'Now',
        title: 'Mastering Backend & Advanced DSA',
        description: 'Mastering backend engineering, solving complex algorithmic problems, and refining system design skills.',
        emoji: '🏆',
        bg: '#1A535C',
        shadow: '#0d2e33',
        tag: 'PRESENT',
    },
];

/* Tilt card on mouse move */
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
    const onLeave = () => { x.set(0); y.set(0); };

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {milestones.map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                    <TiltCard>
                        <div
                            className="bg-white rounded-2xl p-6 relative group overflow-hidden h-full flex flex-col justify-between"
                            style={{
                                border: '2.5px solid #1A1A1A',
                                boxShadow: `6px 6px 0px ${item.bg}`,
                                minHeight: '260px'
                            }}
                        >
                            {/* Decorative background circle */}
                            <div
                                className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-5 group-hover:opacity-10 transition-all duration-500 scale-100 group-hover:scale-150"
                                style={{ background: item.bg }}
                            />

                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span
                                        className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded"
                                        style={{
                                            background: item.bg,
                                            border: '1.5px solid #1A1A1A',
                                            color: i === 3 ? '#fff' : '#1A1A1A',
                                            boxShadow: '2px 2px 0 #1A1A1A'
                                        }}
                                    >
                                        {item.tag}
                                    </span>
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                                        style={{ background: `${item.bg}20`, border: `1.5px solid ${item.bg}` }}
                                    >
                                        {item.emoji}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mb-2">
                                    <span
                                        className="text-2xl font-black"
                                        style={{
                                            fontFamily: "'Bricolage Grotesque', sans-serif",
                                            color: item.bg,
                                        }}
                                    >
                                        {item.year}
                                    </span>
                                </div>

                                <h3
                                    className="text-lg font-black mb-2 leading-tight"
                                    style={{ color: '#1A1A1A', fontFamily: "'Bricolage Grotesque', sans-serif" }}
                                >
                                    {item.title}
                                </h3>
                                <p className="text-sm leading-relaxed font-medium" style={{ color: '#4A4A4A' }}>
                                    {item.description}
                                </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-dashed border-gray-200 flex justify-between items-center text-[10px] font-bold text-gray-400">
                                <span>MILESTONE</span>
                                <span className="w-1.5 h-1.5 rounded-full" style={{ background: item.bg }} />
                            </div>
                        </div>
                    </TiltCard>
                </motion.div>
            ))}
        </div>
    );
};

export default Timeline;
