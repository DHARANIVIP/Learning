import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search, ExternalLink, BookOpen, AlertCircle,
  ChevronDown, Clock, GraduationCap, X, Star, Users,
} from 'lucide-react';
import { useCourses } from '../../lib/useCourses';
import { Course, PROVIDER_COLORS } from '../../lib/coursesData';
import { RegisterCourseModal } from '../../components/RegisterCourseModal';

// ─── Constants ────────────────────────────────────────────────────────────────
const PAGE_SIZE = 9;

const CATEGORIES = ['All', 'AI & ML', 'Computer Science', 'Green Energy',
  'Healthcare', 'Skilled Trades', 'Hospitality & Retail'];

const GRADIENT: Record<string, string> = {
  'AI & ML':              'from-violet-500 to-indigo-600',
  'Computer Science':     'from-blue-500 to-cyan-600',
  'Green Energy':         'from-emerald-500 to-teal-600',
  'Healthcare':           'from-rose-500 to-pink-600',
  'Skilled Trades':       'from-amber-500 to-orange-600',
  'Hospitality & Retail': 'from-fuchsia-500 to-purple-600',
  'Other':                'from-slate-400 to-gray-500',
};

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <Star key={i} size={10}
      className={i < Math.round(rating)
        ? 'text-amber-400 fill-amber-400'
        : 'text-gray-200 fill-gray-100'} />
  ));
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden animate-pulse flex flex-col"
    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
    <div className="h-44 bg-[#F3F4F6]" />
    <div className="p-5 flex flex-col gap-3 flex-1">
      <div className="h-3 bg-[#E5E7EB] rounded w-1/4" />
      <div className="h-4 bg-[#E5E7EB] rounded w-3/4" />
      <div className="h-3 bg-[#E5E7EB] rounded w-1/2" />
      <div className="flex gap-1 mt-1">{Array.from({length:5}).map((_,i)=><div key={i} className="w-3 h-3 bg-[#E5E7EB] rounded-full"/>)}</div>
      <div className="mt-auto pt-4 border-t border-[#F3F4F6]"><div className="h-9 bg-[#E5E7EB] rounded-xl" /></div>
    </div>
  </div>
);

// ─── Coursera-style Card ──────────────────────────────────────────────────────
const CourseCard = ({ course, index, onClick }: { course: Course; index: number; onClick: () => void }) => {
  const grad    = GRADIENT[course.sector ?? 'Other'] ?? GRADIENT['Other'];
  const provClr = PROVIDER_COLORS[course.provider ?? 'NQR'] ?? PROVIDER_COLORS['NQR'];
  const isNqr   = course.provider === 'NQR' || !course.provider;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.04, 0.32) }}
      onClick={onClick}
      className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden cursor-pointer
                 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 group flex flex-col"
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
    >
      {/* ── Thumbnail ── */}
      <div className="relative h-44 overflow-hidden">
        {course.image ? (
          <img src={course.image} alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${grad} flex items-center justify-center`}>
            <BookOpen size={36} className="text-white/50 group-hover:text-white/70 transition-colors" />
          </div>
        )}
        {course.image && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        )}

        {/* Provider badge — top left */}
        {course.provider && (
          <div className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold border ${provClr}`}>
            {course.provider}
          </div>
        )}

        {/* Level — top right */}
        {course.level && (
          <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 bg-black/50 backdrop-blur-sm rounded-full">
            <span className="text-[10px] font-semibold text-white">{course.level}</span>
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-sm font-bold text-[#111827] leading-snug line-clamp-2 mb-1.5
                       group-hover:text-neutral-accent transition-colors">
          {course.title}
        </h3>

        {/* Instructor */}
        {course.instructor && (
          <p className="text-[11px] text-[#6B7280] mb-3 line-clamp-1">
            {course.instructor}
          </p>
        )}

        {/* Rating row */}
        {course.rating ? (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-amber-500">{course.rating}</span>
            <div className="flex items-center gap-0.5">{renderStars(course.rating)}</div>
            {course.enrolledCount && (
              <span className="text-[11px] text-[#9CA3AF] flex items-center gap-0.5">
                <Users size={10} /> {course.enrolledCount}
              </span>
            )}
          </div>
        ) : (
          /* NQR courses: show sector + duration */
          <div className="flex items-center gap-2 text-[11px] text-[#9CA3AF] mb-3">
            {course.sector && <span>{course.sector}</span>}
            {course.duration && <><span>·</span><span className="flex items-center gap-0.5"><Clock size={9}/> {course.duration}</span></>}
          </div>
        )}

        {/* Duration chip for curated courses */}
        {course.duration && course.isCurated && (
          <div className="flex items-center gap-1 text-[11px] text-[#9CA3AF] mb-3">
            <Clock size={10} /> {course.duration}
            {course.sector && <><span className="mx-1">·</span><span>{course.sector}</span></>}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-[#F3F4F6]">
          <button
            className="w-full py-2.5 flex items-center justify-center gap-1.5
                       bg-black hover:bg-neutral-800 text-white text-xs font-semibold
                       rounded-xl transition-all active:scale-95"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
          >
            <GraduationCap size={12} />
            {isNqr ? 'View Course' : `Enroll on ${course.provider}`}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export const CoursesPage = () => {
  const [search, setSearch]       = useState('');
  const [category, setCategory]   = useState('All');
  const [visibleCount, setVisible] = useState(PAGE_SIZE);
  const [selected, setSelected]   = useState<Course | null>(null);

  // Pass search and category to the hook to leverage backend filtering
  const { courses, loading, error } = useCourses(search, category);

  const displayed = courses.slice(0, visibleCount);
  const hasMore   = visibleCount < courses.length;

  const handleSearch   = (v: string) => { setSearch(v);   setVisible(PAGE_SIZE); };
  const handleCategory = (v: string) => { setCategory(v); setVisible(PAGE_SIZE); };

  return (
    <>
      <RegisterCourseModal course={selected} onClose={() => setSelected(null)} />

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        className="space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-[#111827]">Courses & Qualifications</h1>
            <p className="text-sm text-[#6B7280] mt-0.5">
              {`${courses.length} courses — Coursera, Udemy, edX, NPTEL${loading ? ' · Syncing…' : ''}`}
            </p>
          </div>
          <a href="https://www.nqr.gov.in/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#111827] transition-colors shrink-0">
            <ExternalLink size={12} /> NQR Registry
          </a>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
          <input type="text" value={search} onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search courses, instructors, providers…"
            className="w-full pl-10 pr-10 py-3 text-sm rounded-xl border border-[#E5E7EB]
                       focus:border-neutral-accent focus:outline-none transition-all bg-white placeholder:text-[#9CA3AF]"
            style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }} />
          {search && (
            <button onClick={() => handleSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#9CA3AF] hover:text-[#374151] transition-colors">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => handleCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                category === cat
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#9CA3AF]'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="flex flex-col items-center py-20 gap-4 text-center">
            <div className="p-4 rounded-full bg-red-50 border border-red-100">
              <AlertCircle size={28} className="text-red-400" />
            </div>
            <div>
              <p className="font-semibold text-[#111827]">Backend not reachable</p>
              <p className="text-sm text-[#6B7280] mt-1">{error}</p>
            </div>
            <button onClick={() => window.location.reload()}
              className="px-5 py-2 rounded-xl border border-[#E5E7EB] text-sm text-[#374151] hover:border-[#9CA3AF] transition-all">
              Retry
            </button>
          </div>
        )}

        {/* Results count */}
        {!loading && !error && (
          <p className="text-xs text-[#9CA3AF]">
            Showing {displayed.length} of {courses.length} result{courses.length !== 1 ? 's' : ''}
            {search ? ` for "${search}"` : ''}{category !== 'All' ? ` in ${category}` : ''}
          </p>
        )}

        {/* Empty */}
        {!loading && !error && courses.length === 0 && (
          <div className="flex flex-col items-center py-16 gap-3 text-center">
            <Search size={32} className="text-[#D1D5DB]" />
            <p className="font-semibold text-[#374151]">No courses found</p>
            <p className="text-sm text-[#9CA3AF]">Try a different search or category.</p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && displayed.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayed.map((course, i) => (
              <CourseCard key={`${course.title}-${i}`} course={course} index={i}
                onClick={() => setSelected(course)} />
            ))}
          </div>
        )}

        {/* See More */}
        {!loading && !error && hasMore && (
          <div className="flex justify-center pt-2">
            <button onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="flex items-center gap-2 px-8 py-3 rounded-xl border border-[#E5E7EB]
                         bg-white text-sm font-semibold text-[#374151]
                         hover:border-neutral-accent hover:text-neutral-accent transition-all active:scale-95"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <ChevronDown size={15} /> See More
              <span className="text-[#9CA3AF] font-normal text-xs">
                ({displayed.length} of {courses.length})
              </span>
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
};
