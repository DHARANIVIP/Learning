import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Clock, ArrowRight, Zap, BookOpen, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DashboardOverview = () => {
  const navigate = useNavigate();

  const radarOption = {
    backgroundColor: 'transparent',
    radar: {
      indicator: [
        { name: 'Frontend', max: 100 },
        { name: 'Backend', max: 100 },
        { name: 'DevOps', max: 100 },
        { name: 'UI/UX', max: 100 },
        { name: 'AI/ML', max: 100 },
        { name: 'Soft Skills', max: 100 }
      ],
      splitArea: { show: false },
      axisLine: { lineStyle: { color: 'rgba(26, 26, 26, 0.1)' } },
      splitLine: { lineStyle: { color: 'rgba(26, 26, 26, 0.05)' } },
      name: { textStyle: { color: 'rgba(26, 26, 26, 0.4)', fontSize: 10, fontWeight: 'bold' } }
    },
    series: [
      {
        name: 'Skills',
        type: 'radar',
        data: [
          {
            value: [85, 60, 40, 70, 30, 75],
            name: 'Current Skills',
            itemStyle: { color: '#000000' },
            areaStyle: { color: 'rgba(26, 26, 26, 0.3)' },
            lineStyle: { width: 3 }
          },
          {
            value: [90, 85, 80, 80, 70, 90],
            name: 'Target Role',
            itemStyle: { color: 'rgba(26, 26, 26, 0.1)' },
            areaStyle: { opacity: 0 },
            lineStyle: { type: 'dashed', width: 1 }
          }
        ]
      }
    ]
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-8 pb-12">
      {/* Title Section */}
      <div className="col-span-1 md:col-span-4 lg:col-span-12 mb-6">
        <h2 className="text-4xl font-black text-neutral-text tracking-tight uppercase">Personal <span className="text-neutral-accent opacity-40">Intelligence</span></h2>
        <p className="text-neutral-text/50 font-bold uppercase tracking-widest text-[10px] mt-2">Your vocational progress, analyzed in real-time.</p>
      </div>

      {/* Welcome Card - Bento 1 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="col-span-1 md:col-span-4 lg:col-span-8 p-12 bg-neutral-secondary border border-neutral-secondary/30 rounded-[32px] overflow-hidden relative shadow-sm"
      >
        <div className="relative z-10">
          <Zap className="text-neutral-accent mb-8" size={32} fill="currentColor" />
          <h3 className="text-5xl font-black text-neutral-text mb-6 tracking-tight leading-none uppercase">You're on track for <br /> Senior Associate </h3>
          <p className="text-neutral-text/60 max-w-md mb-10 font-medium">
            Based on your recent performance in "Backend Scalability", you are only 4 modules away from reaching NSQF Level 5 certification.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-neutral-accent hover:bg-neutral-text transition-all rounded-[12px] text-white font-bold text-sm shadow-lg">Resume Learning</button>
            <button className="px-8 py-4 border-2 border-neutral-accent/20 hover:border-neutral-accent transition-all rounded-[12px] text-neutral-text font-bold text-sm">View Path</button>
          </div>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-neutral-accent/5 rounded-full blur-[80px]" />
      </motion.div>

      {/* Stats - Bento 2 */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4 grid gap-8">
        {[
          { icon: Award, label: "NSQF Level", value: "Level 4", color: "text-neutral-accent" },
          { icon: Clock, label: "Hours Learned", value: "142h", color: "text-neutral-text/60" },
          { icon: Target, label: "Goal Progress", value: "68%", color: "text-neutral-accent" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-neutral-card border border-neutral-secondary/30 rounded-[32px] flex items-center gap-6 shadow-sm group hover:border-neutral-accent transition-all"
          >
            <div className={`p-5 rounded-[20px] bg-neutral-bg/40 ${stat.color} shadow-inner group-hover:bg-neutral-accent group-hover:text-white transition-all`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-neutral-text/30 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
              <p className="text-3xl font-black text-neutral-text leading-none tracking-tight">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Radar Chart - Bento 3 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="col-span-1 md:col-span-2 lg:col-span-5 p-10 bg-neutral-secondary border border-neutral-secondary/30 rounded-[32px] shadow-sm"
      >
        <div className="flex items-center justify-between mb-10">
          <h4 className="text-xl font-bold text-neutral-text tracking-tight uppercase">Skill Signature</h4>
          <BookOpen size={20} className="text-neutral-text/30" />
        </div>
        <div className="h-[300px]">
          <ReactECharts option={radarOption} style={{ height: '100%', width: '100%' }} />
        </div>
      </motion.div>

      {/* Market Intel - Bento 4 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="col-span-1 md:col-span-2 lg:col-span-4 p-10 bg-neutral-card border border-neutral-secondary/30 rounded-[32px] shadow-sm"
      >
        <h4 className="text-xl font-bold text-neutral-text mb-8 tracking-tight uppercase">Market Potential</h4>
        <div className="space-y-6">
          {[
            { tag: "Frontend", demand: "Critical", grow: "+12%" },
            { tag: "Backend", demand: "High", grow: "+24%" },
            { tag: "DevOps", demand: "Moderate", grow: "+8%" }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-5 bg-neutral-bg/30 rounded-[20px] shadow-inner border border-neutral-secondary/30 hover:border-neutral-accent/30 transition-all cursor-pointer">
              <div>
                <p className="font-bold text-neutral-text tracking-tight">{item.tag}</p>
                <p className="text-[10px] text-neutral-text/40 font-bold uppercase tracking-widest mt-1">{item.demand} Demand</p>
              </div>
              <div className="text-right">
                <p className="text-neutral-accent font-black text-lg leading-none">{item.grow}</p>
                <TrendingUp size={14} className="text-neutral-accent opacity-30 mt-1 ml-auto" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recommendations - Bento 5 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="col-span-1 md:col-span-2 lg:col-span-3 p-10 bg-neutral-accent rounded-[32px] border border-black shadow-xl"
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            <h4 className="text-xl font-bold text-white mb-6 uppercase tracking-widest opacity-40">AI Insight</h4>
            <p className="text-lg font-bold text-white leading-tight mb-10 tracking-tight">
              "You excel at logical structures but lag in visual polish. We've added 3 UI/UX modules to your queue."
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/generator')}
            className="flex items-center justify-center w-full gap-2 py-5 font-bold transition-all rounded-[16px] bg-white text-neutral-accent hover:bg-neutral-bg shadow-lg group"
          >
            <span className="uppercase tracking-widest text-xs">Update Queue</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
