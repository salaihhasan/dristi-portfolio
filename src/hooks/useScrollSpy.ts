import { useState, useEffect } from 'react';

/**
 * Custom hook that observes a list of section HTML IDs and determines the currently active section.
 * Uses IntersectionObserver with a viewport rootMargin tuned for smooth section triggering.
 */
export const useScrollSpy = (sectionIds: string[], defaultSectionId: string = 'hero'): string => {
  const [activeId, setActiveId] = useState<string>(defaultSectionId);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveId(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds]);

  return activeId;
};
