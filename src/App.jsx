import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero/Hero';
import About from './components/sections/About/About';
import Skills from './components/sections/Skills/Skills';
import Projects from './components/sections/Projects/Projects';
import DSAProfile from './components/sections/DSA/DSAProfile';
import Achievements from './components/sections/Achievements/Achievements';
import Certifications from './components/sections/Certifications/Certifications';
import Resume from './components/sections/Resume/Resume';
import Contact from './components/sections/Contact/Contact';
import CursorAura from './components/layout/CursorAura';
import ChatBot from './components/chatbot/ChatBot';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState('night');

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'day' || savedTheme === 'night') {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const isDay = theme === 'day';
    document.documentElement.classList.toggle('theme-light', isDay);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const sectionView = useMemo(() => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <Hero onNavigate={setActiveSection} />
            <About />
          </>
        );
      case 'about':
        return <About />;
      case 'skills':
        return <Skills />;
      case 'projects':
        return <Projects />;
      case 'dsa':
        return <DSAProfile />;
      case 'achievements':
        return <Achievements />;
      case 'certifications':
        return <Certifications />;
      case 'resume':
        return <Resume />;
      case 'contact':
        return <Contact />;
      default:
        return (
          <>
            <Hero onNavigate={setActiveSection} />
            <About />
          </>
        );
    }
  }, [activeSection]);

  return (
    <div className="app-shell min-h-screen text-white">
      <CursorAura />
      <Navbar
        activeSection={activeSection}
        onNavigate={setActiveSection}
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === 'night' ? 'day' : 'night'))}
      />
      <main>{sectionView}</main>
      <footer className="border-t border-slate-800 bg-[#050505] py-10 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Anushka Surya - Portfolio</p>
        <p className="mt-2 text-xs text-slate-500">{new Date().getFullYear()} - Designed and built with React + Framer Motion</p>
      </footer>

      <ChatBot />
    </div>
  );
}

export default App;
