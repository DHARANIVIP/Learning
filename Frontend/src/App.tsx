import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Chatbot } from './components/Chatbot';

// Lazy loading entry points
const LandingPage = React.lazy(() => import('./pages/landing/LandingPage').then(module => ({ default: module.LandingPage })));
const OnboardingPage = React.lazy(() => import('./pages/onboarding/OnboardingPage').then(module => ({ default: module.OnboardingPage })));

// Dashboard layout and views
const DashboardLayout = React.lazy(() => import('./pages/dashboard/DashboardLayout').then(module => ({ default: module.DashboardLayout })));
const StudentDashboard = React.lazy(() => import('./pages/dashboard/home/StudentDashboard').then(module => ({ default: module.StudentDashboard })));
const LearningPathPage = React.lazy(() => import('./pages/dashboard/LearningPathPage').then(module => ({ default: module.LearningPathPage })));
const CoursesPage = React.lazy(() => import('./pages/dashboard/CoursesPage').then(module => ({ default: module.CoursesPage })));
const AssessmentPage = React.lazy(() => import('./pages/dashboard/AssessmentPage').then(module => ({ default: module.AssessmentPage })));
const CareerInsightsPage = React.lazy(() => import('./pages/dashboard/CareerInsightsPage').then(module => ({ default: module.CareerInsightsPage })));
const ProgressPage = React.lazy(() => import('./pages/dashboard/ProgressPage').then(module => ({ default: module.ProgressPage })));
const PathGenerator = React.lazy(() => import('./pages/dashboard/PathGenerator').then(module => ({ default: module.PathGenerator })));
const RoadmapDetailView = React.lazy(() => import('./pages/dashboard/RoadmapDetailView').then(module => ({ default: module.RoadmapDetailView })));

const LoadingSpinner = () => (
  <div className="flex h-screen w-full items-center justify-center bg-neutral-bg text-neutral-text">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-secondary border-t-neutral-accent"></div>
  </div>
);

const NotFoundModule = () => (
  <div className="flex flex-col items-center justify-center p-20 bg-neutral-secondary/30 rounded-[32px] border border-neutral-secondary/20 backdrop-blur-sm text-center">
    <div className="text-neutral-accent/20 mb-6 text-8xl font-black">404</div>
    <h2 className="text-2xl font-black text-neutral-accent mb-2 uppercase">Module Under Construction</h2>
    <p className="text-neutral-text/50 font-medium">Our AI agents are building this feature as we speak.</p>
  </div>
);

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />

            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<StudentDashboard />} />
              <Route path="path" element={<LearningPathPage />} />
              <Route path="courses" element={<CoursesPage />} />
              <Route path="assessment" element={<AssessmentPage />} />
              <Route path="insights" element={<CareerInsightsPage />} />
              <Route path="progress" element={<ProgressPage />} />
              <Route path="generator" element={<PathGenerator />} />
              <Route path="path/detail" element={<RoadmapDetailView />} />
              <Route path="*" element={<NotFoundModule />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
      <Chatbot />
    </>
  );
}

export default App;
