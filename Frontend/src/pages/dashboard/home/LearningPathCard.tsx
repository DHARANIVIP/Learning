import { motion } from 'framer-motion';
import { Play, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export const LearningPathCard = () => {
  const [progressData, setProgressData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/user/progress')
      .then(res => res.json())
      .then(data => {
        setProgressData(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="h-full rounded-2xl bg-white border border-[#E5E5E5] p-6 flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-neutral-accent" />
      </div>
    );
  }

  const progress = progressData?.progress_percentage || 0;
  const total = progressData?.total_modules || 0;
  const completed = progressData?.completed_modules || 0;
  const nextRecommended = progressData?.next_recommended || { title: 'Pending Data', duration: '--' };

  return (
    <div
      className="h-full rounded-2xl bg-white border border-[#E5E5E5] p-6 flex flex-col justify-between hover:-translate-y-1 transition-all duration-200"
      style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-semibold text-[#222222]">Learning Path Progress</h3>
          <span className="px-2.5 py-0.5 bg-neutral-accent text-white text-xs font-medium rounded-full">
            Active
          </span>
        </div>

        <div className="mb-5">
          <p className="text-xs text-[#666666] mb-2.5">Current Stage</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAFAFA] flex items-center justify-center text-neutral-accent border border-[#E5E5E5]">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#222222]">Python for Data Analysis</p>
              <p className="text-xs text-[#666666]">Stage 2 of 5</p>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <p className="text-xs text-[#666666] mb-2.5">Next Recommended Course</p>
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar">
            {/* Netflix-style horizontal flow card */}
            <div className="min-w-[280px] snap-center p-4 rounded-xl bg-neutral-bg border border-neutral-secondary/20 hover:border-neutral-accent/50 transition-all duration-200 cursor-pointer shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-neutral-text truncate pr-2">{nextRecommended.title}</span>
                <Play size={16} className="text-neutral-accent shrink-0" />
              </div>
              <p className="text-[10px] text-neutral-muted mb-3 line-clamp-2 leading-relaxed">{nextRecommended.market_relevance}</p>
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-neutral-secondary/10">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-accent bg-neutral-accent/10 px-2 py-0.5 rounded-md">{nextRecommended.type}</span>
                <span className="text-[10px] font-bold text-neutral-text/50 uppercase tracking-widest">⏱ {nextRecommended.duration}</span>
              </div>
            </div>
            
             {/* Mock secondary card for the horizontal flow feel */}
             <div className="min-w-[280px] snap-center p-4 rounded-xl bg-white border border-neutral-secondary/20 opacity-60 hover:opacity-100 transition-all duration-200 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-neutral-text truncate pr-2">Advanced Vector DBs</span>
                <Play size={16} className="text-neutral-muted shrink-0" />
              </div>
              <p className="text-[10px] text-neutral-muted mb-3 line-clamp-2 leading-relaxed">Essential for scalable AI apps in 2026.</p>
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-neutral-secondary/10">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-muted bg-neutral-secondary/20 px-2 py-0.5 rounded-md">Locked</span>
                <span className="text-[10px] font-bold text-neutral-text/50 uppercase tracking-widest">⏱ 6.0 Hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2 px-0.5">
          <span className="text-sm font-semibold text-neutral-accent">{progress}% Complete</span>
          <span className="text-xs text-[#666666]">{completed} / {total} Modules</span>
        </div>
        <div className="h-2 w-full bg-[#F0F0F0] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-neutral-accent rounded-full"
          />
        </div>
        
        <button
          className="mt-6 w-full py-3 bg-neutral-accent hover:bg-neutral-text text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
        >
          <span>View Curriculum</span>
          <ArrowRight size={15} className="text-white group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
