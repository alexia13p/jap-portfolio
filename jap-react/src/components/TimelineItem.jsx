export default function TimelineItem({ year, company, role }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 20px', padding: '18px 0', borderBottom: '1px solid var(--border)' }}>
      <div style={{ minWidth: '100px', fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 'var(--fw-body-medium)', color: 'var(--text-secondary)' }}>
        {year}
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--text-primary)' }}>
        <span style={{ fontWeight: 'var(--fw-body-semibold)' }}>{company}</span>
        {role ? <span style={{ color: 'var(--text-secondary)' }}> · {role}</span> : null}
      </div>
    </div>
  );
}
