import { motion } from 'framer-motion';
import { Play, CheckCircle2, ArrowRight } from 'lucide-react';

export const LearningPathCard = () => {
  const progress = 45;

  return (
    <div className="h-full rounded-2xl bg-white border border-neutral-secondary/10 p-8 flex flex-col justify-between group hover:border-neutral-accent/20 transition-all shadow-subtle">
      <div>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-neutral-text">Learning Path Progress</h3>
          <span className="px-3 py-1 bg-neutral-accent text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
            Active
          </span>
        </div>

        <div className="mb-8">
          <p className="text-[10px] font-bold text-neutral-text-secondary uppercase tracking-widest mb-3">Current Stage</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-neutral-bg flex items-center justify-center text-neutral-accent border border-neutral-secondary/10 shadow-sm">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-lg font-bold text-neutral-text">Python for Data Analysis</p>
              <p className="text-sm font-bold text-neutral-text-secondary">Stage 2 of 5</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-[10px] font-bold text-neutral-text-secondary uppercase tracking-widest mb-4">Next Recommended Course</p>
          <div className="p-5 rounded-xl bg-neutral-bg border border-neutral-secondary/10 group-hover:bg-neutral-bg/60 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-neutral-text">Advanced NumPy & Pandas</span>
              <Play size={14} className="text-neutral-accent" />
            </div>
            <p className="text-xs text-neutral-text-secondary italic font-medium">Estimated time: 3.5 hours</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-sm font-bold text-neutral-accent">{progress}% Complete</span>
          <span className="text-xs font-bold text-neutral-text-secondary uppercase tracking-tighter">12 / 24 Modules</span>
        </div>
        <div className="h-2.5 w-full bg-neutral-secondary/30 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-neutral-accent rounded-full"
          />
        </div>
        
        <button className="mt-8 w-full py-4 bg-neutral-accent hover:bg-neutral-text text-white font-bold rounded-[12px] shadow-lg transition-all flex items-center justify-center gap-2 group/btn">
          <span>View Curriculum</span>
          <ArrowRight size={16} className="text-white group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
