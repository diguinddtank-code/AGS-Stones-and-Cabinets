'use client';

import React, { useMemo } from 'react';
import type { KitchenConfig } from '@/lib/kitchenDesign/catalog';
import { useMats } from './materials';
import { slabGeometry, slabPanel, type SlabHole } from './geometry';
import { BASE_H } from './cabinetry';

export const slabThickness = (cfg: KitchenConfig) => (cfg.edge === 'mitered' ? 0.064 : cfg.thickness === 2 ? 0.02 : 0.03);
export const counterTop = (cfg: KitchenConfig) => BASE_H + slabThickness(cfg);

// Countertop piece. x0..x1 / z0..z1 are world extents; holes are in world XZ.
export function Counter({ cfg, x0, x1, z0, z1, holes = [], uv = [0, 0], radius = 0.004 }: {
  cfg: KitchenConfig; x0: number; x1: number; z0: number; z1: number; holes?: SlabHole[]; uv?: [number, number]; radius?: number;
}) {
  const m = useMats();
  const t = slabThickness(cfg);
  const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
  const geo = useMemo(() => slabGeometry({
    w: x1 - x0, d: z1 - z0, thickness: t, edge: cfg.edge, cornerRadius: radius, uvOffset: uv,
    holes: holes.map((h) => ({ ...h, x: h.x - cx, z: h.z - cz })),
  }), [x0, x1, z0, z1, t, cfg.edge, radius, uv[0], uv[1], JSON.stringify(holes)]); // eslint-disable-line react-hooks/exhaustive-deps
  return <mesh geometry={geo} material={m.stone} position={[cx, BASE_H, cz]} castShadow receiveShadow />;
}

// Vertical slab panel facing +Z (backsplash). x0..x1 horizontal, y0..y1 vertical.
export function Splash({ x0, x1, y0, y1, z = 0, t = 0.012, uv = [0, 0], rotY = 0 }: {
  x0: number; x1: number; y0: number; y1: number; z?: number; t?: number; uv?: [number, number]; rotY?: number;
}) {
  const m = useMats();
  const w = x1 - x0, h = y1 - y0;
  const geo = useMemo(() => slabPanel(w, h, t, uv), [w, h, t, uv[0], uv[1]]); // eslint-disable-line react-hooks/exhaustive-deps
  if (rotY) {
    // panel on the left/right wall: x0..x1 run along world Z
    return <mesh geometry={geo} material={m.stone} rotation={[0, rotY, 0]} position={[z, (y0 + y1) / 2, (x0 + x1) / 2]} receiveShadow />;
  }
  return <mesh geometry={geo} material={m.stone} position={[(x0 + x1) / 2, (y0 + y1) / 2, z + t / 2]} receiveShadow />;
}

// Waterfall leg: a slab running from the floor to the underside of the top.
export function Waterfall({ cfg, x, z0, z1, uv = [0, 0] }: { cfg: KitchenConfig; x: number; z0: number; z1: number; uv?: [number, number] }) {
  const m = useMats();
  const t = slabThickness(cfg);
  const d = z1 - z0;
  const geo = useMemo(() => slabPanel(d, BASE_H, Math.max(t, 0.02), uv), [d, t, uv[0], uv[1]]); // eslint-disable-line react-hooks/exhaustive-deps
  return <mesh geometry={geo} material={m.stone} rotation={[0, Math.PI / 2, 0]} position={[x, BASE_H / 2, (z0 + z1) / 2]} castShadow receiveShadow />;
}
