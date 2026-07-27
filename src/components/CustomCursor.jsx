import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isTouch, setIsTouch] = useState(false);
  const [particles, setParticles] = useState([]);

  // Raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Keep track of last particle spawn position to throttle by distance
  const lastSpawnRef = useRef({ x: 0, y: 0 });

  // Smoothed spring values
  const springConfig = { stiffness: 500, damping: 28, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Detect touch device
  useEffect(() => {
    const mq = window.matchMedia?.('(hover: none)');
    if (!mq) return;
    setIsTouch(mq.matches);

    const handler = (e) => setIsTouch(e.matches);
    if (mq.addEventListener) {
      mq.addEventListener('change', handler);
    } else if (mq.addListener) {
      mq.addListener(handler);
    }
    
    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener('change', handler);
      } else if (mq.removeListener) {
        mq.removeListener(handler);
      }
    };
  }, []);

  // Mouse move handler
  const handleMouseMove = useCallback(
    (e) => {
      const x = e.clientX;
      const y = e.clientY;
      mouseX.set(x);
      mouseY.set(y);

      if (isTouch) return;

      // Throttle particle spawning by distance (at least 8px of movement)
      const lastSpawn = lastSpawnRef.current;
      const dist = Math.hypot(x - lastSpawn.x, y - lastSpawn.y);
      if (dist > 8) {
        const newParticle = {
          id: `${Date.now()}-${Math.random()}`,
          x,
          y,
        };
        
        setParticles((prev) => [...prev.slice(-15), newParticle]); // Limit to max 15 active particles
        lastSpawnRef.current = { x, y };
      }
    },
    [mouseX, mouseY, isTouch]
  );

  // Cleanup old particles periodically
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 150); // Match CSS fade animation duration
    return () => clearTimeout(timer);
  }, [particles]);

  // Hover detection
  const handleMouseOver = useCallback((e) => {
    const target = e.target;

    // Check for data-cursor-text
    const textEl =
      target.closest('[data-cursor-text]') ||
      (target.hasAttribute && target.hasAttribute('data-cursor-text')
        ? target
        : null);

    if (textEl) {
      setCursorText(textEl.getAttribute('data-cursor-text'));
      setIsHovering(true);
      return;
    }

    // Check for interactive elements
    if (
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest?.('a') ||
      target.closest?.('button') ||
      target.closest?.('.hover-target') ||
      (target.classList && typeof target.classList.contains === 'function' && target.classList.contains('hover-target'))
    ) {
      setCursorText('');
      setIsHovering(true);
      return;
    }

    setCursorText('');
    setIsHovering(false);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isTouch, handleMouseMove, handleMouseOver]);

  if (isTouch) return null;

  const hasText = cursorText.length > 0;
  const size = hasText ? 80 : isHovering ? 36 : 12;

  return (
    <>
      {/* Stardust Trail Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="cursor-particle"
          style={{
            left: p.x,
            top: p.y,
          }}
        />
      ))}

      {/* Main Cursor Dot */}
      <motion.div
        className="custom-cursor"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: size,
          height: size,
          backgroundColor: hasText
            ? 'rgba(108, 61, 255, 0.9)' // Brand Purple #6C3DFF
            : isHovering
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(255, 255, 255, 1)',
          border: isHovering && !hasText
            ? '1.5px solid rgba(255, 255, 255, 0.4)'
            : hasText
            ? '1.5px solid rgba(108, 61, 255, 0.6)'
            : '0px solid transparent',
        }}
        transition={{
          width: { type: 'spring', stiffness: 400, damping: 28 },
          height: { type: 'spring', stiffness: 400, damping: 28 },
          backgroundColor: { duration: 0.2 },
          border: { duration: 0.2 },
        }}
      >
        <span className={`cursor-text ${hasText ? 'visible' : ''}`}>
          {cursorText}
        </span>
      </motion.div>
    </>
  );
};

export default CustomCursor;
