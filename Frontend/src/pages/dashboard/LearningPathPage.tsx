import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, PenTool, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  'All Roadmaps',
  'Absolute Beginners',
  'Web Development',
  'Frameworks',
  'Languages / Platforms',
  'AI & Machine Learning',
  'DevOps',
  'Mobile Development',
  'Databases'
];

const newRoadmaps = [
  { title: 'OpenClaw', isBookmarked: false },
  { title: 'LeetCode', isBookmarked: false },
];

const roleBasedRoadmaps = [
  { title: 'Frontend', isBookmarked: false },
  { title: 'Backend', isBookmarked: false },
  { title: 'Full Stack', isBookmarked: true },
  { title: 'DevOps', isBookmarked: false },
  { title: 'DevSecOps', isBookmarked: false },
  { title: 'Data Analyst', isBookmarked: false },
  { title: 'AI Engineer', isBookmarked: false },
  { title: 'AI and Data Scientist', isBookmarked: false },
];

export const LearningPathPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All Roadmaps');

  const RoadmapCard = ({ title, isBookmarked }: { title: string, isBookmarked?: boolean }) => (
    <div 
      onClick={() => navigate('/dashboard/path/detail')}
      className="p-4 rounded-xl border border-neutral-secondary/30 bg-neutral-bg/50 hover:border-neutral-accent hover:shadow-md transition-all cursor-pointer flex justify-between items-center group shadow-sm"
    >
      <span className="text-sm font-bold text-neutral-text group-hover:text-neutral-accent transition-colors tracking-tight">{title}</span>
      <Bookmark size={16} className={`${isBookmarked ? 'text-neutral-text fill-neutral-text' : 'text-neutral-muted group-hover:text-neutral-accent'}`} />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-[1200px] mx-auto pb-20"
    >
      {/* Header Section */}
      <div className="text-center py-10 mb-8 border-b border-neutral-secondary/20">
        <h1 className="text-4xl font-black text-neutral-text tracking-tight mb-3">Developer Roadmaps</h1>
        <p className="text-neutral-muted mb-8 font-medium">Browse the ever-growing list of up-to-date, AI-driven roadmaps</p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-6 py-3 bg-neutral-text text-neutral-bg rounded-[12px] text-sm font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-xl active:scale-95">
            <PenTool size={16} /> Draw your own roadmap
          </button>
          <button 
            onClick={() => navigate('/dashboard/generator')}
            className="px-6 py-3 bg-neutral-accent text-white rounded-[12px] text-sm font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-xl active:scale-95"
          >
            <Sparkles size={16} /> Generate Roadmaps with AI
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col md:flex-row gap-12">
        
        {/* Left Category Sidebar (Only for this page) */}
        <div className="w-full md:w-56 flex-shrink-0">
          <div className="sticky top-24 space-y-2">
            <h3 className="text-[10px] font-black text-neutral-muted uppercase tracking-widest px-3 mb-4">Categories</h3>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`w-full text-right px-4 py-2.5 text-sm transition-all rounded-l-xl ${
                  activeCategory === cat 
                    ? 'font-bold text-neutral-text bg-neutral-secondary/30 border-r-4 border-neutral-accent' 
                    : 'font-semibold text-neutral-muted hover:text-neutral-text hover:bg-neutral-secondary/10 border-r-4 border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Right Roadmap Grids */}
        <div className="flex-1">
          
          <div className="mb-12">
            <h3 className="text-[10px] font-black text-neutral-muted uppercase tracking-widest mb-4 flex items-center gap-2">
              <Sparkles size={12} className="text-neutral-accent" /> New Roadmaps
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {newRoadmaps.map((r, i) => <RoadmapCard key={i} title={r.title} isBookmarked={r.isBookmarked} />)}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-[10px] font-black text-neutral-muted uppercase tracking-widest mb-4 flex items-center gap-2">
              <Bookmark size={12} className="text-neutral-text" /> Role Based Roadmaps
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {roleBasedRoadmaps.map((r, i) => <RoadmapCard key={i} title={r.title} isBookmarked={r.isBookmarked} />)}
            </div>
          </div>

        </div>
      </div>

    </motion.div>
  );
};
