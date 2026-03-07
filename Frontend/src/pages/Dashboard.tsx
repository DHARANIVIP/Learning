import { Routes, Route, useNavigate } from 'react-router-dom';
import { DashboardOverview } from '../components/dashboard/DashboardOverview';
import { PathGenerator } from '../components/dashboard/PathGenerator';
import { FloatingDock } from '../components/dashboard/FloatingDock';

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B1218] text-[#BFC9D1] overflow-x-hidden pb-32">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF9355]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full glass-nav px-8 py-4 mb-8 border-b border-white/5 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between">
          <div
            className="text-xl font-bold tracking-widest uppercase cursor-pointer"
            onClick={() => navigate('/')}
          >
            NCVET <span className="text-sunset">.AI</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-medium text-white">NSQF Level 4</span>
              <span className="text-xs text-[#FF9355] font-medium">Digital Navigator</span>
            </div>
            <div className="w-10 h-10 border-2 rounded-full border-[#FF9355]/50 bg-[#121F28] p-0.5 shadow-[0_0_15px_rgba(255,147,85,0.2)]">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
                alt="Profile"
                className="object-cover w-full h-full rounded-full"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 relative z-10">
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/generator" element={<PathGenerator />} />
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center p-20 glass-card rounded-3xl text-center">
              <div className="text-silver/20 mb-6 font-heading text-8xl font-bold">404</div>
              <h2 className="text-2xl font-bold text-white mb-2">Module Under Construction</h2>
              <p className="text-[#BFC9D1]/50">Our AI agents are building this feature as we speak.</p>
            </div>
          } />
        </Routes>
      </main>

      <FloatingDock />
    </div>
  );
};