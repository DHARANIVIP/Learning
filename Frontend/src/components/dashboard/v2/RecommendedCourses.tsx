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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-neutral-text tracking-tight">Recommended for You</h3>
        <button className="text-xs font-bold text-neutral-muted uppercase tracking-widest hover:text-neutral-accent transition-colors flex items-center gap-2">
          View All <ArrowRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {courses.map((course, i) => (
          <div key={i} className="group rounded-2xl bg-white border border-neutral-secondary/10 overflow-hidden hover:border-neutral-accent/20 transition-all hover:translate-y-[-4px] shadow-subtle">
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute top-4 left-4 px-4 py-1.5 bg-white/95 backdrop-blur-md rounded-full border border-white/50 flex items-center gap-2 shadow-lg">
                <Zap size={10} className="text-neutral-accent fill-neutral-accent" />
                <span className="text-[10px] font-black text-neutral-accent uppercase tracking-widest">Top Pick</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-0.5 bg-neutral-bg rounded text-[10px] font-bold text-neutral-muted uppercase tracking-widest border border-neutral-secondary/10">{course.level}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-secondary/40" />
                <div className="flex items-center gap-1 text-neutral-muted text-[10px] font-bold uppercase tracking-widest">
                  <Clock size={10} />
                  <span>{course.duration}</span>
                </div>
              </div>
              
              <h4 className="text-lg font-bold text-neutral-text mb-6 line-clamp-2 min-h-[3.5rem] group-hover:text-neutral-accent transition-colors leading-tight tracking-tight">
                {course.title}
              </h4>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-neutral-bg rounded-full border border-neutral-secondary/10">
                  <Star size={14} className="text-neutral-accent fill-neutral-accent" />
                  <span className="text-sm font-bold text-neutral-text">{course.rating}</span>
                </div>
                <button className="flex-1 py-3 bg-neutral-accent hover:bg-neutral-text text-white text-xs font-bold rounded-xl transition-all shadow-lg active:scale-95">
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
