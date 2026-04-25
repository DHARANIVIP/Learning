import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Mic, Sparkles, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const QUICK_SUGGESTIONS = [
  "Suggest Career Path",
  "Find Courses",
  "Take Skill Quiz"
];

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Hi! I can help you choose your learning path. Ask me anything.",
      sender: 'bot'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const newUserMsg: Message = { id: Date.now().toString(), text, sender: 'user' };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // Mock API response
    setTimeout(() => {
      let botReply = "I'm not sure about that. Try asking about skills, courses, or career paths!";
      const lowerText = text.toLowerCase();

      if (lowerText.includes('skill')) {
        botReply = "I can analyze your current skills and suggest a personalized learning path to bridge your knowledge gaps. Would you like to take a quick skill assessment?";
      } else if (lowerText.includes('course')) {
        botReply = "We offer a wide range of skill-based courses tailored exactly to industry standards. Let me know which domain interests you!";
      } else if (lowerText.includes('career')) {
        botReply = "Based on current market trends, AI, Data Science, and Full Stack Development are great career paths. I can help map out a journey for any of these roles.";
      }

      setMessages(prev => [...prev, { id: Date.now().toString() + 'bot', text: botReply, sender: 'bot' }]);
      setIsTyping(false);
    }, 1500); // 1.5s typing delay
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[90vw] md:w-96 flex flex-col overflow-hidden rounded-[20px] border border-[#e5e7eb] bg-white backdrop-blur-md shadow-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#e5e7eb] bg-white px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-900 border border-gray-200">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#111827]">AI Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]"></span>
                    </span>
                    <span className="text-xs text-gray-500 font-medium">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex h-96 flex-col overflow-y-auto p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200">
              <div className="flex flex-col gap-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex max-w-[85%] items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${msg.sender === 'user' ? 'bg-gray-100 text-gray-900 border border-gray-200' : 'bg-gray-100 text-gray-900 border border-gray-200'}`}>
                        {msg.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                      </div>
                      <div
                        className={`rounded-2xl px-3 py-2 text-[13px] leading-relaxed shadow-sm ${
                          msg.sender === 'user'
                            ? 'bg-black text-white rounded-br-none'
                            : 'bg-[#f3f4f6] text-[#111827] rounded-bl-none border border-[#e5e7eb]'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex max-w-[85%] items-end gap-2 flex-row">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-900 border border-gray-200">
                        <Bot size={12} />
                      </div>
                      <div className="rounded-2xl rounded-bl-none bg-[#f3f4f6] px-4 py-3 shadow-sm border border-[#e5e7eb] flex items-center justify-center">
                        <div className="flex gap-1">
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 animation-delay-100"></span>
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 animation-delay-200"></span>
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 animation-delay-300"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestions */}
              {messages.length === 1 && !isTyping && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {QUICK_SUGGESTIONS.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(suggestion)}
                      className="flex items-center gap-1.5 rounded-full border border-[#d1d5db] bg-transparent px-3 py-1.5 text-xs text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                    >
                      <Sparkles size={12} />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input Section */}
            <div className="border-t border-[#e5e7eb] bg-white p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-2 py-1.5 focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-100 transition-all"
              >
                <button
                  type="button"
                  className="p-1.5 text-gray-400 transition-colors hover:text-black rounded-full"
                  title="Voice input"
                >
                  <Mic size={16} />
                </button>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent px-1 py-1 text-[13px] outline-none text-gray-900 placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="rounded-full bg-black p-1.5 text-white transition-all hover:bg-gray-800 disabled:opacity-50 disabled:hover:bg-black"
                >
                  <Send size={16} className="translate-x-[1px] translate-y-[0px]" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-md hover:shadow-lg transition-all focus:outline-none"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageSquare size={24} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Notification Badge */}
        {!isOpen && (
          <span className="absolute right-0 top-0 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white bg-red-500"></span>
        )}
      </motion.button>
    </div>
  );
};
