/**
 * ChapterIndicator — Fixed side-nav dot indicator
 *
 * Displays a vertical column of small dots on the right edge of the viewport,
 * one per chapter. The active chapter's dot is enlarged and accented. Hovering
 * reveals the chapter label. Clicking scrolls to the corresponding section.
 *
 * Props:
 *   chapters       – Array of { id: string, label: string }
 *   activeChapter  – The `id` of the currently active chapter
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './ChapterIndicator.css';

/* Easing curve matching var(--ease-out-expo) */
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

function ChapterIndicator({ chapters = [], activeChapter }) {
  const [hoveredId, setHoveredId] = useState(null);

  /**
   * Scroll to a chapter section by id.
   * Uses native smooth scrolling (Lenis intercepts this).
   */
  const scrollToChapter = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!chapters.length) return null;

  return (
    <nav className="chapter-indicator" aria-label="Page chapters">
      {/* Vertical connecting line between dots */}
      <div className="chapter-indicator__line" />

      {chapters.map((chapter) => {
        const isActive = chapter.id === activeChapter;
        const isHovered = chapter.id === hoveredId;

        return (
          <button
            key={chapter.id}
            className={`chapter-indicator__item ${isActive ? 'chapter-indicator__item--active' : ''}`}
            onClick={() => scrollToChapter(chapter.id)}
            onMouseEnter={() => setHoveredId(chapter.id)}
            onMouseLeave={() => setHoveredId(null)}
            aria-label={`Scroll to ${chapter.label}`}
            aria-current={isActive ? 'true' : undefined}
          >
            {/* Animated dot */}
            <motion.span
              className={`chapter-indicator__dot ${isActive ? 'chapter-indicator__dot--active' : ''}`}
              animate={{
                width: isActive ? 10 : 6,
                height: isActive ? 10 : 6,
              }}
              transition={{
                duration: 0.4,
                ease: EASE_OUT_EXPO,
              }}
            />

            {/* Label that slides in on hover */}
            <AnimatePresence>
              {(isHovered || isActive) && (
                <motion.span
                  className="chapter-indicator__label"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{
                    duration: 0.3,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  {chapter.label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </nav>
  );
}

export default ChapterIndicator;
