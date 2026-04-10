import { motion } from 'framer-motion';
import { Play, CheckCircle2, ArrowRight } from 'lucide-react';

export const LearningPathCard = () => {
  const progress = 45;

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
          <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] hover:bg-white hover:border-neutral-accent/20 transition-all duration-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-[#222222]">Advanced NumPy & Pandas</span>
              <Play size={13} className="text-neutral-accent" />
            </div>
            <p className="text-xs text-[#666666]">Estimated time: 3.5 hours</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2 px-0.5">
          <span className="text-sm font-semibold text-neutral-accent">{progress}% Complete</span>
          <span className="text-xs text-[#666666]">12 / 24 Modules</span>
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
