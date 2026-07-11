import Reveal from '../components/Reveal.jsx';
import SectionLabel from '../components/SectionLabel.jsx';
import TimelineItem from '../components/TimelineItem.jsx';
import { TRAINING } from '../data/portfolio.js';

const wrap = { maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 24px var(--space-section)' };

export default function Training() {
  return (
    <section style={wrap}>
      <SectionLabel>Training</SectionLabel>
      <div>
        {TRAINING.map((t, i) => (
          <Reveal key={t.company} delay={i * 50}>
            <TimelineItem {...t} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
