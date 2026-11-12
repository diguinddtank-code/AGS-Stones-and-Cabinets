// Real AGS projects. Photo ids are stable (the home page's ProjectsShowcase
// picks photos by id). Titles and alt text describe what each photo actually
// shows; a few file names don't match their content (e.g. id 2 is a
// fireplace), so don't infer content from the file name.

export type Category = 'Kitchen' | 'Bathroom' | 'Cabinets' | 'Fireplace';

export interface Photo {
  id: number;
  src: string;
  category: Category;
  title: string;
  alt: string;
  w: number;
  h: number;
}

const P = (file: string) => `/images/projects/${file}`;
const L = { w: 1600, h: 1200 };
const T = { w: 1200, h: 1600 };

export const photos: Photo[] = [
  { id: 1, category: 'Kitchen', src: P('kitchen-navy-cabinets-white-quartz-waterfall-island-atlanta.jpg'), title: 'Quartz island with prep sink', alt: 'Kitchen island with white quartz countertop and stainless undermount sink, Atlanta, GA', ...L },
  { id: 2, category: 'Fireplace', src: P('kitchen-island-white-quartz-waterfall-edge-atlanta.jpg'), title: 'Granite surround, side view', alt: 'Black granite fireplace surround and hearth seen from the side, Atlanta, GA', ...L },
  { id: 3, category: 'Kitchen', src: P('kitchen-stainless-sink-quartz-countertop-detail-atlanta.jpg'), title: 'Navy kitchen range wall', alt: 'Navy blue kitchen cabinets with white quartz countertops and stainless gas range, Atlanta, GA', ...L },
  { id: 4, category: 'Kitchen', src: P('kitchen-navy-cabinets-subway-tile-backsplash-range-atlanta.jpg'), title: 'Undermount sink detail', alt: 'Stainless steel undermount sink set in a white quartz countertop, Atlanta, GA', ...L },
  { id: 5, category: 'Kitchen', src: P('kitchen-navy-cabinets-pendant-lighting-island-atlanta.jpg'), title: 'Navy kitchen and quartz island', alt: 'Navy blue kitchen cabinets and white quartz island under pendant lighting, Atlanta, GA', ...L },
  { id: 6, category: 'Kitchen', src: P('kitchen-honey-oak-cabinets-black-subway-tile-backsplash-atlanta.jpg'), title: 'Oak cabinets and black subway tile', alt: 'Honey oak kitchen cabinets with black subway tile backsplash and quartz countertops, Atlanta, GA', ...L },
  { id: 7, category: 'Kitchen', src: P('kitchen-quartz-countertop-stainless-sink-detail-atlanta.jpg'), title: 'Workstation sink in quartz', alt: 'Stainless workstation sink set in a white quartz countertop over oak cabinets, Atlanta, GA', ...L },
  { id: 8, category: 'Kitchen', src: P('kitchen-oak-cabinets-double-wall-oven-gas-cooktop-atlanta.jpg'), title: 'Cooktop and double wall oven', alt: 'Honey oak cabinets with gas cooktop, black subway tile and stainless double wall oven, Atlanta, GA', ...L },
  { id: 9, category: 'Kitchen', src: P('kitchen-oak-island-quartz-countertop-detail-atlanta.jpg'), title: 'Oak kitchen and French-door fridge', alt: 'Honey oak cabinets and quartz countertops beside a stainless French-door refrigerator, Atlanta, GA', ...T },
  { id: 10, category: 'Kitchen', src: P('kitchen-oak-cabinets-full-view-quartz-countertops-atlanta.jpg'), title: 'Oak kitchen, full view', alt: 'Full view of honey oak kitchen cabinets with white quartz countertops and island, Atlanta, GA', ...L },
  { id: 11, category: 'Kitchen', src: P('kitchen-white-cabinets-dark-hardwood-floor-full-view-atlanta.jpg'), title: 'White kitchen on dark hardwood', alt: 'White kitchen cabinets with quartz island over dark hardwood flooring, Atlanta, GA', ...L },
  { id: 12, category: 'Kitchen', src: P('kitchen-white-cabinets-island-quartz-countertop-atlanta.jpg'), title: 'White island with quartz top', alt: 'White shaker kitchen island with white quartz countertop and undermount sink, Atlanta, GA', ...L },
  { id: 13, category: 'Kitchen', src: P('kitchen-white-cabinets-island-open-concept-living-room-atlanta.jpg'), title: 'Island and under-cabinet lighting', alt: 'White kitchen island with quartz top and under-cabinet lighting on dark hardwood, Atlanta, GA', ...T },
  { id: 14, category: 'Kitchen', src: P('kitchen-vaulted-ceiling-wood-beams-quartz-island-atlanta.jpg'), title: 'Vaulted ceiling kitchen', alt: 'Kitchen remodel with vaulted ceiling, white cabinets and gray island during installation, Atlanta, GA', ...L },
  { id: 15, category: 'Kitchen', src: P('kitchen-gas-cooktop-stainless-hood-quartz-backsplash-atlanta.jpg'), title: 'Cooktop wall and stainless hood', alt: 'White kitchen with gas cooktop, stainless chimney hood and quartz countertops, Atlanta, GA', ...T },
  { id: 16, category: 'Kitchen', src: P('kitchen-white-raised-panel-cabinets-black-appliances-atlanta.jpg'), title: 'Waterfall island under pendants', alt: 'White quartz waterfall island with black faucet under glass pendant lights, Atlanta, GA', ...T },
  { id: 17, category: 'Kitchen', src: P('kitchen-quartz-waterfall-island-black-fixtures-atlanta.jpg'), title: 'Waterfall edge and black faucet', alt: 'White quartz waterfall island edge with black pull-down faucet, Atlanta, GA', ...L },
  { id: 18, category: 'Kitchen', src: P('kitchen-open-concept-island-black-appliances-staircase-atlanta.jpg'), title: 'Cooktop run and quartz island', alt: 'White cabinets with gas cooktop and quartz countertops beside the island, Atlanta, GA', ...T },
  { id: 19, category: 'Kitchen', src: P('kitchen-white-cabinets-pendant-lighting-black-appliances-atlanta.jpg'), title: 'Waterfall island and black appliances', alt: 'White quartz waterfall island with white cabinets and black appliances, Atlanta, GA', ...T },
  { id: 20, category: 'Bathroom', src: P('bathroom-navy-cabinets-white-quartz-double-vanity-atlanta.jpg'), title: 'Navy double vanity', alt: 'Navy blue double vanity with white quartz countertop, Atlanta, GA', ...L },
  { id: 21, category: 'Bathroom', src: P('bathroom-white-quartz-undermount-sink-detail-atlanta.jpg'), title: 'Quartz vanity sink detail', alt: 'Undermount sink in a white quartz vanity countertop over navy cabinets, Atlanta, GA', ...L },
  { id: 22, category: 'Bathroom', src: P('bathroom-navy-vanity-sconce-lighting-atlanta.jpg'), title: 'Navy vanity and quartz top', alt: 'Navy blue bathroom vanity drawers with white quartz countertop, Atlanta, GA', ...L },
  { id: 23, category: 'Bathroom', src: P('bathroom-black-granite-trough-sink-fabrication.jpg'), title: 'Custom black granite sink', alt: 'Custom sink fabricated from a black leathered granite slab', w: 768, h: 1024 },
  { id: 24, category: 'Bathroom', src: P('bathroom-gray-cabinets-quartz-vanity-wood-tile-wall-atlanta.jpg'), title: 'Gray double vanity', alt: 'Gray double vanity with white quartz countertop and textured wall tile, Atlanta, GA', ...L },
  { id: 25, category: 'Bathroom', src: P('bathroom-kohler-undermount-sink-quartz-countertop-atlanta.jpg'), title: 'Kohler sink in quartz', alt: 'Kohler undermount sink set in a white quartz vanity countertop, Atlanta, GA', ...L },
  { id: 26, category: 'Bathroom', src: P('bathroom-charcoal-marble-shower-rainfall-head-atlanta.jpg'), title: 'Charcoal marble shower', alt: 'Walk-in shower with charcoal marble-look walls and rainfall shower head, Atlanta, GA', ...T },
  { id: 27, category: 'Bathroom', src: P('bathroom-built-in-bench-linen-tower-quartz-top-atlanta.jpg'), title: 'Built-in bench and linen tower', alt: 'Built-in bench with quartz top beside a gray linen tower cabinet, Atlanta, GA', ...T },
  { id: 28, category: 'Bathroom', src: P('bathroom-custom-pull-out-laundry-hamper-cabinet-atlanta.jpg'), title: 'Pull-out hamper cabinet', alt: 'Custom pull-out laundry hamper drawers in gray bathroom cabinetry, Atlanta, GA', ...L },
  { id: 29, category: 'Bathroom', src: P('bathroom-calacatta-marble-shower-lighted-niche-atlanta.jpg'), title: 'Marble shower with lighted niche', alt: 'Calacatta marble-look shower walls with a lighted recessed niche, Atlanta, GA', ...T },
  { id: 30, category: 'Bathroom', src: P('bathroom-walnut-vanity-blue-quartzite-backsplash-atlanta.jpg'), title: 'Blue quartzite wall and backlit mirrors', alt: 'Blue quartzite full-height backsplash with backlit mirrors and brass sconces, Atlanta, GA', ...L },
  { id: 31, category: 'Bathroom', src: P('bathroom-blue-quartzite-countertop-sink-detail-atlanta.jpg'), title: 'Blue quartzite sink detail', alt: 'Undermount sink in a blue quartzite bathroom countertop, Atlanta, GA', ...L },
  { id: 32, category: 'Bathroom', src: P('bathroom-marble-basketweave-floor-tile-detail-atlanta.jpg'), title: 'Basketweave marble floor', alt: 'Basketweave marble mosaic floor beside walnut vanity legs, Atlanta, GA', ...L },
  { id: 33, category: 'Bathroom', src: P('bathroom-freestanding-tub-glass-shower-walnut-vanity-atlanta.jpg'), title: 'Walnut vanity and quartzite wall', alt: 'Walnut double vanity with blue quartzite wall and backlit mirrors, Atlanta, GA', w: 1600, h: 900 },
  { id: 34, category: 'Bathroom', src: P('bathroom-freestanding-tub-black-tile-surround-atlanta.jpg'), title: 'Freestanding tub and mosaic floor', alt: 'Freestanding soaking tub on basketweave marble floor with glass shower, Atlanta, GA', w: 900, h: 1600 },
  { id: 35, category: 'Bathroom', src: P('bathroom-floating-toilet-black-tile-powder-room-atlanta.jpg'), title: 'Black tile spa bath', alt: 'Freestanding tub and wall-hung toilet in a black tile bath with a backlit ledge, Atlanta, GA', w: 1290, h: 757 },
  { id: 36, category: 'Cabinets', src: P('cabinets-wet-bar-marble-backsplash-wine-storage-atlanta.jpg'), title: 'Wet bar with marble backsplash', alt: 'Custom wet bar cabinetry with marble backsplash, floating shelves and wine fridge, Atlanta, GA', ...T },
  { id: 37, category: 'Cabinets', src: P('cabinets-floating-shelves-wine-fridge-nook-atlanta.jpg'), title: 'Wine nook with floating shelves', alt: 'Built-in cabinetry with floating wood shelves and wine fridge, Atlanta, GA', ...T },
  { id: 38, category: 'Cabinets', src: P('cabinets-glass-front-hutch-built-in-atlanta.jpg'), title: 'Glass-front built-in hutch', alt: 'Custom glass-front hutch cabinetry with quartz countertop, Atlanta, GA', ...T },
  { id: 39, category: 'Fireplace', src: P('fireplace-black-granite-surround-white-mantle-atlanta.jpg'), title: 'Black granite fireplace', alt: 'Black granite fireplace surround and hearth with white mantel, Atlanta, GA', ...L },
];

export const photoById = (id: number) => photos.find((p) => p.id === id)!;

export interface Project {
  slug: string;
  title: string;
  category: Category;
  scope: string;
  materials: string[];
  summary: string;
  photoIds: number[]; // first is the cover
}

export const portfolio: Project[] = [
  {
    slug: 'walnut-blue-quartzite-bath', title: 'Walnut & Blue Quartzite Bath', category: 'Bathroom', scope: 'Vanity · stone wall · tile',
    materials: ['Blue quartzite', 'Walnut vanity', 'Marble mosaic'],
    summary: 'A primary bath built around one dramatic slab: blue quartzite runs from the vanity up the wall behind backlit mirrors.',
    photoIds: [30, 33, 31, 32, 34, 35],
  },
  {
    slug: 'navy-white-quartz-kitchen', title: 'Navy & White Quartz Kitchen', category: 'Kitchen', scope: 'Countertops · island',
    materials: ['White quartz', 'Navy shaker cabinets', 'Stainless undermount'],
    summary: 'Deep navy cabinetry with crisp white quartz on the perimeter and a prep-sink island.',
    photoIds: [5, 3, 1, 4],
  },
  {
    slug: 'white-waterfall-kitchen', title: 'White Waterfall Kitchen', category: 'Kitchen', scope: 'Waterfall island · countertops',
    materials: ['White quartz waterfall', 'Black fixtures', 'White cabinets'],
    summary: 'A full waterfall island in white quartz, framed by black fixtures and glass pendants.',
    photoIds: [16, 19, 17, 18],
  },
  {
    slug: 'honey-oak-kitchen', title: 'Honey Oak Kitchen', category: 'Kitchen', scope: 'Countertops · backsplash',
    materials: ['White quartz', 'Black subway tile', 'Workstation sink'],
    summary: 'New quartz tops and a black subway backsplash give classic oak cabinetry a modern edge.',
    photoIds: [6, 8, 10, 9, 7],
  },
  {
    slug: 'gray-spa-bath', title: 'Gray Spa Bath', category: 'Bathroom', scope: 'Vanity · shower · built-ins',
    materials: ['White quartz', 'Marble-look shower', 'Custom gray cabinetry'],
    summary: 'A calm gray suite with a double vanity, marble-look showers and smart built-in storage.',
    photoIds: [24, 25, 26, 29, 27, 28],
  },
  {
    slug: 'white-shaker-dark-hardwood', title: 'White Shaker on Dark Hardwood', category: 'Kitchen', scope: 'Island · countertops',
    materials: ['White quartz', 'White shaker cabinets'],
    summary: 'Bright white cabinetry and a quartz-topped island set against rich dark floors.',
    photoIds: [11, 12, 13],
  },
  {
    slug: 'navy-double-vanity', title: 'Navy Double Vanity', category: 'Bathroom', scope: 'Vanity top',
    materials: ['White quartz', 'Navy cabinets'],
    summary: 'A long navy vanity topped with white quartz and two undermount sinks.',
    photoIds: [20, 22, 21],
  },
  {
    slug: 'wet-bar-built-ins', title: 'Wet Bar & Built-Ins', category: 'Cabinets', scope: 'Custom cabinetry',
    materials: ['Marble backsplash', 'Floating shelves', 'Wine storage'],
    summary: 'Custom bar and hutch cabinetry with floating shelves, wine storage and stone backsplashes.',
    photoIds: [36, 37, 38],
  },
  {
    slug: 'vaulted-kitchen-remodel', title: 'Vaulted Kitchen Remodel', category: 'Kitchen', scope: 'Full remodel',
    materials: ['Quartz countertops', 'Stainless hood'],
    summary: 'A full remodel under a vaulted ceiling, from cabinet install to finished cooktop wall.',
    photoIds: [14, 15],
  },
  {
    slug: 'black-granite-fireplace', title: 'Black Granite Fireplace', category: 'Fireplace', scope: 'Surround · hearth',
    materials: ['Black granite'],
    summary: 'A clean black granite surround and hearth under a white mantel.',
    photoIds: [39, 2],
  },
  {
    slug: 'granite-trough-sink', title: 'Leathered Granite Sink', category: 'Bathroom', scope: 'Custom fabrication',
    materials: ['Black leathered granite'],
    summary: 'A one-piece sink fabricated in our shop from a single black granite slab.',
    photoIds: [23],
  },
];

export const CATEGORIES: { id: 'All' | Category; label: string }[] = [
  { id: 'All', label: 'All' },
  { id: 'Kitchen', label: 'Kitchens' },
  { id: 'Bathroom', label: 'Bathrooms' },
  { id: 'Cabinets', label: 'Cabinetry' },
  { id: 'Fireplace', label: 'Fireplaces' },
];
