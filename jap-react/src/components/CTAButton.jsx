import { useState } from 'react';

export default function CTAButton({ children, href, arrow = true, variant = 'outline', ...rest }) {
  const [hover, setHover] = useState(false);
  const primary = variant === 'primary';

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    borderRadius: 'var(--radius-pill)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--fw-body-semibold)',
    textDecoration: 'none',
    cursor: 'pointer',
  };

  const style = primary
    ? {
        ...base,
        padding: '16px 34px',
        fontSize: '16px',
        border: `1px solid rgba(123, 47, 240, ${hover ? 0.55 : 0.3})`,
        background: `linear-gradient(120deg, rgba(123, 47, 240, ${hover ? 0.24 : 0.15}) 0%, rgba(255, 45, 138, ${hover ? 0.2 : 0.12}) 100%)`,
        backdropFilter: 'blur(14px) saturate(1.3)',
        WebkitBackdropFilter: 'blur(14px) saturate(1.3)',
        boxShadow: hover
          ? '0 12px 34px rgba(123,47,240,0.24), inset 0 1px 0 rgba(255,255,255,0.16)'
          : '0 6px 22px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.10)',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'transform .3s ease, box-shadow .3s ease, background .3s ease, border-color .3s ease',
      }
    : {
        ...base,
        padding: '13px 26px',
        fontSize: '15px',
        fontWeight: 'var(--fw-body-medium)',
        border: `1px solid ${hover ? 'var(--accent-purple)' : 'var(--border)'}`,
        background: hover ? 'var(--tint-purple)' : 'transparent',
        transition: 'border-color .3s ease, background .3s ease',
      };

  return (
    <a href={href} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={style} {...rest}>
      {arrow && (
        <span style={{ display: 'inline-block', transform: hover ? 'translateX(4px)' : 'translateX(0)', transition: 'transform .3s ease' }}>
          →
        </span>
      )}
      {children}
    </a>
  );
}
