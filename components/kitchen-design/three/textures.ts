'use client';

import { useEffect, useState } from 'react';
import * as THREE from 'three';

// Texture cache that never suspends: a component keeps showing the previous
// texture until the new one is ready, so switching stones never flashes.
const cache = new Map<string, Promise<THREE.Texture>>();
const loader = typeof window !== 'undefined' ? new THREE.TextureLoader() : null;

export type TexKind = 'stone' | 'wood' | 'floor';
let maxAniso = 8;
export const setMaxAnisotropy = (n: number) => { maxAniso = Math.max(1, Math.min(n, 16)); };

export function loadTexture(url: string, kind: TexKind): Promise<THREE.Texture> {
  const key = `${kind}:${url}`;
  let p = cache.get(key);
  if (!p) {
    p = new Promise((resolve, reject) => {
      loader!.load(url, (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = maxAniso;
        if (kind === 'stone') {
          // Geometry UVs are in meters. One slab = 3.2m x 1.6m (126" x 63").
          // Mirrored wrap reads as a book-matched seam where a run exceeds a slab.
          t.wrapS = t.wrapT = THREE.MirroredRepeatWrapping;
          t.repeat.set(1 / 3.2, 1 / 1.6);
        } else if (kind === 'wood') {
          t.wrapS = t.wrapT = THREE.MirroredRepeatWrapping;
        } else {
          t.wrapS = t.wrapT = THREE.RepeatWrapping;
        }
        t.needsUpdate = true;
        resolve(t);
      }, undefined, reject);
    });
    cache.set(key, p);
  }
  return p;
}

export function useLazyTexture(url: string | undefined, kind: TexKind) {
  const [tex, setTex] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    if (!url) { setTex(null); return; }
    let alive = true;
    loadTexture(url, kind).then((t) => { if (alive) setTex(t); }).catch(() => {});
    return () => { alive = false; };
  }, [url, kind]);
  return tex;
}
