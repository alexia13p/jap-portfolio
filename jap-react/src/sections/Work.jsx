import Reveal from '../components/Reveal.jsx';
import SectionLabel from '../components/SectionLabel.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import { WORK } from '../data/portfolio.js';

const wrap = { maxWidth: 'var(--content-max)', margin: '0 auto', padding: 'var(--space-section) 24px' };

export default function Work() {
  return (
    <section style={wrap}>
      <SectionLabel>Work</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {WORK.map((w, i) => (
          <Reveal key={w.title} delay={i * 60}>
            <ProjectCard {...w} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
