const MAP = {
  purple: { bg: 'var(--tint-purple)', fg: 'var(--accent-purple)' },
  yellow: { bg: 'var(--tint-yellow)', fg: 'var(--accent-yellow)' },
  magenta: { bg: 'var(--tint-magenta)', fg: 'var(--accent-magenta)' },
};

export default function Tag({ children, accent }) {
  const c = MAP[accent];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '5px 12px',
        borderRadius: 'var(--radius-pill)',
        border: '1px solid var(--border)',
        background: c ? c.bg : 'transparent',
        color: c ? c.fg : 'var(--text-secondary)',
        fontFamily: 'var(--font-body)',
        fontSize: '13px',
        fontWeight: 'var(--fw-body-medium)',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}
