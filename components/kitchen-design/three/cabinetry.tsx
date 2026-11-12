'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useMats } from './materials';
import { meterBox, rbox, lathe, profileSweep } from './geometry';

// US standard dimensions, meters
export const TOE = 0.1;
export const TOE_RECESS = 0.075;
export const BASE_H = 0.876; // 34.5" box
export const DEPTH = 0.61; // 24"
export const FT = 0.02; // front thickness
export const GAP = 0.003; // reveal between fronts
export const WALL_D = 0.33;

export type DoorStyle = 'shaker' | 'slab' | 'inset';
export interface CabStyle { door: DoorStyle; pull: 'bar' | 'knob' | 'edge'; drawerPull: 'bar' | 'cup' | 'edge'; }

type Handle =
  | { kind: 'drawer' }
  | { kind: 'door'; side: 'l' | 'r'; v: 'top' | 'bottom' }
  | { kind: 'appliance'; side: 'l' | 'r' }
  | null;

// Cabinet-part geometry with UVs in meters scaled to a 0.6 x 1.2 m veneer leaf.
const cab = (w: number, h: number, d: number, r = 0.0025) =>
  meterBox(w, h, d, r, [1 / 0.6, 1 / 1.2], [((w * 7.31) % 1), ((h * 3.17) % 1)]);

// ---------------- hardware ----------------
const capsuleCache = new Map<string, THREE.CapsuleGeometry>();
const capsule = (r: number, l: number) => {
  const k = `${r}|${l.toFixed(3)}`;
  let g = capsuleCache.get(k);
  if (!g) { g = new THREE.CapsuleGeometry(r, l, 4, 14); capsuleCache.set(k, g); }
  return g;
};
const postGeo = new THREE.CylinderGeometry(0.0045, 0.0055, 0.03, 12);
postGeo.rotateX(Math.PI / 2);

export function BarPull({ length, vertical = false, r = 0.0065 }: { length: number; vertical?: boolean; r?: number }) {
  const m = useMats();
  const half = length / 2 - 0.012;
  return (
    <group>
      <mesh geometry={capsule(r, length - 2 * r)} material={m.hardware} rotation={vertical ? [0, 0, 0] : [0, 0, Math.PI / 2]} position={[0, 0, 0.032]} castShadow />
      <mesh geometry={postGeo} material={m.hardware} position={vertical ? [0, half, 0.015] : [half, 0, 0.015]} />
      <mesh geometry={postGeo} material={m.hardware} position={vertical ? [0, -half, 0.015] : [-half, 0, 0.015]} />
    </group>
  );
}

const knobGeo = (() => {
  const g = lathe([[0, 0], [0.0055, 0], [0.0055, 0.013], [0.012, 0.02], [0.0165, 0.027], [0.015, 0.033], [0.008, 0.0365], [0, 0.037]], 24);
  g.rotateX(Math.PI / 2);
  return g;
})();
export function Knob() {
  const m = useMats();
  return <mesh geometry={knobGeo} material={m.hardware} castShadow />;
}

const cupGeo = (() => {
  const g = new THREE.CylinderGeometry(0.02, 0.02, 0.085, 20, 1, false, 0, Math.PI);
  g.rotateZ(Math.PI / 2);
  g.rotateX(Math.PI / 2);
  return g;
})();
export function CupPull() {
  const m = useMats();
  return (
    <group>
      <mesh geometry={rbox(0.11, 0.024, 0.006, 0.002)} material={m.hardware} position={[0, 0.012, 0.003]} />
      <mesh geometry={cupGeo} material={m.hardware} position={[0, 0.008, 0.004]} rotation={[0, 0, 0]} castShadow />
    </group>
  );
}

function PullFor({ handle, w, h, style }: { handle: Handle; w: number; h: number; style: CabStyle }) {
  const m = useMats();
  if (!handle) return null;
  const z = FT;
  if (handle.kind === 'drawer') {
    const y = h > 0.3 ? h / 2 - 0.09 : 0;
    if (style.drawerPull === 'edge') return null;
    if (style.drawerPull === 'cup') return <group position={[0, y, z]}><CupPull /></group>;
    const len = Math.min(0.45, Math.max(0.13, w * 0.36));
    return <group position={[0, y, z]}><BarPull length={len} /></group>;
  }
  if (handle.kind === 'appliance') {
    const x = (handle.side === 'r' ? 1 : -1) * (w / 2 - 0.05);
    if (style.pull === 'edge') {
      return <mesh geometry={rbox(0.016, h * 0.98, 0.026, 0.003)} material={m.blackMetal} position={[(handle.side === 'r' ? 1 : -1) * (w / 2 - 0.008), 0, z + 0.004]} />;
    }
    const len = Math.min(0.95, h * 0.6);
    return <group position={[x, 0, z]}><BarPull length={len} vertical r={0.009} /></group>;
  }
  // door
  const x = (handle.side === 'r' ? 1 : -1) * (w / 2 - 0.042);
  if (style.pull === 'edge') return null;
  if (style.pull === 'knob') {
    const y = handle.v === 'top' ? h / 2 - 0.065 : -h / 2 + 0.065;
    return <group position={[x, y, z]}><Knob /></group>;
  }
  const len = h > 0.6 ? 0.2 : 0.14;
  const y = handle.v === 'top' ? h / 2 - 0.07 - len / 2 : -h / 2 + 0.07 + len / 2;
  return <group position={[x, y, z]}><BarPull length={len} vertical /></group>;
}

// ---------------- fronts ----------------
export function ShakerFront({ w, h, mat, glass = false, stile }: { w: number; h: number; mat: THREE.Material; glass?: boolean; stile?: number }) {
  const m = useMats();
  const s = stile ?? Math.min(0.068, h * 0.24, w * 0.2);
  const pw = w - 2 * s, ph = h - 2 * s;
  return (
    <group>
      <mesh geometry={cab(s, h, FT)} material={mat} position={[-w / 2 + s / 2, 0, FT / 2]} castShadow receiveShadow />
      <mesh geometry={cab(s, h, FT)} material={mat} position={[w / 2 - s / 2, 0, FT / 2]} castShadow receiveShadow />
      <mesh geometry={cab(pw + 0.002, s, FT)} material={mat} position={[0, h / 2 - s / 2, FT / 2]} receiveShadow />
      <mesh geometry={cab(pw + 0.002, s, FT)} material={mat} position={[0, -h / 2 + s / 2, FT / 2]} receiveShadow />
      {glass ? (
        <mesh geometry={rbox(pw, ph, 0.004, 0.0005)} material={m.glass} position={[0, 0, FT * 0.5]} />
      ) : (
        <>
          {/* recessed center panel with a small raised field */}
          <mesh geometry={cab(pw + 0.004, ph + 0.004, FT * 0.4)} material={mat} position={[0, 0, FT * 0.2]} receiveShadow />
        </>
      )}
    </group>
  );
}

export function Front({ w, h, mat, style, handle = null, glass = false }: { w: number; h: number; mat: THREE.Material; style: CabStyle; handle?: Handle; glass?: boolean }) {
  const m = useMats();
  let body: React.ReactNode;
  let pw = w, ph = h;
  if (style.door === 'slab') {
    body = <mesh geometry={cab(w, h, FT, 0.003)} material={mat} position={[0, 0, FT / 2]} castShadow receiveShadow />;
  } else if (style.door === 'shaker') {
    body = <ShakerFront w={w} h={h} mat={mat} glass={glass} />;
  } else {
    // inset: face frame flush with a shaker door set inside it
    const f = 0.036;
    pw = w - 2 * f - 2 * GAP; ph = h - 2 * f - 2 * GAP;
    body = (
      <group>
        <mesh geometry={cab(f, h, FT)} material={mat} position={[-w / 2 + f / 2, 0, FT / 2]} castShadow />
        <mesh geometry={cab(f, h, FT)} material={mat} position={[w / 2 - f / 2, 0, FT / 2]} castShadow />
        <mesh geometry={cab(w - 2 * f, f, FT)} material={mat} position={[0, h / 2 - f / 2, FT / 2]} />
        <mesh geometry={cab(w - 2 * f, f, FT)} material={mat} position={[0, -h / 2 + f / 2, FT / 2]} />
        <mesh geometry={rbox(w - 2 * f, h - 2 * f, 0.002, 0)} material={m.reveal} position={[0, 0, 0.001]} />
        <group position={[0, 0, 0]}>
          <ShakerFront w={pw} h={ph} mat={mat} glass={glass} stile={Math.min(0.06, ph * 0.22, pw * 0.2)} />
        </group>
      </group>
    );
  }
  return (
    <group>
      {body}
      <PullFor handle={handle} w={style.door === 'inset' ? pw : w} h={style.door === 'inset' ? ph : h} style={style} />
    </group>
  );
}

// ---------------- base cabinets ----------------
export type BaseKind = 'door2' | 'door1' | 'drawers3' | 'drawers2' | 'sink' | 'dw' | 'panel' | 'filler';

export function BaseUnit({ w, kind, style, mat, side = 'r', depth = DEPTH, noToe = false }: {
  w: number; kind: BaseKind; style: CabStyle; mat: THREE.Material; side?: 'l' | 'r'; depth?: number; noToe?: boolean;
}) {
  const m = useMats();
  const edge = style.pull === 'edge';
  const top = BASE_H - (edge ? 0.036 : 0) - GAP;
  const bottom = TOE + GAP;
  const H = top - bottom;
  const fronts: { y: number; h: number; x: number; fw: number; handle: Handle }[] = [];
  const stack = (ratios: number[], handleFor: (i: number) => Handle) => {
    const usable = H - GAP * (ratios.length - 1);
    let y = top;
    ratios.forEach((r, i) => {
      const h = usable * r;
      fronts.push({ y: y - h / 2, h, x: 0, fw: w - GAP * 2, handle: handleFor(i) });
      y -= h + GAP;
    });
  };
  const pair = (y: number, h: number, single = false) => {
    if (single || w < 0.55) {
      fronts.push({ y, h, x: 0, fw: w - 2 * GAP, handle: { kind: 'door', side: side === 'r' ? 'l' : 'r', v: 'top' } });
    } else {
      const fw = (w - 3 * GAP) / 2;
      fronts.push({ y, h, x: -fw / 2 - GAP / 2, fw, handle: { kind: 'door', side: 'r', v: 'top' } });
      fronts.push({ y, h, x: fw / 2 + GAP / 2, fw, handle: { kind: 'door', side: 'l', v: 'top' } });
    }
  };
  if (kind === 'drawers3') stack([0.22, 0.36, 0.42], () => ({ kind: 'drawer' }));
  else if (kind === 'drawers2') stack([0.42, 0.58], () => ({ kind: 'drawer' }));
  else if (kind === 'dw') stack([1], () => ({ kind: 'drawer' }));
  else if (kind === 'panel' || kind === 'filler') stack([1], () => null);
  else {
    const dh = edge ? 0 : 0.165;
    if (dh) fronts.push({ y: top - dh / 2, h: dh, x: 0, fw: w - 2 * GAP, handle: kind === 'sink' && style.drawerPull !== 'bar' ? null : { kind: 'drawer' } });
    const rest = H - (dh ? dh + GAP : 0);
    pair(bottom + rest / 2, rest, kind === 'door1');
  }

  const bodyH = BASE_H - TOE;
  return (
    <group>
      {/* carcass */}
      <mesh geometry={cab(w, bodyH, depth - FT, 0.001)} material={mat} position={[0, TOE + bodyH / 2, (depth - FT) / 2]} receiveShadow castShadow />
      {/* dark reveal so the gaps between fronts read crisply */}
      <mesh geometry={rbox(w - 0.002, bodyH - 0.002, 0.002, 0)} material={m.reveal} position={[0, TOE + bodyH / 2, depth - FT + 0.001]} />
      {edge && (
        // handle-free channel under the countertop
        <mesh geometry={rbox(w, 0.03, 0.04, 0.002)} material={m.blackMetal} position={[0, BASE_H - 0.018, depth - 0.03]} />
      )}
      {!noToe && <mesh geometry={rbox(w, TOE, 0.02, 0)} material={m.reveal} position={[0, TOE / 2, depth - TOE_RECESS]} receiveShadow />}
      {fronts.map((f, i) => (
        <group key={i} position={[f.x, f.y, depth - FT]}>
          <Front w={f.fw} h={f.h} mat={mat} style={style} handle={kind === 'panel' ? null : f.handle} />
        </group>
      ))}
    </group>
  );
}

// ---------------- wall cabinets ----------------
export type WallKind = 'door2' | 'door1' | 'glass2' | 'glass1' | 'open';

function GlassInterior({ w, h, d }: { w: number; h: number; d: number }) {
  const m = useMats();
  const shelves = h > 0.8 ? [h * 0.36, h * 0.68] : [h * 0.5];
  const plateGeo = useMemo(() => new THREE.CylinderGeometry(0.11, 0.1, 0.012, 32), []);
  const glassGeo = useMemo(() => lathe([[0, 0], [0.032, 0], [0.034, 0.005], [0.03, 0.04], [0.036, 0.11], [0.034, 0.112], [0.028, 0.045], [0, 0.04]], 20), []);
  return (
    <group>
      <mesh geometry={rbox(w - 0.03, h - 0.03, 0.006, 0)} material={m.interior} position={[0, h / 2, 0.01]} />
      {shelves.map((y, i) => (
        <group key={i} position={[0, y, d / 2]}>
          <mesh geometry={rbox(w - 0.04, 0.018, d - 0.06, 0.002)} material={m.interior} receiveShadow />
          {i === 0
            ? [0, 1, 2, 3, 4].map((k) => <mesh key={k} geometry={plateGeo} material={m.plate} position={[-w * 0.18, 0.016 + k * 0.014, 0]} />)
            : [-0.12, -0.04, 0.04].map((x, k) => <mesh key={k} geometry={glassGeo} material={m.glass} position={[x * (w / 0.8) + w * 0.12, 0.01, 0]} />)}
          {i === 0 && <mesh geometry={glassGeo} material={m.glass} position={[w * 0.2, 0.01, 0]} />}
        </group>
      ))}
      {/* puck light */}
      <mesh geometry={rbox(w - 0.1, 0.006, 0.02, 0.002)} material={m.lightWarm} position={[0, h - 0.025, d * 0.6]} />
    </group>
  );
}

export function WallUnit({ w, h, kind, style, mat, depth = WALL_D, led = true, side = 'r' }: {
  w: number; h: number; kind: WallKind; style: CabStyle; mat: THREE.Material; depth?: number; led?: boolean; side?: 'l' | 'r';
}) {
  const m = useMats();
  const glass = kind === 'glass1' || kind === 'glass2';
  const single = kind === 'door1' || kind === 'glass1';
  const fh = h - 2 * GAP;
  const fronts: { x: number; fw: number; handle: Handle }[] = [];
  if (kind !== 'open') {
    if (single) fronts.push({ x: 0, fw: w - 2 * GAP, handle: { kind: 'door', side, v: 'bottom' } });
    else {
      const fw = (w - 3 * GAP) / 2;
      fronts.push({ x: -fw / 2 - GAP / 2, fw, handle: { kind: 'door', side: 'r', v: 'bottom' } });
      fronts.push({ x: fw / 2 + GAP / 2, fw, handle: { kind: 'door', side: 'l', v: 'bottom' } });
    }
  }
  return (
    <group>
      {/* carcass: sides, top, bottom, back so glass and open units read hollow */}
      <mesh geometry={cab(0.018, h, depth - FT, 0.001)} material={mat} position={[-w / 2 + 0.009, h / 2, (depth - FT) / 2]} castShadow />
      <mesh geometry={cab(0.018, h, depth - FT, 0.001)} material={mat} position={[w / 2 - 0.009, h / 2, (depth - FT) / 2]} castShadow />
      <mesh geometry={cab(w, 0.02, depth - FT, 0.001)} material={mat} position={[0, 0.01, (depth - FT) / 2]} castShadow />
      <mesh geometry={cab(w, 0.02, depth - FT, 0.001)} material={mat} position={[0, h - 0.01, (depth - FT) / 2]} />
      {(glass || kind === 'open') ? <GlassInterior w={w} h={h} d={depth - FT} /> : <mesh geometry={rbox(w - 0.002, h - 0.002, 0.002, 0)} material={m.reveal} position={[0, h / 2, depth - FT - 0.001]} />}
      {fronts.map((f, i) => (
        <group key={i} position={[f.x, h / 2, depth - FT]}>
          <Front w={f.fw} h={fh} mat={mat} style={style} handle={f.handle} glass={glass} />
        </group>
      ))}
      {led && <mesh geometry={rbox(w - 0.06, 0.008, 0.018, 0.002)} material={m.lightWarm} position={[0, -0.005, depth - 0.07]} />}
    </group>
  );
}

// ---------------- tall units ----------------
export type TallKind = 'fridge' | 'pantry' | 'ovens' | 'panel';

function WallOven({ w, h }: { w: number; h: number }) {
  const m = useMats();
  return (
    <group>
      <mesh geometry={rbox(w, h, 0.03, 0.004)} material={m.steel} position={[0, 0, 0.015]} castShadow />
      <mesh geometry={rbox(w * 0.84, h * 0.13, 0.006, 0.002)} material={m.darkGlass} position={[0, h / 2 - h * 0.1, 0.031]} />
      <mesh geometry={rbox(w * 0.78, h * 0.52, 0.006, 0.004)} material={m.darkGlass} position={[0, -h * 0.08, 0.031]} />
      <group position={[0, h / 2 - h * 0.23, 0.03]}><BarPull length={w * 0.8} r={0.009} /></group>
    </group>
  );
}

export function TallUnit({ w, h, kind, style, mat, depth = 0.64, side = 'r' }: {
  w: number; h: number; kind: TallKind; style: CabStyle; mat: THREE.Material; depth?: number; side?: 'l' | 'r';
}) {
  const m = useMats();
  const bodyH = h - TOE;
  const inner: React.ReactNode[] = [];
  const zF = depth - FT;
  const top = h - GAP, bottom = TOE + GAP;
  if (kind === 'fridge') {
    const lower = 0.72;
    const upperH = top - bottom - lower - GAP;
    inner.push(
      <group key="u" position={[0, top - upperH / 2, zF]}><Front w={w - 2 * GAP} h={upperH} mat={mat} style={style} handle={{ kind: 'appliance', side: side === 'r' ? 'l' : 'r' }} /></group>,
      <group key="l" position={[0, bottom + lower / 2, zF]}><Front w={w - 2 * GAP} h={lower} mat={mat} style={style} handle={style.pull === 'edge' ? { kind: 'appliance', side: 'l' } : { kind: 'drawer' }} /></group>,
    );
  } else if (kind === 'pantry') {
    const upperH = (top - bottom) * 0.36;
    const lowerH = top - bottom - upperH - GAP;
    const fw = (w - 3 * GAP) / 2;
    [[-1, 'r'], [1, 'l']].forEach(([sx, sd]) => {
      const x = (sx as number) * (fw / 2 + GAP / 2);
      inner.push(
        <group key={`u${sx}`} position={[x, top - upperH / 2, zF]}><Front w={fw} h={upperH} mat={mat} style={style} handle={{ kind: 'door', side: sd as 'l' | 'r', v: 'bottom' }} /></group>,
        <group key={`l${sx}`} position={[x, bottom + lowerH / 2, zF]}><Front w={fw} h={lowerH} mat={mat} style={style} handle={style.pull === 'edge' ? { kind: 'appliance', side: sd as 'l' | 'r' } : { kind: 'door', side: sd as 'l' | 'r', v: 'top' }} /></group>,
      );
    });
  } else if (kind === 'ovens') {
    const ovenH = 0.6;
    const topH = top - bottom - 2 * ovenH - 0.32 - 3 * GAP;
    let y = top;
    inner.push(<group key="t" position={[0, y - topH / 2, zF]}><Front w={w - 2 * GAP} h={topH} mat={mat} style={style} handle={{ kind: 'door', side: 'l', v: 'bottom' }} /></group>);
    y -= topH + GAP;
    inner.push(<group key="o1" position={[0, y - ovenH / 2, zF]}><WallOven w={w - 0.04} h={ovenH} /></group>);
    y -= ovenH + GAP;
    inner.push(<group key="o2" position={[0, y - ovenH / 2, zF]}><WallOven w={w - 0.04} h={ovenH} /></group>);
    y -= ovenH + GAP;
    const dh = y - bottom;
    inner.push(<group key="d" position={[0, bottom + dh / 2, zF]}><Front w={w - 2 * GAP} h={dh} mat={mat} style={style} handle={{ kind: 'drawer' }} /></group>);
  } else {
    inner.push(<mesh key="p" geometry={cab(w, bodyH, FT, 0.003)} material={mat} position={[0, TOE + bodyH / 2, zF + FT / 2]} castShadow />);
  }
  return (
    <group>
      <mesh geometry={cab(w, bodyH, depth - FT, 0.001)} material={mat} position={[0, TOE + bodyH / 2, (depth - FT) / 2]} castShadow receiveShadow />
      <mesh geometry={rbox(w - 0.002, bodyH - 0.002, 0.002, 0)} material={m.reveal} position={[0, TOE + bodyH / 2, zF + 0.001]} />
      <mesh geometry={rbox(w, TOE, 0.02, 0)} material={m.reveal} position={[0, TOE / 2, depth - TOE_RECESS]} />
      {inner}
    </group>
  );
}

// Finished end panel (full depth, covers a run's exposed side)
export function EndPanel({ h, depth, mat }: { h: number; depth: number; mat: THREE.Material }) {
  return <mesh geometry={cab(0.02, h, depth, 0.003)} material={mat} position={[0, h / 2, depth / 2]} castShadow receiveShadow />;
}

// ---------------- crown molding ----------------
export function Crown({ length, mat }: { length: number; mat: THREE.Material }) {
  const g = useMemo(() => profileSweep([
    [0, 0], [0.012, 0], [0.012, 0.012], [0.02, 0.016], [0.034, 0.03], [0.05, 0.05], [0.062, 0.058], [0.072, 0.06], [0.072, 0.085], [0, 0.085],
  ], length), [length]);
  return <mesh geometry={g} material={mat} castShadow />;
}

// ---------------- run helper ----------------
export interface RunItem { w: number; [k: string]: unknown }
// Lays items left-to-right along local +X starting at 0; fronts face local +Z.
export function Run<T extends RunItem>({ position, rotationY = 0, items, render }: {
  position: [number, number, number]; rotationY?: number; items: T[]; render: (item: T, i: number) => React.ReactNode;
}) {
  let x = 0;
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {items.map((it, i) => {
        const cx = x + it.w / 2;
        x += it.w;
        return <group key={i} position={[cx, 0, 0]}>{render(it, i)}</group>;
      })}
    </group>
  );
}
export const runLength = (items: RunItem[]) => items.reduce((s, i) => s + i.w, 0);
