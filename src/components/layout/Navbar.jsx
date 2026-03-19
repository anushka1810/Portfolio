import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { Link } from 'react-scroll';
import BouncyText from '../ui/BouncyText';

const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Achievements', to: 'achievements' },
    { name: 'Certifications', to: 'certifications' },
    { name: 'Resume', to: 'resume' },
    { name: 'Contact', to: 'contact' },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 rounded-full backdrop-blur-3xl shadow-lg ${isScrolled ? 'py-3 bg-white/20' : 'py-5 bg-white/10'} `}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ rotate: [-2, 2, -1, 0], transition: { duration: 0.4 } }}
                    className="text-2xl font-display font-black text-accent-teal cursor-pointer"
                    style={{ letterSpacing: "-0.03em" }}
                >
                    <BouncyText text="ANUJ" className="text-accent-teal" />
                    <BouncyText text=".YD" className="text-text-primary" />
                    <span className="ml-1 text-accent-coral">★</span>
                </motion.div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-10">
                    <div className="flex gap-5">
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link
                                    to={link.to}
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                    className="text-xs font-black text-text-secondary cursor-pointer uppercase tracking-widest flex"
                                >
                                    <BouncyText text={link.name} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-3xl text-text-primary">
                        {isOpen ? <HiX /> : <HiMenuAlt3 />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-bg-primary border-b-2 border-black/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.to}
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-black text-text-primary hover:text-accent-teal transition-colors uppercase tracking-wider"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
