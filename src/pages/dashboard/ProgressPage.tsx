import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';

export const ProgressPage = () => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-4xl font-black text-neutral-text uppercase tracking-tight">Progress <span className="text-neutral-accent opacity-20">Tracking</span></h1>
        <p className="text-neutral-muted font-bold uppercase tracking-widest text-[10px] mt-2">Historical data of your learning journey.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 p-8 bg-white border border-neutral-secondary/10 rounded-2xl space-y-10 shadow-subtle">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full border-8 border-neutral-accent border-r-neutral-bg flex items-center justify-center shadow-lg">
              <span className="text-3xl font-black text-neutral-text">72%</span>
            </div>
            <h3 className="text-xl font-bold text-neutral-text">Overall Course</h3>
            <p className="text-xs text-neutral-muted font-medium mt-1">Batch 2026-A</p>
          </div>
          <div className="space-y-4">
             <div className="flex items-center justify-between p-5 bg-neutral-bg rounded-xl border border-neutral-secondary/10 shadow-sm">
               <span className="text-xs font-bold uppercase tracking-widest text-neutral-muted">Total Hours</span>
               <span className="font-black text-neutral-text">142</span>
             </div>
             <div className="flex items-center justify-between p-5 bg-neutral-bg rounded-xl border border-neutral-secondary/10 shadow-sm">
               <span className="text-xs font-bold uppercase tracking-widest text-neutral-muted">Badges Won</span>
               <span className="font-black text-neutral-text">15</span>
             </div>
          </div>
        </div>

        <div className="lg:col-span-8 p-10 bg-white border border-neutral-secondary/10 rounded-2xl shadow-subtle">
          <h3 className="text-2xl font-black text-neutral-text mb-8 uppercase">Milestone Timeline</h3>
          <div className="space-y-10 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-secondary/20">
            {[
              { title: "HTML/CSS Foundations", date: "Jan 12, 2026", completed: true },
              { title: "React State Management", date: "Feb 05, 2026", completed: true },
              { title: "Backend Systems", date: "Mar 01, 2026", completed: false },
            ].map((milestone, i) => (
              <div key={i} className="flex gap-6 relative group">
                {milestone.completed ? 
                  <CheckCircle2 className="text-neutral-accent bg-white z-10 shadow-sm rounded-full" size={24} /> : 
                  <Circle className="text-neutral-secondary/40 bg-white z-10 p-1 rounded-full border-2 border-neutral-secondary/20" size={24} />
                }
                <div>
                  <h4 className={`font-bold transition-colors ${milestone.completed ? 'text-neutral-text' : 'text-neutral-muted/40'}`}>{milestone.title}</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral-muted/60 mt-1">{milestone.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
