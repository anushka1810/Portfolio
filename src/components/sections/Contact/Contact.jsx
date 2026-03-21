import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { SiLinkedin, SiInstagram, SiWhatsapp } from 'react-icons/si';
import { useEmailJS } from '../../../hooks/useEmailJS';
import Button from '../../ui/Button';

const Contact = () => {
  const { sendEmail, submitting } = useEmailJS();
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const portfolioEmail = 'anushkasurya803@gmail.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await sendEmail(formData);
    if (result.success) {
      setStatus({ type: 'success', text: 'Message sent successfully!' });
      setFormData({ name: '', email: '', message: '' });
    } else if (result.errorType === 'activation_required') {
      setStatus({ type: 'error', text: 'First-time setup: apni inbox me FormSubmit activation mail ko verify karo, phir submit kaam karega.' });
    } else {
      setStatus({ type: 'error', text: 'Message send nahi hua. Internet/check karke dobara try karo.' });
    }
    setTimeout(() => setStatus(null), 5000);
  };

  const contacts = [
    {
      icon: <HiOutlineMail size={22} />,
      label: 'Email',
      value: portfolioEmail,
      href: `mailto:${portfolioEmail}?subject=${encodeURIComponent('Portfolio Inquiry')}`,
    },
    { icon: <HiOutlineLocationMarker size={22} />, label: 'Location', value: 'India (Open to Remote)', href: null },
    { icon: <SiWhatsapp size={22} />, label: 'WhatsApp', value: '+91 6394781101', href: 'https://wa.me/916394781101' },
    { icon: <SiLinkedin size={22} />, label: 'LinkedIn', value: 'anushka-surya-1223972a3', href: 'https://www.linkedin.com/in/anushka-surya-1223972a3/' },
    { icon: <SiInstagram size={22} />, label: 'Instagram', value: 'anushkasurya7', href: 'https://www.instagram.com/anushkasurya7/' },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-[#050505] text-white py-16">
      <div className="absolute top-[8%] left-[7%] h-44 w-44 rounded-full bg-[#2563eb]/20 blur-3xl" />
      <div className="absolute bottom-[8%] right-[7%] h-44 w-44 rounded-full bg-[#f59e0b]/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-[1450px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Contact</p>
            <h2 className="mt-2 text-4xl md:text-5xl font-black font-display text-white">Let's Work Together</h2>
          </div>
          <div className="h-[2px] w-24 bg-gradient-to-r from-[#2563eb] to-[#f59e0b] rounded-full" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="xl:col-span-5 rounded-3xl border border-slate-700 bg-slate-900/70 p-6 smooth-card">
            <p className="text-slate-300 leading-relaxed">
              Have a project idea, internship opportunity, or collaboration in mind? Drop a message and I will get back quickly.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contacts.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4 smooth-card">
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#2563eb]/20 text-[#2563eb]">{item.icon}</div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                      className="mt-1 block text-sm text-white hover:text-[#f59e0b] transition"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-white">{item.value}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="xl:col-span-7 rounded-3xl border border-slate-700 bg-slate-900/70 p-6 smooth-card">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.18em] text-slate-400 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-white focus:outline-none focus:border-[#f59e0b]"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.18em] text-slate-400 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-white focus:outline-none focus:border-[#f59e0b]"
                    placeholder="Your Email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-slate-400 mb-2">Message</label>
                <textarea
                  required
                  rows="6"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-white focus:outline-none focus:border-[#f59e0b] resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <Button type="submit" disabled={submitting} className="w-full !bg-[#2563eb] !border-[#2563eb] !shadow-none">
                {submitting ? 'Sending...' : 'Send Message'}
              </Button>

              {status && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-center font-medium ${
                    status.type === 'success'
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {status.text}
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
