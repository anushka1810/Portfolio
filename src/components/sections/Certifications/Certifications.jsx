import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CertificateModal from './CertificateModal';
import { HiOutlineEye, HiOutlineDocumentText } from 'react-icons/hi';
import { profile } from '../../../data/profile';

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [pinnedCard, setPinnedCard] = useState(null);

  const togglePinnedCard = (idx) => {
    setPinnedCard((prev) => (prev === idx ? null : idx));
  };

  const isImageSource = (src = '') => /\.(png|jpe?g|webp|gif)$/i.test(src);
  const isPdfSource = (src = '') => /\.pdf($|\?)/i.test(src);
  const getPdfPreviewUrl = (src = '') => `${encodeURI(src)}#view=FitH`;

  return (
    <section id="certifications" className="relative overflow-hidden bg-[#050505] text-white py-16">
      <div className="absolute top-[8%] left-[7%] h-44 w-44 rounded-full bg-[#2563eb]/20 blur-3xl" />
      <div className="absolute bottom-[8%] right-[7%] h-44 w-44 rounded-full bg-[#f59e0b]/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-[1450px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Credentials</p>
            <h2 className="mt-2 text-4xl md:text-5xl font-black font-display text-white">Certifications</h2>
          </div>
          <div className="h-[2px] w-24 bg-gradient-to-r from-[#2563eb] to-[#f59e0b] rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {profile.certifications.map((cert, idx) => {
            const isFlipped = pinnedCard === idx || hoveredCard === idx;
            const desc = cert.description || 'Verified certification showcasing practical problem-solving and technical learning outcomes.';
            const skillList = cert.skills || ['Problem Solving', 'Development'];

            return (
              <motion.article
                key={cert.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                className="[perspective:1400px] smooth-card"
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <button type="button" onClick={() => togglePinnedCard(idx)} className="w-full text-left">
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.65, ease: 'easeInOut' }}
                    className="relative h-[440px] w-full [transform-style:preserve-3d]"
                  >
                    <div className="absolute inset-0 rounded-3xl border border-slate-700 bg-slate-900/70 overflow-hidden [backface-visibility:hidden]">
                      <div className="h-1/2 relative border-b border-slate-700 overflow-hidden">
                        {cert.image && isImageSource(cert.image) ? (
                          <img src={cert.image} alt={cert.title} className="h-full w-full object-cover" />
                        ) : cert.url && isImageSource(cert.url) ? (
                          <img src={cert.url} alt={cert.title} className="h-full w-full object-cover" />
                        ) : cert.url && isPdfSource(cert.url) ? (
                          <iframe
                            src={getPdfPreviewUrl(cert.url)}
                            title={`${cert.title} preview`}
                            className="h-full w-full bg-white"
                          />
                        ) : (
                          <>
                            <div
                              className="absolute inset-0"
                              style={{ background: `linear-gradient(135deg, ${cert.color} 0%, #1e1b4b 85%)` }}
                            />
                            <div className="relative z-10 h-full p-5 flex flex-col justify-between">
                              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-black/30 text-white">
                                <HiOutlineDocumentText size={20} />
                              </div>
                              <p className="text-xs uppercase tracking-[0.2em] text-white/80">Certificate Preview</p>
                            </div>
                          </>
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                      <div className="h-1/2 p-4 flex flex-col">
                        <h3 className="text-xl font-display font-black text-[#60a5fa] leading-tight">{cert.title}</h3>
                        <p className="mt-2 text-slate-300 leading-relaxed text-xs line-clamp-3">{desc}</p>
                        <div className="mt-auto flex items-center justify-between text-xs text-slate-400">
                          <span>{cert.issuer}</span>
                          <span>{cert.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 rounded-3xl border border-[#6366f1] bg-[#262b72] p-4 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col">
                      <h3 className="text-2xl font-display font-black text-white leading-tight">{cert.title}</h3>

                      <div className="mt-3 space-y-2 text-white">
                        <p className="text-base"><span className="text-[#a5b4fc]">Issued by:</span> {cert.issuer}</p>
                        <p className="text-base"><span className="text-[#a5b4fc]">Date:</span> {cert.date}</p>
                      </div>

                      <div className="mt-3">
                        <p className="text-sm text-[#a5b4fc] mb-2">Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {skillList.map((skill) => (
                            <span key={skill} className="rounded-lg bg-indigo-500/30 border border-indigo-400/40 px-2.5 py-1 text-xs text-indigo-100">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCert(cert);
                        }}
                        className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white text-[#1f2a6f] px-3 py-2 text-sm font-semibold hover:opacity-90 transition"
                      >
                        <HiOutlineEye />
                        View Certificate
                      </button>
                    </div>
                  </motion.div>
                </button>

                <p className="mt-3 text-center text-sm text-slate-400">Hover or tap to view details</p>
              </motion.article>
            );
          })}
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
