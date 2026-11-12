// Catalog for the /kitchen-design 3D configurator.
// Slab textures live in /public/textures/stones and are produced by
// scripts/generate-textures.mjs. They are digital renditions of each
// stone's look, not photographs of a specific slab.

export type StoneCategory = 'Quartz' | 'Quartzite' | 'Granite';

export interface Stone {
  id: string;
  name: string;
  category: StoneCategory;
  tone: 'Light' | 'Warm' | 'Dark' | 'Cool';
  origin: string;
  tier: 1 | 2 | 3 | 4; // relative price level, 1 = most accessible
  blurb: string;
  // used before the texture has loaded and for UI accents
  baseColor: string;
}

export const STONES: Stone[] = [
  { id: 'calacatta-gold', name: 'Calacatta Gold', category: 'Quartz', tone: 'Light', origin: 'Engineered', tier: 3, baseColor: '#f3efe7',
    blurb: 'Bright white body with bold gray and gold veins. The look of Italian marble with no sealing and no etching.' },
  { id: 'calacatta-laza', name: 'Calacatta Laza', category: 'Quartz', tone: 'Light', origin: 'Engineered', tier: 2, baseColor: '#f1eee9',
    blurb: 'Soft, airy veining in warm gray with hints of gold. Our most requested quartz for transitional kitchens.' },
  { id: 'statuario', name: 'Statuario', category: 'Quartz', tone: 'Light', origin: 'Engineered', tier: 3, baseColor: '#f6f6f5',
    blurb: 'Crisp white with dramatic charcoal veins. Made for waterfall islands and full-height backsplashes.' },
  { id: 'carrara-mist', name: 'Carrara Mist', category: 'Quartz', tone: 'Cool', origin: 'Engineered', tier: 1, baseColor: '#e8e9ea',
    blurb: 'Cool white with fine, feathery gray veins. A classic look at an accessible price.' },
  { id: 'concrete-gray', name: 'Urban Concrete', category: 'Quartz', tone: 'Cool', origin: 'Engineered', tier: 2, baseColor: '#9c9994',
    blurb: 'Matte, cement-inspired surface with soft clouding. Pairs well with walnut and black steel.' },
  { id: 'nero-marquina', name: 'Nero Marquina', category: 'Quartz', tone: 'Dark', origin: 'Engineered', tier: 3, baseColor: '#18181a',
    blurb: 'Deep black with bright white lightning veins. A statement island top.' },
  { id: 'taj-mahal', name: 'Taj Mahal', category: 'Quartzite', tone: 'Warm', origin: 'Brazil', tier: 4, baseColor: '#e6dcc9',
    blurb: 'Warm cream and soft gold. A natural stone harder than granite, with the softness of marble.' },
  { id: 'super-white', name: 'Super White', category: 'Quartzite', tone: 'Cool', origin: 'Brazil', tier: 3, baseColor: '#e6e9ec',
    blurb: 'Gray-white quartzite with linear, flowing veins. Natural and luminous.' },
  { id: 'macaubas-blue', name: 'Macaubas Blue', category: 'Quartzite', tone: 'Cool', origin: 'Brazil', tier: 4, baseColor: '#dbe0e3',
    blurb: 'White and blue-gray bands. A rare, architectural quartzite for one-of-a-kind islands.' },
  { id: 'black-galaxy', name: 'Black Galaxy', category: 'Granite', tone: 'Dark', origin: 'India', tier: 2, baseColor: '#141414',
    blurb: 'Jet black with gold and bronze flecks that catch the light. Very hard to stain.' },
  { id: 'colonial-white', name: 'Colonial White', category: 'Granite', tone: 'Light', origin: 'India', tier: 1, baseColor: '#d6d2cc',
    blurb: 'Light granite speckled with gray, black and burgundy garnets. Durable and forgiving.' },
  { id: 'viscount-white', name: 'Viscount White', category: 'Granite', tone: 'Light', origin: 'India', tier: 2, baseColor: '#e4e1dc',
    blurb: 'White with flowing gray swirls. The movement of marble with the toughness of granite.' },
  { id: 'blue-pearl', name: 'Blue Pearl', category: 'Granite', tone: 'Dark', origin: 'Norway', tier: 2, baseColor: '#353a40',
    blurb: 'Blue-gray crystals with a pearly sheen that shifts as you move around it.' },
];

export const stoneById = (id: string) => STONES.find((s) => s.id === id) ?? STONES[0];
export const stoneTexture = (id: string) => `/textures/stones/${id}.jpg`;
export const stoneSwatch = (id: string) => `/textures/stones/${id}-swatch.jpg`;

// ---------- cabinetry ----------
export interface CabinetFinish {
  id: string;
  name: string;
  kind: 'paint' | 'wood';
  color: string; // paint color, or tint for wood
  texture?: string;
  roughness: number;
}

export const CABINET_FINISHES: CabinetFinish[] = [
  { id: 'warm-white', name: 'Warm White', kind: 'paint', color: '#ece7dd', roughness: 0.5 },
  { id: 'greige', name: 'Soft Greige', kind: 'paint', color: '#c9c1b4', roughness: 0.55 },
  { id: 'sage', name: 'Sage Green', kind: 'paint', color: '#8c9a83', roughness: 0.55 },
  { id: 'navy', name: 'Deep Navy', kind: 'paint', color: '#253246', roughness: 0.5 },
  { id: 'charcoal', name: 'Charcoal', kind: 'paint', color: '#35373a', roughness: 0.6 },
  { id: 'walnut', name: 'Natural Walnut', kind: 'wood', color: '#ffffff', texture: '/textures/wood/walnut.jpg', roughness: 0.5 },
  { id: 'rift-oak', name: 'Rift White Oak', kind: 'wood', color: '#ffffff', texture: '/textures/wood/rift-oak.jpg', roughness: 0.55 },
];
export const finishById = (id: string) => CABINET_FINISHES.find((f) => f.id === id) ?? CABINET_FINISHES[0];

export interface HardwareFinish { id: string; name: string; color: string; metalness: number; roughness: number; }
export const HARDWARE: HardwareFinish[] = [
  { id: 'brass', name: 'Brushed Brass', color: '#c8a25e', metalness: 1, roughness: 0.32 },
  { id: 'black', name: 'Matte Black', color: '#1b1b1c', metalness: 0.5, roughness: 0.5 },
  { id: 'nickel', name: 'Polished Nickel', color: '#d9d9d6', metalness: 1, roughness: 0.14 },
];
export const hardwareById = (id: string) => HARDWARE.find((h) => h.id === id) ?? HARDWARE[0];

export type EdgeProfile = 'eased' | 'bevel' | 'bullnose' | 'mitered';
export const EDGES: { id: EdgeProfile; name: string; note: string }[] = [
  { id: 'eased', name: 'Eased', note: 'Clean, slightly softened square edge' },
  { id: 'bevel', name: 'Beveled', note: '45° chamfer that catches light' },
  { id: 'bullnose', name: 'Full Bullnose', note: 'Fully rounded, soft to the touch' },
  { id: 'mitered', name: 'Mitered 2½"', note: 'Thick, monolithic slab look' },
];

export type SurfaceFinish = 'polished' | 'honed' | 'leathered';
export const SURFACE_FINISHES: { id: SurfaceFinish; name: string; note: string }[] = [
  { id: 'polished', name: 'Polished', note: 'Mirror shine, deepest color' },
  { id: 'honed', name: 'Honed', note: 'Soft matte, modern and calm' },
  { id: 'leathered', name: 'Leathered', note: 'Textured, hides fingerprints' },
];

// ---------- the three signature designs ----------
export type DesignId = 'buckhead' | 'midtown' | 'estate';

export interface CameraView { id: string; label: string; position: [number, number, number]; target: [number, number, number]; }

export interface Design {
  id: DesignId;
  name: string;
  style: string;
  tagline: string;
  description: string;
  highlights: string[];
  defaults: { stone: string; perimeter: string; island: string; hardware: string; edge: EdgeProfile; finish: SurfaceFinish };
  views: CameraView[];
}

export const DESIGNS: Design[] = [
  {
    id: 'buckhead',
    name: 'The Buckhead',
    style: 'Modern Transitional',
    tagline: 'L-shape · waterfall island · curved plaster hood',
    description: 'A bright L-shaped kitchen built around a 9-foot waterfall island. Shaker cabinets, a two-tone island and a curved plaster hood with a brass band over a 48" pro range.',
    highlights: ['9 ft waterfall island with prep sink', 'Full-height slab backsplash', 'Curved plaster hood with brass band', 'Glass-front uppers with interior lighting'],
    defaults: { stone: 'calacatta-gold', perimeter: 'warm-white', island: 'navy', hardware: 'brass', edge: 'eased', finish: 'polished' },
    views: [
      { id: 'overview', label: 'Overview', position: [4.6, 2.9, 6.6], target: [-0.2, 1.0, 1.2] },
      { id: 'island', label: 'Island', position: [2.3, 1.75, 4.3], target: [0, 0.85, 2.2] },
      { id: 'range', label: 'Range wall', position: [0.4, 1.55, 2.9], target: [0, 1.45, 0] },
      { id: 'detail', label: 'Stone detail', position: [1.95, 1.18, 3.15], target: [1.25, 0.86, 2.35] },
    ],
  },
  {
    id: 'midtown',
    name: 'The Midtown',
    style: 'Warm Contemporary',
    tagline: 'Walnut · double waterfall · slab wall',
    description: 'Clean lines and warm materials. Handle-free walnut cabinets, an appliance wall, floating shelves on a floor-to-ceiling stone wall and a double waterfall island in charcoal.',
    highlights: ['Floor-to-ceiling stone feature wall', 'Handle-free walnut cabinets', 'Integrated wall ovens and column fridge', 'Linear suspended lighting'],
    defaults: { stone: 'super-white', perimeter: 'walnut', island: 'charcoal', hardware: 'black', edge: 'mitered', finish: 'honed' },
    views: [
      { id: 'overview', label: 'Overview', position: [4.6, 2.7, 7.0], target: [0.4, 1.1, 1.0] },
      { id: 'island', label: 'Island', position: [3.6, 1.6, 4.9], target: [1.3, 0.8, 2.3] },
      { id: 'wall', label: 'Stone wall', position: [1.6, 1.6, 3.6], target: [1.5, 1.5, 0] },
      { id: 'detail', label: 'Stone detail', position: [3.55, 1.12, 3.3], target: [2.85, 0.84, 2.35] },
    ],
  },
  {
    id: 'estate',
    name: 'The Alpharetta Estate',
    style: 'Classic Estate',
    tagline: 'U-shape · inset cabinetry · farmhouse sink',
    description: 'A timeless U-shaped kitchen with inset cabinets, a fireclay farmhouse sink under the window, an arched hood with corbels and a furniture-style white oak island.',
    highlights: ['Inset cabinetry with beaded frames', 'Fireclay apron-front sink', 'Arched hood with corbels and pot filler', 'Furniture-style island on turned legs'],
    defaults: { stone: 'taj-mahal', perimeter: 'sage', island: 'rift-oak', hardware: 'brass', edge: 'bevel', finish: 'polished' },
    views: [
      { id: 'overview', label: 'Overview', position: [-0.5, 3.0, 8.1], target: [0.1, 1.0, 1.4] },
      { id: 'island', label: 'Island', position: [-1.2, 1.7, 4.7], target: [0, 0.8, 2.2] },
      { id: 'sink', label: 'Sink & window', position: [0.2, 1.6, 2.6], target: [0, 1.2, 0] },
      { id: 'range', label: 'Range', position: [0.4, 1.6, 1.9], target: [-2.4, 1.4, 1.9] },
    ],
  },
];
export const designById = (id: DesignId) => DESIGNS.find((d) => d.id === id) ?? DESIGNS[0];

export interface KitchenConfig {
  design: DesignId;
  stone: string;
  perimeter: string;
  island: string;
  hardware: string;
  edge: EdgeProfile;
  finish: SurfaceFinish;
  thickness: 2 | 3;
}

export const configFromDesign = (d: Design, keepStone?: string): KitchenConfig => ({
  design: d.id,
  stone: keepStone ?? d.defaults.stone,
  perimeter: d.defaults.perimeter,
  island: d.defaults.island,
  hardware: d.defaults.hardware,
  edge: d.defaults.edge,
  finish: d.defaults.finish,
  thickness: 3,
});
