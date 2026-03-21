import React from 'react';
import { motion } from 'framer-motion';

const QUICK_REPLIES = [
  "What are Anushka's skills? 💻",
  "Show me her projects 🚀",
  "What are her achievements? 🏆",
  "Her certifications 📜",
  "How to contact her? 📬",
  "Tell me about Nivana 🧘",
  "Her education 🎓",
  "DSA profiles 📊",
];

const QuickReplies = ({ onSelect }) => {
  return (
    <div className="px-3 py-2">
      <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#4A4A4A', fontFamily: "'Outfit', sans-serif" }}>
        💡 Quick Questions
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin" style={{ scrollbarWidth: 'none' }}>
        {QUICK_REPLIES.map((reply, index) => (
          <motion.button
            key={index}
            onClick={() => onSelect(reply)}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border-2 border-black cursor-pointer transition-all"
            style={{
              background: index % 4 === 0 ? '#F4C430' :
                         index % 4 === 1 ? '#1A535C' :
                         index % 4 === 2 ? '#E8699A' : '#FAF7F0',
              color: index % 4 === 1 ? '#FFFFFF' : '#1A1A1A',
              boxShadow: '2px 2px 0px #1A1A1A',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {reply}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuickReplies;
