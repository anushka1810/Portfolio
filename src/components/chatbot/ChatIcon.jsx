import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Chat bubble SVG icon
const ChatBubbleIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="10" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
  </svg>
);

// Close X icon
const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChatIcon = ({ isOpen, hasInteracted, onClick }) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, type: 'spring', damping: 18, stiffness: 200 }}
    >
      {/* Pulse ring — only shows before first interaction */}
      {!hasInteracted && (
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: '#1A535C' }}
          animate={{ scale: [1, 1.6, 1.6], opacity: [0.6, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
      )}

      {/* Tooltip label — only visible before first interaction & when chat is closed */}
      {!hasInteracted && !isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.4 }}
          className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-full border-2 border-black text-xs font-bold pointer-events-none"
          style={{
            background: '#F4C430',
            boxShadow: '2px 2px 0px #1A1A1A',
            fontFamily: "'Outfit', sans-serif",
            color: '#1A1A1A',
          }}
        >
          Ask me anything! 👋
          {/* Arrow pointing right */}
          <span
            className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-transparent border-b-transparent"
            style={{
              borderTop: '6px solid transparent',
              borderBottom: '6px solid transparent',
              borderLeft: '8px solid #1A1A1A',
            }}
          />
        </motion.div>
      )}

      {/* Main FAB button */}
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.93 }}
        className="w-14 h-14 rounded-full border-2 border-black flex items-center justify-center cursor-pointer relative overflow-hidden"
        style={{
          background: isOpen
            ? 'linear-gradient(135deg, #E85D4A 0%, #E8699A 100%)'
            : 'linear-gradient(135deg, #1A535C 0%, #F4C430 100%)',
          boxShadow: '4px 4px 0px #1A1A1A',
          color: '#FFFFFF',
          transition: 'background 0.3s ease',
        }}
        aria-label={isOpen ? 'Close chat' : "Open chat with Anushka's assistant"}
        title={isOpen ? 'Close chat' : "Chat with Anushka's assistant"}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={isOpen ? 'close' : 'open'}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <CloseIcon /> : <ChatBubbleIcon />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

export default ChatIcon;
