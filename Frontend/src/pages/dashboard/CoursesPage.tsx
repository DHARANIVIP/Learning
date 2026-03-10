import { motion } from 'framer-motion';
import { Star, PlayCircle, Users, Clock } from 'lucide-react';

export const CoursesPage = () => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-4xl font-black text-neutral-text uppercase tracking-tight">Recommended <span className="text-neutral-accent opacity-20">Courses</span></h1>
        <p className="text-neutral-muted font-bold uppercase tracking-widest text-[10px] mt-2">Curated skills based on your profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[
          { title: "Mastering TypeScript", instructor: "Sarah J.", rating: 4.9, students: "12k", duration: "8h" },
          { title: "React Design Patterns", instructor: "David K.", rating: 4.8, students: "8.5k", duration: "10h" },
          { title: "Modern CSS Techniques", instructor: "Emma W.", rating: 4.7, students: "5k", duration: "6.5h" }
        ].map((course, i) => (
          <div key={i} className="bg-white border border-neutral-secondary/10 rounded-2xl overflow-hidden shadow-subtle hover:border-neutral-accent/20 transition-all group">
            <div className="h-48 bg-neutral-bg relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center p-8 opacity-10 group-hover:scale-110 transition-transform">
                <PlayCircle size={64} className="text-neutral-accent" />
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white text-[10px] font-black uppercase text-neutral-text flex items-center gap-1 shadow-lg">
                <Star size={10} className="fill-neutral-accent text-neutral-accent" /> {course.rating}
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-neutral-text mb-4 group-hover:text-neutral-accent transition-colors leading-tight">
                {course.title}
              </h3>
              <p className="text-sm text-neutral-muted mb-6 font-medium">By {course.instructor}</p>
              <div className="flex justify-between items-center text-[10px] font-black uppercase text-neutral-muted border-t border-neutral-secondary/10 pt-6">
                <div className="flex items-center gap-1"><Users size={14} /> {course.students}</div>
                <div className="flex items-center gap-1"><Clock size={14} /> {course.duration}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
