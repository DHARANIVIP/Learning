import { WelcomeSection } from './v2/WelcomeSection';
import { LearningPathCard } from './v2/LearningPathCard';
import { RecommendedCourses } from './v2/RecommendedCourses';
import { SkillAnalytics } from './v2/SkillAnalytics';
import { CareerRecommendations } from './v2/CareerRecommendations';
import { MarketInsights } from './v2/MarketInsights';
import { ActivityTimeline } from './v2/ActivityTimeline';
import { Gamification } from './v2/Gamification';
import { motion } from 'framer-motion';

export const StudentDashboard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12 pb-24"
    >
      {/* 1. Welcome Section */}
      <section id="welcome" className="hover:scale-[1.01] transition-transform duration-500">
        <WelcomeSection />
      </section>

      {/* 2. Grid Layout for Learning Path & Market Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Learning Path Progress (Left - 8 cols) */}
        <section id="learning-path" className="lg:col-span-8 hover:scale-[1.01] transition-transform duration-500">
          <LearningPathCard />
        </section>

        {/* Market Insights (Right - 4 cols) */}
        <section id="market-insights" className="lg:col-span-4 hover:scale-[1.01] transition-transform duration-500">
          <MarketInsights />
        </section>
      </div>

      {/* 3. Skill Progress Analytics */}
      <section id="skills" className="hover:scale-[1.005] transition-transform duration-500">
        <SkillAnalytics />
      </section>

      {/* 4. AI Career Recommendations */}
      <section id="career-insights" className="hover:scale-[1.005] transition-transform duration-500">
        <CareerRecommendations />
      </section>

      {/* 5. Recommended Courses Section */}
      <section id="courses" className="hover:scale-[1.005] transition-transform duration-500">
        <RecommendedCourses />
      </section>

      {/* 6. Activities & Gamification */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Activity Timeline (Left - 7 cols) */}
        <section id="activity" className="lg:col-span-7 hover:scale-[1.01] transition-transform duration-500">
          <ActivityTimeline />
        </section>

        {/* Gamification (Right - 5 cols) */}
        <section id="gamification" className="lg:col-span-5 hover:scale-[1.01] transition-transform duration-500">
          <Gamification />
        </section>
      </div>

      {/* Background Decorative Glows */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-neutral-secondary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-neutral-card/5 rounded-full blur-[120px]" />
      </div>
    </motion.div>
  );
};
