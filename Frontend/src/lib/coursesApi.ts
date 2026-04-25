// ─── Course type ──────────────────────────────────────────────────────────────
export interface Course {
  title: string;
  description: string;
  source_url: string;         // Direct enrollment / registration URL
  image?: string;             // Cover image URL
  sector?: string;            // "AI & ML" | "Computer Science" | "Green Energy" | ...
  level?: string;             // "Beginner" | "Intermediate" | "Advanced"
  duration?: string;          // "30 Hours" | "3 Months"
  instructor?: string;        // "Andrew Ng"
  provider?: string;          // "Coursera" | "Udemy" | "edX" | "NPTEL" | "NQR"
  rating?: number;            // 4.9
  enrolledCount?: string;     // "285k"
  isCurated?: boolean;        // true = real platform course
}

const BASE_URL = 'http://localhost:8000';

// Fetch NCVET-certified qualifications from the backend scraper
export async function fetchNqrCourses(): Promise<Course[]> {
  const res = await fetch(`${BASE_URL}/api/v1/courses/real`);
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  const json = await res.json();
  if (json.status === 'success') return json.data as Course[];
  throw new Error(json.message ?? 'Failed to load NQR courses');
}
export type { Course } from './coursesApi';
