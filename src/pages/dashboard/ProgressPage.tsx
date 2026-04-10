import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';

export const ProgressPage = () => {
  const milestones = [
    { title: "HTML/CSS Foundations", date: "Jan 12, 2026", completed: true },
    { title: "React State Management", date: "Feb 05, 2026", completed: true },
    { title: "Backend Systems", date: "Mar 01, 2026", completed: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-7"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-semibold text-[#111827]">Progress Tracking</h1>
        <p className="text-sm text-[#6B7280] mt-1">Historical data of your learning journey.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Sidebar stat card */}
        <div
          className="lg:col-span-4 p-6 bg-white border border-[#E5E7EB] rounded-xl space-y-5"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
        >
          {/* Overall ring */}
          <div className="text-center pb-5 border-b border-[#F3F4F6]">
            <div className="w-28 h-28 mx-auto mb-4 rounded-full border-8 border-neutral-accent border-r-[#F3F4F6] flex items-center justify-center">
              <span className="text-2xl font-semibold text-[#111827]">72%</span>
            </div>
            <h3 className="text-base font-semibold text-[#111827]">Overall Course</h3>
            <p className="text-xs text-[#6B7280] mt-0.5">Batch 2026-A</p>
          </div>

          {/* Stat rows */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 bg-[#FAFAFA] rounded-lg border border-[#E5E7EB]">
              <span className="text-sm text-[#6B7280]">Total Hours</span>
              <span className="text-sm font-semibold text-[#111827]">142</span>
            </div>
            <div className="flex items-center justify-between p-3.5 bg-[#FAFAFA] rounded-lg border border-[#E5E7EB]">
              <span className="text-sm text-[#6B7280]">Badges Won</span>
              <span className="text-sm font-semibold text-[#111827]">15</span>
            </div>
          </div>
        </div>

        {/* Milestone timeline card */}
        <div
          className="lg:col-span-8 p-6 bg-white border border-[#E5E7EB] rounded-xl"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-[#111827]">Milestone Timeline</h3>
            <span className="text-xs text-[#6B7280]">3 milestones</span>
          </div>

          <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5E7EB]">
            {milestones.map((milestone, i) => (
              <div key={i} className="flex gap-5 relative group">
                {milestone.completed ? (
                  <CheckCircle2 className="text-neutral-accent bg-white z-10 rounded-full shrink-0" size={22} />
                ) : (
                  <Circle className="text-[#D1D5DB] bg-white z-10 rounded-full shrink-0" size={22} />
                )}
                <div className="flex-1 pb-1">
                  <h4
                    className={`text-sm font-medium transition-colors ${
                      milestone.completed ? 'text-[#111827]' : 'text-[#9CA3AF]'
                    }`}
                  >
                    {milestone.title}
                  </h4>
                  <p className="text-xs text-[#6B7280] mt-0.5">{milestone.date}</p>
                  {milestone.completed && (
                    <span className="inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] font-medium bg-green-50 text-green-600 border border-green-100">
                      Completed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
