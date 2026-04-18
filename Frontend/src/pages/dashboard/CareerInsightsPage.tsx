import { motion } from 'framer-motion';
import { TrendingUp, UserCheck, Briefcase, Map, ArrowRight } from 'lucide-react';

export const CareerInsightsPage = () => {
  const stats = [
    { label: "Market Fit", value: "94%", detail: "In-Demand", icon: TrendingUp },
    { label: "Skills Match", value: "82%", detail: "+12% Growth", icon: UserCheck },
    { label: "Avg. Salary", value: "$95k", detail: "Industry Avg.", icon: Briefcase },
    { label: "Stability", value: "High", detail: "Future Proof", icon: Map },
  ];

  const careers = [
    "Senior DevOps Engineer",
    "AI Interface Designer",
    "Machine Learning Specialist",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-5"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-base font-semibold text-[#111827]">Career Insights</h1>
        <p className="text-xs text-[#6B7280] mt-0.5">Market analytics and role matching data.</p>
      </div>

      {/* ── Compact Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-4 py-3 bg-white border border-[#E5E7EB] rounded-[10px] hover:-translate-y-0.5 transition-all duration-200"
          >
            {/* Left: value + labels */}
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-[#6B7280] mb-0.5 truncate">{stat.label}</p>
              <p className="text-[19px] font-semibold text-[#111827] leading-none">{stat.value}</p>
              <p className="text-[11px] text-neutral-accent mt-0.5 truncate">{stat.detail}</p>
            </div>
            {/* Right: icon */}
            <div className="shrink-0 ml-3 p-2 rounded-lg bg-[#F9FAFB] text-neutral-accent">
              <stat.icon size={15} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Top Career Pathways ── */}
      <div className="bg-white border border-[#E5E7EB] rounded-[10px] overflow-hidden">
        {/* Card header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#F0F0F0]">
          <h3 className="text-sm font-semibold text-[#111827]">Top Career Pathways</h3>
          <span className="text-xs text-[#6B7280]">Based on your profile</span>
        </div>

        {/* Compact list */}
        <div>
          {careers.map((path, i) => (
            <div
              key={i}
              className={`flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-[#F9FAFB] transition-colors group ${
                i < careers.length - 1 ? 'border-b border-[#F0F0F0]' : ''
              }`}
            >
              <span className="text-sm text-[#111827] group-hover:text-neutral-accent transition-colors">
                {path}
              </span>
              <ArrowRight size={14} className="text-[#D1D5DB] group-hover:text-neutral-accent transition-colors shrink-0" />
            </div>
          ))}
        </div>

        {/* Footer action */}
        <div className="px-5 py-3.5 border-t border-[#F0F0F0] flex justify-end">
          <button className="inline-flex items-center gap-1.5 px-4 h-9 bg-black hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-all">
            Explore Pathways <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
