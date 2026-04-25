import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BadgeCheck, BookOpen, Clock, GraduationCap, ExternalLink, Star, Users } from 'lucide-react';
import { Course, PROVIDER_COLORS } from '../lib/coursesData';

interface Props {
  course: Course | null;
  onClose: () => void;
}

const GRADIENT: Record<string, string> = {
  'AI & ML':          'from-violet-500 to-indigo-600',
  'Computer Science': 'from-blue-500 to-cyan-600',
  'Green Energy':     'from-emerald-500 to-teal-600',
  'Healthcare':       'from-rose-500 to-pink-600',
  'Skilled Trades':   'from-amber-500 to-orange-600',
  'Hospitality & Retail': 'from-fuchsia-500 to-purple-600',
  'Other':            'from-slate-500 to-gray-600',
};

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      size={12}
      className={i < Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300 fill-gray-200'}
    />
  ));
}

export const RegisterCourseModal = ({ course, onClose }: Props) => {
  const [name, setName]   = useState('');
  const [email, setEmail] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = course ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [course]);

  if (!course) return null;

  const grad    = GRADIENT[course.sector ?? 'Other'] ?? GRADIENT['Other'];
  const provClr = PROVIDER_COLORS[course.provider ?? 'NQR'] ?? PROVIDER_COLORS['NQR'];
  const isNqr   = course.provider === 'NQR' || !course.provider;
  const ctaText = isNqr
    ? 'View on NQR ↗'
    : `Enroll on ${course.provider} ↗`;

  const handleEnroll = async () => {
    if (!name || !email) {
      alert("Please enter Name and Email to register.");
      return;
    }
    
    setIsLoading(true);
    try {
      // Intent Tracking: Notify the backend that the user is enrolling
      await fetch('http://127.0.0.1:8000/api/user/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: (course as any)._id || course.title,
          courseTitle: course.title,
          name,
          email
        })
      });
      
      // Redirect to external site
      window.open(course.source_url, '_blank', 'noopener,noreferrer');
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to register. Proceeding to external site.");
      window.open(course.source_url, '_blank', 'noopener,noreferrer');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {course && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Image / Gradient header ── */}
            <div className="relative h-52 overflow-hidden flex-shrink-0">
              {course.image ? (
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${grad} flex items-center justify-center`}>
                  <BookOpen size={52} className="text-white/50" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Provider badge */}
              {course.provider && (
                <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold border ${provClr}`}>
                  {course.provider}
                </div>
              )}

              {/* Rating overlay */}
              {course.rating && (
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <div className="flex items-center gap-0.5">{renderStars(course.rating)}</div>
                  <span className="text-white text-xs font-bold">{course.rating}</span>
                  {course.enrolledCount && (
                    <span className="text-white/70 text-[11px] flex items-center gap-1">
                      <Users size={10} /> {course.enrolledCount} enrolled
                    </span>
                  )}
                </div>
              )}

              {/* NCVET badge */}
              {isNqr && (
                <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                  <BadgeCheck size={11} className="text-emerald-500" />
                  <span className="text-[10px] font-bold text-emerald-700">NCVET Certified</span>
                </div>
              )}

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-1.5 bg-black/40 hover:bg-black/60 text-white rounded-full transition-all"
              >
                <X size={15} />
              </button>
            </div>

            {/* ── Body ── */}
            <div className="p-6">
              <h2 className="text-lg font-bold text-[#111827] leading-snug mb-2">{course.title}</h2>

              {/* Instructor */}
              {course.instructor && (
                <p className="text-sm text-[#6B7280] mb-3">
                  by <span className="font-semibold text-[#374151]">{course.instructor}</span>
                </p>
              )}

              {/* Meta chips */}
              <div className="flex flex-wrap gap-2 mb-4">
                {course.level && (
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F3F4F6] text-[#374151] border border-[#E5E7EB]">
                    <GraduationCap size={9} /> {course.level}
                  </span>
                )}
                {course.duration && (
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F3F4F6] text-[#374151] border border-[#E5E7EB]">
                    <Clock size={9} /> {course.duration}
                  </span>
                )}
                {course.sector && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F3F4F6] text-[#374151] border border-[#E5E7EB]">
                    {course.sector}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-[#6B7280] leading-relaxed mb-5">{course.description}</p>

              <div className="border-t border-[#F3F4F6] mb-5" />

              {/* Quick Register form */}
              <p className="text-sm font-semibold text-[#111827] mb-3">Quick Register</p>
              <div className="space-y-3 mb-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#E5E7EB] focus:border-neutral-accent focus:outline-none transition-all bg-[#FAFAFA] placeholder:text-[#9CA3AF]"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#E5E7EB] focus:border-neutral-accent focus:outline-none transition-all bg-[#FAFAFA] placeholder:text-[#9CA3AF]"
                />
              </div>

              {/* CTA */}
              <div className="flex gap-3">
                <button
                  onClick={handleEnroll}
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-black hover:bg-neutral-800 text-white text-sm font-semibold rounded-xl transition-all active:scale-95 disabled:opacity-70"
                  style={{ boxShadow: '0 4px 14px rgba(0,0,0,0.18)' }}
                >
                  {isLoading ? 'Processing...' : <><ExternalLink size={13} /> {ctaText}</>}
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl border border-[#E5E7EB] text-sm text-[#6B7280] hover:border-[#9CA3AF] transition-all"
                >
                  Cancel
                </button>
              </div>

              {!isNqr && (
                <p className="text-[11px] text-[#9CA3AF] text-center mt-3">
                  Registration completes on {course.provider}'s official website
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
