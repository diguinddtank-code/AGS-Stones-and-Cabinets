'use client';

import React from 'react';
import * as THREE from 'three';
import type { KitchenConfig } from '@/lib/kitchenDesign/catalog';
import { useMats } from './materials';
import { rbox, lathe } from './geometry';
import {
  BASE_H, DEPTH, WALL_D, BaseUnit, WallUnit, TallUnit, EndPanel, Crown, Run, type CabStyle, type BaseKind, type WallKind, type TallKind,
} from './cabinetry';
import { ProRange, InductionCooktop, CurvedHood, BoxHood, ArchedHood, UndermountSink, FarmhouseSink, Faucet, PotFiller } from './appliances';
import { GlobePendant, DomePendant, LinearPendant, Stool, Window, FloatingShelf, Plates, Vase, FruitBowl, CuttingBoard, Books, Canisters, Plant } from './fixtures';
import { Counter, Splash, Waterfall, counterTop, slabThickness } from './stone';

export const CEIL = 2.9;
const CT_D = 0.645; // countertop depth (25.4")

export interface Hotspot { id: string; position: [number, number, number]; title: string; text: string }
export interface PendantLight { position: [number, number, number] }
export interface LayoutMeta { hotspots: Hotspot[]; lights: PendantLight[]; underCabinet: { position: [number, number, number]; width: number; rotY?: number }[] }

type BItem = { w: number; t: 'base'; kind: BaseKind; side?: 'l' | 'r'; depth?: number } | { w: number; t: 'tall'; kind: TallKind; h: number } | { w: number; t: 'range' } | { w: number; t: 'gap' };
type WItem = { w: number; kind: WallKind; side?: 'l' | 'r' };

function Room({ back, left, right, wallMat }: { back: [number, number]; left?: [number, number]; right?: { x: number; z: [number, number] }; wallMat?: THREE.Material }) {
  const m = useMats();
  const wm = wallMat ?? m.wall;
  const floorGeo = React.useMemo(() => {
    const g = new THREE.PlaneGeometry(16, 16);
    const uv = g.getAttribute('uv');
    for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 4, uv.getY(i) * 4);
    return g;
  }, []);
  const bw = back[1] - back[0];
  return (
    <group>
      <mesh geometry={floorGeo} material={m.floor} rotation={[-Math.PI / 2, 0, 0]} position={[0.5, 0, 4]} receiveShadow />
      <mesh geometry={new THREE.PlaneGeometry(bw, CEIL)} material={wm} position={[(back[0] + back[1]) / 2, CEIL / 2, 0]} receiveShadow />
      {left && (
        <mesh geometry={new THREE.PlaneGeometry(left[1] - left[0], CEIL)} material={wm} rotation={[0, Math.PI / 2, 0]} position={[back[0], CEIL / 2, (left[0] + left[1]) / 2]} receiveShadow />
      )}
      {right && (
        <mesh geometry={new THREE.PlaneGeometry(right.z[1] - right.z[0], CEIL)} material={wm} rotation={[0, -Math.PI / 2, 0]} position={[right.x, CEIL / 2, (right.z[0] + right.z[1]) / 2]} receiveShadow />
      )}
      {/* baseboard on the open stretch of the left wall */}
      {left && <mesh geometry={rbox(0.015, 0.11, left[1] - 3.0 > 0 ? left[1] - 3.0 : 0.01, 0.002)} material={m.trim} position={[back[0] + 0.008, 0.055, (3.0 + left[1]) / 2]} />}
    </group>
  );
}

function BaseRun({ items, origin, rotY = 0, style, mat, onRange }: {
  items: BItem[]; origin: [number, number]; rotY?: number; style: CabStyle; mat: THREE.Material; onRange?: React.ReactNode;
}) {
  return (
    <Run position={[origin[0], 0, origin[1]]} rotationY={rotY} items={items} render={(it) => {
      if (it.t === 'base') return <BaseUnit w={it.w} kind={it.kind} style={style} mat={mat} side={it.side} depth={it.depth} />;
      if (it.t === 'tall') return <TallUnit w={it.w} h={it.h} kind={it.kind} style={style} mat={mat} />;
      if (it.t === 'range') return onRange ?? <ProRange w={it.w} />;
      return null;
    }} />
  );
}

function WallRun({ items, origin, y, h, rotY = 0, style, mat }: { items: WItem[]; origin: [number, number]; y: number; h: number; rotY?: number; style: CabStyle; mat: THREE.Material }) {
  return (
    <Run position={[origin[0], y, origin[1]]} rotationY={rotY} items={items} render={(it) => <WallUnit w={it.w} h={h} kind={it.kind} style={style} mat={mat} side={it.side} />} />
  );
}

// =====================================================================
// 1. The Buckhead — modern transitional L-shape + waterfall island
// =====================================================================
export const buckheadMeta: LayoutMeta = {
  hotspots: [
    { id: 'island', position: [-1.36, 0.95, 2.6], title: 'Waterfall island', text: 'The slab turns down both ends to the floor. We miter the joint by hand so the veining wraps the corner.' },
    { id: 'splash', position: [-1.6, 1.15, 0.05], title: 'Full-height slab backsplash', text: 'One continuous piece from the countertop to the cabinets. No grout lines to clean.' },
    { id: 'hood', position: [0.3, 2.2, 0.45], title: 'Curved plaster hood', text: 'A custom hood with a metal band that matches the cabinet hardware.' },
    { id: 'sink', position: [0.11, 1.0, 2.05], title: 'Undermount prep sink', text: 'Cut and polished in our Duluth shop for a seamless undermount fit.' },
  ],
  lights: [{ position: [-0.85, 1.85, 2.25] }, { position: [0, 1.85, 2.25] }, { position: [0.85, 1.85, 2.25] }],
  underCabinet: [{ position: [-1.76, 1.36, 0.25], width: 2.1 }, { position: [1.48, 1.36, 0.25], width: 1.5 }],
};

export function Buckhead({ cfg }: { cfg: KitchenConfig }) {
  const m = useMats();
  const style: CabStyle = { door: 'shaker', pull: 'bar', drawerPull: 'bar' };
  const top = counterTop(cfg);
  const L = -2.87; // left wall x
  const back: BItem[] = [
    { w: 0.61, t: 'base', kind: 'filler' }, { w: 0.76, t: 'base', kind: 'drawers3' }, { w: 0.9, t: 'base', kind: 'door2' },
    { w: 1.22, t: 'range' },
    { w: 0.9, t: 'base', kind: 'door2' }, { w: 0.76, t: 'base', kind: 'drawers3' },
    { w: 0.92, t: 'tall', kind: 'fridge', h: 2.44 }, { w: 0.76, t: 'tall', kind: 'pantry', h: 2.44 },
  ];
  const rangeX0 = L + 0.61 + 0.76 + 0.9; // -0.60
  const rangeX1 = rangeX0 + 1.22;
  const counterEnd = rangeX1 + 0.9 + 0.76; // 2.28
  const leftRun: BItem[] = [{ w: 0.76, t: 'base', kind: 'drawers3' }, { w: 0.9, t: 'base', kind: 'door2' }, { w: 0.48, t: 'base', kind: 'drawers2' }];
  const leftEndZ = 2.75;
  // island
  const iz0 = 1.715, iz1 = 2.785, ix = 1.375;
  const t = slabThickness(cfg);
  const islandItems: BItem[] = [{ w: 0.76, t: 'base', kind: 'drawers3' }, { w: 0.91, t: 'base', kind: 'sink' }, { w: 0.61, t: 'base', kind: 'dw' }, { w: ix * 2 - 2 * t - 0.04 - 2.28, t: 'base', kind: 'drawers2' }];
  const islandRunW = islandItems.reduce((s, i) => s + i.w, 0);
  const sinkX = islandRunW / 2 - (0.76 + 0.455);
  const sinkZ = iz0 + 0.03 + 0.3;
  const hoodX = (rangeX0 + rangeX1) / 2;
  return (
    <group>
      <Room back={[L, 4.2]} left={[0, 6]} />
      {/* back run */}
      <BaseRun items={back} origin={[L, 0]} style={style} mat={m.perimeter} />
      <group position={[3.96 + 0.01, 0, 0]}><EndPanel h={2.44} depth={0.66} mat={m.perimeter} /></group>
      <Counter cfg={cfg} x0={L} x1={rangeX0} z0={0} z1={CT_D} uv={[0.3, 0.2]} />
      <Counter cfg={cfg} x0={rangeX1} x1={counterEnd} z0={0} z1={CT_D} uv={[1.4, 0.6]} />
      {/* left run (fronts face +x) */}
      <BaseRun items={leftRun} origin={[L, leftEndZ]} rotY={Math.PI / 2} style={style} mat={m.perimeter} />
      <Counter cfg={cfg} x0={L} x1={L + CT_D} z0={CT_D} z1={leftEndZ + 0.025} uv={[2.2, 0.1]} />
      {/* range wall */}
      <group position={[hoodX, 0, 0]}>
        <CurvedHood bottom={1.7} top={CEIL} w={1.32} />
      </group>
      <Splash x0={L} x1={counterEnd} y0={top} y1={1.37} uv={[0.3, 0.9]} />
      <Splash x0={rangeX0 - 0.03} x1={rangeX1 + 0.03} y0={1.37} y1={1.7} uv={[1.6, 0.2]} />
      <Splash x0={CT_D} x1={leftEndZ} y0={top} y1={1.0} z={L} rotY={Math.PI / 2} uv={[0.8, 0.4]} />
      {/* uppers */}
      <WallRun items={[{ w: 0.61, kind: 'door1', side: 'r' }, { w: 0.8, kind: 'glass2' }, { w: 0.8, kind: 'glass2' }]} origin={[L, 0]} y={1.37} h={1.07} style={style} mat={m.perimeter} />
      <WallRun items={[{ w: 0.8, kind: 'glass2' }, { w: counterEnd - rangeX1 - 0.03 - 0.8 - 0.0, kind: 'door2' }]} origin={[rangeX1 + 0.03, 0]} y={1.37} h={1.07} style={style} mat={m.perimeter} />
      <group position={[(L + rangeX0 - 0.03) / 2, 2.44, WALL_D]}><Crown length={rangeX0 - 0.03 - L} mat={m.perimeter} /></group>
      <group position={[(rangeX1 + 0.03 + counterEnd) / 2, 2.44, WALL_D]}><Crown length={counterEnd - rangeX1 - 0.03} mat={m.perimeter} /></group>
      <group position={[(counterEnd + 3.96) / 2, 2.44, 0.64]}><Crown length={3.96 - counterEnd} mat={m.perimeter} /></group>
      {/* window over the left run */}
      <group position={[L, 1.05, 1.75]} rotation={[0, Math.PI / 2, 0]}><Window w={1.55} h={1.3} mullions={[2, 2]} /></group>
      {/* island */}
      <BaseRun items={islandItems} origin={[islandRunW / 2, iz0 + 0.03 + DEPTH]} rotY={Math.PI} style={style} mat={m.island} />
      <BaseRun items={[{ w: islandRunW, t: 'base', kind: 'panel', depth: 0.05 }]} origin={[-islandRunW / 2, iz0 + 0.03 + DEPTH]} style={{ ...style, door: 'shaker' }} mat={m.island} />
      <Counter cfg={cfg} x0={-ix} x1={ix} z0={iz0} z1={iz1} uv={[0.1, 0.0]} holes={[{ x: sinkX, z: sinkZ, w: 0.62, d: 0.43, r: 0.025 }]} />
      <Waterfall cfg={cfg} x={-ix + t / 2} z0={iz0} z1={iz1} uv={[0.0, 0.3]} />
      <Waterfall cfg={cfg} x={ix - t / 2} z0={iz0} z1={iz1} uv={[2.75, 0.3]} />
      <group position={[sinkX, BASE_H, sinkZ]}><UndermountSink w={0.62} d={0.43} /></group>
      <group position={[sinkX, top, sinkZ + 0.28]} rotation={[0, Math.PI, 0]}><Faucet kind="gooseneck" /></group>
      {[-0.85, 0, 0.85].map((x) => <group key={x} position={[x, CEIL, 2.25]}><GlobePendant drop={0.82} /></group>)}
      {[-0.82, 0, 0.82].map((x) => <group key={x} position={[x, 0, 3.08]} rotation={[0, Math.PI, 0]}><Stool kind="upholstered" /></group>)}
      {/* styling */}
      <group position={[-0.7, top, 2.4]}><FruitBowl /></group>
      <group position={[-2.1, top, 0.28]}><Vase /></group>
      <group position={[1.15, top, 0.07]}><CuttingBoard /></group>
      <group position={[1.75, top, 0.22]}><Canisters /></group>
      <group position={[L + 0.32, top, 2.45]}><Books /></group>
      <group position={[L + 0.3, top, 1.2]}><Plant s={0.8} /></group>
    </group>
  );
}

// =====================================================================
// 2. The Midtown — warm contemporary, appliance wall + double waterfall
// =====================================================================
export const midtownMeta: LayoutMeta = {
  hotspots: [
    { id: 'wall', position: [2.7, 1.25, 0.05], title: 'Floor-to-ceiling stone wall', text: 'Book-matched slabs run from the counter to the ceiling. The veining lines up across each seam.' },
    { id: 'island', position: [-0.25, 0.95, 2.7], title: 'Double waterfall island', text: 'A mitered top in 2½" thickness for a solid, monolithic look.' },
    { id: 'tall', position: [-1.9, 1.6, 0.66], title: 'Appliance wall', text: 'Panel-ready fridge and stacked wall ovens set flush in walnut.' },
    { id: 'cooktop', position: [1.5, 1.0, 0.35], title: 'Flush induction cooktop', text: 'Cut into the stone so it sits flush with the countertop.' },
  ],
  lights: [{ position: [0.6, 1.72, 2.3] }, { position: [2.0, 1.72, 2.3] }],
  underCabinet: [],
};

export function Midtown({ cfg }: { cfg: KitchenConfig }) {
  const m = useMats();
  const style: CabStyle = { door: 'slab', pull: 'edge', drawerPull: 'edge' };
  const islandStyle: CabStyle = style;
  const top = counterTop(cfg);
  const t = slabThickness(cfg);
  const L = -2.9;
  const tall: BItem[] = [{ w: 0.92, t: 'tall', kind: 'fridge', h: CEIL }, { w: 0.76, t: 'tall', kind: 'ovens', h: CEIL }, { w: 0.76, t: 'tall', kind: 'pantry', h: CEIL }];
  const bx0 = L + 2.44; // -0.46
  const base: BItem[] = [{ w: 0.9, t: 'base', kind: 'drawers2' }, { w: 0.6, t: 'base', kind: 'drawers3' }, { w: 0.92, t: 'base', kind: 'drawers2' }, { w: 0.6, t: 'base', kind: 'drawers3' }, { w: 0.9, t: 'base', kind: 'drawers2' }];
  const bx1 = bx0 + 3.92;
  const cookX = bx0 + 0.9 + 0.6 + 0.46;
  // island
  const icx = 1.3, iw = 3.2, iz0 = 1.745, iz1 = 2.855;
  const ix0 = icx - iw / 2, ix1 = icx + iw / 2;
  const items: BItem[] = [{ w: 0.75, t: 'base', kind: 'drawers3' }, { w: 0.85, t: 'base', kind: 'sink' }, { w: 0.6, t: 'base', kind: 'dw' }, { w: iw - 2 * t - 0.04 - 2.2, t: 'base', kind: 'drawers2' }];
  const runW = items.reduce((s, i) => s + i.w, 0);
  const sinkX = icx + runW / 2 - (0.75 + 0.425);
  const sinkZ = iz0 + 0.03 + 0.3;
  return (
    <group>
      <Room back={[L, 4.4]} left={[0, 6]} />
      <BaseRun items={tall} origin={[L, 0]} style={style} mat={m.perimeter} />
      <BaseRun items={base} origin={[bx0, 0]} style={style} mat={m.perimeter} />
      <Counter cfg={cfg} x0={bx0} x1={bx1 + t} z0={0} z1={CT_D} uv={[0.2, 0.3]} holes={[]} />
      {/* perimeter waterfall at the open end */}
      <group position={[0, 0, 0]}><Waterfall cfg={cfg} x={bx1 + t / 2} z0={0} z1={CT_D} uv={[3.9, 0.2]} /></group>
      <group position={[cookX, top, 0.33]}><InductionCooktop /></group>
      {/* stone feature wall */}
      <Splash x0={bx0} x1={bx1 + t} y0={top} y1={CEIL} uv={[0.2, 1.2]} />
      <group position={[cookX, 0, 0.012]}><BoxHood bottom={1.62} top={CEIL} /></group>
      {/* floating shelves either side of the hood */}
      {[1.38, 1.8].map((y) => (
        <React.Fragment key={y}>
          <group position={[(bx0 + cookX - 0.55) / 2, y, 0.012]}><FloatingShelf w={cookX - 0.55 - bx0 - 0.15} /></group>
          <group position={[(cookX + 0.55 + bx1) / 2, y, 0.012]}><FloatingShelf w={bx1 - cookX - 0.55 - 0.15} /></group>
        </React.Fragment>
      ))}
      <group position={[bx0 + 0.3, 1.43, 0.14]}><Plates n={7} /></group>
      <group position={[bx0 + 0.75, 1.43, 0.12]}><Vase h={0.26} mat={m.plate} /></group>
      <group position={[bx0 + 0.2, 1.85, 0.06]}><Books /></group>
      <group position={[bx0 + 0.8, 1.85, 0.13]}><Plant s={0.7} /></group>
      <group position={[cookX + 0.75, 1.43, 0.12]}><Canisters /></group>
      <group position={[cookX + 1.25, 1.85, 0.13]}><Vase h={0.22} /></group>
      <group position={[cookX + 0.8, 1.85, 0.14]}><Plates n={5} /></group>
      {/* tall window on the left wall */}
      <group position={[L, 0.45, 2.5]} rotation={[0, Math.PI / 2, 0]}><Window w={1.9} h={2.2} mullions={[3, 1]} frameMat={m.blackMetal} /></group>
      {/* island */}
      <BaseRun items={items} origin={[icx + runW / 2, iz0 + 0.03 + DEPTH]} rotY={Math.PI} style={islandStyle} mat={m.island} />
      <BaseRun items={[{ w: runW, t: 'base', kind: 'panel', depth: 0.05 }]} origin={[icx - runW / 2, iz0 + 0.03 + DEPTH]} style={islandStyle} mat={m.island} />
      <Counter cfg={cfg} x0={ix0} x1={ix1} z0={iz0} z1={iz1} uv={[0.4, 0.1]} holes={[{ x: sinkX, z: sinkZ, w: 0.6, d: 0.42, r: 0.012 }]} radius={0.003} />
      <Waterfall cfg={cfg} x={ix0 + t / 2} z0={iz0} z1={iz1} uv={[0.1, 0.4]} />
      <Waterfall cfg={cfg} x={ix1 - t / 2} z0={iz0} z1={iz1} uv={[3.3, 0.4]} />
      <group position={[sinkX, BASE_H, sinkZ]}><UndermountSink w={0.6} d={0.42} /></group>
      <group position={[sinkX, top, sinkZ + 0.27]} rotation={[0, Math.PI, 0]}><Faucet kind="modern" /></group>
      <group position={[icx, CEIL, 2.3]}><LinearPendant length={2.3} drop={1.13} /></group>
      {[-1.1, -0.37, 0.37, 1.1].map((x) => <group key={x} position={[icx + x, 0, 3.12]}><Stool kind="saddle" /></group>)}
      <group position={[icx - 0.9, top, 2.45]}><FruitBowl /></group>
      <group position={[icx + 1.1, top, 2.5]}><Vase h={0.3} /></group>
    </group>
  );
}

// =====================================================================
// 3. The Alpharetta Estate — classic U-shape, inset, furniture island
// =====================================================================
export const estateMeta: LayoutMeta = {
  hotspots: [
    { id: 'sink', position: [0, 0.82, 0.7], title: 'Fireclay farmhouse sink', text: 'The stone is scribed around the apron so the sink sits tight and clean.' },
    { id: 'hood', position: [-2.0, 2.3, 1.9], title: 'Arched hood with corbels', text: 'A plaster hood with a mantel ledge, plus a pot filler over the range.' },
    { id: 'island', position: [0.95, 0.8, 2.62], title: 'Furniture-style island', text: 'Rift white oak on turned legs, topped in natural quartzite.' },
    { id: 'inset', position: [-1.4, 0.55, 0.64], title: 'Inset cabinetry', text: 'Doors sit flush inside a face frame, the hallmark of a custom kitchen.' },
  ],
  lights: [{ position: [-0.5, 1.82, 2.19] }, { position: [0.5, 1.82, 2.19] }],
  underCabinet: [{ position: [-1.67, 1.36, 0.25], width: 1.8 }, { position: [1.67, 1.36, 0.25], width: 1.8 }],
};

function TurnedLeg({ h, mat }: { h: number; mat: THREE.Material }) {
  const g = React.useMemo(() => lathe([
    [0, 0], [0.032, 0], [0.034, 0.03], [0.026, 0.06], [0.03, 0.1], [0.022, 0.16], [0.028, h * 0.5], [0.024, h * 0.62], [0.034, h * 0.66], [0.026, h * 0.7], [0.036, h * 0.74], [0.036, h], [0, h],
  ], 28), [h]);
  return <mesh geometry={g} material={mat} castShadow />;
}

export function Estate({ cfg }: { cfg: KitchenConfig }) {
  const m = useMats();
  const style: CabStyle = { door: 'inset', pull: 'knob', drawerPull: 'cup' };
  const top = counterTop(cfg);
  const L = -2.6, R = 2.6;
  const back: BItem[] = [
    { w: 0.61, t: 'base', kind: 'filler' }, { w: 0.9, t: 'base', kind: 'door2' }, { w: 0.67, t: 'base', kind: 'drawers3' },
    { w: 0.84, t: 'base', kind: 'sink' }, { w: 0.61, t: 'base', kind: 'dw' }, { w: 0.96, t: 'base', kind: 'door2' }, { w: 0.61, t: 'base', kind: 'filler' },
  ];
  const sinkW = 0.8, sinkD = 0.5;
  const leftZ1 = 3.2;
  const left: BItem[] = [{ w: 0.69, t: 'base', kind: 'drawers3' }, { w: 1.22, t: 'range' }, { w: 0.68, t: 'base', kind: 'drawers3' }];
  const rangeZ = leftZ1 - 0.69 - 0.61;
  const right: BItem[] = [{ w: 0.92, t: 'tall', kind: 'pantry', h: 2.55 }, { w: 0.92, t: 'tall', kind: 'fridge', h: 2.55 }, { w: 0.68, t: 'base', kind: 'drawers3' }];
  // island
  const iw = 2.0, iz0 = 1.715, iz1 = 2.665;
  const iItems: BItem[] = [{ w: 0.55, t: 'base', kind: 'drawers3' }, { w: 0.62, t: 'base', kind: 'door2' }, { w: 0.55, t: 'base', kind: 'drawers3' }];
  const iRun = 1.72;
  return (
    <group>
      <Room back={[L, R]} left={[0, 5.5]} right={{ x: R, z: [0, 3.6] }} />
      <BaseRun items={back} origin={[L, 0]} style={style} mat={m.perimeter} />
      <Counter cfg={cfg} x0={L} x1={-sinkW / 2} z0={0} z1={CT_D} uv={[0.2, 0.25]} />
      <Counter cfg={cfg} x0={sinkW / 2} x1={R} z0={0} z1={CT_D} uv={[2.9, 0.25]} />
      <Counter cfg={cfg} x0={-sinkW / 2} x1={sinkW / 2} z0={0} z1={0.085} uv={[2.6, 0.05]} />
      <group position={[0, top, 0.335]}><FarmhouseSink w={sinkW} d={sinkD} h={0.25 + slabThickness(cfg)} apronOut={0.065} /></group>
      <group position={[0, top, 0.045]}><Faucet kind="bridge" /></group>
      {/* window over the sink */}
      <group position={[0, 1.1, 0]}><Window w={1.3} h={1.25} mullions={[2, 3]} /></group>
      <Splash x0={L} x1={R} y0={top} y1={1.08} uv={[0.4, 0.9]} />
      <Splash x0={L} x1={-0.72} y0={1.08} y1={1.37} uv={[0.2, 1.1]} />
      <Splash x0={0.72} x1={R} y0={1.08} y1={1.37} uv={[1.6, 1.1]} />
      <WallRun items={[{ w: 0.61, kind: 'door1', side: 'r' }, { w: 1.27, kind: 'glass2' }]} origin={[L, 0]} y={1.37} h={1.18} style={style} mat={m.perimeter} />
      <WallRun items={[{ w: 1.27, kind: 'glass2' }, { w: 0.61, kind: 'door1', side: 'l' }]} origin={[0.72, 0]} y={1.37} h={1.18} style={style} mat={m.perimeter} />
      <group position={[(L - 0.72) / 2, 2.55, WALL_D]}><Crown length={-0.72 - L} mat={m.perimeter} /></group>
      <group position={[(0.72 + R) / 2, 2.55, WALL_D]}><Crown length={R - 0.72} mat={m.perimeter} /></group>
      {/* left run with range + arched hood */}
      <BaseRun items={left} origin={[L, leftZ1]} rotY={Math.PI / 2} style={style} mat={m.perimeter} />
      <Counter cfg={cfg} x0={L} x1={L + CT_D} z0={CT_D} z1={rangeZ - 0.61} uv={[2.0, 0.1]} />
      <Counter cfg={cfg} x0={L} x1={L + CT_D} z0={rangeZ + 0.61} z1={leftZ1 + 0.02} uv={[2.4, 0.5]} />
      <group position={[L, 0, rangeZ]} rotation={[0, Math.PI / 2, 0]}>
        <ArchedHood bottom={1.7} top={CEIL} />
        <group position={[0, 1.42, 0]}><PotFiller /></group>
      </group>
      <Splash x0={rangeZ - 0.72} x1={rangeZ + 0.72} y0={top} y1={1.7} z={L} rotY={Math.PI / 2} uv={[1.2, 0.6]} />
      <Splash x0={CT_D} x1={rangeZ - 0.72} y0={top} y1={1.37} z={L} rotY={Math.PI / 2} uv={[0.9, 0.6]} />
      <Splash x0={rangeZ + 0.72} x1={leftZ1} y0={top} y1={1.37} z={L} rotY={Math.PI / 2} uv={[2.9, 0.6]} />
      {/* open oak shelves flanking the hood */}
      {[1.5, 1.92].map((y) => (
        <React.Fragment key={y}>
          <group position={[L, y, (CT_D + rangeZ - 0.76) / 2]} rotation={[0, Math.PI / 2, 0]}><FloatingShelf w={rangeZ - 0.76 - CT_D - 0.06} d={0.24} t={0.045} mat={m.oak} /></group>
          <group position={[L, y, (rangeZ + 0.76 + leftZ1) / 2]} rotation={[0, Math.PI / 2, 0]}><FloatingShelf w={leftZ1 - rangeZ - 0.76 - 0.06} d={0.24} t={0.045} mat={m.oak} /></group>
        </React.Fragment>
      ))}
      <group position={[L + 0.13, 1.545, 0.95]}><Plates n={6} /></group>
      <group position={[L + 0.12, 1.965, 0.88]}><Canisters /></group>
      <group position={[L + 0.13, 1.545, 2.85]}><Vase h={0.24} mat={m.plate} /></group>
      <group position={[L + 0.1, 1.965, 2.75]} rotation={[0, Math.PI / 2, 0]}><Books /></group>
      {/* right run: base + fridge + pantry (fronts face -x) */}
      <BaseRun items={right} origin={[R, DEPTH + 0.035]} rotY={-Math.PI / 2} style={style} mat={m.perimeter} />
      <Counter cfg={cfg} x0={R - CT_D} x1={R} z0={DEPTH + 0.035 + 1.84} z1={DEPTH + 0.035 + 2.52 + 0.02} uv={[3.0, 0.2]} />
      <group position={[R - 0.64, 2.55, DEPTH + 0.035 + 0.92]} rotation={[0, -Math.PI / 2, 0]}><Crown length={1.84} mat={m.perimeter} /></group>
      {/* furniture-style island */}
      <BaseRun items={iItems} origin={[iRun / 2, iz0 + 0.03 + DEPTH]} rotY={Math.PI} style={style} mat={m.island} />
      <BaseRun items={[{ w: iRun, t: 'base', kind: 'panel', depth: 0.05 }]} origin={[-iRun / 2, iz0 + 0.03 + DEPTH]} style={style} mat={m.island} />
      {[-1, 1].map((sx) => [iz0 + 0.06, iz1 - 0.06].map((z) => (
        <group key={`${sx}${z}`} position={[sx * (iw / 2 - 0.07), 0, z]}><TurnedLeg h={BASE_H} mat={m.island} /></group>
      )))}
      {[-1, 1].map((sx) => <mesh key={sx} geometry={rbox(0.04, 0.1, iz1 - iz0 - 0.12, 0.004)} material={m.island} position={[sx * (iw / 2 - 0.07), BASE_H - 0.05, (iz0 + iz1) / 2]} />)}
      <mesh geometry={rbox(iw - 0.14, 0.1, 0.04, 0.004)} material={m.island} position={[0, BASE_H - 0.05, iz1 - 0.06]} />
      <Counter cfg={cfg} x0={-iw / 2} x1={iw / 2} z0={iz0} z1={iz1} uv={[0.8, 0.5]} radius={0.02} />
      {[-0.5, 0.5].map((x) => <group key={x} position={[x, CEIL, (iz0 + iz1) / 2]}><DomePendant drop={0.99} /></group>)}
      {[-0.62, 0, 0.62].map((x) => <group key={x} position={[x, 0, 2.95]} rotation={[0, Math.PI, 0]}><Stool kind="woven" /></group>)}
      <group position={[0.45, top, 2.25]}><FruitBowl /></group>
      <group position={[-0.5, top, 2.3]}><Vase h={0.34} /></group>
      <group position={[-1.6, top, 0.08]}><CuttingBoard w={0.36} h={0.48} /></group>
      <group position={[1.4, top, 0.25]}><Canisters /></group>
    </group>
  );
}

export const LAYOUTS = { buckhead: { C: Buckhead, meta: buckheadMeta }, midtown: { C: Midtown, meta: midtownMeta }, estate: { C: Estate, meta: estateMeta } } as const;
