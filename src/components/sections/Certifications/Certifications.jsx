import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BouncyText from '../../ui/BouncyText';
import CertificateModal from './CertificateModal';
import { HiOutlineAcademicCap, HiOutlineEye } from 'react-icons/hi';

import { profile } from '../../../data/profile';

const Certifications = () => {
    const [selectedCert, setSelectedCert] = useState(null);

    return (
        <section id="certifications" className="py-10 relative overflow-hidden bg-[#FAF7F0]">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-black mb-5 text-text-primary">
                        <BouncyText text="My " />
                        <span className="highlight-pill-orange"><BouncyText text="Certifications" colorOffset={3} /></span>
                    </h2>
                    <div className="section-divider" />
                    <p className="max-w-xl mx-auto text-text-secondary font-medium text-lg mt-6">
                        Validation of my skills and continuous learning journey through industry-recognized certifications.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {profile.certifications.map((cert, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative h-[320px] group [perspective:1200px]"
                        >
                            <div className="cert-flip-card">
                                {/* Front */}
                                <div
                                    className="cert-face bg-white rounded-[2rem] p-8 border-[3px] border-[#1A1A1A] relative"
                                    style={{ boxShadow: `8px 8px 0px ${cert.color}` }}
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div
                                            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white border-2 border-black shadow-[3px 3px 0px #1A1A1A]"
                                            style={{ background: cert.color }}
                                        >
                                            <HiOutlineAcademicCap size={24} />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary opacity-50">
                                            {cert.date}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-black text-text-primary mb-2 uppercase tracking-tight leading-tight">
                                        {cert.title}
                                    </h3>
                                    <p className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-8 opacity-70">
                                        {cert.issuer}
                                    </p>

                                    <button
                                        onClick={() => setSelectedCert(cert)}
                                        className="inline-flex items-center gap-2 font-black text-xs uppercase tracking-widest px-5 py-2.5 bg-white border-2 border-black rounded-xl transition-all hover:bg-black hover:text-white shadow-[4px 4px 0px #1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                                    >
                                        <HiOutlineEye size={16} />
                                        View Certificate
                                    </button>

                                    <div
                                        className="absolute bottom-4 right-4 w-12 h-12 rounded-full opacity-[0.03] transition-opacity"
                                        style={{ background: cert.color }}
                                    />
                                </div>

                                {/* Back */}
                                <div
                                    className="cert-face cert-back rounded-[2rem] p-8 border-[3px] border-[#1A1A1A] text-white"
                                    style={{
                                        background: `linear-gradient(135deg, ${cert.color} 0%, #1A1A1A 120%)`,
                                        boxShadow: `8px 8px 0px #1A1A1A`,
                                    }}
                                >
                                    <h3 className="text-xl font-black mb-2 uppercase tracking-tight">{cert.title}</h3>
                                    <div className="text-xs font-black uppercase tracking-[0.2em] opacity-80 mb-5">
                                        Issued By
                                    </div>
                                    <div className="text-lg font-black mb-4">{cert.issuer}</div>
                                    <div className="text-xs font-black uppercase tracking-[0.2em] opacity-80 mb-2">
                                        Date
                                    </div>
                                    <div className="text-sm font-bold mb-8">{cert.date}</div>

                                    <button
                                        onClick={() => setSelectedCert(cert)}
                                        className="w-full inline-flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest px-5 py-3 bg-white text-black border-2 border-black rounded-xl shadow-[4px 4px 0px #000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                                    >
                                        <HiOutlineEye size={16} />
                                        View Certificate
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <CertificateModal
                isOpen={!!selectedCert}
                onClose={() => setSelectedCert(null)}
                certUrl={selectedCert?.url}
                certTitle={selectedCert?.title}
            />
        </section>
    );
};

export default Certifications;
