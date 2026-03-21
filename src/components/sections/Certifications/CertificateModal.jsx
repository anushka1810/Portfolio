import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';

const CertificateModal = ({ isOpen, onClose, certUrl, certTitle }) => {
    const safeCertUrl = certUrl ? encodeURI(certUrl) : '';
    const isImageSource = (src = '') => /\.(png|jpe?g|webp|gif)$/i.test(src);
    const isPdfSource = (src = '') => /\.pdf($|\?)/i.test(src);
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop with Blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-white w-full max-w-5xl h-[90vh] rounded-3xl overflow-hidden border-4 border-black shadow-[15px 15px 0px #1A535C] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b-2 border-black/10 bg-bg-primary">
                            <h3 className="text-xl font-black text-text-primary uppercase tracking-wider">
                                {certTitle}
                            </h3>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-white border-2 border-black flex items-center justify-center text-text-primary hover:bg-accent-coral hover:text-white transition-all shadow-[2px 2px 0px #1A1A1A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                            >
                                <HiX size={20} />
                            </button>
                        </div>

                        {/* Viewer */}
                        <div className="flex-1 bg-gray-200 overflow-hidden p-4 md:p-6 flex justify-center items-center">
                            {isImageSource(safeCertUrl) ? (
                                <img
                                    src={safeCertUrl}
                                    alt={certTitle}
                                    className="max-h-full w-auto max-w-full rounded-sm border-2 border-black/10 bg-white shadow-2xl object-contain"
                                />
                            ) : (
                                <iframe
                                    src={`${safeCertUrl}${isPdfSource(safeCertUrl) ? '#view=FitH&zoom=page-fit&navpanes=0&toolbar=0&scrollbar=0' : ''}`}
                                    title={certTitle}
                                    className="w-full h-full rounded-sm border-2 border-black/10 bg-white shadow-2xl"
                                />
                            )}
                        </div>

                        {/* Footer / Caption */}
                        <div className="p-4 text-center bg-white border-t-2 border-black/10">
                            <p className="text-xs font-bold text-text-secondary uppercase tracking-[0.2em]">
                                Digital Certification — Authentic Copy
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CertificateModal;

