import { gsap } from 'gsap';

export function playIntro(targets, opts = {}) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !targets) return;
  gsap.fromTo(
    targets,
    { autoAlpha: 0, y: 26 },
    { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, ...opts }
  );
}

export function fadeUp(target, opts = {}) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !target) return;
  gsap.fromTo(
    target,
    { autoAlpha: 0, y: 24 },
    { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out', ...opts }
  );
}
