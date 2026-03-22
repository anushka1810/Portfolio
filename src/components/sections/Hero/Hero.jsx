import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SiLinkedin, SiInstagram, SiGithub } from 'react-icons/si';
import { HiOutlineBriefcase, HiOutlineLightningBolt, HiOutlineSparkles, HiOutlineCode } from 'react-icons/hi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ onNavigate = () => {} }) => {
  const heroRef = useRef(null);
  const avatarCardRef = useRef(null);
  const avatarRingRef = useRef(null);
  const avatarImageRef = useRef(null);
  const dotRef1 = useRef(null);
  const dotRef2 = useRef(null);
  const dotRef3 = useRef(null);
  const candleFlameRef = useRef(null);
  const statRefs = useRef([]);
  const primaryBtnRef = useRef(null);
  const secondaryBtnRef = useRef(null);

  const lineMotion = {
    hidden: { opacity: 0, y: 22, filter: 'blur(10px)' },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  const stats = [
    { label: 'Projects', value: 5, suffix: '+' },
    { label: 'DSA Solved', value: 550, suffix: '+' },
    { label: 'CGPA', value: 8.85, decimals: 2 },
    { label: 'Certificates', value: 10, suffix: '+' },
  ];

  const strengths = [
    { icon: HiOutlineBriefcase, title: 'Full Stack Delivery', text: 'From UI to APIs, database design, and deployment.' },
    { icon: HiOutlineLightningBolt, title: 'Performance Mindset', text: 'Clean architecture, optimized rendering, faster load times.' },
    { icon: HiOutlineSparkles, title: 'AI-Ready Products', text: 'Building practical integrations with modern AI workflows.' },
  ];

  useEffect(() => {
    const card = avatarCardRef.current;
    const ring = avatarRingRef.current;
    const image = avatarImageRef.current;
    const d1 = dotRef1.current;
    const d2 = dotRef2.current;
    const d3 = dotRef3.current;
    const flame = candleFlameRef.current;
    const heroEl = heroRef.current;

    if (!card || !ring || !image || !heroEl || !flame) return;

    const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
    floatTl.to(card, { y: -10, duration: 2.4, ease: 'sine.inOut' });

    gsap.to(ring, { rotate: 360, duration: 18, ease: 'none', repeat: -1 });
    gsap.to([d1, d2, d3], {
      scale: 1.25,
      opacity: 1,
      duration: 1.4,
      yoyo: true,
      repeat: -1,
      stagger: 0.22,
      ease: 'sine.inOut',
    });

    const moveFlameX = gsap.quickTo(flame, 'x', { duration: 0.22, ease: 'power3.out' });
    const moveFlameY = gsap.quickTo(flame, 'y', { duration: 0.22, ease: 'power3.out' });

    const setSpot = (x, y) => {
      heroEl.style.setProperty('--mx', `${x}px`);
      heroEl.style.setProperty('--my', `${y}px`);
      moveFlameX(x);
      moveFlameY(y);
    };

    const rect0 = heroEl.getBoundingClientRect();
    setSpot(rect0.width * 0.5, rect0.height * 0.45);

    const handleMouseMove = (event) => {
      const rect = heroEl.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      gsap.to(image, { x: relX * 14, y: relY * 14, duration: 0.55, ease: 'power2.out' });
      gsap.to(card, { x: relX * 8, y: relY * 8, duration: 0.55, ease: 'power2.out' });
      setSpot(x, y);
    };

    const handleMouseLeave = () => {
      const rect = heroEl.getBoundingClientRect();
      gsap.to(image, { x: 0, y: 0, duration: 0.6, ease: 'power2.out' });
      gsap.to(card, { x: 0, y: 0, duration: 0.6, ease: 'power2.out' });
      setSpot(rect.width * 0.5, rect.height * 0.45);
    };

    heroEl.addEventListener('mousemove', handleMouseMove);
    heroEl.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      floatTl.kill();
      gsap.killTweensOf([card, ring, image, d1, d2, d3]);
      heroEl.removeEventListener('mousemove', handleMouseMove);
      heroEl.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const formatStat = (value, suffix = '', decimals = 0) => `${Number(value).toFixed(decimals)}${suffix}`;

    const trigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        stats.forEach((stat, index) => {
          const el = statRefs.current[index];
          if (!el) return;

          const data = { value: 0 };
          gsap.to(data, {
            value: stat.value,
            duration: 1.2 + index * 0.1,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = formatStat(data.value, stat.suffix || '', stat.decimals || 0);
            },
          });
        });
      },
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    const setupMagnetic = (button, strength = 12) => {
      if (!button) return () => {};

      const onMove = (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        gsap.to(button, { x: x * (strength / 100), y: y * (strength / 100), duration: 0.25, ease: 'power2.out' });
      };

      const onLeave = () => {
        gsap.to(button, { x: 0, y: 0, duration: 0.35, ease: 'power2.out' });
      };

      button.addEventListener('mousemove', onMove);
      button.addEventListener('mouseleave', onLeave);

      return () => {
        button.removeEventListener('mousemove', onMove);
        button.removeEventListener('mouseleave', onLeave);
      };
    };

    const cleanupPrimary = setupMagnetic(primaryBtnRef.current, 14);
    const cleanupSecondary = setupMagnetic(secondaryBtnRef.current, 10);

    return () => {
      cleanupPrimary();
      cleanupSecondary();
    };
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative overflow-hidden bg-[#04111d] text-white pt-28 pb-16 md:pb-20">
      <div className="absolute top-[6%] left-[8%] h-64 w-64 rounded-full bg-[#06b6d4]/18 blur-3xl" />
      <div className="absolute bottom-[10%] right-[8%] h-64 w-64 rounded-full bg-[#22c55e]/14 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #67e8f9 1px, transparent 0)', backgroundSize: '22px 22px' }}
      />
      <div className="candle-veil absolute inset-0 z-[1] pointer-events-none" />
      <div ref={candleFlameRef} className="candle-flame absolute left-0 top-0 z-[2] pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-[1450px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-10 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="xl:col-span-8 rounded-3xl border border-cyan-900/40 bg-[#071827]/80 p-6 md:p-8"
          >
            <div className="inline-flex items-center rounded-full border border-cyan-800/50 bg-cyan-950/40 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-cyan-100">
              Full Stack Developer | DSA Enthusiast
            </div>

            <h1 className="mt-6 text-4xl md:text-6xl font-black leading-[1.02] text-white hero-title">
              <motion.span initial="hidden" animate="visible" custom={0.08} variants={lineMotion} className="animista-clone" data-text="Crafting Impactful" style={{ '--delay': '80ms' }}>
                Crafting Impactful
              </motion.span>
              <motion.span initial="hidden" animate="visible" custom={0.24} variants={lineMotion} className="animista-clone animista-clone-accent" data-text="Full Stack" style={{ '--delay': '260ms' }}>
                Full Stack
              </motion.span>
              <motion.span initial="hidden" animate="visible" custom={0.4} variants={lineMotion} className="animista-clone animista-clone-line" data-text="Web Products" style={{ '--delay': '440ms' }}>
                Web Products
              </motion.span>
            </h1>

            <p className="mt-5 max-w-2xl text-base md:text-lg text-slate-300 leading-relaxed">
              I am a B.Tech CSE student at LPU (CGPA 8.85), building production-ready full stack apps and solving 550+ DSA problems across coding platforms.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                ref={primaryBtnRef}
                onClick={() => onNavigate('projects')}
                className="rounded-xl bg-[#0891b2] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0e7490] transition"
              >
                View Projects
              </button>
              <button
                type="button"
                ref={secondaryBtnRef}
                onClick={() => onNavigate('contact')}
                className="rounded-xl border border-cyan-900/50 bg-cyan-950/30 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-900/35 transition"
              >
                Contact Me
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
              {stats.map((item, index) => (
                <div key={item.label} className="rounded-2xl border border-cyan-900/35 bg-[#061726]/80 p-4">
                  <p ref={(el) => { statRefs.current[index] = el; }} className="text-xl font-bold text-white">{`${item.value.toFixed(item.decimals || 0)}${item.suffix || ''}`}</p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-300 mt-1">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3 text-slate-300">
              {[{ Icon: SiLinkedin, href: 'https://www.linkedin.com/in/anushka-surya-1223972a3/' }, { Icon: SiInstagram, href: 'https://www.instagram.com/anushkasurya7/' }, { Icon: SiGithub, href: 'https://github.com/anushka1810' }].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-900/50 bg-cyan-950/20 hover:border-cyan-400 transition">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="xl:col-span-4 h-full"
          >
            <div className="h-full rounded-3xl border border-cyan-900/40 bg-[#071827]/80 p-5 md:p-6">
              <div className="mx-auto w-fit">
                <div ref={avatarCardRef} className="relative h-60 w-60 md:h-64 md:w-64">
                  <div ref={avatarRingRef} className="absolute inset-0 rounded-full border border-cyan-300/30" style={{ borderStyle: 'dashed' }} />
                  <span ref={dotRef1} className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-300/90 opacity-70" />
                  <span ref={dotRef2} className="absolute top-1/2 -right-1 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-emerald-300/90 opacity-70" />
                  <span ref={dotRef3} className="absolute -bottom-1 left-1/3 h-2.5 w-2.5 rounded-full bg-sky-300/90 opacity-70" />

                  <div className="absolute inset-[10px] rounded-full p-[6px] bg-gradient-to-br from-cyan-400 via-teal-400 to-emerald-400 shadow-[0_0_50px_rgba(45,212,191,0.25)]">
                    <img
                      ref={avatarImageRef}
                      src="/assets/anushka.jpg"
                      alt="Anushka Surya"
                      className="h-full w-full rounded-full object-cover object-top border-4 border-[#04111d]"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-lg font-display font-bold text-white">Professional Highlights</h3>
                <div className="mt-3 space-y-3">
                  {strengths.map((item) => (
                    <div key={item.title} className="rounded-xl border border-cyan-900/35 bg-[#061726]/80 p-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-300">
                          <item.icon size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{item.title}</p>
                          <p className="mt-1 text-xs text-slate-300 leading-relaxed">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200 flex items-center gap-2">
                <HiOutlineCode size={14} />
                Open to internships and full stack development opportunities.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
