import useScrollReveal from '../hooks/useScrollReveal.js';

export default function Reveal({ children, delay = 0, style }) {
  const [ref, shown] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`reveal${shown ? ' is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}
