import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const AnimatedCounter = ({ value, duration = 2, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const [ref, inView] = useInView({ triggerOnce: true });

    useEffect(() => {
        if (inView) {
            let start = 0;
            const end = parseInt(value);
            if (start === end) return;

            let totalMiliseconds = duration * 1000;
            let incrementTime = totalMiliseconds / end;

            let timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start === end) clearInterval(timer);
            }, incrementTime);
        }
    }, [inView, value, duration]);

    return (
        <span ref={ref} className="text-3xl md:text-5xl font-black text-text-primary">
            {count}{suffix}
        </span>
    );
};

export default AnimatedCounter;
