'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useMats } from './materials';
import { rbox, lathe } from './geometry';

const rod = new THREE.CylinderGeometry(0.004, 0.004, 1, 8);
const canopy = lathe([[0, 0], [0.06, 0], [0.065, 0.01], [0.06, 0.025], [0, 0.03]], 32);

// ---------------- pendants ----------------
export function GlobePendant({ drop, r = 0.17 }: { drop: number; r?: number }) {
  const m = useMats();
  const globe = useMemo(() => new THREE.SphereGeometry(r, 48, 32), [r]);
  const cap = useMemo(() => lathe([[0, 0], [0.05, 0], [0.055, 0.02], [0.03, 0.05], [0, 0.05]], 32), []);
  return (
    <group>
      <mesh geometry={canopy} material={m.hardware} position={[0, -0.03, 0]} />
      <mesh geometry={rod} material={m.hardware} scale={[1, drop, 1]} position={[0, -drop / 2, 0]} />
      <mesh geometry={cap} material={m.hardware} position={[0, -drop - 0.05, 0]} castShadow />
      <mesh geometry={globe} material={m.opal} position={[0, -drop - 0.03 - r, 0]} />
    </group>
  );
}

export function DomePendant({ drop, r = 0.24 }: { drop: number; r?: number }) {
  const m = useMats();
  const pts: [number, number][] = useMemo(() => {
    const p: [number, number][] = [];
    for (let i = 0; i <= 20; i++) { const a = (i / 20) * (Math.PI / 2); p.push([Math.sin(a) * r, Math.cos(a) * r * 0.62]); }
    p.push([r + 0.004, -0.004]);
    return p;
  }, [r]);
  const outer = useMemo(() => lathe(pts, 64), [pts]);
  const inner = useMemo(() => { const g = lathe(pts.map(([x, y]) => [x * 0.97, y * 0.97 - 0.004] as [number, number]), 64); return g; }, [pts]);
  const innerMat = useMemo(() => { const mm = m.interior.clone(); mm.side = THREE.BackSide; mm.color.set('#fbf7ef'); return mm; }, [m.interior]);
  const bulb = useMemo(() => new THREE.SphereGeometry(0.045, 24, 16), []);
  return (
    <group>
      <mesh geometry={canopy} material={m.hardware} position={[0, -0.03, 0]} />
      <mesh geometry={rod} material={m.blackMetal} scale={[1, drop, 1]} position={[0, -drop / 2, 0]} />
      <group position={[0, -drop - r * 0.62, 0]}>
        <mesh geometry={outer} material={m.hardware} castShadow />
        <mesh geometry={inner} material={innerMat} />
        <mesh geometry={bulb} material={m.lightWarm} position={[0, 0.03, 0]} />
      </group>
    </group>
  );
}

export function LinearPendant({ length, drop }: { length: number; drop: number }) {
  const m = useMats();
  return (
    <group>
      {[-1, 1].map((s) => <mesh key={s} geometry={rod} material={m.blackMetal} scale={[0.5, drop, 0.5]} position={[s * (length / 2 - 0.15), -drop / 2, 0]} />)}
      <group position={[0, -drop - 0.025, 0]}>
        <mesh geometry={rbox(length, 0.045, 0.07, 0.012)} material={m.blackMetal} castShadow />
        <mesh geometry={rbox(length - 0.04, 0.006, 0.045, 0.002)} material={m.lightWarm} position={[0, -0.024, 0]} />
      </group>
    </group>
  );
}

// ---------------- counter stools ----------------
export function Stool({ kind }: { kind: 'upholstered' | 'saddle' | 'woven' }) {
  const m = useMats();
  const seatH = 0.64;
  const leg = useMemo(() => new THREE.CylinderGeometry(0.011, 0.009, seatH - 0.05, 12), []);
  const ring = useMemo(() => new THREE.TorusGeometry(0.17, 0.007, 10, 48), []);
  const saddle = useMemo(() => new THREE.CylinderGeometry(0.2, 0.19, 0.04, 48), []);
  const back = useMemo(() => {
    const s = new THREE.Shape();
    const ro = 0.235, ri = 0.205, a0 = Math.PI * 0.18, a1 = Math.PI * 0.82;
    s.absarc(0, 0, ro, a0, a1, false);
    s.absarc(0, 0, ri, a1, a0, true);
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.2, bevelEnabled: true, bevelSize: 0.012, bevelThickness: 0.012, bevelSegments: 4, curveSegments: 40 });
    g.rotateX(-Math.PI / 2);
    return g;
  }, []);
  const seatMat = kind === 'upholstered' ? m.fabric : kind === 'saddle' ? m.walnut : m.rattan;
  const legMat = kind === 'upholstered' ? m.hardware : kind === 'saddle' ? m.blackMetal : m.oak;
  const spread = 0.15;
  return (
    <group>
      {[[1, 1], [1, -1], [-1, 1], [-1, -1]].map(([sx, sz], i) => (
        <mesh key={i} geometry={leg} material={legMat} position={[sx * spread, (seatH - 0.05) / 2, sz * spread]} rotation={[sz * 0.07, 0, -sx * 0.07]} castShadow />
      ))}
      <mesh geometry={ring} material={legMat} rotation={[Math.PI / 2, 0, Math.PI / 4]} position={[0, 0.24, 0]} />
      {kind === 'saddle' ? (
        <mesh geometry={saddle} material={seatMat} position={[0, seatH - 0.02, 0]} castShadow />
      ) : (
        <>
          <mesh geometry={rbox(0.44, 0.075, 0.42, 0.03, 4)} material={seatMat} position={[0, seatH - 0.02, 0]} castShadow receiveShadow />
          {/* curved low back facing away from the counter */}
          <mesh geometry={back} material={seatMat} position={[0, seatH + 0.01, -0.02]} castShadow />
        </>
      )}
    </group>
  );
}

// ---------------- window ----------------
export function Window({ w, h, mullions = [2, 2], frameMat }: { w: number; h: number; mullions?: [number, number]; frameMat?: THREE.Material }) {
  const m = useMats();
  const fm = frameMat ?? m.trim;
  const f = 0.06, mm = 0.025;
  return (
    <group>
      {/* sky glow behind the glass */}
      <mesh geometry={rbox(w, h, 0.005, 0)} material={m.sky} position={[0, h / 2, -0.12]} />
      <mesh geometry={rbox(w, h, 0.005, 0)} material={m.glass} position={[0, h / 2, -0.02]} />
      {/* jamb returns */}
      <mesh geometry={rbox(0.02, h, 0.14, 0)} material={m.wall} position={[-w / 2 - 0.01, h / 2, -0.07]} />
      <mesh geometry={rbox(0.02, h, 0.14, 0)} material={m.wall} position={[w / 2 + 0.01, h / 2, -0.07]} />
      <mesh geometry={rbox(w, 0.02, 0.14, 0)} material={m.wall} position={[0, h + 0.01, -0.07]} />
      {/* frame */}
      <mesh geometry={rbox(w, f, 0.05, 0.004)} material={fm} position={[0, f / 2, 0]} />
      <mesh geometry={rbox(w, f, 0.05, 0.004)} material={fm} position={[0, h - f / 2, 0]} />
      <mesh geometry={rbox(f, h, 0.05, 0.004)} material={fm} position={[-w / 2 + f / 2, h / 2, 0]} />
      <mesh geometry={rbox(f, h, 0.05, 0.004)} material={fm} position={[w / 2 - f / 2, h / 2, 0]} />
      {Array.from({ length: mullions[0] - 1 }).map((_, i) => (
        <mesh key={`v${i}`} geometry={rbox(mm, h - 2 * f, 0.03, 0.002)} material={fm} position={[-w / 2 + ((i + 1) * w) / mullions[0], h / 2, -0.005]} />
      ))}
      {Array.from({ length: mullions[1] - 1 }).map((_, i) => (
        <mesh key={`h${i}`} geometry={rbox(w - 2 * f, mm, 0.03, 0.002)} material={fm} position={[0, ((i + 1) * h) / mullions[1], -0.005]} />
      ))}
      {/* sill */}
      <mesh geometry={rbox(w + 0.08, 0.025, 0.09, 0.004)} material={m.trim} position={[0, -0.012, 0.03]} castShadow />
    </group>
  );
}

// ---------------- shelving + decor ----------------
export function FloatingShelf({ w, d = 0.26, t = 0.05, mat }: { w: number; d?: number; t?: number; mat?: THREE.Material }) {
  const m = useMats();
  return (
    <group>
      <mesh geometry={rbox(w, t, d, 0.004)} material={mat ?? m.walnut} position={[0, t / 2, d / 2]} castShadow receiveShadow />
      <mesh geometry={rbox(w - 0.08, 0.004, 0.012, 0.001)} material={m.lightWarm} position={[0, -0.002, d - 0.04]} />
    </group>
  );
}

export function Plates({ n = 6 }: { n?: number }) {
  const m = useMats();
  const g = useMemo(() => lathe([[0, 0], [0.09, 0], [0.12, 0.012], [0.125, 0.016], [0.1, 0.006], [0, 0.006]], 40), []);
  return <group>{Array.from({ length: n }).map((_, i) => <mesh key={i} geometry={g} material={m.plate} position={[0, i * 0.014, 0]} castShadow />)}</group>;
}

export function Vase({ h = 0.32, mat }: { h?: number; mat?: THREE.Material }) {
  const m = useMats();
  const g = useMemo(() => lathe([[0, 0], [0.05, 0], [0.085, h * 0.25], [0.08, h * 0.55], [0.04, h * 0.85], [0.035, h], [0.03, h], [0, h * 0.9]], 40), [h]);
  const stem = useMemo(() => new THREE.CylinderGeometry(0.003, 0.003, h * 1.4, 5), [h]);
  const leaf = useMemo(() => new THREE.SphereGeometry(0.035, 10, 8), []);
  const stems = [[0.02, 0.0, 0.18], [-0.03, 0.02, -0.22], [0.0, -0.03, 0.05]];
  return (
    <group>
      <mesh geometry={g} material={mat ?? m.ceramicDark} castShadow />
      {stems.map(([x, z, tilt], i) => (
        <group key={i} position={[x, h * 0.75, z]} rotation={[0, i * 2.1, tilt]}>
          <mesh geometry={stem} material={m.greenery} position={[0, h * 0.5, 0]} />
          {[0.3, 0.45, 0.6, 0.75, 0.9].map((t, k) => (
            <mesh key={k} geometry={leaf} material={m.greenery} position={[(k % 2 ? 1 : -1) * 0.03, h * 1.2 * t, 0]} scale={[1, 0.45, 0.6]} castShadow />
          ))}
        </group>
      ))}
    </group>
  );
}

export function FruitBowl() {
  const m = useMats();
  const bowl = useMemo(() => lathe([[0, 0], [0.07, 0], [0.16, 0.07], [0.17, 0.085], [0.16, 0.085], [0.07, 0.012], [0, 0.012]], 48), []);
  const fruit = useMemo(() => new THREE.SphereGeometry(0.038, 20, 14), []);
  const pos: [number, number, number][] = [[0, 0.05, 0], [0.06, 0.05, 0.03], [-0.05, 0.05, 0.04], [0.02, 0.05, -0.06], [-0.04, 0.05, -0.04], [0.01, 0.105, 0.0], [0.05, 0.09, -0.02]];
  return (
    <group>
      <mesh geometry={bowl} material={m.ceramicDark} castShadow receiveShadow />
      {pos.map((p, i) => <mesh key={i} geometry={fruit} material={m.lemon} position={p} scale={[1, 0.88, 1]} castShadow />)}
    </group>
  );
}

export function CuttingBoard({ w = 0.42, h = 0.55 }: { w?: number; h?: number }) {
  const m = useMats();
  const g = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(w / 2, h - 0.08);
    s.quadraticCurveTo(w / 2, h - 0.04, 0.05, h - 0.03); s.lineTo(0.05, h + 0.04);
    s.quadraticCurveTo(0, h + 0.07, -0.05, h + 0.04); s.lineTo(-0.05, h - 0.03);
    s.quadraticCurveTo(-w / 2, h - 0.04, -w / 2, h - 0.08); s.closePath();
    return new THREE.ExtrudeGeometry(s, { depth: 0.022, bevelEnabled: true, bevelSize: 0.004, bevelThickness: 0.004, bevelSegments: 2 });
  }, [w, h]);
  return <mesh geometry={g} material={m.walnut} rotation={[-0.16, 0, 0]} castShadow />;
}

export function Books() {
  const m = useMats();
  const mats = [m.book1, m.book2, m.book3, m.book1];
  return (
    <group>
      {mats.map((mat, i) => <mesh key={i} geometry={rbox(0.03 + (i % 2) * 0.01, 0.24 - i * 0.015, 0.17, 0.004)} material={mat} position={[i * 0.042, (0.24 - i * 0.015) / 2, 0]} castShadow />)}
    </group>
  );
}

export function Canisters() {
  const m = useMats();
  const g = useMemo(() => lathe([[0, 0], [0.055, 0], [0.058, 0.004], [0.058, 0.17], [0.05, 0.172], [0.05, 0.185], [0.02, 0.19], [0.02, 0.205], [0, 0.205]], 32), []);
  return <group>{[0, 1, 2].map((i) => <mesh key={i} geometry={g} material={m.plate} position={[i * 0.13, 0, 0]} scale={[1, 1 - i * 0.18, 1]} castShadow />)}</group>;
}

export function Plant({ s = 1 }: { s?: number }) {
  const m = useMats();
  const pot = useMemo(() => lathe([[0, 0], [0.07, 0], [0.09, 0.15], [0.095, 0.155], [0, 0.15]], 32), []);
  const leaf = useMemo(() => new THREE.SphereGeometry(0.06, 12, 10), []);
  const leaves = useMemo(() => Array.from({ length: 14 }).map((_, i) => {
    const a = i * 2.39, r = 0.03 + (i % 4) * 0.025;
    return [Math.cos(a) * r, 0.18 + (i % 5) * 0.045, Math.sin(a) * r] as [number, number, number];
  }), []);
  return (
    <group scale={s}>
      <mesh geometry={pot} material={m.plate} castShadow />
      {leaves.map((p, i) => <mesh key={i} geometry={leaf} material={m.greenery} position={p} scale={[1, 0.5, 0.7]} rotation={[0, i, 0.4]} castShadow />)}
    </group>
  );
}
