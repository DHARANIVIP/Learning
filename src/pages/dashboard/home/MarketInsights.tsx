import { TrendingUp, Users, Target, Globe } from 'lucide-react';

export const MarketInsights = () => {
  return (
    <div
      className="rounded-2xl bg-white border border-[#E5E5E5] p-6 h-full hover:-translate-y-1 transition-all duration-200"
      style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
    >
      <div className="flex items-center justify-between mb-7">
        <div>
          <h3 className="text-base font-semibold text-[#222222] mb-0.5">Labour Market Insights</h3>
          <p className="text-xs text-[#666666]">Daily Real-time Analysis</p>
        </div>
        <div className="p-2.5 rounded-xl bg-neutral-accent/10 text-neutral-accent">
          <Globe size={17} />
        </div>
      </div>

      <div className="space-y-3">
        <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-between hover:border-neutral-accent/25 hover:bg-white transition-all duration-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white text-neutral-accent border border-[#E5E5E5]">
              <TrendingUp size={15} />
            </div>
            <div>
              <p className="text-xs text-[#666666] mb-0.5">Trending Job</p>
              <p className="text-sm font-medium text-[#222222]">Generative AI Engineer</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-neutral-accent font-semibold text-base">+34%</p>
            <p className="text-xs text-[#666666]">MoM Growth</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-between hover:border-neutral-accent/25 hover:bg-white transition-all duration-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white text-neutral-accent border border-[#E5E5E5]">
              <Target size={15} />
            </div>
            <div>
              <p className="text-xs text-[#666666] mb-0.5">Hot Skill</p>
              <p className="text-sm font-medium text-[#222222]">PyTorch & LLMs</p>
            </div>
          </div>
          <div className="text-[#E5E5E5]">
            <Users size={16} />
          </div>
        </div>

        <div className="pt-4 mt-2 border-t border-[#E5E5E5]">
          <p className="text-sm text-[#666666] leading-relaxed italic">
            "We're seeing a massive 45% surge in remote data roles specifically in the FinTech sector. Consider focusing your next certificates on Financial Data Modeling."
          </p>
        </div>
      </div>
    </div>
  );
};
