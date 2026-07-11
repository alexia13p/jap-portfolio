import { useState } from 'react';
import Tag from './Tag.jsx';

const ACCENTS = {
  purple: { rgb: '123, 47, 240' },
  yellow: { rgb: '255, 214, 0' },
  magenta: { rgb: '255, 45, 138' },
};

export default function ProjectCard({ icon, title, company, description, tags = [], accent = 'purple' }) {
  const [hover, setHover] = useState(false);
  const a = ACCENTS[accent] || ACCENTS.purple;

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        background: `linear-gradient(150deg, rgba(${a.rgb}, ${hover ? 0.2 : 0.13}) 0%, rgba(${a.rgb}, ${hover ? 0.07 : 0.04}) 46%, rgba(26, 26, 26, 0.55) 100%)`,
        backdropFilter: 'blur(14px) saturate(1.3)',
        WebkitBackdropFilter: 'blur(14px) saturate(1.3)',
        border: `1px solid rgba(${a.rgb}, ${hover ? 0.55 : 0.28})`,
        borderRadius: 'var(--radius-card)',
        padding: 'var(--space-card)',
        boxShadow: hover
          ? `0 14px 40px rgba(${a.rgb}, 0.22), inset 0 1px 0 rgba(255,255,255,0.14)`
          : '0 6px 22px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.08)',
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'background .3s ease, border-color .3s ease, transform .3s ease, box-shadow .3s ease',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: 'var(--radius-icon)',
          background: `rgba(${a.rgb}, 0.16)`,
          border: `1px solid rgba(${a.rgb}, 0.3)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          marginBottom: '16px',
        }}
      >
        {icon}
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-display-semibold)', fontSize: 'var(--fs-card-title)', color: 'var(--text-primary)', margin: 0 }}>
        {title}
      </h3>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
        {company}
      </div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 'var(--lh-body)', color: 'var(--text-secondary)', margin: '14px 0 0' }}>
        {description}
      </p>
      {tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '18px' }}>
          {tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      )}
    </article>
  );
}
