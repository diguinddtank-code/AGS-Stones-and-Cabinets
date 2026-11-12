// Generates the slab and wood textures used by the /kitchen-design 3D configurator.
// Run: node scripts/generate-textures.mjs   (needs the "sharp" dev dependency)
// Output: public/textures/stones/<id>.jpg (2048x1024 slab, ~126"x63"),
//         public/textures/stones/<id>-swatch.jpg (480x480 crop for the UI),
//         public/textures/wood/<id>.jpg
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const STONE_DIR = path.join(ROOT, 'public', 'textures', 'stones');
const WOOD_DIR = path.join(ROOT, 'public', 'textures', 'wood');
fs.mkdirSync(STONE_DIR, { recursive: true });
fs.mkdirSync(WOOD_DIR, { recursive: true });

// ---------- seeded simplex noise ----------
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const GRAD = [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];
function makeNoise(seed) {
  const rnd = mulberry32(seed);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  const F2 = 0.5 * (Math.sqrt(3) - 1), G2 = (3 - Math.sqrt(3)) / 6;
  return function (xin, yin) {
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s), j = Math.floor(yin + s);
    const t = (i + j) * G2;
    const x0 = xin - (i - t), y0 = yin - (j - t);
    const i1 = x0 > y0 ? 1 : 0, j1 = x0 > y0 ? 0 : 1;
    const x1 = x0 - i1 + G2, y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2, y2 = y0 - 1 + 2 * G2;
    const ii = i & 255, jj = j & 255;
    let n = 0;
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 > 0) { const g = GRAD[perm[ii + perm[jj]] & 7]; t0 *= t0; n += t0 * t0 * (g[0] * x0 + g[1] * y0); }
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 > 0) { const g = GRAD[perm[ii + i1 + perm[jj + j1]] & 7]; t1 *= t1; n += t1 * t1 * (g[0] * x1 + g[1] * y1); }
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 > 0) { const g = GRAD[perm[ii + 1 + perm[jj + 1]] & 7]; t2 *= t2; n += t2 * t2 * (g[0] * x2 + g[1] * y2); }
    return 70 * n; // ~[-1,1]
  };
}
function fbm(noise, x, y, oct = 5, lac = 2.0, gain = 0.5) {
  let a = 1, f = 1, s = 0, norm = 0;
  for (let o = 0; o < oct; o++) { s += a * noise(x * f, y * f); norm += a; a *= gain; f *= lac; }
  return s / norm;
}
const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const smooth = (e0, e1, x) => { const t = clamp((x - e0) / (e1 - e0)); return t * t * (3 - 2 * t); };
const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
function hash2(x, y, seed) {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(seed, 2246822519);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

// ---------- stone recipes ----------
// Coordinates: u in [0, 2], v in [0, 1] across the slab.
// base: two colours blended by low-frequency clouds.
// veins: level-set veins of a domain-warped fbm (marble / quartz / quartzite look).
// grains: jittered voronoi crystals with a weighted mineral palette (granite look).
const STONES = {
  'calacatta-laza': {
    seed: 11, base: ['#f4f2ee', '#e9e6e0'], cloud: 1.2, cloudAmt: 0.55,
    veins: [
      { color: '#8f8a83', color2: '#b59a6a', c2amt: 0.45, freq: 0.9, warp: 0.9, stretch: 2.6, angle: -0.55, width: 0.012, halo: 4.5, opacity: 0.85, mask: 0.15 },
      { color: '#a9a49c', freq: 3.0, warp: 0.6, stretch: 2.0, angle: -0.5, width: 0.006, halo: 3, opacity: 0.45, mask: 0.0 },
    ],
    speckle: 0.012,
  },
  'calacatta-gold': {
    seed: 23, base: ['#f7f5f0', '#ebe6dc'], cloud: 1.0, cloudAmt: 0.5,
    veins: [
      { color: '#6f6a64', color2: '#b8914f', c2amt: 0.7, freq: 0.9, warp: 0.9, stretch: 2.2, angle: -0.75, width: 0.03, halo: 3.5, opacity: 0.95, mask: 0.05 },
      { color: '#9a8f80', color2: '#c4a265', c2amt: 0.6, freq: 1.9, warp: 0.8, stretch: 2.0, angle: -0.7, width: 0.007, halo: 3, opacity: 0.55, mask: 0.1 },
    ],
    speckle: 0.01,
  },
  'statuario': {
    seed: 37, base: ['#fbfbfa', '#efefed'], cloud: 0.9, cloudAmt: 0.45,
    veins: [
      { color: '#4c4d50', freq: 0.7, warp: 0.85, stretch: 1.8, angle: -0.35, width: 0.035, halo: 4.5, opacity: 0.9, mask: 0.1 },
      { color: '#7b7c80', freq: 1.6, warp: 0.7, stretch: 1.8, angle: -0.4, width: 0.009, halo: 3, opacity: 0.6, mask: 0.0 },
      { color: '#9c9da1', freq: 4.0, warp: 0.6, stretch: 1.5, angle: -0.4, width: 0.004, halo: 2, opacity: 0.35, mask: 0.0 },
    ],
    speckle: 0.008,
  },
  'carrara-mist': {
    seed: 41, base: ['#f0f0ef', '#dfe0e1'], cloud: 1.6, cloudAmt: 0.8,
    veins: [
      { color: '#9fa2a7', freq: 3.0, warp: 1.2, stretch: 1.3, angle: -0.2, width: 0.008, halo: 4, opacity: 0.55, mask: 0.0 },
      { color: '#b4b6ba', freq: 5.0, warp: 0.9, stretch: 1.2, angle: -0.2, width: 0.004, halo: 3, opacity: 0.4, mask: 0.0 },
    ],
    speckle: 0.014,
  },
  'concrete-gray': {
    seed: 53, base: ['#a7a49f', '#8f8c87'], cloud: 2.5, cloudAmt: 1.0,
    veins: [],
    grains: { scale: 520, palette: [['#7c7975', 0.15], ['#c6c3be', 0.12], [null, 0.73]], strength: 0.5 },
    speckle: 0.035,
  },
  'nero-marquina': {
    seed: 67, base: ['#1c1c1e', '#111113'], cloud: 1.4, cloudAmt: 0.7,
    veins: [
      { color: '#e9e7e2', freq: 1.1, warp: 0.7, stretch: 1.6, angle: 0.6, width: 0.01, halo: 2.5, opacity: 0.95, mask: 0.2 },
      { color: '#bdbab4', freq: 2.6, warp: 0.8, stretch: 1.6, angle: 0.55, width: 0.004, halo: 2, opacity: 0.6, mask: 0.1 },
    ],
    speckle: 0.01,
  },
  'taj-mahal': {
    seed: 79, base: ['#ece3d3', '#ddd0b9'], cloud: 1.3, cloudAmt: 0.9,
    veins: [
      { color: '#c2ad8a', color2: '#a98f68', c2amt: 0.5, freq: 0.7, warp: 1.4, stretch: 3.0, angle: -0.25, width: 0.03, halo: 5, opacity: 0.55, mask: 0.0 },
      { color: '#b9a37f', freq: 2.0, warp: 1.0, stretch: 3.0, angle: -0.25, width: 0.006, halo: 4, opacity: 0.4, mask: 0.0 },
    ],
    speckle: 0.016,
  },
  'super-white': {
    seed: 83, base: ['#eef0f1', '#dde0e3'], cloud: 1.2, cloudAmt: 0.7,
    veins: [
      { color: '#8e959c', freq: 1.2, warp: 0.7, stretch: 4.0, angle: 0.15, width: 0.04, halo: 3.0, opacity: 0.6, mask: 0.0 },
      { color: '#a6adb4', freq: 3.2, warp: 0.6, stretch: 4.0, angle: 0.15, width: 0.01, halo: 3, opacity: 0.55, mask: 0.0 },
      { color: '#7d848c', freq: 4.5, warp: 0.4, stretch: 3.0, angle: 0.15, width: 0.003, halo: 2, opacity: 0.4, mask: 0.0 },
    ],
    speckle: 0.015,
  },
  'macaubas-blue': {
    seed: 97, base: ['#e6e8e8', '#cfd5d8'], cloud: 0.9, cloudAmt: 0.8,
    veins: [
      { color: '#6f8394', color2: '#a7b3bb', c2amt: 0.5, freq: 1.3, warp: 0.5, stretch: 6.0, angle: 0.05, width: 0.09, halo: 2.5, opacity: 0.75, mask: 0.0 },
      { color: '#56677a', freq: 2.8, warp: 0.4, stretch: 6.0, angle: 0.05, width: 0.02, halo: 2.5, opacity: 0.55, mask: 0.0 },
      { color: '#8b98a3', freq: 6.0, warp: 0.3, stretch: 5.0, angle: 0.05, width: 0.004, halo: 2, opacity: 0.45, mask: 0.0 },
    ],
    speckle: 0.016,
  },
  'black-galaxy': {
    seed: 101, base: ['#151515', '#0d0d0e'], cloud: 3.0, cloudAmt: 0.6,
    veins: [],
    grains: { scale: 2000, palette: [['#26262a', 0.35], ['#0a0a0b', 0.4], ['#b08a4a', 0.03], ['#d8b26b', 0.012], [null, 0.208]], strength: 1 },
    grains2: { scale: 900, palette: [['#1d1d20', 0.3], ['#2c2b2e', 0.15], [null, 0.55]], strength: 0.6 },
    speckle: 0.02,
  },
  'colonial-white': {
    seed: 113, base: ['#dcd8d2', '#cbc6bf'], cloud: 2.0, cloudAmt: 0.6,
    veins: [],
    grains: { scale: 430, palette: [['#e6e3de', 0.35], ['#b8b3ab', 0.25], ['#4d4a47', 0.09], ['#6b6560', 0.12], ['#7a3f3c', 0.025], [null, 0.155]], strength: 1 },
    grains2: { scale: 900, palette: [['#25211f', 0.08], ['#8d877f', 0.2], [null, 0.72]], strength: 0.9 },
    speckle: 0.03,
  },
  'viscount-white': {
    seed: 127, base: ['#eceae6', '#dcd9d4'], cloud: 1.4, cloudAmt: 0.6,
    veins: [
      { color: '#8f8e8c', freq: 2.0, warp: 1.6, stretch: 1.6, angle: 0.3, width: 0.12, halo: 2, opacity: 0.5, mask: 0.0 },
      { color: '#6d6c6b', freq: 3.6, warp: 1.4, stretch: 1.6, angle: 0.3, width: 0.03, halo: 2, opacity: 0.45, mask: 0.0 },
    ],
    grains: { scale: 700, palette: [['#4a4847', 0.05], ['#a9a6a2', 0.12], [null, 0.83]], strength: 0.8 },
    speckle: 0.02,
  },
  'blue-pearl': {
    seed: 131, base: ['#3c4148', '#2b2f35'], cloud: 2.2, cloudAmt: 0.6,
    veins: [],
    grains: { scale: 180, palette: [['#56606c', 0.25], ['#2a2e33', 0.3], ['#7d8fa3', 0.1], ['#9db4cc', 0.04], ['#1d2024', 0.2], [null, 0.11]], strength: 1 },
    grains2: { scale: 650, palette: [['#111214', 0.2], ['#6c7682', 0.15], [null, 0.65]], strength: 0.8 },
    speckle: 0.03,
  },
};

function pickWeighted(palette, r) {
  let acc = 0;
  for (const [c, w] of palette) { acc += w; if (r <= acc) return c; }
  return palette[palette.length - 1][0];
}

// Jittered voronoi: returns {cell id, edge factor}
function voronoi(x, y, seed) {
  const xi = Math.floor(x), yi = Math.floor(y);
  let d1 = 1e9, d2 = 1e9, cx = 0, cy = 0;
  for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) {
    const gx = xi + i, gy = yi + j;
    const px = gx + hash2(gx, gy, seed), py = gy + hash2(gx, gy, seed + 7);
    const dx = px - x, dy = py - y, d = dx * dx + dy * dy;
    if (d < d1) { d2 = d1; d1 = d; cx = gx; cy = gy; } else if (d < d2) d2 = d;
  }
  return { cx, cy, edge: Math.sqrt(d2) - Math.sqrt(d1) };
}

function renderStone(id, spec, W = 2048, H = 1024) {
  const n1 = makeNoise(spec.seed), n2 = makeNoise(spec.seed + 1), n3 = makeNoise(spec.seed + 2), n4 = makeNoise(spec.seed + 3);
  const b0 = hex(spec.base[0]), b1 = hex(spec.base[1]);
  const veins = (spec.veins || []).map((v, k) => ({ ...v, c: hex(v.color), c2: v.color2 ? hex(v.color2) : null, nz: makeNoise(spec.seed + 10 + k), nm: makeNoise(spec.seed + 30 + k), ca: Math.cos(v.angle), sa: Math.sin(v.angle) }));
  const grainLayers = [spec.grains, spec.grains2].filter(Boolean).map((g, k) => ({ ...g, pal: g.palette.map(([c, w]) => [c ? hex(c) : null, w]), seed: spec.seed * 31 + k }));
  const buf = Buffer.alloc(W * H * 3);
  for (let py = 0; py < H; py++) {
    for (let px = 0; px < W; px++) {
      const u = (px / W) * 2, v = py / H;
      // base clouds
      const cl = fbm(n1, u * spec.cloud, v * spec.cloud, 4) * 0.5 + 0.5;
      let col = mix(b0, b1, clamp(smooth(0.25, 0.85, cl) * spec.cloudAmt));
      // veins
      for (const vn of veins) {
        // rotate + stretch so veins flow along a direction
        let x = (u * vn.ca - v * vn.sa), y = (u * vn.sa + v * vn.ca);
        x /= vn.stretch;
        // Flow lines: the sine of a smoothly warped coordinate gives long sweeping
        // veins with no closed loops. Low-octave warp = big curves; a small
        // high-frequency jitter roughens the edges like real stone.
        const warpLow = fbm(vn.nz, x * 0.9 + 5.2, y * 0.9, 3);
        const warpMid = fbm(n2, x * 2.6 + 3.1, y * 2.6, 3);
        const jitter = fbm(n3, x * 14, y * 14, 3);
        const phase = y * vn.freq * 2 + warpLow * vn.warp * 1.4 + warpMid * vn.warp * 0.22 + jitter * 0.018;
        const d = Math.abs(Math.sin(phase * Math.PI));
        // width varies along the vein so lines swell and taper
        const wv = vn.width * (0.35 + 1.3 * (fbm(vn.nm, x * 2.2, y * 2.2, 2) * 0.5 + 0.5));
        const core = 1 - smooth(wv * 0.3, wv, d);
        const halo = 1 - smooth(wv, wv * vn.halo, d);
        let k = clamp(core * 0.9 + halo * 0.22);
        // veins fade in and out so the pattern never reads as stripes
        k *= smooth(-0.5 + vn.mask, 0.08 + vn.mask, fbm(vn.nm, x * 1.1 + 11, y * 1.1, 3));
        let vc = vn.c;
        if (vn.c2) vc = mix(vn.c, vn.c2, clamp((fbm(n4, x * 1.3, y * 1.3, 3) * 0.5 + 0.5) * vn.c2amt * 1.6));
        col = mix(col, vc, k * vn.opacity);
      }
      // grains
      for (const g of grainLayers) {
        const s = g.scale / 1024; // cells per pixel unit
        const gx = px * s / 8, gy = py * s / 8;
        // warp at grain scale so crystals are irregular instead of polygonal
        const wj = n4(gx * 0.9, gy * 0.9) * 0.28, wk = n2(gx * 0.9 + 17, gy * 0.9) * 0.28;
        const vo = voronoi(gx + wj, gy + wk, g.seed);
        const r = hash2(vo.cx, vo.cy, g.seed + 99);
        const gc = pickWeighted(g.pal, r);
        if (gc) {
          const inner = 0.88 + 0.24 * hash2(vo.cx, vo.cy, g.seed + 5) + n3(gx * 3, gy * 3) * 0.06;
          const edgeK = smooth(0.0, 0.25, vo.edge);
          col = mix(col, [gc[0] * inner, gc[1] * inner, gc[2] * inner], g.strength * 0.8 * (0.35 + 0.65 * edgeK));
        }
      }
      // fine speckle
      const sp = (hash2(px, py, spec.seed) - 0.5) * 2 * spec.speckle * 255;
      const i = (py * W + px) * 3;
      buf[i] = clamp(col[0] + sp, 0, 255); buf[i + 1] = clamp(col[1] + sp, 0, 255); buf[i + 2] = clamp(col[2] + sp, 0, 255);
    }
  }
  return buf;
}

// ---------- wood ----------
function renderFloor(W = 2048, H = 2048) {
  // 4m x 4m of wide-plank white oak, planks run along X.
  const n = makeNoise(7), n2 = makeNoise(8), n3 = makeNoise(9);
  const rnd = mulberry32(42);
  const metersPerPx = 4 / W;
  const plankW = 0.2; // 8"
  const rows = Math.ceil(4 / plankW);
  const rowsCuts = [];
  for (let r = 0; r < rows; r++) {
    const cuts = []; let x = -rnd() * 1.6;
    while (x < 4) { const len = 1.2 + rnd() * 1.2; cuts.push([x, x + len, rnd(), rnd()]); x += len; }
    rowsCuts.push(cuts);
  }
  const light = hex('#cfb08a'), mid = hex('#b8936a'), dark = hex('#8f6c48');
  const buf = Buffer.alloc(W * H * 3);
  for (let py = 0; py < H; py++) {
    const my = py * metersPerPx; const r = Math.floor(my / plankW) % rows; const inRow = (my % plankW) / plankW;
    for (let px = 0; px < W; px++) {
      const mx = px * metersPerPx;
      // wrap across 4m tile
      let plank = rowsCuts[r].find((c) => mx >= c[0] && mx < c[1]);
      if (!plank) plank = rowsCuts[r].find((c) => mx + 4 >= c[0] && mx + 4 < c[1]) || rowsCuts[r][0];
      const tone = plank[2], seed = plank[3] * 100;
      const gx = mx * 2.0 + seed, gy = (r * plankW + inRow * plankW) * 40 + seed;
      const warp = fbm(n2, gx * 0.5, gy * 0.05, 3) * 3;
      const grain = Math.sin((gy + warp) * 3.2 + fbm(n, gx * 0.8, gy * 0.2, 3) * 4);
      const fine = fbm(n3, gx * 6, gy * 2.5, 2);
      let c = mix(light, mid, clamp(0.35 + tone * 0.5 + grain * 0.12 + fine * 0.15));
      c = mix(c, dark, clamp(smooth(0.75, 1.0, grain) * 0.25));
      // seams between boards
      const edgeY = Math.min(inRow, 1 - inRow) * plankW;
      const edgeX = Math.min(mx - plank[0], plank[1] - mx < 0 ? 1 : plank[1] - mx);
      const seam = Math.min(edgeY, Math.abs(edgeX));
      const sk = 1 - smooth(0.0008, 0.0025, seam);
      c = mix(c, [70, 52, 36], sk * 0.7);
      const i = (py * W + px) * 3;
      buf[i] = clamp(c[0], 0, 255); buf[i + 1] = clamp(c[1], 0, 255); buf[i + 2] = clamp(c[2], 0, 255);
    }
  }
  return buf;
}

function renderVeneer(colors, seed, W = 1024, H = 2048, rift = true) {
  // Vertical grain veneer for flat-slab doors (0.6m x 1.2m).
  const n = makeNoise(seed), n2 = makeNoise(seed + 1), n3 = makeNoise(seed + 2);
  const [a, b, c] = colors.map(hex);
  const buf = Buffer.alloc(W * H * 3);
  for (let py = 0; py < H; py++) for (let px = 0; px < W; px++) {
    const x = px / W, y = py / H;
    const warp = fbm(n2, x * 2, y * 0.6, 3) * (rift ? 0.6 : 2.5);
    const g = Math.sin((x * 90 + warp * 6) + fbm(n, x * 8, y * 1.2, 3) * (rift ? 1.5 : 5));
    const fine = fbm(n3, x * 160, y * 6, 2);
    let col = mix(a, b, clamp(0.5 + g * 0.22 + fine * 0.25));
    col = mix(col, c, clamp(smooth(0.6, 1.0, g) * 0.35 + fbm(n, x * 3, y * 0.5, 2) * 0.15));
    const i = (py * W + px) * 3;
    buf[i] = clamp(col[0], 0, 255); buf[i + 1] = clamp(col[1], 0, 255); buf[i + 2] = clamp(col[2], 0, 255);
  }
  return buf;
}

const only = process.argv.slice(2);
const t0 = Date.now();
for (const [id, spec] of Object.entries(STONES)) {
  if (only.length && !only.includes(id)) continue;
  const W = 2048, H = 1024;
  const raw = renderStone(id, spec, W, H);
  const img = sharp(await sharp(raw, { raw: { width: W, height: H, channels: 3 } }).blur(0.55).toBuffer(), { raw: { width: W, height: H, channels: 3 } });
  await img.clone().jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(STONE_DIR, `${id}.jpg`));
  await img.clone().resize(480, 240).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(STONE_DIR, `${id}-swatch.jpg`));
  console.log('stone', id, ((Date.now() - t0) / 1000).toFixed(1) + 's');
}
if (!only.length || only.includes('wood')) {
  const W = 2048;
  await sharp(renderFloor(W, W), { raw: { width: W, height: W, channels: 3 } }).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(WOOD_DIR, 'white-oak-floor.jpg'));
  await sharp(renderVeneer(['#6b4a33', '#4f3423', '#3a2618'], 201), { raw: { width: 1024, height: 2048, channels: 3 } }).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(WOOD_DIR, 'walnut.jpg'));
  await sharp(renderVeneer(['#c9ab84', '#b8976d', '#9c7a52'], 211), { raw: { width: 1024, height: 2048, channels: 3 } }).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(WOOD_DIR, 'rift-oak.jpg'));
  console.log('wood done', ((Date.now() - t0) / 1000).toFixed(1) + 's');
}
