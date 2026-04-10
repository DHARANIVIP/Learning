import { Flame, Trophy, Award, Star } from 'lucide-react';

export const Gamification = () => {
  return (
    <div
      className="rounded-2xl bg-white border border-[#E5E5E5] p-7 relative overflow-hidden hover:-translate-y-1 transition-all duration-200"
      style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
    >
      <div className="relative z-10">
        <h3 className="text-base font-semibold text-[#222222] mb-7 flex items-center gap-2">
          Your Achievements <Trophy size={18} className="text-neutral-accent" />
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Streak */}
          <div className="p-5 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] flex flex-col items-center text-center group hover:-translate-y-0.5 transition-all duration-200">
            <div className="w-11 h-11 rounded-full bg-white border border-[#E5E5E5] text-neutral-accent flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Flame size={22} fill="currentColor" />
            </div>
            <p className="text-2xl font-semibold text-[#222222] leading-none">4 Days</p>
            <p className="text-xs text-[#666666] mt-2">Active Streak</p>
          </div>

          {/* Points */}
          <div className="p-5 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] flex flex-col items-center text-center group hover:-translate-y-0.5 transition-all duration-200">
            <div className="w-11 h-11 rounded-full bg-white border border-[#E5E5E5] text-neutral-accent flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Star size={22} fill="currentColor" />
            </div>
            <p className="text-2xl font-semibold text-[#222222] leading-none">2,450</p>
            <p className="text-xs text-[#666666] mt-2">Earned Points</p>
          </div>

          {/* Badges */}
          <div className="p-5 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] flex flex-col items-center text-center group hover:-translate-y-0.5 transition-all duration-200">
            <div className="w-11 h-11 rounded-full bg-white border border-[#E5E5E5] text-neutral-accent flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Award size={22} />
            </div>
            <p className="text-2xl font-semibold text-[#222222] leading-none">12</p>
            <p className="text-xs text-[#666666] mt-2">Badges Unlocked</p>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mt-8 pt-7 border-t border-[#E5E5E5]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-[#222222]">Level 4: Digital Navigator</span>
            <span className="text-xs font-semibold text-neutral-accent">550 XP to Level 5</span>
          </div>
          <div className="h-2 w-full bg-[#F0F0F0] rounded-full overflow-hidden">
            <div className="h-full w-[65%] bg-neutral-accent rounded-full" />
          </div>
        </div>
      </div>

      {/* Decorative Orb */}
      <div className="absolute top-[-50px] right-[-50px] w-56 h-56 bg-neutral-accent/5 rounded-full blur-[80px]" />
    </div>
  );
};
