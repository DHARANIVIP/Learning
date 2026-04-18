import { CheckCircle2, Calendar, Target, ArrowRight } from 'lucide-react';

const activities = [
  {
    type: "completion",
    title: "Completed 'Data Cleaning with Pandas'",
    time: "2 hours ago",
    icon: CheckCircle2,
    color: "text-green-400"
  },
  {
    type: "upcoming",
    title: "SQL Quiz: Joins & Aggregations",
    time: "Tomorrow, 10:00 AM",
    icon: Calendar,
    color: "text-blue-400"
  },
  {
    type: "ai-suggestion",
    title: "AI suggests: Review 'Normalization' module",
    time: "Focus area",
    icon: Target,
    color: "text-sunset"
  }
];

export const ActivityTimeline = () => {
  return (
    <div
      className="rounded-2xl bg-white border border-[#E5E5E5] p-6 h-full hover:-translate-y-1 transition-all duration-200"
      style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
    >
      <h3 className="text-base font-semibold text-[#222222] mb-8 tracking-tight">Learning Activity</h3>
      
      <div className="space-y-7 relative">
        {/* Vertical Line */}
        <div className="absolute left-3.5 top-0 bottom-0 w-px bg-[#E5E5E5]" />

        {activities.map((activity, i) => (
          <div key={i} className="relative flex items-start gap-5 group">
            <div className="z-10 w-7 h-7 rounded-full bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-center text-neutral-accent group-hover:border-neutral-accent/40 transition-all">
              <activity.icon size={13} />
            </div>
            
            <div className="flex-1">
              <p className="text-sm font-medium text-[#222222] mb-1 group-hover:text-neutral-accent transition-colors">{activity.title}</p>
              <p className="text-xs text-[#666666]">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        className="mt-8 w-full py-3 bg-neutral-accent hover:bg-neutral-text text-white font-semibold rounded-xl transition-all text-sm flex items-center justify-center gap-2 group/btn"
        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
      >
        View Full History <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};
