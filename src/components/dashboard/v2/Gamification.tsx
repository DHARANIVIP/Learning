import { Flame, Trophy, Award, Star } from 'lucide-react';

export const Gamification = () => {
  return (
    <div className="rounded-2xl bg-white border border-neutral-secondary/10 p-10 relative overflow-hidden shadow-subtle">
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-neutral-text mb-10 flex items-center gap-3 tracking-tight">
          Your Achievements <Trophy size={24} className="text-neutral-accent" />
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Streak */}
          <div className="p-8 rounded-xl bg-neutral-bg border border-neutral-secondary/10 flex flex-col items-center text-center group">
            <div className="w-14 h-14 rounded-full bg-white border border-neutral-secondary/10 text-neutral-accent flex items-center justify-center mb-6 shadow-subtle group-hover:scale-110 transition-transform">
              <Flame size={28} fill="currentColor" />
            </div>
            <p className="text-3xl font-black text-neutral-text leading-none tracking-tight">4 Days</p>
            <p className="text-[10px] text-neutral-text-secondary font-bold uppercase tracking-[0.2em] mt-3">Active Streak</p>
          </div>

          {/* Points */}
          <div className="p-8 rounded-xl bg-neutral-bg border border-neutral-secondary/10 flex flex-col items-center text-center group">
            <div className="w-14 h-14 rounded-full bg-white border border-neutral-secondary/10 text-neutral-accent flex items-center justify-center mb-6 shadow-subtle group-hover:scale-110 transition-transform">
              <Star size={28} fill="currentColor" />
            </div>
            <p className="text-3xl font-black text-neutral-text leading-none tracking-tight">2,450</p>
            <p className="text-[10px] text-neutral-text-secondary font-bold uppercase tracking-[0.2em] mt-3">Earned Points</p>
          </div>

          {/* Badges */}
          <div className="p-8 rounded-xl bg-neutral-bg border border-neutral-secondary/10 flex flex-col items-center text-center group">
            <div className="w-14 h-14 rounded-full bg-white border border-neutral-secondary/10 text-neutral-accent flex items-center justify-center mb-6 shadow-subtle group-hover:scale-110 transition-transform">
              <Award size={28} />
            </div>
            <p className="text-3xl font-black text-neutral-text leading-none tracking-tight">12</p>
            <p className="text-[10px] text-neutral-text-secondary font-bold uppercase tracking-[0.2em] mt-3">Badges Unlocked</p>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mt-12 pt-10 border-t border-neutral-secondary/10">
          <div className="flex items-center justify-between mb-5">
            <span className="text-md font-bold text-neutral-text tracking-tight">Level 4: Digital Navigator</span>
            <span className="text-xs font-black text-neutral-accent uppercase tracking-widest">550 XP to Level 5</span>
          </div>
          <div className="h-2.5 w-full bg-neutral-secondary/20 rounded-full overflow-hidden">
            <div className="h-full w-[65%] bg-neutral-accent rounded-full" />
          </div>
        </div>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-neutral-secondary/10 rounded-full blur-[80px]" />
    </div>
  );
};
