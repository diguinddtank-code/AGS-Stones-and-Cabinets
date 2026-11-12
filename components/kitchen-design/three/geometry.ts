import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import type { EdgeProfile } from '@/lib/kitchenDesign/catalog';

// Geometry is cached by its dimensions: a kitchen reuses the same few sizes
// of rail, stile and panel hundreds of times.
const boxCache = new Map<string, THREE.BufferGeometry>();

export function rbox(w: number, h: number, d: number, r = 0.003, seg = 2): THREE.BufferGeometry {
  const key = `${w.toFixed(4)}|${h.toFixed(4)}|${d.toFixed(4)}|${r}|${seg}`;
  let g = boxCache.get(key);
  if (!g) {
    const rr = Math.min(r, w / 2 - 1e-4, h / 2 - 1e-4, d / 2 - 1e-4);
    g = rr > 0.0004 ? new RoundedBoxGeometry(w, h, d, seg, rr) : new THREE.BoxGeometry(w, h, d);
    boxCache.set(key, g);
  }
  return g;
}

// Box whose UVs are in meters (for veneer and stone that must not stretch).
const mBoxCache = new Map<string, THREE.BufferGeometry>();
export function meterBox(w: number, h: number, d: number, r = 0.003, scale: [number, number] = [1, 1], offset: [number, number] = [0, 0]) {
  const key = `${w.toFixed(4)}|${h.toFixed(4)}|${d.toFixed(4)}|${r}|${scale}|${offset}`;
  let g = mBoxCache.get(key);
  if (!g) {
    g = rbox(w, h, d, r).clone();
    // project UVs from position by dominant normal axis
    const pos = g.getAttribute('position');
    const nrm = g.getAttribute('normal');
    const uv = g.getAttribute('uv');
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      const ax = Math.abs(nrm.getX(i)), ay = Math.abs(nrm.getY(i)), az = Math.abs(nrm.getZ(i));
      let u: number, v: number;
      if (az >= ax && az >= ay) { u = x; v = y; } else if (ax >= ay) { u = z; v = y; } else { u = x; v = z; }
      uv.setXY(i, (u + w / 2) * scale[0] + offset[0], (v + h / 2) * scale[1] + offset[1]);
    }
    uv.needsUpdate = true;
    mBoxCache.set(key, g);
  }
  return g;
}

export function roundedRectShape(w: number, d: number, r: number, cx = 0, cy = 0, path: THREE.Shape | THREE.Path = new THREE.Shape()) {
  const x0 = cx - w / 2, y0 = cy - d / 2, x1 = cx + w / 2, y1 = cy + d / 2;
  const rr = Math.min(r, w / 2, d / 2);
  path.moveTo(x0 + rr, y0);
  path.lineTo(x1 - rr, y0);
  if (rr) path.quadraticCurveTo(x1, y0, x1, y0 + rr);
  path.lineTo(x1, y1 - rr);
  if (rr) path.quadraticCurveTo(x1, y1, x1 - rr, y1);
  path.lineTo(x0 + rr, y1);
  if (rr) path.quadraticCurveTo(x0, y1, x0, y1 - rr);
  path.lineTo(x0, y0 + rr);
  if (rr) path.quadraticCurveTo(x0, y0, x0 + rr, y0);
  return path;
}

export interface SlabHole { x: number; z: number; w: number; d: number; r?: number }

export interface SlabSpec {
  // rectangle in world XZ, centered at (x, z)
  w: number; d: number;
  thickness: number; // meters, visible edge thickness
  edge: EdgeProfile;
  holes?: SlabHole[];
  cornerRadius?: number; // plan-view corner rounding
  uvOffset?: [number, number];
}

const slabCache = new Map<string, THREE.BufferGeometry>();

// Countertop slab: a plan-view shape extruded upward with a bevel that forms
// the edge profile. Returns geometry whose origin is the slab's bottom center.
export function slabGeometry(s: SlabSpec): THREE.BufferGeometry {
  const key = JSON.stringify(s);
  const hit = slabCache.get(key);
  if (hit) return hit;
  const t = s.thickness;
  let bevelSize = 0.0025, bevelThickness = 0.0025, bevelSegments = 2;
  if (s.edge === 'bevel') { bevelSize = 0.007; bevelThickness = 0.007; bevelSegments = 1; }
  if (s.edge === 'bullnose') { bevelSize = t * 0.48; bevelThickness = t * 0.48; bevelSegments = 6; }
  if (s.edge === 'mitered') { bevelSize = 0.0015; bevelThickness = 0.0015; bevelSegments = 1; }
  // ExtrudeGeometry grows the outline by bevelSize, so inset the shape by it.
  const shape = <THREE.Shape>roundedRectShape(s.w - 2 * bevelSize, s.d - 2 * bevelSize, Math.max(0, (s.cornerRadius ?? 0.004) - bevelSize));
  for (const h of s.holes ?? []) {
    const p = roundedRectShape(h.w + 2 * bevelSize, h.d + 2 * bevelSize, (h.r ?? 0.03) + bevelSize, h.x, -h.z, new THREE.Path());
    shape.holes.push(p as THREE.Path);
  }
  const g = new THREE.ExtrudeGeometry(shape, {
    depth: Math.max(0.002, t - 2 * bevelThickness),
    bevelEnabled: true, bevelSize, bevelThickness, bevelSegments, curveSegments: 10,
  });
  // shape XY -> world XZ (shape y = -z), extrusion -> +Y
  g.rotateX(-Math.PI / 2);
  g.translate(0, bevelThickness, 0);
  // Caps get UVs from shape coordinates (meters) already. Add the per-piece
  // offset so each counter shows a different part of the slab.
  if (s.uvOffset) {
    const uv = g.getAttribute('uv');
    for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) + s.uvOffset[0], uv.getY(i) + s.uvOffset[1]);
  }
  g.computeVertexNormals();
  slabCache.set(key, g);
  return g;
}

// Flat panel (backsplash, waterfall face) with meter-based UVs.
export function slabPanel(w: number, h: number, t: number, uvOffset: [number, number] = [0, 0]) {
  return meterBox(w, h, t, 0.0015, [1, 1], uvOffset);
}

// Sweep a 2D profile (in the XY plane) along X for `length`. Used for crown
// molding, hood bands and other linear trims.
export function profileSweep(points: [number, number][], length: number) {
  const shape = new THREE.Shape();
  points.forEach(([x, y], i) => (i ? shape.lineTo(x, y) : shape.moveTo(x, y)));
  shape.closePath();
  const g = new THREE.ExtrudeGeometry(shape, { depth: length, bevelEnabled: false });
  // profile: x = depth (toward +z), y = height ; extrusion along +X centered
  // rotateY(-90°): extrusion z -> -x, profile x (depth) -> +z
  g.rotateY(-Math.PI / 2);
  g.translate(length / 2, 0, 0);
  return g;
}

export function lathe(points: [number, number][], segments = 48) {
  return new THREE.LatheGeometry(points.map(([x, y]) => new THREE.Vector2(x, y)), segments);
}
