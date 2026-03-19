import React from 'react';
import { motion } from 'framer-motion';

const MessageBubble = ({ message }) => {
  const isBot = message.sender === 'bot';

  // Convert simple markdown-like bold (**text**) to styled spans
  const formatText = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ fontWeight: 800 }}>{part.slice(2, -2)}</strong>;
      }
      // Preserve newlines
      return part.split('\n').map((line, j, arr) => (
        <React.Fragment key={`${i}-${j}`}>
          {line}
          {j < arr.length - 1 && <br />}
        </React.Fragment>
      ));
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, delay: 0.05, ease: 'easeOut' }}
      className={`flex items-start gap-2 mb-3 ${isBot ? '' : 'flex-row-reverse'}`}
    >
      {/* Avatar */}
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5 border-2 border-black"
        style={{
          background: isBot
            ? 'linear-gradient(135deg, #1A535C 0%, #F4C430 100%)'
            : 'linear-gradient(135deg, #E8699A 0%, #F4833D 100%)',
          fontSize: '14px',
        }}
      >
        {isBot ? '🤖' : '👤'}
      </div>

      {/* Message bubble */}
      <div
        className={`max-w-[75%] px-3.5 py-2.5 text-sm border-2 border-black leading-relaxed`}
        style={{
          borderRadius: isBot ? '1rem 1rem 1rem 0.2rem' : '1rem 1rem 0.2rem 1rem',
          background: isBot ? '#FFFFFF' : '#1A535C',
          color: isBot ? '#1A1A1A' : '#FFFFFF',
          boxShadow: '2px 2px 0px #1A1A1A',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '0.82rem',
          wordBreak: 'break-word',
        }}
      >
        {formatText(message.text)}
      </div>
    </motion.div>
  );
};

export default MessageBubble;
