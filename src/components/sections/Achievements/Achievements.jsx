import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../../../data/profile';
import BouncyText from '../../ui/BouncyText';

const Achievements = () => {
    return (
        <section id="achievements" className="py-10 relative overflow-hidden bg-bg-secondary/30">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-black mb-5 text-text-primary">
                        <BouncyText text="Key " />
                        <span className="highlight-pill-pink"><BouncyText text="Achievements" colorOffset={4} /></span>
                    </h2>
                    <div className="section-divider" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {profile.achievements.map((achievement, i) => (
                        <motion.div
                            key={achievement.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -8, rotate: 0.8 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="card-retro group text-center"
                        >
                            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
                                {achievement.icon}
                            </div>
                            <h3 className="text-xl font-display font-black mb-4 text-text-primary">{achievement.title}</h3>
                            <p className="text-text-secondary text-sm leading-relaxed mb-6 font-medium">
                                {achievement.description}
                            </p>
                            <div className="retro-badge inline-flex justify-center">{achievement.date}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
