import { motion } from 'framer-motion';
import { Star, PlayCircle, Users, Clock, ArrowRight } from 'lucide-react';

export const CoursesPage = () => {
  const courses = [
    { title: "Mastering TypeScript", instructor: "Sarah J.", rating: 4.9, students: "12k", duration: "8h", level: "Intermediate" },
    { title: "React Design Patterns", instructor: "David K.", rating: 4.8, students: "8.5k", duration: "10h", level: "Advanced" },
    { title: "Modern CSS Techniques", instructor: "Emma W.", rating: 4.7, students: "5k", duration: "6.5h", level: "Beginner" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-7"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-semibold text-[#111827]">Recommended Courses</h1>
        <p className="text-sm text-[#6B7280] mt-1">Curated skills based on your profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course, i) => (
          <div
            key={i}
            className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 group flex flex-col"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            {/* Thumbnail */}
            <div className="h-36 bg-[#F9FAFB] relative overflow-hidden flex items-center justify-center border-b border-[#E5E7EB]">
              <PlayCircle size={40} className="text-[#D1D5DB] group-hover:text-neutral-accent transition-colors duration-200" />
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-white border border-[#E5E7EB] text-xs text-[#6B7280]">
                {course.level}
              </div>
              <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-md bg-white border border-[#E5E7EB] text-xs font-semibold text-[#111827] flex items-center gap-1">
                <Star size={10} className="fill-amber-400 text-amber-400" /> {course.rating}
              </div>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-base font-semibold text-[#111827] mb-1 group-hover:text-neutral-accent transition-colors leading-tight">
                {course.title}
              </h3>
              <p className="text-sm text-[#6B7280] mb-4">By {course.instructor}</p>

              <div className="flex items-center gap-4 text-xs text-[#9CA3AF] mb-5">
                <div className="flex items-center gap-1"><Users size={12} /> {course.students} students</div>
                <div className="flex items-center gap-1"><Clock size={12} /> {course.duration}</div>
              </div>

              {/* Footer */}
              <div className="mt-auto pt-4 border-t border-[#F3F4F6] flex gap-2">
                <button
                  className="flex-1 py-2 bg-black hover:bg-neutral-800 text-white text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5"
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
                >
                  Enroll Now
                </button>
                <button className="px-3 py-2 border border-[#D1D5DB] rounded-lg hover:border-neutral-accent/40 transition-all">
                  <ArrowRight size={14} className="text-[#6B7280]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
