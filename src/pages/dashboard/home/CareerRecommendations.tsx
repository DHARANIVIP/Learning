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
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#222222]">AI Career Pathways</h3>
        <span className="text-xs text-[#666666]">Based on your Profile</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {careers.map((career, i) => (
          <div
            key={i}
            className="group p-6 rounded-2xl bg-white border border-[#E5E5E5] hover:border-neutral-accent/25 transition-all duration-200 hover:-translate-y-1"
            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
          >
            <div className="w-11 h-11 rounded-xl bg-[#FAFAFA] flex items-center justify-center text-neutral-accent mb-6 group-hover:bg-neutral-accent group-hover:text-white transition-all duration-200 border border-[#E5E5E5]">
              <Briefcase size={20} />
            </div>

            <h4 className="text-base font-semibold text-[#222222] mb-2">{career.title}</h4>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-medium bg-neutral-accent/8 text-neutral-accent border border-neutral-accent/15">
                {career.demand} Demand
              </span>
              <div className="flex items-center gap-1 text-[#666666] text-xs">
                <DollarSign size={10} strokeWidth={2.5} />
                <span>{career.salary}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {career.skills.map((skill, j) => (
                <span key={j} className="text-xs text-[#666666] bg-[#FAFAFA] border border-[#E5E5E5] px-2.5 py-0.5 rounded-full">
                  {skill}
                </span>
              ))}
            </div>

            <button
              className="w-full py-2.5 rounded-xl bg-neutral-accent text-white hover:bg-neutral-text font-semibold text-sm transition-all flex items-center justify-center gap-2 group/btn"
              style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
            >
              Explore Path <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
