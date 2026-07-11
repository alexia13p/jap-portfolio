const ACCENTS = ['var(--accent-purple)', 'var(--accent-yellow)', 'var(--accent-magenta)'];

function Item({ it, i }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', textAlign: 'center' }}>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 'var(--fw-display-bold)',
          fontSize: 'clamp(24px, 3.2vw, 30px)',
          lineHeight: 1,
          color: it.accent === false ? 'var(--text-primary)' : ACCENTS[i % ACCENTS.length],
        }}
      >
        {it.value}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-label)',
          letterSpacing: 'var(--ls-label)',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
          whiteSpace: 'nowrap',
        }}
      >
        {it.label}
      </div>
    </div>
  );
}

export default function TrustBar({ items = [], scrolling = false, speed = 32 }) {
  if (scrolling) {
    const loop = [...items, ...items];
    return (
      <div
        className="trustbar-marquee"
        style={{
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          overflow: 'hidden',
          padding: '30px 0',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
          maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        }}
      >
        <style>{`
          @keyframes trustbar-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .trustbar-track { display: flex; width: max-content; animation: trustbar-scroll ${speed}s linear infinite; }
          .trustbar-marquee:hover .trustbar-track { animation-play-state: paused; }
          @media (prefers-reduced-motion: reduce) { .trustbar-track { animation: none; } }
        `}</style>
        <div className="trustbar-track">
          {loop.map((it, i) => (
            <div key={i} style={{ padding: '0 44px', display: 'flex', alignItems: 'center' }}>
              <Item it={it} i={i % items.length} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 'var(--content-max)',
        margin: '0 auto',
        padding: '30px 24px',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '24px 20px',
      }}
    >
      {items.map((it, i) => (
        <div key={it.label} style={{ flex: '1 1 120px' }}>
          <Item it={it} i={i} />
        </div>
      ))}
    </div>
  );
}
