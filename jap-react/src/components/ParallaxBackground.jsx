import { useEffect, useRef } from 'react';

const LAYERS = [
  { depth: 0.22, glow: 'var(--accent-purple)', x: '12%', y: '14%', size: 420 },
  { depth: 0.12, glow: 'var(--accent-magenta)', x: '82%', y: '58%', size: 480 },
  { depth: 0.3, glow: 'var(--accent-yellow)', x: '68%', y: '8%', size: 300 },
];

export default function ParallaxBackground() {
  const glowRefs = useRef([]);
  const shapeRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY || 0;
        LAYERS.forEach((l, i) => {
          const el = glowRefs.current[i];
          if (el) el.style.transform = `translate3d(0, ${(-y * l.depth).toFixed(1)}px, 0)`;
        });
        if (shapeRef.current) shapeRef.current.style.transform = `translate3d(0, ${(-y * 0.18).toFixed(1)}px, 0) rotate(${(y * 0.02).toFixed(2)}deg)`;
        if (ringRef.current) ringRef.current.style.transform = `translate3d(0, ${(-y * 0.08).toFixed(1)}px, 0)`;
      });
    };
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: -1 }}>
      {LAYERS.map((l, i) => (
        <div
          key={i}
          ref={(el) => (glowRefs.current[i] = el)}
          style={{
            position: 'absolute',
            left: l.x,
            top: l.y,
            width: l.size,
            height: l.size,
            marginLeft: -l.size / 2,
            marginTop: -l.size / 2,
            borderRadius: '50%',
            background: l.glow,
            opacity: 0.1,
            filter: 'blur(90px)',
            willChange: 'transform',
          }}
        />
      ))}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 900">
        <circle ref={ringRef} cx="150" cy="240" r="120" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" style={{ willChange: 'transform' }} />
        <rect ref={shapeRef} x="940" y="600" width="180" height="180" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" style={{ transformBox: 'fill-box', transformOrigin: 'center', willChange: 'transform' }} />
      </svg>
    </div>
  );
}
