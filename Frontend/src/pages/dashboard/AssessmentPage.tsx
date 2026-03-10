import { motion } from 'framer-motion';
import { Brain, ShieldCheck, Zap, Activity } from 'lucide-react';

export const AssessmentPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-4xl font-black text-neutral-text uppercase tracking-tight">Skill <span className="text-neutral-accent opacity-20">Assessment</span></h1>
        <p className="text-neutral-muted font-bold uppercase tracking-widest text-[10px] mt-2">Validate your expertise with AI-proctored tests.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="p-10 bg-white border border-neutral-secondary/10 rounded-2xl space-y-8 shadow-subtle relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-neutral-accent/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
          <Brain size={48} className="text-neutral-accent opacity-20" />
          <div className="relative z-10">
            <h2 className="text-3xl font-black uppercase leading-tight mb-4 text-neutral-text">Ready for your <br /> next challenge?</h2>
            <p className="text-neutral-muted font-medium mb-8">Take a specialized diagnostic test to unlock Level 5 NSQF certifications.</p>
            <button className="w-full py-5 bg-neutral-accent text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-neutral-text transition-all shadow-lg active:scale-95">Start Assessment</button>
          </div>
        </div>

        <div className="grid gap-6">
          {[
            { label: "Core Logic", score: "92/100", icon: ShieldCheck },
            { label: "Efficiency", score: "78/100", icon: Zap },
            { label: "Adaptability", score: "85/100", icon: Activity },
          ].map((item, i) => (
            <div key={i} className="p-8 bg-white border border-neutral-secondary/10 rounded-2xl flex items-center justify-between shadow-subtle group hover:border-neutral-accent/20 transition-all">
              <div className="flex items-center gap-6">
                <div className="p-4 rounded-xl bg-neutral-bg text-neutral-accent shadow-sm group-hover:bg-neutral-accent group-hover:text-white transition-all">
                  <item.icon size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-neutral-muted tracking-widest mb-1">{item.label}</p>
                  <p className="text-2xl font-black text-neutral-text">{item.score}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
