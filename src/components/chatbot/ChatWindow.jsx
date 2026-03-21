import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MessageList from './MessageList';
import QuickReplies from './QuickReplies';

// Paper plane send icon
const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

// Close X icon
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Trash / clear icon
const TrashIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

const ChatWindow = ({ messages, isTyping, inputValue, setInputValue, onSend, onClose, onClear }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSend(inputValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim()) onSend(inputValue);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 30 }}
      transition={{ type: 'spring', damping: 22, stiffness: 300 }}
      className="fixed bottom-6 right-4 z-[9999] flex flex-col"
      style={{
        width: 'min(380px, calc(100vw - 2rem))',
        height: 'min(520px, calc(100vh - 120px))',
        background: '#FAF7F0',
        border: '2.5px solid #1A1A1A',
        borderRadius: '1.25rem',
        boxShadow: '6px 6px 0px #1A535C',
        overflow: 'hidden',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* ── Header ── */}
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0 border-b-2 border-black"
        style={{ background: '#1A535C' }}
      >
        <div className="flex items-center gap-2.5">
          {/* Bot avatar */}
          <div
            className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center text-base flex-shrink-0"
            style={{ background: '#F4C430', boxShadow: '2px 2px 0px #1A1A1A' }}
          >
            🤖
          </div>
          <div>
            <p className="font-black text-white text-sm leading-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Ask about Anushka's CV
            </p>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-300 font-semibold">Online · Always available</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Clear chat button */}
          <motion.button
            onClick={onClear}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-7 h-7 rounded-full border-2 border-white/40 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-colors"
            title="Clear chat"
          >
            <TrashIcon />
          </motion.button>

          {/* Close button */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-accent-teal transition-colors"
            style={{ boxShadow: '1px 1px 0px #1A1A1A' }}
            title="Close"
          >
            <CloseIcon />
          </motion.button>
        </div>
      </div>

      {/* ── Messages ── */}
      <MessageList messages={messages} isTyping={isTyping} />

      {/* ── Quick Replies ── */}
      <div className="flex-shrink-0 border-t border-black/10">
        <QuickReplies onSelect={onSend} />
      </div>

      {/* ── Input footer ── */}
      <form
        onSubmit={handleSubmit}
        className="flex-shrink-0 flex items-center gap-2 px-3 py-3 border-t-2 border-black"
        style={{ background: '#FFFFFF' }}
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about Anushka..."
          maxLength={200}
          className="flex-1 px-3.5 py-2 text-sm rounded-full outline-none border-2 border-black"
          style={{
            background: '#FAF7F0',
            color: '#1A1A1A',
            fontFamily: "'Outfit', sans-serif",
            boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.06)',
          }}
        />
        <motion.button
          type="submit"
          disabled={!inputValue.trim()}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: inputValue.trim() ? '#1A535C' : '#D1D5DB',
            color: '#FFFFFF',
            boxShadow: inputValue.trim() ? '2px 2px 0px #1A1A1A' : 'none',
          }}
        >
          <SendIcon />
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ChatWindow;
