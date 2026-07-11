import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import { createCircuitTextures } from '../shaders/circuitTexture.js';
import { MODULES } from '../data/portfolio.js';

const BLUE = new THREE.Color('#3b82f6');
const BLUE_GLOW = new THREE.Color('#6aa8ff');
const ORBIT_R = 4.5;

function Core() {
  const group = useRef(null);
  const ring1 = useRef(null);
  const ring2 = useRef(null);
  const mat = useRef(null);
  const halo = useRef(null);
  const { map, emissiveMap } = useMemo(() => createCircuitTextures(), []);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y += dt * 0.06;
      group.current.rotation.x = Math.sin(t * 0.15) * 0.05;
      group.current.position.y = Math.sin(t * 0.4) * 0.12;
    }
    if (ring1.current) ring1.current.rotation.z = t * 0.08;
    if (ring2.current) ring2.current.rotation.z = -t * 0.05;
    if (mat.current) mat.current.emissiveIntensity = 1.0 + Math.sin(t * 1.4) * 0.28;
    if (halo.current) halo.current.material.opacity = 0.24 + Math.sin(t * 1.4) * 0.06;
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[2.4, 96, 96]} />
        <meshStandardMaterial
          ref={mat}
          map={map}
          emissiveMap={emissiveMap}
          aoMap={emissiveMap}
          emissive={BLUE_GLOW}
          emissiveIntensity={1.15}
          metalness={0.82}
          roughness={0.46}
        />
      </mesh>

      <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.72, 0.012, 12, 200]} />
        <meshBasicMaterial color={BLUE_GLOW} transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 2.4, 0, 0.5]}>
        <torusGeometry args={[2.72, 0.012, 12, 200]} />
        <meshBasicMaterial color={BLUE_GLOW} transparent opacity={0.25} />
      </mesh>

      <mesh ref={halo}>
        <sphereGeometry args={[2.95, 48, 48]} />
        <meshBasicMaterial color={'#1e3a6e'} transparent opacity={0.28} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function Module({ index, position }) {
  const g = useRef(null);
  const mesh = useRef(null);
  const pulse = useRef(null);
  const pulseT = useRef(Math.random());
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  const base = useMemo(() => new THREE.Vector3(...position), [position]);
  const linePts = useMemo(() => [[0, 0, 0], position], [position]);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (g.current) g.current.position.y = base.y + Math.sin(t * 0.9 + phase) * 0.22;
    if (mesh.current) {
      mesh.current.rotation.x += dt * 0.24;
      mesh.current.rotation.y += dt * 0.36;
      mesh.current.material.emissiveIntensity = 0.8 + Math.sin(t * 2 + index) * 0.35;
    }
    if (pulse.current) {
      pulseT.current = (pulseT.current + dt * 0.35) % 1;
      pulse.current.position.set(base.x * pulseT.current, base.y * pulseT.current, base.z * pulseT.current);
      pulse.current.material.opacity = Math.sin(pulseT.current * Math.PI);
    }
  });

  return (
    <>
      <Line points={linePts} color={'#6aa8ff'} transparent opacity={0.28} lineWidth={1} />
      <mesh ref={pulse}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshBasicMaterial color={'#bfe0ff'} transparent blending={THREE.AdditiveBlending} />
      </mesh>
      <group ref={g} position={position}>
        <mesh ref={mesh}>
          <icosahedronGeometry args={[0.32, 0]} />
          <meshStandardMaterial color={'#0e1a30'} emissive={BLUE} emissiveIntensity={0.9} metalness={0.6} roughness={0.3} flatShading />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.44, 0]} />
          <meshBasicMaterial color={BLUE_GLOW} wireframe transparent opacity={0.35} />
        </mesh>
        <Html center distanceFactor={10} position={[0, 0.75, 0]} style={{ pointerEvents: 'none' }}>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(220,232,255,0.95)',
              textShadow: '0 0 12px rgba(90,160,255,0.8)',
              whiteSpace: 'nowrap',
            }}
          >
            {MODULES[index]}
          </span>
        </Html>
      </group>
    </>
  );
}

function Particles({ count, spread, size, color, opacity }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }
    return arr;
  }, [count, spread]);

  const ref = useRef(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={size} color={color} transparent opacity={opacity} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export default function NexusCore() {
  const world = useRef(null);
  const modules = useMemo(
    () =>
      MODULES.map((_, i) => {
        const ang = (i / MODULES.length) * Math.PI * 2;
        const tilt = (i % 2 ? 1 : -1) * 0.5;
        return [Math.cos(ang) * ORBIT_R, Math.sin(ang) * 0.9 * tilt, Math.sin(ang) * ORBIT_R];
      }),
    []
  );

  useFrame((state) => {
    if (!world.current) return;
    const { x, y } = state.pointer;
    world.current.rotation.y += (x * 0.25 - world.current.rotation.y) * 0.03;
    world.current.rotation.x += (-y * 0.15 - world.current.rotation.x) * 0.03;
  });

  return (
    <group ref={world}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.5}>
        <Core />
      </Float>

      <group>
        {modules.map((pos, i) => (
          <Module key={i} index={i} position={pos} />
        ))}
      </group>

      <Particles count={90} spread={34} size={0.09} color={'#8fb4ff'} opacity={0.7} />
      <Particles count={420} spread={40} size={0.045} color={'#5f86c8'} opacity={0.5} />

      <gridHelper
        args={[60, 60, '#2a4a86', '#16294a']}
        position={[0, -4.2, 0]}
        onUpdate={(self) => {
          self.material.transparent = true;
          self.material.opacity = 0.16;
        }}
      />
    </group>
  );
}
