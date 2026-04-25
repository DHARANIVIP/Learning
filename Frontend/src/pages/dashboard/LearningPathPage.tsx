import { motion } from 'framer-motion';
import { Target, BookOpen, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export const LearningPathPage = () => {
  const modules = [
    { title: "Frontend Architecture", status: "In Progress", progress: 65, duration: "12h", color: "bg-blue-500" },
    { title: "Advanced Node.js Patterns", status: "Not Started", progress: 0, duration: "18h", color: "bg-neutral-accent" },
    { title: "Cloud Native Deployment", status: "Not Started", progress: 0, duration: "15h", color: "bg-neutral-accent" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-7"
    >
      {/* Page Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-semibold text-[#111827]">Learning Path</h1>
          <p className="text-sm text-[#6B7280] mt-1">AI-optimized curriculum for your career goals.</p>
        </div>

        {/* Target Role Chip */}
        <div
          className="flex items-center gap-3 px-4 py-2.5 bg-white rounded-xl border border-[#E5E7EB]"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
        >
          <div className="p-1.5 bg-[#F9FAFB] rounded-lg text-neutral-accent">
            <Target size={15} />
          </div>
          <div>
            <p className="text-xs text-[#6B7280]">Target Role</p>
            <p className="text-sm font-semibold text-[#111827]">Full Stack Architect</p>
          </div>
        </div>
      </div>

      {/* Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {modules.map((module, i) => (
          <div
            key={i}
            className="p-5 bg-white border border-[#E5E7EB] rounded-xl hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 group flex flex-col"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 rounded-lg bg-[#F9FAFB] text-neutral-accent group-hover:bg-neutral-accent group-hover:text-white transition-all duration-200">
                <BookOpen size={18} />
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  module.status === 'In Progress'
                    ? 'bg-blue-50 text-blue-600 border border-blue-100'
                    : 'bg-[#F9FAFB] text-[#6B7280] border border-[#E5E7EB]'
                }`}
              >
                {module.status}
              </span>
            </div>

            {/* Content */}
            <h3 className="text-base font-semibold text-[#111827] mb-1.5">{module.title}</h3>
            <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF] mb-4">
              <Clock size={12} /> {module.duration}
            </div>

            {/* Progress */}
            <div className="mb-2 flex justify-between text-xs text-[#6B7280]">
              <span>Progress</span>
              <span className="font-medium text-[#111827]">{module.progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
              <div
                className="h-full bg-neutral-accent transition-all duration-1000 rounded-full"
                style={{ width: `${module.progress}%` }}
              />
            </div>

            {/* Footer */}
            <div className="mt-5 pt-4 border-t border-[#F3F4F6]">
              <button
                className="w-full py-2 bg-black hover:bg-neutral-800 text-white text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
              >
                {module.progress > 0 ? (
                  <><CheckCircle2 size={14} /> Continue</>
                ) : (
                  <><ArrowRight size={14} /> Start Module</>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
