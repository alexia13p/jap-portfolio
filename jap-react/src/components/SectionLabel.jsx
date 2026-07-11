export default function SectionLabel({ children }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 'var(--fw-display-semibold)',
        fontSize: 'var(--fs-label)',
        letterSpacing: 'var(--ls-label)',
        textTransform: 'uppercase',
        color: 'var(--text-secondary)',
        marginBottom: '24px',
      }}
    >
      {children}
    </div>
  );
}
