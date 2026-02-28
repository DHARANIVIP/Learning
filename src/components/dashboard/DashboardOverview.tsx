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
      axisLine: { lineStyle: { color: 'rgba(255, 147, 85, 0.2)' } },
      splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)' } },
      name: { textStyle: { color: 'rgba(255, 255, 255, 0.4)', fontSize: 10, fontWeight: 'bold' } }
    },
    series: [
      {
        name: 'Skills',
        type: 'radar',
        data: [
          {
            value: [85, 60, 40, 70, 30, 75],
            name: 'Current Skills',
            itemStyle: { color: '#FF9355' },
            areaStyle: { color: 'rgba(255, 147, 85, 0.3)' },
            lineStyle: { width: 3 }
          },
          {
            value: [90, 85, 80, 80, 70, 90],
            name: 'Target Role',
            itemStyle: { color: 'rgba(255, 255, 255, 0.2)' },
            areaStyle: { opacity: 0 },
            lineStyle: { type: 'dashed', width: 1 }
          }
        ]
      }
    ]
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6 pb-12">
      {/* Title Section */}
      <div className="col-span-1 md:col-span-4 lg:col-span-12 mb-4">
        <h2 className="text-3xl font-bold text-white font-heading">Personal <span className="text-sunset">Intelligence</span></h2>
        <p className="text-silver/50">Your vocational progress, analyzed in real-time.</p>
      </div>

      {/* Welcome Card - Bento 1 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="col-span-1 md:col-span-4 lg:col-span-8 p-10 glass-card rounded-3xl overflow-hidden relative"
      >
        <div className="relative z-10">
          <Zap className="text-sunset mb-6" size={32} />
          <h3 className="text-4xl font-bold text-white mb-4 font-heading leading-tight">You're on track for <br /> Senior Associate </h3>
          <p className="text-silver/60 max-w-md mb-8">
            Based on your recent performance in "Backend Scalability", you are only 4 modules away from reaching NSQF Level 5 certification.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-white font-bold text-sm">Resume Learning</button>
            <button className="px-6 py-3 border border-white/10 hover:border-sunset/50 transition-colors rounded-full text-white font-bold text-sm">View Path</button>
          </div>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-sunset/10 rounded-full blur-[80px]" />
      </motion.div>

      {/* Stats - Bento 2 */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4 grid gap-6">
        {[
          { icon: Award, label: "NSQF Level", value: "Level 4", color: "text-sunset" },
          { icon: Clock, label: "Hours Learned", value: "142h", color: "text-blue-400" },
          { icon: Target, label: "Goal Progress", value: "68%", color: "text-green-400" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 glass-card rounded-3xl flex items-center gap-5"
          >
            <div className={`p-4 rounded-2xl bg-white/5 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-silver/40 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Radar Chart - Bento 3 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="col-span-1 md:col-span-2 lg:col-span-5 p-8 glass-card rounded-3xl"
      >
        <div className="flex items-center justify-between mb-8">
          <h4 className="font-bold text-white">Skill Signature</h4>
          <BookOpen size={18} className="text-silver/30" />
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
        className="col-span-1 md:col-span-2 lg:col-span-4 p-8 glass-card rounded-3xl"
      >
        <h4 className="font-bold text-white mb-6">Market Potential</h4>
        <div className="space-y-6">
          {[
            { tag: "Frontend", demand: "Critical", grow: "+12%" },
            { tag: "Backend", demand: "High", grow: "+24%" },
            { tag: "DevOps", demand: "Moderate", grow: "+8%" }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
              <div>
                <p className="font-bold text-white text-sm">{item.tag}</p>
                <p className="text-xs text-silver/40 uppercase">{item.demand} Demand</p>
              </div>
              <div className="text-right">
                <p className="text-sunset font-bold">{item.grow}</p>
                <TrendingUp size={14} className="text-sunset ml-auto" />
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
        className="col-span-1 md:col-span-2 lg:col-span-3 p-8 glass-card rounded-3xl bg-sunset/5 border-sunset/20"
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            <h4 className="font-bold text-white mb-4">AI Insight</h4>
            <p className="text-sm text-silver/70 leading-relaxed mb-6">
              "You excel at logical structures but lag in visual polish. We've added 3 UI/UX modules to your queue."
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/generator')}
            className="flex items-center justify-center w-full gap-2 py-4 font-bold transition-all rounded-2xl bg-sunset text-midnight hover:shadow-[0_0_30px_rgba(255,147,85,0.3)] group"
          >
            <span>Update Queue</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

