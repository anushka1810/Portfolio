import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX, HiMoon, HiSun } from 'react-icons/hi';

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

const Navbar = ({ activeSection = 'home', onNavigate = () => {}, theme = 'night', onToggleTheme = () => {} }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-slate-950/90 border-slate-800 backdrop-blur-xl py-3'
          : 'bg-slate-950/60 border-transparent py-5'
      }`}
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <motion.button
          type="button"
          onClick={() => onNavigate('home')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="cursor-pointer text-left"
        >
          <p className="font-display text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>ANUSHKA</span>
            <span className="text-[#67e8f9]">SURYA</span>
          </p>
          <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Full Stack Developer</p>
        </motion.button>

        <div className="hidden md:flex items-center gap-6">
          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/70 text-slate-200 hover:border-[#67e8f9] transition"
            aria-label="Toggle day and night theme"
          >
            {theme === 'day' ? <HiMoon size={18} /> : <HiSun size={18} />}
          </button>
          {navLinks.map((link, i) => (
            <motion.div key={link.name} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <button
                type="button"
                onClick={() => onNavigate(link.to)}
                className={`text-[11px] font-semibold cursor-pointer uppercase tracking-[0.18em] transition-colors ${
                  activeSection === link.to ? 'text-[#f59e0b]' : 'text-slate-300 hover:text-[#f59e0b]'
                }`}
              >
                {link.name}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/70 text-slate-200"
            aria-label="Toggle day and night theme"
          >
            {theme === 'day' ? <HiMoon size={16} /> : <HiSun size={16} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-3xl text-white">
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/95 border-t border-slate-800 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.name}
                  onClick={() => {
                    onNavigate(link.to);
                    setIsOpen(false);
                  }}
                  className={`text-left text-base font-semibold transition-colors uppercase tracking-wider ${
                    activeSection === link.to ? 'text-[#f59e0b]' : 'text-slate-200 hover:text-[#f59e0b]'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
