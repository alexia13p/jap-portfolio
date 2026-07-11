import { lazy, Suspense } from 'react';
import useLenis from './hooks/useLenis.js';
import ParallaxBackground from './components/ParallaxBackground.jsx';
import Intro from './sections/Intro.jsx';
import TrustBar from './components/TrustBar.jsx';
import Work from './sections/Work.jsx';
import Experience from './sections/Experience.jsx';
import Training from './sections/Training.jsx';
import Philosophy from './sections/Philosophy.jsx';
import Footer from './sections/Footer.jsx';
import { TRUST } from './data/portfolio.js';

const Hero = lazy(() => import('./sections/Hero.jsx'));

export default function App() {
  useLenis();

  return (
    <>
      <ParallaxBackground />

      <Suspense fallback={<section style={{ height: '100vh' }} />}>
        <Hero />
      </Suspense>

      <main>
        <Intro />
        <TrustBar items={TRUST} scrolling />
        <Work />
        <Experience />
        <Training />
        <Philosophy />
      </main>

      <Footer />
    </>
  );
}
