import { Briefcase, DollarSign, ArrowRight } from 'lucide-react';

const careers = [
  {
    title: "Data Scientist",
    demand: "High",
    salary: "$120k - $160k",
    skills: ["Python", "Machine Learning", "Statistics"]
  },
  {
    title: "Machine Learning Engineer",
    demand: "Very High",
    salary: "$130k - $180k",
    skills: ["PyTorch", "Deep Learning", "MLOps"]
  },
  {
    title: "Business Intelligence Analyst",
    demand: "Moderate",
    salary: "$90k - $130k",
    skills: ["SQL", "Tableau", "Data Modeling"]
  }
];

export const CareerRecommendations = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-neutral-text">AI Career Pathways</h3>
        <span className="text-xs text-neutral-text-secondary font-medium whitespace-nowrap tracking-tight">Based on your Profile</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {careers.map((career, i) => (
          <div key={i} className="group p-8 rounded-2xl bg-white border border-neutral-secondary/10 hover:border-neutral-accent/20 transition-all hover:translate-y-[-4px] shadow-subtle">
            <div className="w-14 h-14 rounded-xl bg-neutral-bg flex items-center justify-center text-neutral-accent mb-8 group-hover:bg-neutral-accent group-hover:text-white transition-all border border-neutral-secondary/10 shadow-sm">
              <Briefcase size={28} />
            </div>

            <h4 className="text-xl font-bold text-neutral-text mb-3 tracking-tight">{career.title}</h4>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-neutral-accent/10 text-neutral-accent border border-neutral-accent/20">
                {career.demand} Demand
              </span>
              <div className="flex items-center gap-1.5 text-neutral-text-secondary text-[10px] font-bold uppercase tracking-widest">
                <DollarSign size={10} strokeWidth={3} />
                <span>{career.salary}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {career.skills.map((skill, j) => (
                <span key={j} className="text-[10px] font-bold text-neutral-text-secondary bg-neutral-bg border border-neutral-secondary/10 px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>

            <button className="w-full py-4 rounded-xl bg-neutral-accent text-white hover:bg-neutral-text font-bold text-xs transition-all shadow-lg flex items-center justify-center gap-2 group/btn">
              Explore Path <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
