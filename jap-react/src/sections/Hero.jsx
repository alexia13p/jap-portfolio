import { Suspense, useRef, useLayoutEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, AdaptiveDpr } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing';
import { gsap } from 'gsap';
import NexusCore from './NexusCore.jsx';
import CTAButton from '../components/CTAButton.jsx';
import { CONTACT } from '../data/portfolio.js';

export default function Hero() {
  const copyRef = useRef(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !copyRef.current) return;
    const els = copyRef.current.querySelectorAll('[data-anim]');
    gsap.fromTo(
      els,
      { autoAlpha: 0, y: 28 },
      { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.14, delay: 0.2 }
    );
  }, []);

  return (
    <section style={{ position: 'relative', height: '100vh', width: '100%', background: 'var(--navy)', overflow: 'hidden' }}>
      <Canvas
        camera={{ position: [0, 0.4, 12], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <color attach="background" args={['#070c18']} />
        <fogExp2 attach="fog" args={['#070c18', 0.032]} />

        <ambientLight intensity={0.9} color={'#2a3a5c'} />
        <directionalLight position={[6, 8, 6]} intensity={2.2} color={'#bfe0ff'} />
        <directionalLight position={[-8, -2, -6]} intensity={1.6} color={'#2b6cff'} />
        <pointLight position={[0, 2, 6]} intensity={40} distance={30} color={'#3b82f6'} />

        <Suspense fallback={null}>
          <group position={[2.6, 0, 0]}>
            <NexusCore />
          </group>
          <Environment preset="city" />
        </Suspense>

        <EffectComposer disableNormalPass>
          <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.6} luminanceSmoothing={0.4} radius={0.7} />
          <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={2.2} />
          <Vignette eskil={false} offset={0.2} darkness={0.85} />
        </EffectComposer>

        <AdaptiveDpr pixelated />
      </Canvas>

      <div
        ref={copyRef}
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '22px',
          maxWidth: 'var(--content-max)',
          padding: '0 clamp(24px, 7vw, 132px)',
          pointerEvents: 'none',
        }}
      >
        <span
          data-anim
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-blue-glow)', boxShadow: '0 0 12px var(--accent-blue-glow)' }} />
          Core Online
        </span>

        <h1
          data-anim
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 'var(--fw-display-bold)',
            fontSize: 'clamp(40px, 6vw, 72px)',
            lineHeight: 1.02,
            margin: 0,
            color: 'var(--text-primary)',
          }}
        >
          Systems that<br />never sleep.
          <span style={{ display: 'block', marginTop: '14px', fontSize: 'var(--fs-tagline)', fontWeight: 'var(--fw-body-medium)', fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}>
            Jan Patrick Tolentino<br />IT Specialist
          </span>
        </h1>

        <p
          data-anim
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-tagline)',
            lineHeight: 'var(--lh-body)',
            color: 'var(--text-secondary)',
            maxWidth: 'var(--tagline-max)',
            margin: 0,
          }}
        >
          I architect, secure, and keep enterprise infrastructure running — cloud to endpoint. Seven years turning downtime into uptime across manufacturing, enterprise, and telecom.
        </p>

        <div data-anim style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', pointerEvents: 'auto' }}>
          <CTAButton variant="primary" href={`mailto:${CONTACT.email}`}>Let's Work Together</CTAButton>
          <CTAButton href={CONTACT.resume} arrow={false} target="_blank" rel="noopener noreferrer">View Resume</CTAButton>
        </div>
      </div>
    </section>
  );
}
