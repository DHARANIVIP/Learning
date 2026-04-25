import { useState } from 'react';
import { ArrowRight, Star, Users, Clock, GraduationCap, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { realCourses, Course, PROVIDER_COLORS } from '../../../lib/coursesData';
import { RegisterCourseModal } from '../../../components/RegisterCourseModal';

// Show first 3 real courses on home widget
const featured = realCourses.slice(0, 3);

const GRADIENT: Record<string, string> = {
  'AI & ML':          'from-violet-500 to-indigo-600',
  'Computer Science': 'from-blue-500 to-cyan-600',
  'Other':            'from-slate-400 to-gray-500',
};

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <Star key={i} size={10}
      className={i < Math.round(rating)
        ? 'text-amber-400 fill-amber-400'
        : 'text-gray-200 fill-gray-100'} />
  ));
}

const SkeletonCard = () => (
  <div className="animate-pulse rounded-2xl bg-white border border-[#E5E5E5] overflow-hidden"
    style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
    <div className="h-44 bg-[#F3F4F6]" />
    <div className="p-5 flex flex-col gap-3">
      <div className="h-3 bg-[#E5E7EB] rounded w-1/4" />
      <div className="h-4 bg-[#E5E7EB] rounded w-3/4" />
      <div className="h-3 bg-[#E5E7EB] rounded w-1/2" />
      <div className="h-9 bg-[#E5E7EB] rounded-xl mt-2" />
    </div>
  </div>
);

export const RecommendedCourses = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Course | null>(null);

  return (
    <>
      <RegisterCourseModal course={selected} onClose={() => setSelected(null)} />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#222222]">Featured Courses</h3>
          <button onClick={() => navigate('/dashboard/courses')}
            className="text-xs text-[#666666] hover:text-neutral-accent transition-colors flex items-center gap-1.5">
            View All <ArrowRight size={13} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((course, i) => {
            const grad    = GRADIENT[course.sector ?? 'Other'] ?? GRADIENT['Other'];
            const provClr = PROVIDER_COLORS[course.provider ?? 'NQR'] ?? PROVIDER_COLORS['NQR'];

            return (
              <div key={i} onClick={() => setSelected(course)}
                className="group rounded-2xl bg-white border border-[#E5E5E5] overflow-hidden
                           hover:border-neutral-accent/25 hover:-translate-y-1 transition-all
                           duration-200 cursor-pointer"
                style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>

                {/* Thumbnail */}
                <div className="relative h-44 overflow-hidden">
                  {course.image ? (
                    <img src={course.image} alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${grad} flex items-center justify-center`}>
                      <BookOpen size={36} className="text-white/50" />
                    </div>
                  )}
                  {course.image && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  )}
                  {course.provider && (
                    <div className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold border ${provClr}`}>
                      {course.provider}
                    </div>
                  )}
                  {course.level && (
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 bg-black/50 backdrop-blur-sm rounded-full">
                      <span className="text-[10px] font-semibold text-white">{course.level}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h4 className="text-sm font-bold text-[#222222] mb-1 line-clamp-2
                                 group-hover:text-neutral-accent transition-colors leading-snug">
                    {course.title}
                  </h4>
                  {course.instructor && (
                    <p className="text-[11px] text-[#6B7280] mb-2 line-clamp-1">{course.instructor}</p>
                  )}
                  {course.rating && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-amber-500">{course.rating}</span>
                      <div className="flex items-center gap-0.5">{renderStars(course.rating)}</div>
                      {course.enrolledCount && (
                        <span className="text-[11px] text-[#9CA3AF] flex items-center gap-0.5">
                          <Users size={10} /> {course.enrolledCount}
                        </span>
                      )}
                    </div>
                  )}
                  {course.duration && (
                    <p className="text-[11px] text-[#9CA3AF] flex items-center gap-1 mb-4">
                      <Clock size={10} /> {course.duration}
                    </p>
                  )}

                  <button className="w-full flex items-center justify-center gap-1.5 py-2.5
                                     bg-neutral-accent hover:bg-neutral-text text-white text-xs font-semibold
                                     rounded-xl transition-all active:scale-95"
                    style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                    <GraduationCap size={12} />
                    Enroll on {course.provider}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
