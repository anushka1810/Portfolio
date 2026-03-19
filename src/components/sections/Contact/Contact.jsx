import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { SiLinkedin, SiInstagram, SiWhatsapp } from 'react-icons/si';
import { useEmailJS } from '../../../hooks/useEmailJS';
import Button from '../../ui/Button';
import BouncyText from '../../ui/BouncyText';

const Contact = () => {
    const { sendEmail, submitting } = useEmailJS();
    const [status, setStatus] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await sendEmail(formData);
        if (result.success) {
            setStatus('Message sent successfully! 🚀');
            setFormData({ name: '', email: '', message: '' });
        } else {
            setStatus('Something went wrong. Please try again.');
        }
        setTimeout(() => setStatus(null), 5000);
    };

    return (
        <section id="contact" className="py-10 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-black mb-5 text-text-primary">
                        <BouncyText text="Get In " />
                        <span className="highlight-pill-teal"><BouncyText text="Touch" colorOffset={7} /></span>
                    </h2>
                    <div className="section-divider" />
                </div>

                <div className="grid lg:grid-cols-2 gap-16">
                    <motion.div
                        initial={false}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-3xl font-display font-black text-text-primary mb-6">Let's build something <span className="text-accent-teal italic font-display">amazing</span> together</h3>
                        <p className="text-text-secondary text-lg mb-10 leading-relaxed">
                            Have a project in mind or just want to chat about tech?
                            Feel free to reach out. I'm always open to new opportunities
                            and collaborations.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-6 group">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-accent-teal group-hover:bg-accent-teal group-hover:text-white shadow-soft transition-all duration-300">
                                    <HiOutlineMail size={24} />
                                </div>
                                <div>
                                    <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest mb-1">Email Me</p>
                                    <a href="mailto:anujyadav992241@gmail.com" className="text-lg text-text-primary hover:text-accent-teal transition-colors font-bold font-display">
                                        anujyadav992241@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 group">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-white shadow-soft transition-all duration-300">
                                    <HiOutlineLocationMarker size={24} />
                                </div>
                                <div>
                                    <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest mb-1">Location</p>
                                    <p className="text-lg text-text-primary font-bold font-display">India (Open to Remote)</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 group">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white shadow-soft transition-all duration-300">
                                    <SiWhatsapp size={24} />
                                </div>
                                <div>
                                    <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest mb-1">WhatsApp</p>
                                    <a
                                        href="https://wa.me/919936992241"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-lg text-text-primary hover:text-[#25D366] transition-colors font-bold font-display"
                                    >
                                        +91 9936992241
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 group">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#0A66C2] group-hover:bg-[#0A66C2] group-hover:text-white shadow-soft transition-all duration-300">
                                    <SiLinkedin size={24} />
                                </div>
                                <div>
                                    <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest mb-1">LinkedIn</p>
                                    <a
                                        href="https://linkedin.com/in/anuj-yadav-158a47298"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-lg text-text-primary hover:text-[#0A66C2] transition-colors font-bold font-display"
                                    >
                                        anuj-yadav-158a47298
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 group">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#E4405F] group-hover:bg-[#E4405F] group-hover:text-white shadow-soft transition-all duration-300">
                                    <SiInstagram size={24} />
                                </div>
                                <div>
                                    <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest mb-1">Instagram</p>
                                    <a
                                        href="https://instagram.com/ig_anuj_18"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-lg text-text-primary hover:text-[#E4405F] transition-colors font-bold font-display"
                                    >
                                        ig_anuj_18
                                    </a>
                                </div>
                            </div>
                        </div>

                    </motion.div>

                    <motion.div
                        initial={false}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="card-premium border-black/5"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-text-secondary mb-3">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-bg-primary border border-black/5 rounded-2xl px-5 py-4 text-text-primary focus:outline-none focus:border-accent-teal focus:ring-4 focus:ring-accent-teal/5 transition-all"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-text-secondary mb-3">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-bg-primary border border-black/5 rounded-2xl px-5 py-4 text-text-primary focus:outline-none focus:border-accent-teal focus:ring-4 focus:ring-accent-teal/5 transition-all"
                                    placeholder="Your Email"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-text-secondary mb-3">Message</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-bg-primary border border-black/5 rounded-2xl px-5 py-4 text-text-primary focus:outline-none focus:border-accent-teal focus:ring-4 focus:ring-accent-teal/5 transition-all resize-none"
                                    placeholder="Tell me about your project..."
                                ></textarea>
                            </div>

                            <Button type="submit" disabled={submitting} className="w-full">
                                {submitting ? 'Sending...' : 'Send Message'}
                            </Button>

                            {status && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className={`text-center font-medium ${status.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}
                                >
                                    {status}
                                </motion.p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
