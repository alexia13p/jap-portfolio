const { useState, useRef, useEffect } = React;

const TRUST = [
  { value: '7+', label: 'years in IT support' },
  { value: '4', label: 'enterprises supported' },
  { value: 'CCNA', label: 'Cisco certified' },
  { value: '100s', label: 'daily users supported' },
];

// Fade-in-up on scroll, IntersectionObserver @ 15%.
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { setShown(true); io.unobserve(el); }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const WORK = [
  {
    accent: 'purple', icon: '⚡',
    title: 'Manufacturing IT Infrastructure',
    company: 'IONICS – EMS Inc. · 5 years',
    description: 'Maintained and troubleshot Cisco-based network infrastructure across a full manufacturing environment. Supported IBM System 21 for production operations, managed hardware lifecycles, and kept enterprise systems reliable for hundreds of users daily.',
    tags: ['Cisco', 'IBM System 21', 'Hardware', 'Enterprise IT'],
  },
  {
    accent: 'yellow', icon: '☀️',
    title: 'Corporate IT & End-User Support',
    company: 'SunPower Corporation',
    description: 'Provided frontline IT support for a global solar energy company. Troubleshot desktops, laptops, and peripherals across teams, supported Microsoft 365 environments, and ensured issues were documented and resolved within SLA.',
    tags: ['Microsoft 365', 'Helpdesk', 'SLA Management'],
  },
  {
    accent: 'magenta', icon: '🌐',
    title: 'ISP Technical Support',
    company: 'Younity · Current',
    description: 'Handling internet connectivity issues for residential customers. Documenting homeowner cases, escalating to network engineers when needed, and managing billing-related support — all while keeping resolution times tight.',
    tags: ['Networking', 'Customer Support', 'Documentation'],
  },
  {
    accent: 'purple', icon: '📞',
    title: 'High-Volume Escalation Support',
    company: 'TELUS International Philippines',
    description: 'Handled advanced technical support cases and escalations in a fast-paced BPO environment. Diagnosed software, connectivity, and system issues while maintaining quality and speed across high call volumes.',
    tags: ['Tier 2 Support', 'Escalations', 'Diagnostics'],
  },
];

const EXPERIENCE = [
  { year: '2024 – now', company: 'Younity', role: 'Internet Technical Support' },
  { year: '2024', company: 'SunPower Corporation', role: 'IT / Technical Support' },
  { year: '2019 – 2024', company: 'IONICS – EMS Inc.', role: 'IT Support / Systems' },
  { year: '2016 – 2018', company: 'TELUS International Philippines', role: 'Technical Support II' },
];

const TRAINING = [
  { year: '2023', company: 'Cisco Certified Network Associate', role: 'Internal Training' },
  { year: '2020', company: 'Check Point Infinity Circle', role: 'Security in the New Normal' },
  { year: '2011 – 2016', company: 'BS Information Technology', role: 'Colegio de San Juan de Letran' },
];

const SOCIALS = [
  { label: 'Email', href: 'mailto:jap.tolentino11@gmail.com' },
  { label: 'LinkedIn', href: 'https://ph.linkedin.com/in/jan-patrick-tolentino-048171119', target: '_blank' },
  { label: 'Facebook', href: 'https://www.facebook.com/HoLeeeSchitt', target: '_blank' },
];

function Section({ children, style }) {
  return (
    <section
      style={{
        maxWidth: 'var(--content-max)',
        margin: '0 auto',
        padding: 'var(--space-section) 24px',
        ...style,
      }}
    >
      {children}
    </section>
  );
}

function SitePortfolio() {
  const { LogoAnimation, CTAButton, Tag, SectionLabel, TimelineItem, ProjectCard, TrustBar, ParallaxBackground } = window.DesignSystem_c28375;
  return (
    <div style={{ position: 'relative' }}>
      <ParallaxBackground />
      {/* Nexus Core hero */}
      <section style={{ height: '100vh', width: '100%' }}>
        <iframe
          src="./nexus/index.html"
          title="Nexus Core hero"
          style={{ display: 'block', width: '100%', height: '100%', border: 'none' }}
        />
      </section>
      {/* Hero */}
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
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
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
          hi,<br />i'm<br />
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
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-tagline)',
            lineHeight: 'var(--lh-body)',
            color: 'var(--text-secondary)',
            maxWidth: 'var(--tagline-max)',
            margin: 0,
            textAlign: 'center',
          }}
        >
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '28px' }}>
            <a
              href="jap-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-link"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                fontWeight: 'var(--fw-body-medium)',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                opacity: 0.85,
                transition: 'color .25s ease, opacity .25s ease',
              }}
            >
            </a>
            <a
              href="jap-resume.pdf"
              download="Jan-Patrick-Tolentino-Resume.pdf"
              className="resume-link"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                fontWeight: 'var(--fw-body-medium)',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                opacity: 0.85,
                transition: 'color .25s ease, opacity .25s ease',
              }}
            >
            </a>
          </div>
        </div>
        </div>
      </header>

      {/* Trust bar */}
      <Reveal>
        <TrustBar items={TRUST} scrolling />
      </Reveal>

      {/* Work */}
      <Section>
        <SectionLabel>Work</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {WORK.map((w, i) => (
            <Reveal key={w.title} delay={i * 60}>
              <ProjectCard {...w} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section style={{ paddingTop: 0 }}>
        <SectionLabel>Experience</SectionLabel>
        <div>
          {EXPERIENCE.map((e, i) => (
            <Reveal key={e.company + e.year} delay={i * 50}>
              <TimelineItem {...e} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Training */}
      <Section style={{ paddingTop: 0 }}>
        <SectionLabel>Training</SectionLabel>
        <div>
          {TRAINING.map((t, i) => (
            <Reveal key={t.company} delay={i * 50}>
              <TimelineItem {...t} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Philosophy */}
      <Section style={{ textAlign: 'center' }}>
        <Reveal>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--fw-display-bold)',
              fontSize: 'var(--fs-statement)',
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            made with focus.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              lineHeight: 'var(--lh-body)',
              color: 'var(--text-secondary)',
              maxWidth: 'var(--statement-max)',
              margin: '18px auto 0',
            }}
          >
            I believe good IT work is reliable, documented, and continuously improving. Technology should support people, not confuse them.
          </p>
        </Reveal>
      </Section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)' }}>
        <div
          style={{
            maxWidth: 'var(--content-max)',
            margin: '0 auto',
            padding: '40px 24px',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.target}
                rel={s.target ? 'noopener noreferrer' : undefined}
                className="footer-link"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'color .2s ease',
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'var(--text-faint)',
              marginTop: '20px',
            }}
          >
            © 2026 Jan Patrick Tolentino · Calamba, Laguna
          </div>
        </div>
      </footer>
    </div>
  );
}

function mountPortfolio() {
  const ns = window.DesignSystem_c28375;
  const ready = ns && ns.LogoAnimation && ns.CTAButton && ns.ProjectCard && ns.Tag && ns.TimelineItem && ns.SectionLabel && ns.TrustBar && ns.ParallaxBackground;
  if (!ready) { setTimeout(mountPortfolio, 30); return; }
  const el = document.getElementById('root');
  window.__portfolioRoot = window.__portfolioRoot || ReactDOM.createRoot(el);
  window.__portfolioRoot.render(<SitePortfolio />);
}
mountPortfolio();
