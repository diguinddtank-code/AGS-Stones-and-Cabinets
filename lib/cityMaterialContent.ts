// Material-specific content for the countertop city pages
// (/countertops-{city}-ga, /granite-countertops-{city}-ga,
// /quartz-countertops-{city}-ga), so the three pages cover different ground:
// granite = natural stone, quartz = engineered/low maintenance,
// countertops = general comparison that links to the other two.
// Facts match what the site already publishes (FAQ, blog, process).

export type MaterialPrefix = 'countertops' | 'granite-countertops' | 'quartz-countertops';

export interface MaterialPoint {
  title: string;
  text: string;
}

export interface MaterialLink {
  label: string;
  href: string;
}

export interface MaterialSection {
  eyebrow: string;
  heading: string;
  intro: string;
  points: MaterialPoint[];
  goodToKnow?: MaterialPoint[];
  links: MaterialLink[];
}

export interface ComparisonRow {
  material: string;
  madeOf: string;
  sealing: string;
  heat: string;
  stains: string;
  look: string;
}

export const isMaterialPrefix = (prefix: string): prefix is MaterialPrefix =>
  prefix === 'countertops' || prefix === 'granite-countertops' || prefix === 'quartz-countertops';

export const countertopComparison: ComparisonRow[] = [
  { material: 'Granite', madeOf: 'Natural stone', sealing: 'Every 1 to 3 years', heat: 'High', stains: 'Good when sealed', look: 'One of a kind, varied patterns' },
  { material: 'Quartz', madeOf: 'Engineered quartz and resin', sealing: 'Never', heat: 'Moderate, use trivets', stains: 'Excellent, non-porous', look: 'Consistent color slab to slab' },
  { material: 'Quartzite', madeOf: 'Natural stone', sealing: 'Every 1 to 2 years', heat: 'High', stains: 'Good when sealed', look: 'Marble-like veining, very hard' },
  { material: 'Marble', madeOf: 'Natural stone', sealing: 'Regularly', heat: 'Moderate', stains: 'Can etch from acids', look: 'Classic soft veining' },
];

export function materialSection(prefix: MaterialPrefix, city: string, cityName: string): MaterialSection {
  const granite = `/granite-countertops-${city}-ga`;
  const quartz = `/quartz-countertops-${city}-ga`;
  const all = `/countertops-${city}-ga`;

  if (prefix === 'granite-countertops') {
    return {
      eyebrow: 'Natural Stone',
      heading: `Why ${cityName} homeowners choose granite`,
      intro: 'Granite is quarried, not manufactured. It formed under heat and pressure over millions of years, which is why it handles a busy kitchen so well and why no two slabs look alike.',
      points: [
        { title: 'Built for daily wear', text: 'Granite resists scratches from knives and stands up to hot cookware better than most countertop surfaces. A trivet is still a good habit for long contact.' },
        { title: 'One of a kind', text: 'Every slab has its own grain, flecks and movement. The piece you choose in our yard is the piece that goes in your kitchen.' },
        { title: 'Classic and exotic colors', text: 'Pick from dependable classics like Absolute Black, Uba Tuba and Colonial White, or exotic slabs with bold veining you will not find in a factory-made surface.' },
        { title: 'Simple sealing', text: 'We seal your granite at installation. Lighter colors need a fresh coat about once a year, dense dark granites every 3 to 5 years. It takes a few minutes with a spray sealer.' },
      ],
      goodToKnow: [
        { title: 'It is porous', text: 'Unsealed granite can absorb oil or wine. A quick water-drop test tells you when it is time to reseal.' },
        { title: 'Patterns vary', text: 'Online photos never match the real slab. Plan to see it in person before we cut.' },
      ],
      links: [
        { label: `Compare with quartz countertops in ${cityName}`, href: quartz },
        { label: `All countertop materials in ${cityName}`, href: all },
        { label: 'How to clean and seal granite', href: '/blog/how-to-clean-and-seal-granite-countertops' },
      ],
    };
  }

  if (prefix === 'quartz-countertops') {
    return {
      eyebrow: 'Engineered Stone',
      heading: `Why ${cityName} homeowners choose quartz`,
      intro: 'Quartz is engineered from ground natural quartz bound with resin. The result is a surface with no pores, so spills sit on top instead of soaking in.',
      points: [
        { title: 'Zero maintenance', text: 'Quartz never needs sealing. Wipe it with warm water and mild soap and it stays the way it looked on install day.' },
        { title: 'Non-porous', text: 'Coffee, wine, oil and juice wipe off without leaving a mark, and there are no pores for bacteria to settle into.' },
        { title: 'Uniform color', text: 'Because it is made in a factory, color and pattern stay consistent across slabs. Long runs, islands and backsplashes match, and seams are easier to blend.' },
        { title: 'Marble look, less upkeep', text: 'Many quartz designs mimic Calacatta and Carrara marble, giving you the veining without the etching and resealing.' },
      ],
      goodToKnow: [
        { title: 'Use trivets', text: 'The resin in quartz can scorch or discolor under a very hot pan. Keep trivets near the stove.' },
        { title: 'Indoors only', text: 'Direct sunlight can fade quartz over time. For patios and outdoor kitchens we recommend granite or Dekton.' },
      ],
      links: [
        { label: `Compare with granite countertops in ${cityName}`, href: granite },
        { label: `All countertop materials in ${cityName}`, href: all },
        { label: 'Can you put hot pans on quartz?', href: '/blog/can-you-put-hot-pans-on-quartz-countertops' },
      ],
    };
  }

  return {
    eyebrow: 'Compare Materials',
    heading: `Granite, quartz, quartzite or marble in ${cityName}?`,
    intro: 'There is no single best countertop. The right one depends on how you cook, how much upkeep you want and the look you are after. Here is how the four most popular stones compare.',
    points: [
      { title: 'Lowest maintenance', text: 'Quartz. It is non-porous and never needs sealing.' },
      { title: 'Best with heat', text: 'Granite and quartzite. Both handle hot cookware better than quartz or marble.' },
      { title: 'Most unique look', text: 'Granite and quartzite. Every natural slab is different, so you pick yours in person.' },
      { title: 'Most consistent look', text: 'Quartz. Color and pattern match from slab to slab, which helps on large islands.' },
    ],
    links: [
      { label: `Granite countertops in ${cityName}`, href: granite },
      { label: `Quartz countertops in ${cityName}`, href: quartz },
      { label: 'Granite vs quartz: which is better?', href: '/blog/granite-vs-quartz-which-is-better-for-your-kitchen' },
      { label: 'Quartzite vs quartz guide', href: '/blog/quartzite-vs-quartz-countertops-guide' },
    ],
  };
}

export function materialFaqs(prefix: MaterialPrefix, cityName: string): { q: string; a: string }[] {
  if (prefix === 'granite-countertops') {
    return [
      { q: 'Do granite countertops need to be sealed?', a: 'Yes. Granite is natural stone and slightly porous. We seal it at installation. Lighter colors should be resealed about once a year and dense dark granites every 3 to 5 years. If a few drops of water darken the stone within 15 minutes, it is time to reseal.' },
      { q: 'Can I put hot pans on granite?', a: 'Granite handles heat better than most countertop surfaces, so a hot pan set down briefly will not hurt it. For long contact, like a slow cooker, we still recommend a trivet.' },
      { q: `How much do granite countertops cost in ${cityName}, GA?`, a: 'Price depends on the granite level (rarity), thickness and edge profile. Because we fabricate in our own Duluth shop, factory-direct pricing starts as low as $35/sqft installed for Level 1 granite. Exotic slabs cost more. Request a free estimate for an exact quote.' },
      { q: 'Can I choose my own granite slab?', a: `Yes. ${cityName} homeowners can visit our Duluth showroom and slab yard to pick the exact slab for their kitchen before we cut it.` },
    ];
  }
  if (prefix === 'quartz-countertops') {
    return [
      { q: 'Do quartz countertops need to be sealed?', a: 'No. Quartz is non-porous, so it never needs a sealer. Daily cleaning with warm water and mild soap is all it takes.' },
      { q: 'Can I put hot pans on quartz?', a: 'Use a trivet. The resin that binds quartz can scorch or discolor under direct high heat, especially from pans straight off the burner.' },
      { q: `Is quartz a good choice for an outdoor kitchen in ${cityName}?`, a: 'We do not recommend it. Direct sunlight can fade quartz over time. For outdoor kitchens we fabricate granite or Dekton, which hold up to UV and Georgia summers.' },
      { q: 'How do I remove a stain from quartz?', a: 'Most spills wipe off with warm water and mild dish soap. For dried-on marks, use a non-abrasive cleaner and a soft cloth. Avoid harsh chemicals and scouring pads.' },
    ];
  }
  return [
    { q: `Granite or quartz: which is better for my ${cityName} kitchen?`, a: 'Pick granite if you want a one-of-a-kind natural stone that handles heat well and you do not mind resealing. Pick quartz if you want zero maintenance and a consistent color. You can compare both side by side in our Duluth showroom.' },
    { q: 'Which countertop material needs the least maintenance?', a: 'Quartz. It is non-porous and never needs sealing. Granite, quartzite and marble are natural stones that need periodic sealing.' },
    { q: `How much do countertops cost in ${cityName}, GA?`, a: 'It depends on the material, square footage and edge profile. As a reference, factory-direct pricing starts as low as $35/sqft installed for Level 1 granite. Request a free estimate for an exact price on the material you like.' },
    { q: 'How long does countertop installation take?', a: 'Once we have your template, fabrication typically takes 3 to 5 days. Installation in your home is usually done in one day, often within 4 to 6 hours.' },
  ];
}
