import { Star, Clock, ArrowRight, Zap } from 'lucide-react';

const courses = [
  {
    title: "Python Basics for Data Science",
    level: "Beginner",
    duration: "12 Hours",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=300&auto=format&fit=crop"
  },
  {
    title: "SQL Mastery: From Zero to Hero",
    level: "Intermediate",
    duration: "8 Hours",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=300&auto=format&fit=crop"
  },
  {
    title: "Data Visualization with Power BI",
    level: "Beginner",
    duration: "15 Hours",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300&auto=format&fit=crop"
  }
];

export const RecommendedCourses = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#222222]">Recommended for You</h3>
        <button className="text-xs text-[#666666] hover:text-neutral-accent transition-colors flex items-center gap-1.5">
          View All <ArrowRight size={13} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course, i) => (
          <div
            key={i}
            className="group rounded-2xl bg-white border border-[#E5E5E5] overflow-hidden hover:border-neutral-accent/25 transition-all duration-200 hover:-translate-y-1"
            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
          >
            {/* Image Container */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute top-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full border border-white/50 flex items-center gap-1.5">
                <Zap size={9} className="text-neutral-accent fill-neutral-accent" />
                <span className="text-[10px] font-semibold text-neutral-accent">Top Pick</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-[#FAFAFA] rounded text-xs text-[#666666] border border-[#E5E5E5]">{course.level}</span>
                <span className="w-1 h-1 rounded-full bg-[#E5E5E5]" />
                <div className="flex items-center gap-1 text-[#666666] text-xs">
                  <Clock size={10} />
                  <span>{course.duration}</span>
                </div>
              </div>
              
              <h4 className="text-sm font-semibold text-[#222222] mb-4 line-clamp-2 min-h-[2.5rem] group-hover:text-neutral-accent transition-colors leading-snug">
                {course.title}
              </h4>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FAFAFA] rounded-full border border-[#E5E5E5]">
                  <Star size={12} className="text-neutral-accent fill-neutral-accent" />
                  <span className="text-sm font-semibold text-[#222222]">{course.rating}</span>
                </div>
                <button
                  className="flex-1 py-2.5 bg-neutral-accent hover:bg-neutral-text text-white text-xs font-semibold rounded-xl transition-all active:scale-95"
                  style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
