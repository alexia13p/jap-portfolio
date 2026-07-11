import Reveal from '../components/Reveal.jsx';

export default function Philosophy() {
  return (
    <section style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: 'var(--space-section) 24px', textAlign: 'center' }}>
      <Reveal>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-display-bold)', fontSize: 'var(--fs-statement)', color: 'var(--text-primary)', margin: 0 }}>
          made with focus.
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 'var(--lh-body)', color: 'var(--text-secondary)', maxWidth: 'var(--statement-max)', margin: '18px auto 0' }}>
          I believe good IT work is reliable, documented, and continuously improving. Technology should support people, not confuse them.
        </p>
      </Reveal>
    </section>
  );
}
