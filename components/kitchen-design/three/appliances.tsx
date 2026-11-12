'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useMats } from './materials';
import { rbox, lathe } from './geometry';
import { BarPull, TOE, TOE_RECESS } from './cabinetry';

// ---------------- 48" pro range ----------------
const knobGeo = (() => {
  const g = lathe([[0, 0], [0.024, 0], [0.024, 0.004], [0.02, 0.008], [0.02, 0.024], [0.016, 0.028], [0, 0.028]], 28);
  g.rotateX(Math.PI / 2);
  return g;
})();
const burnerGeo = new THREE.CylinderGeometry(0.046, 0.05, 0.014, 28);
const capGeo = new THREE.CylinderGeometry(0.03, 0.032, 0.01, 24);

function Grate({ w, d }: { w: number; d: number }) {
  const m = useMats();
  const bar = 0.012;
  return (
    <group>
      <mesh geometry={rbox(w, 0.016, bar, 0.003)} material={m.castIron} position={[0, 0, -d / 2]} />
      <mesh geometry={rbox(w, 0.016, bar, 0.003)} material={m.castIron} position={[0, 0, d / 2]} />
      <mesh geometry={rbox(bar, 0.016, d, 0.003)} material={m.castIron} position={[-w / 2, 0, 0]} />
      <mesh geometry={rbox(bar, 0.016, d, 0.003)} material={m.castIron} position={[w / 2, 0, 0]} />
      <mesh geometry={rbox(w, 0.016, bar, 0.003)} material={m.castIron} position={[0, 0.002, 0]} castShadow />
      <mesh geometry={rbox(bar, 0.016, d, 0.003)} material={m.castIron} position={[0, 0.002, 0]} castShadow />
    </group>
  );
}

export function ProRange({ w = 1.22, depth = 0.66 }: { w?: number; depth?: number }) {
  const m = useMats();
  const topY = 0.915;
  const bigW = w * 0.6 - 0.01, smallW = w * 0.4 - 0.02;
  const doors = [{ x: -w / 2 + 0.015 + bigW / 2, dw: bigW }, { x: w / 2 - 0.015 - smallW / 2, dw: smallW }];
  const cookW = w * 0.62;
  const knobs = 8;
  return (
    <group>
      {/* body */}
      <mesh geometry={rbox(w, 0.78, depth - 0.04, 0.006)} material={m.steel} position={[0, TOE + 0.39 + 0.005, (depth - 0.04) / 2]} castShadow receiveShadow />
      <mesh geometry={rbox(w, TOE, 0.02, 0)} material={m.reveal} position={[0, TOE / 2, depth - TOE_RECESS]} />
      {/* control fascia, slightly proud */}
      <mesh geometry={rbox(w, 0.13, 0.05, 0.008)} material={m.steel} position={[0, topY - 0.07, depth - 0.02]} castShadow />
      {Array.from({ length: knobs }).map((_, i) => (
        <mesh key={i} geometry={knobGeo} material={m.darkSteel} position={[-w / 2 + 0.1 + i * ((w - 0.2) / (knobs - 1)), topY - 0.07, depth + 0.005]} castShadow />
      ))}
      {/* oven doors */}
      {doors.map((d, i) => (
        <group key={i} position={[d.x, 0.43, depth - 0.03]}>
          <mesh geometry={rbox(d.dw, 0.6, 0.04, 0.008)} material={m.steel} position={[0, 0, 0.02]} castShadow />
          <mesh geometry={rbox(d.dw * 0.74, 0.27, 0.006, 0.006)} material={m.darkGlass} position={[0, -0.04, 0.041]} />
          <group position={[0, 0.235, 0.04]}><BarPull length={d.dw * 0.84} r={0.011} /></group>
        </group>
      ))}
      {/* cooktop */}
      <mesh geometry={rbox(w - 0.01, 0.012, depth - 0.1, 0.004)} material={m.castIron} position={[0, topY - 0.006, (depth - 0.1) / 2 + 0.03]} receiveShadow />
      {/* 6 burners on the left, griddle on the right */}
      {[0, 1, 2].map((cx) => [0, 1].map((cz) => {
        const x = -w / 2 + 0.11 + cx * (cookW / 3) + 0.03;
        const z = 0.16 + cz * 0.27;
        return (
          <group key={`${cx}${cz}`} position={[x, topY, z]}>
            <mesh geometry={burnerGeo} material={m.castIron} position={[0, 0.007, 0]} />
            <mesh geometry={capGeo} material={m.blackMetal} position={[0, 0.018, 0]} />
          </group>
        );
      }))}
      {[0, 1, 2].map((g) => (
        <group key={g} position={[-w / 2 + 0.14 + g * (cookW / 3) + 0.0, topY + 0.03, 0.3]}><Grate w={cookW / 3 - 0.012} d={0.52} /></group>
      ))}
      <mesh geometry={rbox(w - cookW - 0.12, 0.018, 0.48, 0.006)} material={m.darkSteel} position={[w / 2 - (w - cookW - 0.12) / 2 - 0.05, topY + 0.01, 0.3]} castShadow />
      {/* backguard */}
      <mesh geometry={rbox(w, 0.1, 0.07, 0.006)} material={m.steel} position={[0, topY + 0.05, 0.035]} castShadow />
    </group>
  );
}

// Flush induction cooktop for the contemporary kitchen
export function InductionCooktop({ w = 0.9, d = 0.52 }: { w?: number; d?: number }) {
  const m = useMats();
  const ringGeo = useMemo(() => new THREE.RingGeometry(0.085, 0.09, 48), []);
  return (
    <group>
      <mesh geometry={rbox(w, 0.006, d, 0.003)} material={m.darkGlass} position={[0, 0.003, 0]} receiveShadow />
      {[[-0.22, -0.12, 1], [-0.22, 0.13, 0.75], [0.2, -0.05, 1.25], [0.2, 0.17, 0.7]].map(([x, z, s], i) => (
        <mesh key={i} geometry={ringGeo} material={m.darkSteel} position={[x, 0.0065, z]} rotation={[-Math.PI / 2, 0, 0]} scale={s} />
      ))}
    </group>
  );
}

// ---------------- hoods ----------------
export function CurvedHood({ w = 1.32, bottom, top, depth = 0.6 }: { w?: number; bottom: number; top: number; depth?: number }) {
  const m = useMats();
  const H = top - bottom;
  const geo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(depth, 0);
    s.lineTo(depth, 0.1);
    // concave sweep from the lip up into the chimney
    s.quadraticCurveTo(0.39, 0.15, 0.37, 0.82);
    s.lineTo(0.37, H);
    s.lineTo(0, H);
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth: w, bevelEnabled: true, bevelSize: 0.012, bevelThickness: 0.012, bevelSegments: 4, curveSegments: 36 });
    g.rotateY(-Math.PI / 2);
    g.translate(w / 2, 0, 0);
    return g;
  }, [w, H, depth]);
  return (
    <group position={[0, bottom, 0]}>
      <mesh geometry={geo} material={m.plaster} castShadow receiveShadow />
      {/* metal band on the lip picks up the hardware finish */}
      <mesh geometry={rbox(w + 0.03, 0.055, depth + 0.012, 0.004)} material={m.hardware} position={[0, 0.045, depth / 2 + 0.002]} castShadow />
      {/* liner + lights underneath */}
      <mesh geometry={rbox(w - 0.1, 0.006, depth - 0.1, 0)} material={m.darkSteel} position={[0, -0.006, depth / 2]} />
      {[-0.3, 0.3].map((x) => <mesh key={x} geometry={rbox(0.05, 0.004, 0.05, 0.002)} material={m.lightWarm} position={[x, -0.01, depth / 2 + 0.05]} />)}
    </group>
  );
}

export function BoxHood({ w = 0.95, bottom, top, depth = 0.55, h = 0.36 }: { w?: number; bottom: number; top: number; depth?: number; h?: number }) {
  const m = useMats();
  return (
    <group position={[0, bottom, 0]}>
      <mesh geometry={rbox(w, h, depth, 0.012)} material={m.blackMetal} position={[0, h / 2, depth / 2]} castShadow />
      <mesh geometry={rbox(w * 0.52, top - bottom - h, 0.3, 0.006)} material={m.blackMetal} position={[0, h + (top - bottom - h) / 2, 0.15]} castShadow />
      <mesh geometry={rbox(w - 0.06, 0.004, depth - 0.06, 0)} material={m.darkSteel} position={[0, -0.002, depth / 2]} />
      {[-0.25, 0.25].map((x) => <mesh key={x} geometry={rbox(0.12, 0.004, 0.02, 0.002)} material={m.lightWarm} position={[x, -0.005, depth / 2 + 0.1]} />)}
    </group>
  );
}

export function ArchedHood({ wb = 1.4, wt = 0.98, bottom, top, depth = 0.56 }: { wb?: number; wt?: number; bottom: number; top: number; depth?: number }) {
  const m = useMats();
  const H = top - bottom;
  const geo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-wb / 2, 0);
    s.lineTo(-wb / 2 + 0.06, 0);
    s.quadraticCurveTo(0, 0.2, wb / 2 - 0.06, 0); // arched bottom
    s.lineTo(wb / 2, 0);
    s.lineTo(wb / 2, 0.17);
    s.quadraticCurveTo(wb / 2 - 0.02, 0.5, wt / 2, 0.82);
    s.lineTo(wt / 2, H);
    s.lineTo(-wt / 2, H);
    s.lineTo(-wt / 2, 0.82);
    s.quadraticCurveTo(-wb / 2 + 0.02, 0.5, -wb / 2, 0.17);
    s.closePath();
    return new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelSize: 0.01, bevelThickness: 0.01, bevelSegments: 4, curveSegments: 32 });
  }, [wb, wt, H, depth]);
  const corbel = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(0.2, 0);
    s.quadraticCurveTo(0.21, -0.1, 0.12, -0.13);
    s.quadraticCurveTo(0.05, -0.16, 0.06, -0.3);
    s.lineTo(0, -0.3);
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.07, bevelEnabled: true, bevelSize: 0.005, bevelThickness: 0.005, bevelSegments: 2, curveSegments: 20 });
    g.rotateY(-Math.PI / 2);
    g.translate(0.035, 0, 0);
    return g;
  }, []);
  return (
    <group position={[0, bottom, 0]}>
      <mesh geometry={geo} material={m.plaster} castShadow receiveShadow />
      {/* mantel ledge */}
      <mesh geometry={rbox(wb + 0.12, 0.05, depth + 0.07, 0.012)} material={m.plaster} position={[0, 0.195, depth / 2 + 0.02]} castShadow />
      <mesh geometry={rbox(wb + 0.08, 0.025, depth + 0.05, 0.008)} material={m.plaster} position={[0, 0.16, depth / 2 + 0.01]} />
      {[-1, 1].map((sx) => <mesh key={sx} geometry={corbel} material={m.plaster} position={[sx * (wb / 2 - 0.04), 0.0, 0]} castShadow />)}
      <mesh geometry={rbox(wb - 0.16, 0.006, depth - 0.08, 0)} material={m.darkSteel} position={[0, 0.03, depth / 2]} />
    </group>
  );
}

// ---------------- sinks ----------------
export function UndermountSink({ w = 0.76, d = 0.45, depth = 0.23 }: { w?: number; d?: number; depth?: number }) {
  const m = useMats();
  const geo = useMemo(() => new THREE.BoxGeometry(w, depth, d), [w, d, depth]);
  const drain = useMemo(() => new THREE.CylinderGeometry(0.045, 0.045, 0.004, 32), []);
  const basinMat = useMemo(() => { const b = m.darkSteel.clone(); b.side = THREE.BackSide; return b; }, [m.darkSteel]);
  return (
    <group>
      <mesh geometry={geo} material={basinMat} position={[0, -depth / 2, 0]} receiveShadow />
      <mesh geometry={drain} material={m.steel} position={[w * 0.18, -depth + 0.003, 0]} />
    </group>
  );
}

export function FarmhouseSink({ w = 0.84, d = 0.5, h = 0.25, apronOut = 0.02 }: { w?: number; d?: number; h?: number; apronOut?: number }) {
  const m = useMats();
  const t = 0.03;
  const drain = useMemo(() => new THREE.CylinderGeometry(0.045, 0.045, 0.004, 32), []);
  return (
    <group>
      {/* origin = top center of the opening; front apron sits proud of the cabinets */}
      <mesh geometry={rbox(w, h, t, 0.01)} material={m.ceramic} position={[0, -h / 2 + 0.002, d / 2 + apronOut]} castShadow receiveShadow />
      <mesh geometry={rbox(w, h, t, 0.008)} material={m.ceramic} position={[0, -h / 2, -d / 2]} />
      <mesh geometry={rbox(t, h, d, 0.008)} material={m.ceramic} position={[-w / 2 + t / 2, -h / 2, apronOut / 2]} />
      <mesh geometry={rbox(t, h, d, 0.008)} material={m.ceramic} position={[w / 2 - t / 2, -h / 2, apronOut / 2]} />
      <mesh geometry={rbox(w, t, d + apronOut, 0.01)} material={m.ceramic} position={[0, -h + t / 2, apronOut / 2]} receiveShadow />
      <mesh geometry={drain} material={m.steel} position={[0, -h + t + 0.002, 0]} />
    </group>
  );
}

// ---------------- faucets ----------------
function Tube({ points, r, mat }: { points: [number, number, number][]; r: number; mat: THREE.Material }) {
  const geo = useMemo(() => new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p))), 96, r, 18, false), [points, r]);
  return <mesh geometry={geo} material={mat} castShadow />;
}

export function Faucet({ kind }: { kind: 'gooseneck' | 'bridge' | 'modern' }) {
  const m = useMats();
  const base = useMemo(() => new THREE.CylinderGeometry(0.026, 0.03, 0.05, 28), []);
  const head = useMemo(() => new THREE.CylinderGeometry(0.017, 0.015, 0.075, 24), []);
  if (kind === 'modern') {
    return (
      <group>
        <mesh geometry={rbox(0.05, 0.06, 0.05, 0.006)} material={m.hardware} position={[0, 0.03, 0]} castShadow />
        <mesh geometry={rbox(0.032, 0.34, 0.032, 0.012)} material={m.hardware} position={[0, 0.2, 0]} castShadow />
        <mesh geometry={rbox(0.032, 0.032, 0.25, 0.012)} material={m.hardware} position={[0, 0.355, 0.11]} castShadow />
        <mesh geometry={rbox(0.018, 0.012, 0.07, 0.004)} material={m.hardware} position={[0.04, 0.09, 0]} />
      </group>
    );
  }
  if (kind === 'bridge') {
    const crossGeo = new THREE.CapsuleGeometry(0.006, 0.06, 4, 10);
    return (
      <group>
        {[-0.1, 0.1].map((x) => (
          <group key={x} position={[x, 0, 0]}>
            <mesh geometry={base} material={m.hardware} position={[0, 0.025, 0]} />
            <mesh geometry={rbox(0.03, 0.08, 0.03, 0.012)} material={m.hardware} position={[0, 0.08, 0]} />
            <mesh geometry={crossGeo} material={m.hardware} position={[0, 0.13, 0]} rotation={[0, 0, Math.PI / 2]} />
            <mesh geometry={crossGeo} material={m.hardware} position={[0, 0.13, 0]} rotation={[Math.PI / 2, 0, 0]} />
          </group>
        ))}
        <Tube points={[[-0.1, 0.1, 0], [0, 0.1, 0.0], [0.1, 0.1, 0]]} r={0.012} mat={m.hardware} />
        <Tube points={[[0, 0.1, 0], [0, 0.3, 0], [0, 0.4, 0.06], [0, 0.38, 0.17], [0, 0.3, 0.22], [0, 0.24, 0.225]]} r={0.012} mat={m.hardware} />
        <mesh geometry={head} material={m.hardware} position={[0, 0.215, 0.225]} />
      </group>
    );
  }
  return (
    <group>
      <mesh geometry={base} material={m.hardware} position={[0, 0.025, 0]} castShadow />
      <Tube points={[[0, 0.04, 0], [0, 0.26, 0], [0, 0.385, 0.05], [0, 0.375, 0.17], [0, 0.31, 0.225], [0, 0.26, 0.232]]} r={0.0125} mat={m.hardware} />
      <mesh geometry={head} material={m.hardware} position={[0, 0.235, 0.232]} castShadow />
      <mesh geometry={new THREE.CapsuleGeometry(0.006, 0.07, 4, 10)} material={m.hardware} position={[0.045, 0.1, 0]} rotation={[0, 0, Math.PI / 2.4]} />
    </group>
  );
}

export function PotFiller() {
  const m = useMats();
  return (
    <group>
      <mesh geometry={rbox(0.06, 0.06, 0.02, 0.01)} material={m.hardware} position={[0, 0, 0.01]} />
      <Tube points={[[0, 0, 0.01], [0, 0, 0.08], [0.02, 0, 0.1]]} r={0.011} mat={m.hardware} />
      <Tube points={[[0.02, 0, 0.1], [0.3, 0, 0.1]]} r={0.011} mat={m.hardware} />
      <mesh geometry={new THREE.CylinderGeometry(0.016, 0.016, 0.05, 20)} material={m.hardware} position={[0.3, 0, 0.1]} />
      <Tube points={[[0.3, 0, 0.1], [0.08, 0, 0.13], [0.03, -0.01, 0.13]]} r={0.011} mat={m.hardware} />
      <Tube points={[[0.03, -0.01, 0.13], [0.0, -0.06, 0.13], [0.0, -0.1, 0.13]]} r={0.011} mat={m.hardware} />
    </group>
  );
}
