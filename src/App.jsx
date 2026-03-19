import React from 'react';
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
import PageTransition from './components/layout/PageTransition';
import ChatBot from './components/chatbot/ChatBot';


function App() {
  return (
    <PageTransition>
      <div className="bg-bg-primary min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <DSAProfile />
          <Achievements />
          <Certifications />
          <Resume />
          <Contact />
        </main>
        <footer
          className="py-10 pb-12 text-center border-t-2 border-black/10 bg-white"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          <div className="flex items-center justify-center gap-3 mb-1">
            <span className="text-accent-gold text-xl">★</span>
            <p className="font-black text-sm uppercase tracking-widest text-text-primary">
              Anuj Yadav · Portfolio
            </p>
            <span className="text-accent-gold text-xl">★</span>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            © {new Date().getFullYear()} Built with ❤️ &amp; lots of coffee.
          </p>
        </footer>

        {/* Floating CV Chatbot — always visible above all content */}
        <ChatBot />

      </div>
    </PageTransition>
  );
}

export default App;
