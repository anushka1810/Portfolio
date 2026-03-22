import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CursorAura = () => {
  const dotRef = useRef(null);
  const auraRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const aura = auraRef.current;
    if (!dot || !aura) return;

    if (window.matchMedia('(pointer: coarse)').matches) return;

    const moveDotX = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3.out' });
    const moveDotY = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3.out' });
    const moveAuraX = gsap.quickTo(aura, 'x', { duration: 0.35, ease: 'power3.out' });
    const moveAuraY = gsap.quickTo(aura, 'y', { duration: 0.35, ease: 'power3.out' });

    const handleMouseMove = (event) => {
      moveDotX(event.clientX);
      moveDotY(event.clientY);
      moveAuraX(event.clientX);
      moveAuraY(event.clientY);
      dot.style.opacity = '1';
      aura.style.opacity = '1';
    };

    const handleMouseDown = () => {
      gsap.to(aura, { scale: 0.7, duration: 0.18, ease: 'power2.out' });
      gsap.to(dot, { scale: 0.85, duration: 0.18, ease: 'power2.out' });
    };

    const handleMouseUp = () => {
      gsap.to(aura, { scale: 1, duration: 0.22, ease: 'power2.out' });
      gsap.to(dot, { scale: 1, duration: 0.22, ease: 'power2.out' });
    };

    const handleMouseOver = (event) => {
      const interactive = event.target.closest('a, button, input, textarea, select, [role=\"button\"]');
      if (interactive) {
        gsap.to(aura, { scale: 1.55, opacity: 0.8, duration: 0.25, ease: 'power2.out' });
      } else {
        gsap.to(aura, { scale: 1, opacity: 0.6, duration: 0.25, ease: 'power2.out' });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div ref={auraRef} className="cursor-aura" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
};

export default CursorAura;
