import { useState, useEffect } from 'react';

const BASE_COUNT = 2847;
const STORAGE_KEY = 'twotable_waitlist_count';

export function useWaitlistCounter() {
  const [count, setCount] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return parseInt(stored, 10);
    }
    // Initialize with base + random increment based on time
    const daysSinceLaunch = Math.floor((Date.now() - new Date('2026-01-01').getTime()) / (1000 * 60 * 60 * 24));
    const initialCount = BASE_COUNT + Math.floor(daysSinceLaunch * 12.5);
    localStorage.setItem(STORAGE_KEY, String(initialCount));
    return initialCount;
  });

  const increment = () => {
    setCount(prev => {
      const newCount = prev + 1;
      localStorage.setItem(STORAGE_KEY, String(newCount));
      return newCount;
    });
  };

  // Simulate others joining (subtle increments)
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setCount(prev => {
          const newCount = prev + 1;
          localStorage.setItem(STORAGE_KEY, String(newCount));
          return newCount;
        });
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return { count, increment };
}
