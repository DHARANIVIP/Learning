import { motion } from 'framer-motion';
import { TrendingUp, UserCheck, Briefcase, Map } from 'lucide-react';

export const CareerInsightsPage = () => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-4xl font-black text-neutral-text uppercase tracking-tight">Career <span className="text-neutral-accent opacity-20">Insights</span></h1>
        <p className="text-neutral-muted font-bold uppercase tracking-widest text-[10px] mt-2">Market analytics and role matching data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: "Market Fit", value: "94%", detail: "In-Demand", icon: TrendingUp },
          { label: "Skills Match", value: "82%", detail: "+12% Growth", icon: UserCheck },
          { label: "Avg. Salary", value: "$95k", detail: "Industry Avg.", icon: Briefcase },
          { label: "Stability", value: "High", detail: "Future Proof", icon: Map },
        ].map((stat, i) => (
          <div key={i} className="p-8 bg-white border border-neutral-secondary/10 rounded-2xl shadow-subtle">
            <div className="p-4 rounded-xl bg-neutral-bg text-neutral-accent w-fit mb-6 shadow-sm">
              <stat.icon size={24} />
            </div>
            <p className="text-[10px] font-black uppercase text-neutral-muted tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-neutral-text mb-2">{stat.value}</p>
            <p className="text-[10px] font-bold text-neutral-accent uppercase tracking-tighter">{stat.detail}</p>
          </div>
        ))}
      </div>

      <div className="p-10 bg-white border border-neutral-secondary/10 rounded-2xl shadow-subtle">
        <h3 className="text-2xl font-black text-neutral-text mb-8 uppercase">Top Career Pathways</h3>
        <div className="space-y-6">
          {["Senior DevOps Engineer", "AI Interface Designer", "Machine Learning Specialist"].map((path, i) => (
            <div key={i} className="flex items-center justify-between p-6 bg-neutral-bg rounded-xl border border-neutral-secondary/10 hover:border-neutral-accent/20 transition-all cursor-pointer group">
              <span className="font-bold text-neutral-text group-hover:text-neutral-accent transition-colors">{path}</span>
              <TrendingUp size={18} className="text-neutral-accent opacity-20" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
