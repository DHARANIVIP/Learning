import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { TopNav } from '../components/dashboard/v2/TopNav';
import { StudentDashboard } from '../components/dashboard/StudentDashboard';
import { PathGenerator } from '../components/dashboard/PathGenerator';
import { LearningPathPage } from './dashboard/LearningPathPage';
import { CoursesPage } from './dashboard/CoursesPage';
import { AssessmentPage } from './dashboard/AssessmentPage';
import { CareerInsightsPage } from './dashboard/CareerInsightsPage';
import { ProgressPage } from './dashboard/ProgressPage';

export const Dashboard = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-neutral-bg text-neutral-text overflow-x-hidden selection:bg-neutral-accent selection:text-white">
      {/* Top Navigation */}
      <TopNav />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10 relative z-10 font-sans">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<StudentDashboard />} />
            <Route path="/path" element={<LearningPathPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/insights" element={<CareerInsightsPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/generator" element={<PathGenerator />} />
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center p-20 bg-neutral-secondary/30 rounded-[32px] border border-neutral-secondary/20 backdrop-blur-sm text-center">
                <div className="text-neutral-accent/20 mb-6 text-8xl font-black">404</div>
                <h2 className="text-2xl font-black text-neutral-accent mb-2 uppercase">Module Under Construction</h2>
                <p className="text-neutral-text/50 font-medium">Our AI agents are building this feature as we speak.</p>
              </div>
            } />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
};