import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { TopNav } from '../../components/layout/TopNav';

export const DashboardLayout = () => {
  const location = useLocation();

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
    </div>
  );
};