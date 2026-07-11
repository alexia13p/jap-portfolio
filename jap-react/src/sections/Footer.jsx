import { SOCIALS } from '../data/portfolio.js';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} className="footer-link" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-secondary)' }}>
              {s.label}
            </a>
          ))}
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-faint)', marginTop: '20px' }}>
          © 2026 Jan Patrick Tolentino · Calamba, Laguna
        </div>
      </div>
    </footer>
  );
}
