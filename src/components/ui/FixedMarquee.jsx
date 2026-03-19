import React from 'react';

const FixedMarquee = () => {
    return (
        <div
            className="relative z-[100] w-full overflow-hidden py-3 bg-accent-teal border-t-4 border-black border-b-0"
            style={{
                boxShadow: "0 -10px 30px rgba(0,0,0,0.1)",
                // background: "#1A535C"
            }}
        >
            <div className="flex animate-marquee whitespace-nowrap">
                {Array(6).fill(null).map((_, i) => (
                    <span key={i} className="mx-8 text-white font-black text-[12px] uppercase tracking-[0.2em] inline-flex items-center gap-6">
                        MERN Stack Developer
                        <span className="text-accent-gold text-xl">✦</span>
                        DSA Expert · 700+ Problems
                        <span className="text-accent-gold text-xl">✦</span>
                        Open to Work
                        <span className="text-accent-gold text-xl">✦</span>
                        React · Node.js · MongoDB
                        <span className="text-accent-gold text-xl">✦</span>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default FixedMarquee;
