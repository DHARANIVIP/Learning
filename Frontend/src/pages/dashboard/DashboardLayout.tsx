import React, { useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { TopNav } from '../../components/layout/TopNav';
import { AITutorPanel } from '../../components/roadmap/AITutorPanel';
import { Bot } from 'lucide-react';

export const DashboardLayout = () => {
  const location = useLocation();
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-bg text-neutral-text overflow-x-hidden selection:bg-neutral-accent selection:text-white">
      {/* Top Navigation */}
      <TopNav />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10 relative z-10 font-sans">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>

      {/* AI Tutor Floating Button */}
      <button 
        onClick={() => setIsAITutorOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-neutral-accent text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-40 group"
      >
        <Bot size={24} />
        <span className="absolute right-full mr-4 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Ask AI Tutor
        </span>
      </button>

      {/* AI Tutor Panel */}
      <AITutorPanel isOpen={isAITutorOpen} onClose={() => setIsAITutorOpen(false)} />
    </div>
  );
};