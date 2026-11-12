'use client';

import React, { createContext, useContext, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { finishById, hardwareById, stoneById, stoneTexture, type KitchenConfig } from '@/lib/kitchenDesign/catalog';
import { useLazyTexture } from './textures';

export interface Mats {
  stone: THREE.MeshPhysicalMaterial;
  perimeter: THREE.MeshPhysicalMaterial;
  island: THREE.MeshPhysicalMaterial;
  hardware: THREE.MeshStandardMaterial;
  steel: THREE.MeshStandardMaterial;
  darkSteel: THREE.MeshStandardMaterial;
  blackMetal: THREE.MeshStandardMaterial;
  castIron: THREE.MeshStandardMaterial;
  darkGlass: THREE.MeshPhysicalMaterial;
  glass: THREE.MeshPhysicalMaterial;
  plaster: THREE.MeshStandardMaterial;
  wall: THREE.MeshStandardMaterial;
  trim: THREE.MeshStandardMaterial;
  floor: THREE.MeshStandardMaterial;
  reveal: THREE.MeshStandardMaterial;
  ceramic: THREE.MeshPhysicalMaterial;
  walnut: THREE.MeshStandardMaterial;
  oak: THREE.MeshStandardMaterial;
  fabric: THREE.MeshStandardMaterial;
  leather: THREE.MeshStandardMaterial;
  rattan: THREE.MeshStandardMaterial;
  lightWarm: THREE.MeshStandardMaterial; // emissive bulbs / LED strips
  opal: THREE.MeshPhysicalMaterial; // glowing glass globes
  sky: THREE.MeshBasicMaterial;
  interior: THREE.MeshStandardMaterial; // glass cabinet interiors
  plate: THREE.MeshPhysicalMaterial;
  greenery: THREE.MeshStandardMaterial;
  lemon: THREE.MeshStandardMaterial;
  ceramicDark: THREE.MeshStandardMaterial;
  book1: THREE.MeshStandardMaterial;
  book2: THREE.MeshStandardMaterial;
  book3: THREE.MeshStandardMaterial;
  rubber: THREE.MeshStandardMaterial;
}

const Ctx = createContext<Mats | null>(null);
export const useMats = () => {
  const m = useContext(Ctx);
  if (!m) throw new Error('useMats outside MaterialsProvider');
  return m;
};

const std = (p: THREE.MeshStandardMaterialParameters) => new THREE.MeshStandardMaterial(p);
const phys = (p: THREE.MeshPhysicalMaterialParameters) => new THREE.MeshPhysicalMaterial(p);

function applyCabinet(mat: THREE.MeshPhysicalMaterial, finishId: string, woodTex: THREE.Texture | null) {
  const f = finishById(finishId);
  const wantMap = f.kind === 'wood' ? woodTex : null;
  if (mat.map !== wantMap) { mat.map = wantMap; mat.needsUpdate = true; }
  mat.color.set(f.kind === 'wood' ? (wantMap ? '#ffffff' : '#7a5a3c') : f.color);
  mat.roughness = f.roughness;
  // satin lacquer on paint, light oil sheen on wood
  mat.clearcoat = f.kind === 'paint' ? 0.15 : 0.25;
  mat.clearcoatRoughness = 0.4;
}

export function MaterialsProvider({ config, evening, children }: { config: KitchenConfig; evening: boolean; children: React.ReactNode }) {
  const invalidate = useThree((s) => s.invalidate);
  const mats = useMemo<Mats>(() => ({
    stone: phys({ color: '#ffffff', roughness: 0.08, clearcoat: 0.5, clearcoatRoughness: 0.06, envMapIntensity: 1.1 }),
    perimeter: phys({ color: '#ece7dd', roughness: 0.5 }),
    island: phys({ color: '#253246', roughness: 0.5 }),
    hardware: std({ color: '#c8a25e', metalness: 1, roughness: 0.32 }),
    steel: std({ color: '#d9dcdf', metalness: 0.82, roughness: 0.34 }),
    darkSteel: std({ color: '#8d9095', metalness: 1, roughness: 0.42 }),
    blackMetal: std({ color: '#161617', metalness: 0.6, roughness: 0.45 }),
    castIron: std({ color: '#1a1a1a', metalness: 0.3, roughness: 0.7 }),
    darkGlass: phys({ color: '#0b0c0e', metalness: 0.1, roughness: 0.04, clearcoat: 1, clearcoatRoughness: 0.02 }),
    glass: phys({ color: '#dfe9ea', metalness: 0, roughness: 0.03, transparent: true, opacity: 0.18, depthWrite: false }),
    plaster: std({ color: '#efebe4', roughness: 0.92 }),
    wall: std({ color: '#eeeae3', roughness: 0.95 }),
    trim: std({ color: '#f1eee8', roughness: 0.6 }),
    floor: std({ color: '#c3a27c', roughness: 0.48 }),
    reveal: std({ color: '#1b1917', roughness: 0.9 }),
    ceramic: phys({ color: '#f6f5f1', roughness: 0.12, clearcoat: 0.8, clearcoatRoughness: 0.05 }),
    walnut: std({ color: '#ffffff', roughness: 0.5 }),
    oak: std({ color: '#ffffff', roughness: 0.55 }),
    fabric: std({ color: '#e9e3d8', roughness: 1 }),
    leather: std({ color: '#7a4a2b', roughness: 0.55 }),
    rattan: std({ color: '#b48d5c', roughness: 0.85 }),
    lightWarm: std({ color: '#fff3df', emissive: new THREE.Color('#ffd9a0'), emissiveIntensity: 2.5, toneMapped: false }),
    opal: phys({ color: '#fbf6ee', emissive: new THREE.Color('#ffd6a0'), emissiveIntensity: 1.2, roughness: 0.35, transmission: 0, clearcoat: 0.6 }),
    sky: new THREE.MeshBasicMaterial({ color: '#dfeaf3', toneMapped: false }),
    interior: std({ color: '#f4efe6', roughness: 0.8, emissive: new THREE.Color('#ffe2b8'), emissiveIntensity: 0.15 }),
    plate: phys({ color: '#fbfaf7', roughness: 0.2, clearcoat: 0.7 }),
    greenery: std({ color: '#4f6b3c', roughness: 0.8 }),
    lemon: std({ color: '#e8c33a', roughness: 0.55 }),
    ceramicDark: std({ color: '#3d3a36', roughness: 0.65 }),
    book1: std({ color: '#c9b79c', roughness: 0.9 }),
    book2: std({ color: '#2f3b33', roughness: 0.9 }),
    book3: std({ color: '#8c6b4f', roughness: 0.9 }),
    rubber: std({ color: '#111111', roughness: 0.9 }),
  }), []);

  // ---- stone ----
  const stoneTex = useLazyTexture(stoneTexture(config.stone), 'stone');
  useEffect(() => {
    const m = mats.stone;
    const s = stoneById(config.stone);
    if (m.map !== stoneTex) { m.map = stoneTex; m.needsUpdate = true; }
    m.color.set(stoneTex ? '#ffffff' : s.baseColor);
    const leathered = config.finish === 'leathered';
    if ((m.bumpMap !== null) !== leathered) { m.bumpMap = leathered ? stoneTex : null; m.needsUpdate = true; }
    if (leathered && m.bumpMap !== stoneTex) { m.bumpMap = stoneTex; m.needsUpdate = true; }
    m.bumpScale = leathered ? 2.2 : 0;
    if (config.finish === 'polished') { m.roughness = 0.07; m.clearcoat = 0.6; m.clearcoatRoughness = 0.04; }
    else if (config.finish === 'honed') { m.roughness = 0.42; m.clearcoat = 0; }
    else { m.roughness = 0.62; m.clearcoat = 0; }
    invalidate();
  }, [mats, stoneTex, config.stone, config.finish, invalidate]);

  // ---- cabinetry ----
  const walnutTex = useLazyTexture('/textures/wood/walnut.jpg', 'wood');
  const oakTex = useLazyTexture('/textures/wood/rift-oak.jpg', 'wood');
  const texFor = (id: string) => (id === 'walnut' ? walnutTex : id === 'rift-oak' ? oakTex : null);
  useEffect(() => {
    applyCabinet(mats.perimeter, config.perimeter, texFor(config.perimeter));
    applyCabinet(mats.island, config.island, texFor(config.island));
    if (mats.walnut.map !== walnutTex) { mats.walnut.map = walnutTex; mats.walnut.needsUpdate = true; }
    if (mats.oak.map !== oakTex) { mats.oak.map = oakTex; mats.oak.needsUpdate = true; }
    invalidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mats, config.perimeter, config.island, walnutTex, oakTex, invalidate]);

  // ---- hardware ----
  useEffect(() => {
    const h = hardwareById(config.hardware);
    mats.hardware.color.set(h.color);
    mats.hardware.metalness = h.metalness;
    mats.hardware.roughness = h.roughness;
    invalidate();
  }, [mats, config.hardware, invalidate]);

  // ---- floor ----
  const floorTex = useLazyTexture('/textures/wood/white-oak-floor.jpg', 'floor');
  useEffect(() => {
    if (floorTex && mats.floor.map !== floorTex) {
      floorTex.repeat.set(1, 1);
      mats.floor.map = floorTex; mats.floor.color.set('#ffffff'); mats.floor.needsUpdate = true; invalidate();
    }
  }, [mats, floorTex, invalidate]);

  // ---- time of day ----
  useEffect(() => {
    mats.lightWarm.emissiveIntensity = evening ? 6 : 1.6;
    mats.opal.emissiveIntensity = evening ? 3.2 : 0.5;
    mats.interior.emissiveIntensity = evening ? 0.9 : 0.12;
    mats.sky.color.set(evening ? '#1e2a3d' : '#e4eef6');
    invalidate();
  }, [mats, evening, invalidate]);

  return <Ctx.Provider value={mats}>{children}</Ctx.Provider>;
}
