import { motion } from 'framer-motion';
import { Target, Sparkles } from 'lucide-react';

interface WelcomeSectionProps {
  profile: any;
}

export const WelcomeSection = ({ profile }: WelcomeSectionProps) => {
  const name = profile?.fullName || "Alex";
  const goal = profile?.careerGoal || "Data Analyst";
  const level = profile?.skillLevel || "Beginner";

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-white border border-[#E5E5E5] p-7 lg:p-10 hover:-translate-y-1 transition-all duration-200"
      style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
    >
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        {/* Profile Image with Ring */}
        <div className="relative shrink-0">
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full p-[3px] bg-neutral-accent">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
              alt="Alex Rivera"
              className="w-full h-full object-cover rounded-full border-4 border-white"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-emerald-400 w-5 h-5 rounded-full border-4 border-white" title="Online" />
        </div>

        {/* Welcome Text */}
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl lg:text-3xl font-semibold text-[#222222] mb-3 tracking-tight leading-tight">
              Welcome back, <span className="text-neutral-accent">{name}</span>
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-4">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#FAFAFA] rounded-full border border-[#E5E5E5]">
                <Target size={12} className="text-neutral-accent" />
                <span className="text-xs text-[#666666]">Goal: {goal}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#FAFAFA] rounded-full border border-[#E5E5E5]">
                <Sparkles size={12} className="text-neutral-accent/60" />
                <span className="text-xs text-[#666666]">Level: {level}</span>
              </div>
            </div>
            <p className="text-sm text-[#666666] max-w-xl leading-relaxed italic">
              "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice."
            </p>
          </motion.div>
        </div>

        {/* Action Button */}
        <div className="hidden xl:block shrink-0">
          <button
            className="px-7 py-3 bg-neutral-accent hover:bg-neutral-text text-white font-semibold text-sm rounded-xl transition-all active:scale-95"
            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.10)' }}
          >
            Resume Path
          </button>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-neutral-accent/5 rounded-full blur-[80px] pointer-events-none" />
    </div>
  );
};
