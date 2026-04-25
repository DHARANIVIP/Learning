import { useState, useEffect } from 'react';
import type { Course } from './coursesApi';
import { realCourses } from './coursesData';

const BASE_URL = 'http://127.0.0.1:8000';

export function useCourses(search: string = '', category: string = 'All') {
  // ✅ Pre-populate with curated courses so the page NEVER shows empty
  const [courses, setCourses] = useState<Course[]>(realCourses);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCourses = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.append('search', search);
        if (category && category !== 'All') queryParams.append('category', category);
        queryParams.append('limit', '100');

        const res = await fetch(`${BASE_URL}/api/courses?${queryParams.toString()}`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        if (json.status === 'success' && json.data?.length > 0) {
          setCourses(json.data);
          setError(null);
        } else {
          // Backend returned empty or error — apply local filter on static data
          applyLocalFilter(search, category);
        }
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        // Backend unreachable — silently fall back to local static data
        console.warn('Backend unavailable, using local course data.');
        applyLocalFilter(search, category);
      } finally {
        setLoading(false);
      }
    };

    const applyLocalFilter = (search: string, category: string) => {
      const filtered = realCourses.filter((c) => {
        const matchText = !search || c.title.toLowerCase().includes(search.toLowerCase());
        const matchCat = !category || category === 'All' || c.sector === category;
        return matchText && matchCat;
      });
      setCourses(filtered);
    };

    // Small debounce for search typing
    const timeoutId = setTimeout(fetchCourses, 300);
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [search, category]);

  return { courses, loading, error };
}
