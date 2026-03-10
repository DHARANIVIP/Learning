import { motion } from 'framer-motion';
import { Target, BookOpen, Clock } from 'lucide-react';

export const LearningPathPage = () => {
  return (
    <motion.div
      initial={{ x: '100vw' }}
      animate={{ x: 0 }}
      exit={{ x: '-100vw' }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-neutral-text uppercase tracking-tight">Learning <span className="text-neutral-accent opacity-20">Path</span></h1>
          <p className="text-neutral-muted font-bold uppercase tracking-widest text-[10px] mt-2">AI-optimized curriculum for your career goals.</p>
        </div>
        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-neutral-secondary/10 shadow-sm">
          <div className="p-2 bg-neutral-bg rounded-lg">
            <Target className="text-neutral-accent" size={18} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-neutral-muted">Target Role</p>
            <p className="text-sm font-bold text-neutral-text">Full Stack Architect</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: "Frontend Architecture", status: "In Progress", progress: 65, duration: "12h" },
          { title: "Advanced Node.js Patterns", status: "Not Started", progress: 0, duration: "18h" },
          { title: "Cloud Native Deployment", status: "Not Started", progress: 0, duration: "15h" }
        ].map((module, i) => (
          <div key={i} className="p-8 bg-white border border-neutral-secondary/10 rounded-2xl shadow-subtle hover:border-neutral-accent/20 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 rounded-xl bg-neutral-bg text-neutral-accent group-hover:bg-neutral-accent group-hover:text-white transition-all shadow-sm">
                < BookOpen size={24} />
              </div>
              <span className="px-3 py-1 rounded-full bg-neutral-accent/10 text-[10px] font-black uppercase text-neutral-accent">{module.status}</span>
            </div>
            <h3 className="text-xl font-bold text-neutral-text mb-2">{module.title}</h3>
            <div className="flex items-center gap-4 text-neutral-muted text-xs mb-6 font-medium">
              <div className="flex items-center gap-1"><Clock size={14} /> {module.duration}</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase text-neutral-muted">
                <span>Progress</span>
                <span>{module.progress}%</span>
              </div>
              <div className="h-2 w-full bg-neutral-secondary/20 rounded-full overflow-hidden">
                <div className="h-full bg-neutral-accent transition-all duration-1000" style={{ width: `${module.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
