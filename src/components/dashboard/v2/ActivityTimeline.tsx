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
    <div className="rounded-2xl bg-white border border-neutral-secondary/10 p-8 shadow-subtle h-full">
      <h3 className="text-xl font-bold text-neutral-text mb-10 tracking-tight">Learning Activity</h3>
      
      <div className="space-y-10 relative">
        {/* Vertical Line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-neutral-secondary/20" />

        {activities.map((activity, i) => (
          <div key={i} className="relative flex items-start gap-6 group">
            <div className={`z-10 w-8 h-8 rounded-full bg-neutral-bg border-2 border-neutral-secondary/20 flex items-center justify-center text-neutral-accent group-hover:border-neutral-accent transition-all shadow-sm`}>
              <activity.icon size={16} />
            </div>
            
            <div className="flex-1">
              <p className="text-sm font-bold text-neutral-text mb-1.5 group-hover:text-neutral-accent transition-colors tracking-tight">{activity.title}</p>
              <p className="text-[10px] font-bold text-neutral-text-secondary uppercase tracking-widest">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-12 w-full py-4 bg-neutral-accent hover:bg-neutral-text text-white font-bold rounded-xl shadow-lg transition-all text-xs flex items-center justify-center gap-2 group/btn">
        View Full History <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};
