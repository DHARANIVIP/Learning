import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';

interface TopicDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  nodeData: any;
  onStatusChange?: (status: string) => void;
}

export const TopicDrawer: React.FC<TopicDrawerProps> = ({ isOpen, onClose, nodeData, onStatusChange }) => {
  if (!nodeData) return null;

  const isCompleted = nodeData.status === 'completed';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 border-l border-[#E5E7EB] overflow-y-auto"
          >
            <div className="p-6">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
              >
                <X size={20} />
              </button>

              <div className="mt-8 mb-6">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4 border border-blue-100">
                  <BookOpen size={14} /> Topic Details
                </div>
                <h2 className="text-2xl font-black text-[#111827] tracking-tight">{nodeData.label}</h2>
                <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                  {nodeData.description}
                </p>
              </div>

              {/* Status Update */}
              <div className="mb-8 p-4 rounded-xl border border-[#E5E7EB] bg-gray-50">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Your Progress</h3>
                {isCompleted ? (
                  <button 
                    onClick={() => onStatusChange?.('in-progress')}
                    className="w-full py-2.5 px-4 bg-green-100 text-green-700 rounded-lg text-sm font-bold flex items-center justify-center gap-2 border border-green-200"
                  >
                    <CheckCircle2 size={18} /> Completed
                  </button>
                ) : (
                  <button 
                    onClick={() => onStatusChange?.('completed')}
                    className="w-full py-2.5 px-4 bg-black text-white hover:bg-neutral-800 transition-colors rounded-lg text-sm font-bold shadow-md"
                  >
                    Mark as Completed
                  </button>
                )}
              </div>

              {/* AI Recommendation Box */}
              <div className="mb-8 p-5 rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
                <div className="absolute -top-6 -right-6 text-blue-500/10">
                  <Sparkles size={100} />
                </div>
                <div className="flex items-center gap-2 mb-3 text-blue-700 relative z-10">
                  <Sparkles size={18} />
                  <h3 className="font-bold text-sm">AI Recommendation</h3>
                </div>
                <p className="text-sm text-blue-900/80 leading-relaxed relative z-10 mb-4">
                  Based on your goal to become a "Full Stack Architect", mastering {nodeData.label} is critical. We recommend taking the deep-dive certification path.
                </p>
                <button className="text-xs font-bold bg-white text-blue-700 px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors shadow-sm relative z-10">
                  View Recommended Course
                </button>
              </div>

              {/* Resources */}
              {nodeData.resources && nodeData.resources.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">Free Resources</h3>
                  <div className="space-y-3">
                    {nodeData.resources.map((resource: any, i: number) => (
                      <a 
                        key={i} 
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg border border-[#E5E7EB] hover:border-blue-300 hover:bg-blue-50 transition-all group"
                      >
                        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">{resource.title}</span>
                        <ExternalLink size={14} className="text-gray-400 group-hover:text-blue-500" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
