import { useRef, useEffect } from 'react';

const PURPLE = '#7B2FF0';
const YELLOW = '#FFD600';
const MAGENTA = '#FF2D8A';

const SEGMENTS = [
  { d: 'M150 28 L150 122 Q150 175 100 175 Q54 175 54 133', color: PURPLE },
  { d: 'M205 175 L263 28 L321 175', color: YELLOW },
  { d: 'M232 122 L294 122', color: YELLOW },
  { d: 'M420 175 L420 28 Q492 28 492 72 Q492 116 420 116', color: MAGENTA },
];

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t) => t * t * t;

export default function LogoAnimation({ size = 'min(72vw, 420px)', autoPlay = true, loop = true }) {
  const pathRefs = useRef([]);
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const rafRef = useRef(0);
  const timerRef = useRef(0);

  useEffect(() => {
    const paths = pathRefs.current.filter(Boolean);
    if (!paths.length) return;

    const lengths = paths.map((p) => p.getTotalLength());
    const total = lengths.reduce((a, b) => a + b, 0);
    paths.forEach((p, i) => {
      p.style.strokeDasharray = lengths[i];
      p.style.strokeDashoffset = lengths[i];
    });

    const cursor = cursorRef.current;
    const trail = trailRef.current;

    const render = (drawnLen, showCursor) => {
      let acc = 0;
      let frontier = null;
      for (let i = 0; i < paths.length; i++) {
        const L = lengths[i];
        const start = acc;
        const end = acc + L;
        let visible;
        if (drawnLen >= end) visible = L;
        else if (drawnLen <= start) visible = 0;
        else visible = drawnLen - start;
        paths[i].style.strokeDashoffset = L - visible;
        if (frontier === null && visible > 0 && visible < L + 0.5 && drawnLen < total) {
          frontier = { path: paths[i], at: visible, color: SEGMENTS[i].color };
        }
        acc = end;
      }
      if (showCursor && frontier && drawnLen > 0 && drawnLen < total) {
        const pt = frontier.path.getPointAtLength(frontier.at);
        cursor.setAttribute('cx', pt.x);
        cursor.setAttribute('cy', pt.y);
        cursor.setAttribute('fill', frontier.color);
        cursor.style.color = frontier.color;
        cursor.style.opacity = 1;
        const back = frontier.path.getPointAtLength(Math.max(0, frontier.at - 14));
        trail.setAttribute('cx', back.x);
        trail.setAttribute('cy', back.y);
        trail.setAttribute('fill', frontier.color);
        trail.style.opacity = 0.35;
      } else {
        cursor.style.opacity = 0;
        trail.style.opacity = 0;
      }
    };

    const tween = (fromLen, toLen, duration, easing) =>
      new Promise((resolve) => {
        const startT = performance.now();
        const step = (now) => {
          const t = Math.min(1, (now - startT) / duration);
          render(fromLen + (toLen - fromLen) * easing(t), true);
          if (t < 1) rafRef.current = requestAnimationFrame(step);
          else resolve();
        };
        rafRef.current = requestAnimationFrame(step);
      });

    const wait = (ms) => new Promise((r) => { timerRef.current = setTimeout(r, ms); });

    let cancelled = false;
    const run = async () => {
      render(0, false);
      await tween(0, total, 2550, easeOutCubic);
      if (cancelled) return;
      render(total, false);
      await wait(2000);
      if (cancelled) return;
      await tween(total, 0, 2350, easeInCubic);
      if (cancelled) return;
      await wait(1200);
      if (cancelled) return;
      await tween(0, total, 2550, easeOutCubic);
      if (cancelled) return;
      render(total, false);
      if (loop) { await wait(2600); if (!cancelled) run(); }
    };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (autoPlay && !reduce) run();
    else render(total, false);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timerRef.current);
    };
  }, [autoPlay, loop]);

  return (
    <svg viewBox="0 0 546 203" width={size} style={{ display: 'block', overflow: 'visible', maxWidth: '100%' }} role="img" aria-label="JAP">
      {SEGMENTS.map((s, i) => (
        <path
          key={i}
          ref={(el) => (pathRefs.current[i] = el)}
          d={s.d}
          fill="none"
          stroke={s.color}
          strokeWidth="38"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      <circle ref={trailRef} r="15" style={{ opacity: 0, filter: 'blur(6px)' }} />
      <circle ref={cursorRef} r="14" style={{ opacity: 0, filter: 'drop-shadow(0 0 14px currentColor)' }} />
    </svg>
  );
}
