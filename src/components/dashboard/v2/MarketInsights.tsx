import { TrendingUp, Users, Target, Globe } from 'lucide-react';

export const MarketInsights = () => {
  return (
    <div className="rounded-2xl bg-white border border-neutral-secondary/10 p-8 shadow-subtle h-full">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-xl font-bold text-neutral-text mb-1">Labour Market Insights</h3>
          <p className="text-[10px] font-bold text-neutral-text-secondary uppercase tracking-widest">Daily Real-time Analysis</p>
        </div>
        <div className="p-3 rounded-xl bg-neutral-accent text-white shadow-lg">
          <Globe size={20} />
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-5 rounded-xl bg-neutral-bg border border-neutral-secondary/10 flex items-center justify-between group hover:border-neutral-accent/20 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white text-neutral-accent shadow-subtle">
              <TrendingUp size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-neutral-text-secondary uppercase tracking-widest mb-1">Trending Job</p>
              <p className="text-sm font-bold text-neutral-text">Generative AI Engineer</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-neutral-accent font-black text-lg">+34%</p>
            <p className="text-[10px] font-bold text-neutral-text-secondary uppercase tracking-tighter">MoM Growth</p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-neutral-bg border border-neutral-secondary/10 flex items-center justify-between group hover:border-neutral-accent/20 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white text-neutral-accent shadow-subtle">
              <Target size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-neutral-text-secondary uppercase tracking-widest mb-1">Hot Skill</p>
              <p className="text-sm font-bold text-neutral-text">PyTorch & LLMs</p>
            </div>
          </div>
          <div className="text-right text-neutral-text/10">
            <Users size={18} />
          </div>
        </div>

        <div className="pt-6 mt-8 border-t border-neutral-secondary/10">
          <p className="text-sm text-neutral-text-secondary leading-relaxed italic font-medium">
            "We're seeing a massive 45% surge in remote data roles specifically in the FinTech sector. Consider focusing your next certificates on Financial Data Modeling."
          </p>
        </div>
      </div>
    </div>
  );
};
