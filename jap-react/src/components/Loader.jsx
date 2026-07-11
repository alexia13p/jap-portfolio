export default function Loader() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '22px',
        background: 'var(--navy)',
        zIndex: 9999,
        animation: 'jap-fade-in 0.4s ease',
      }}
    >
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '40px', letterSpacing: '0.02em' }}>
        <span style={{ color: 'var(--accent-purple)' }}>J</span>
        <span style={{ color: 'var(--accent-yellow)' }}>A</span>
        <span style={{ color: 'var(--accent-magenta)' }}>P</span>
      </div>
      <div
        style={{
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.14)',
          borderTopColor: 'var(--accent-blue-glow)',
          animation: 'jap-spin 0.9s linear infinite',
        }}
      />
    </div>
  );
}
