import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RoadmapCanvas } from './../../components/roadmap/RoadmapCanvas';

export const RoadmapDetailView = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-7"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-xl border border-[#E5E7EB] bg-white hover:bg-gray-50 text-gray-600 transition-colors shadow-sm"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-[#111827]">Full Stack Architect Path</h1>
            <p className="text-sm text-[#6B7280] mt-1">Interactive curriculum map.</p>
          </div>
        </div>

        <div
          className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
        >
          <div className="p-1.5 bg-white/60 rounded-lg text-blue-600 shadow-sm">
            <Sparkles size={15} />
          </div>
          <div>
            <p className="text-xs text-blue-800/60 font-bold uppercase tracking-widest">AI Generated</p>
            <p className="text-sm font-semibold text-blue-900">Customized for You</p>
          </div>
        </div>
      </div>

      <div className="w-full">
        <RoadmapCanvas />
      </div>
    </motion.div>
  );
};
