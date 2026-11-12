'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import { CameraControls, Environment, Html, Lightformer, PerformanceMonitor } from '@react-three/drei';
import { EffectComposer, N8AO, Bloom, ToneMapping, SMAA } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { designById, type KitchenConfig } from '@/lib/kitchenDesign/catalog';
import { MaterialsProvider } from './materials';
import { LAYOUTS, type LayoutMeta } from './layouts';
import { setMaxAnisotropy } from './textures';

if (typeof window !== 'undefined') RectAreaLightUniformsLib.init();

export type Quality = 'high' | 'low';

export interface SceneHandle { capture: () => string | null }

interface Props {
  config: KitchenConfig;
  evening: boolean;
  viewId: string;
  viewNonce: number; // bump to re-apply the same view
  showHotspots: boolean;
  quality: Quality;
  onQuality: (q: Quality) => void;
  onInteract?: () => void;
  handleRef: React.MutableRefObject<SceneHandle | null>;
}

function Rig({ config, viewId, viewNonce, onInteract }: { config: KitchenConfig; viewId: string; viewNonce: number; onInteract?: () => void }) {
  const ref = useRef<CameraControls>(null);
  const first = useRef(true);
  const design = designById(config.design);
  const aspect = useThree((s) => s.size.width / Math.max(1, s.size.height));
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const v = design.views.find((x) => x.id === viewId) ?? design.views[0];
    // Views are framed for a landscape stage; pull back on portrait screens.
    const k = aspect < 1.25 ? Math.min(1.9, Math.pow(1.25 / aspect, 0.85)) : 1;
    const p = v.position.map((n, i) => v.target[i] + (n - v.target[i]) * k) as [number, number, number];
    if (first.current) {
      // fly in from a wide, high shot on first load
      first.current = false;
      c.setLookAt(p[0] + 3.5, p[1] + 2.2, p[2] + 4, v.target[0], v.target[1], v.target[2], false);
    }
    c.setLookAt(...p, ...v.target, true);
  }, [design, viewId, viewNonce, aspect]);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    c.setBoundary(new THREE.Box3(new THREE.Vector3(-2.8, 0.2, -0.1), new THREE.Vector3(3.8, 2.5, 3.8)));
    c.boundaryFriction = 0.2;
    const onStart = () => onInteract?.();
    c.addEventListener('controlstart', onStart);
    return () => c.removeEventListener('controlstart', onStart);
  }, [onInteract]);
  return (
    <CameraControls
      ref={ref}
      makeDefault
      minDistance={0.55}
      maxDistance={11}
      minPolarAngle={0.15}
      maxPolarAngle={Math.PI * 0.495}
      minAzimuthAngle={-0.75}
      maxAzimuthAngle={1.5}
      smoothTime={0.55}
      draggingSmoothTime={0.12}
      dollySpeed={0.6}
    />
  );
}

function Lights({ evening, meta, quality }: { evening: boolean; meta: LayoutMeta; quality: Quality }) {
  const sun = useRef<THREE.DirectionalLight>(null);
  const size = quality === 'high' ? 2048 : 1024;
  return (
    <>
      <hemisphereLight args={[evening ? '#4a5466' : '#f6f2ea', '#7a6450', evening ? 0.12 : 0.5]} />
      <directionalLight
        ref={sun}
        position={[-6.5, 6.5, 4.2]}
        intensity={evening ? 0.12 : 2.8}
        color={evening ? '#9fb0d0' : '#fff1de'}
        castShadow
        shadow-mapSize={[size, size]}
        shadow-camera-left={-5.5}
        shadow-camera-right={5.5}
        shadow-camera-top={5}
        shadow-camera-bottom={-4}
        shadow-camera-near={1}
        shadow-camera-far={22}
        shadow-bias={-0.00025}
        shadow-normalBias={0.02}
        shadow-radius={4}
      />
      {/* soft fill from the room side */}
      <directionalLight position={[5, 4, 8]} intensity={evening ? 0.1 : 0.55} color="#fff8ee" />
      {meta.lights.map((l, i) => (
        <pointLight key={i} position={l.position} intensity={evening ? 4.5 : 0.6} distance={5} decay={2} color="#ffcf94" />
      ))}
      {meta.underCabinet.map((u, i) => (
        <rectAreaLight key={i} position={u.position} rotation={[-Math.PI / 2, 0, 0]} width={u.width} height={0.08} intensity={evening ? 14 : 4} color="#ffdcae" />
      ))}
      {evening && (
        // recessed cans
        [[-1.5, 2.85, 1.3], [0.5, 2.85, 1.3], [2.2, 2.85, 1.3]].map((p, i) => (
          <spotLight key={i} position={p as [number, number, number]} angle={0.75} penumbra={0.9} intensity={6} distance={5} decay={2} color="#ffd8a8" />
        ))
      )}
    </>
  );
}

function Env({ evening }: { evening: boolean }) {
  return (
    <Environment key={evening ? 'e' : 'd'} resolution={256} frames={1} environmentIntensity={evening ? 0.28 : 0.95}>
      <Lightformer form="rect" intensity={evening ? 0.6 : 1.6} position={[0, 6, 2]} rotation-x={Math.PI / 2} scale={[10, 6, 1]} color={evening ? '#ffd9b0' : '#fffaf2'} />
      <Lightformer form="rect" intensity={evening ? 0.4 : 3.2} position={[-7, 2.2, 2]} rotation-y={Math.PI / 2} scale={[5, 3, 1]} color={evening ? '#3a4a66' : '#eef4ff'} />
      <Lightformer form="rect" intensity={evening ? 0.3 : 1.2} position={[6, 2.5, 7]} rotation-y={-Math.PI / 3} scale={[8, 4, 1]} color="#fff3e2" />
      <Lightformer form="rect" intensity={0.5} position={[0, 1.5, -6]} scale={[10, 3, 1]} color="#f0e8dc" />
      {evening && <Lightformer form="ring" intensity={4} position={[0, 3.5, 2.2]} scale={1.4} color="#ffcf8f" />}
    </Environment>
  );
}

function Hotspots({ meta }: { meta: LayoutMeta }) {
  const [active, setActive] = React.useState<string | null>(null);
  return (
    <>
      {meta.hotspots.map((h) => (
        <Html key={h.id} position={h.position} center zIndexRange={[20, 0]} style={{ pointerEvents: 'auto' }}>
          <div className="relative">
            <button
              type="button"
              aria-label={h.title}
              onClick={(e) => { e.stopPropagation(); setActive(active === h.id ? null : h.id); }}
              className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-lg ring-1 ring-black/10 backdrop-blur transition hover:scale-110"
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400/40" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-[#ca8a04]" />
            </button>
            {active === h.id && (
              <div className="absolute left-1/2 top-9 w-56 -translate-x-1/2 rounded-xl bg-white/95 p-3 text-left shadow-2xl ring-1 ring-black/5 backdrop-blur sm:w-64">
                <p className="font-serif text-sm font-semibold text-[#0f172a]">{h.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-stone-600">{h.text}</p>
              </div>
            )}
          </div>
        </Html>
      ))}
    </>
  );
}

function Capture({ handleRef }: { handleRef: React.MutableRefObject<SceneHandle | null> }) {
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    setMaxAnisotropy(gl.capabilities.getMaxAnisotropy());
    handleRef.current = { capture: () => { try { return gl.domElement.toDataURL('image/jpeg', 0.92); } catch { return null; } } };
    return () => { handleRef.current = null; };
  }, [gl, handleRef]);
  return null;
}

export default function KitchenScene({ config, evening, viewId, viewNonce, showHotspots, quality, onQuality, onInteract, handleRef }: Props) {
  const { C: Layout, meta } = LAYOUTS[config.design];
  const hi = quality === 'high';
  const dpr = useMemo<[number, number]>(() => (hi ? [1, 2] : [1, 1.25]), [hi]);
  return (
    <Canvas
      shadows="soft"
      dpr={dpr}
      frameloop="demand"
      camera={{ fov: 36, near: 0.05, far: 60, position: [8, 5, 11] }}
      gl={{ antialias: false, preserveDrawingBuffer: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => { gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 1.0; }}
    >
      <PerformanceMonitor onDecline={() => onQuality('low')} flipflops={2} />
      <color attach="background" args={[evening ? '#26231f' : '#ebe7e1']} />
      <Capture handleRef={handleRef} />
      <MaterialsProvider config={config} evening={evening}>
        <Env evening={evening} />
        <Lights evening={evening} meta={meta} quality={quality} />
        <Layout cfg={config} />
        {showHotspots && <Hotspots meta={meta} />}
      </MaterialsProvider>
      <Rig config={config} viewId={viewId} viewNonce={viewNonce} onInteract={onInteract} />
      <EffectComposer multisampling={0} enableNormalPass={false}>
        {hi ? <N8AO aoRadius={0.55} intensity={2.4} distanceFalloff={0.5} quality="high" /> : <N8AO aoRadius={0.5} intensity={2} distanceFalloff={0.5} quality="performance" halfRes />}
        <Bloom luminanceThreshold={0.95} intensity={evening ? 0.75 : 0.22} mipmapBlur radius={0.65} />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        <SMAA />
      </EffectComposer>
    </Canvas>
  );
}
