import { motion } from 'framer-motion';
import { Target, Sparkles } from 'lucide-react';

export const WelcomeSection = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white border border-neutral-secondary/10 p-8 lg:p-12 shadow-subtle">
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
        {/* Profile Image with Ring */}
        <div className="relative">
          <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full p-1 bg-neutral-accent">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
              alt="Alex Rivera"
              className="w-full h-full object-cover rounded-full border-4 border-white"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-neutral-accent w-6 h-6 rounded-full border-4 border-white" title="Online" />
        </div>

        {/* Welcome Text */}
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl lg:text-5xl font-bold text-neutral-text mb-4 tracking-tight leading-tight">
              Welcome back, <span className="text-neutral-accent">Alex</span>
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
              <div className="flex items-center gap-2 px-4 py-1.5 bg-neutral-bg rounded-full border border-neutral-secondary/20 shadow-sm">
                <Target size={14} className="text-neutral-accent" />
                <span className="text-xs font-bold text-neutral-text-secondary uppercase">Goal: Data Analyst</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-1.5 bg-neutral-bg rounded-full border border-neutral-secondary/20 shadow-sm">
                <Sparkles size={14} className="text-neutral-accent/40" />
                <span className="text-xs font-bold text-neutral-text-secondary uppercase">4 Day Streak</span>
              </div>
            </div>
            <p className="text-lg text-neutral-text-secondary max-w-xl font-medium leading-relaxed italic">
              "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice."
            </p>
          </motion.div>
        </div>

        {/* Action Button */}
        <div className="hidden xl:block">
          <button className="px-10 py-5 bg-neutral-accent hover:bg-neutral-text text-white font-bold rounded-[12px] transition-all shadow-lg active:scale-95">
            Resume Path
          </button>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-neutral-secondary/10 rounded-full blur-[100px] pointer-events-none" />
    </div>
  );
};
