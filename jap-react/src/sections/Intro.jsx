import LogoAnimation from '../components/LogoAnimation.jsx';

export default function Intro() {
  return (
    <header
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 24px',
        gap: '32px',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 'var(--fw-display-bold)',
          fontSize: 'var(--fs-hero)',
          lineHeight: 'var(--lh-tight)',
          color: 'var(--text-primary)',
          margin: 0,
          textAlign: 'left',
        }}
      >
        hi,<br />i'm
      </h1>

      <LogoAnimation size="min(72vw, 420px)" />

      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 'var(--fw-display-bold)',
          fontSize: 'var(--fs-hero)',
          lineHeight: 'var(--lh-tight)',
          color: 'var(--text-primary)',
          textAlign: 'center',
        }}
      >
        your IT Specialist
      </div>
    </header>
  );
}
