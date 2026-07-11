import Reveal from '../components/Reveal.jsx';
import SectionLabel from '../components/SectionLabel.jsx';
import TimelineItem from '../components/TimelineItem.jsx';
import { EXPERIENCE } from '../data/portfolio.js';

const wrap = { maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 24px var(--space-section)' };

export default function Experience() {
  return (
    <section style={wrap}>
      <SectionLabel>Experience</SectionLabel>
      <div>
        {EXPERIENCE.map((e, i) => (
          <Reveal key={e.company + e.year} delay={i * 50}>
            <TimelineItem {...e} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
