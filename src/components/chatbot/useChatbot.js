import { useState, useCallback, useRef } from 'react';
import { profile } from '../../data/profile';
import { findAnswer } from './matcher';

const INITIAL_MESSAGE = {
  id: 1,
  text: `👋 Hi! I'm Anushka's virtual assistant. I can answer questions about her skills, projects, education, certifications, and more!\n\nWhat would you like to know?`,
  sender: 'bot',
  timestamp: new Date()
};

export const useChatbot = () => {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const typingTimeoutRef = useRef(null);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setHasInteracted(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => {
      if (!prev) setHasInteracted(true);
      return !prev;
    });
  }, []);

  const sendMessage = useCallback((userMessage) => {
    const trimmedMessage = userMessage.trim();
    if (!trimmedMessage) return;

    const userMsg = {
      id: Date.now(),
      text: trimmedMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Clear any existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Simulate typing delay (400–900ms)
    const delay = 400 + Math.random() * 500;
    typingTimeoutRef.current = setTimeout(() => {
      const botReply = findAnswer(trimmedMessage, profile);
      const botMsg = {
        id: Date.now() + 1,
        text: botReply,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, delay);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([INITIAL_MESSAGE]);
  }, []);

  return {
    messages,
    isOpen,
    isTyping,
    inputValue,
    hasInteracted,
    setInputValue,
    openChat,
    closeChat,
    toggleChat,
    sendMessage,
    clearMessages
  };
};
