// Content for components/ServiceConversionBlock.tsx, keyed by service slug.
// Every claim here restates something already published on the site
// (lib/servicesData.tsx, components/Faq.tsx, components/ProcessTimeline.tsx).

export interface ServiceConversion {
  /** Short noun used in headings, e.g. "Countertops" */
  label: string;
  reasons: { title: string; text: string }[];
  photosHeading: string;
  photos: { src: string; alt: string }[];
  faqs: { q: string; a: string }[];
}

const P = '/images/projects/';

export const serviceConversion: Record<string, ServiceConversion> = {
  countertops: {
    label: 'Countertops',
    reasons: [
      { title: 'Factory-direct pricing', text: 'We import slabs and cut them in our own Duluth shop, so there is no retail middleman between you and the stone.' },
      { title: 'Laser templating', text: 'Your cabinets are measured with a digital laser system to 1/16" precision, so the stone fits walls that are not perfectly square.' },
      { title: '500+ slabs to choose from', text: 'Walk the showroom in Duluth and pick the exact slab for your kitchen instead of choosing from a 2-inch sample.' }
    ],
    photosHeading: 'Countertops we fabricated and installed',
    photos: [
      { src: P + 'kitchen-quartz-waterfall-island-black-fixtures-atlanta.jpg', alt: 'White quartz waterfall island with black fixtures in an Atlanta kitchen' },
      { src: P + 'kitchen-navy-cabinets-white-quartz-waterfall-island-atlanta.jpg', alt: 'Navy cabinets with a white quartz waterfall island in Atlanta' },
      { src: P + 'kitchen-navy-cabinets-pendant-lighting-island-atlanta.jpg', alt: 'White quartz island countertop with navy cabinets in Atlanta' },
      { src: P + 'kitchen-vaulted-ceiling-wood-beams-quartz-island-atlanta.jpg', alt: 'Quartz kitchen island under a vaulted ceiling in Atlanta' }
    ],
    faqs: [
      { q: 'How much do granite countertops cost in Atlanta?', a: 'Price depends on the stone level (rarity) and thickness. Because we fabricate in our own Duluth shop, factory-direct pricing starts as low as $35/sqft installed for Level 1 granite.' },
      { q: 'What is the difference between quartz and granite?', a: 'Granite is natural stone cut from a quarry, and every slab is one of a kind. Quartz is engineered, non-porous and never needs sealing. We stock both in the showroom so you can compare them side by side.' },
      { q: 'Do I need to seal my quartz countertops?', a: 'No. Quartz is non-porous and does not need sealer. Natural stone like granite and quartzite is sealed at installation, and we give you care instructions at the final walkthrough.' },
      { q: 'How long does countertop installation take?', a: 'Once we have your template, fabrication typically takes 3-5 days. Installation in your home is usually done in one day, often within 4-6 hours.' },
      { q: 'Can I pick my own slab?', a: 'Yes. Visit our Duluth showroom, walk through 500+ slabs and choose the one you want. We lay out the veins before the first cut.' }
    ]
  },
  cabinets: {
    label: 'Cabinets',
    reasons: [
      { title: 'Solid wood and plywood boxes', text: 'No particle board. Our cabinets use solid wood construction with dovetail drawers.' },
      { title: 'Soft-close hardware included', text: 'Soft-close hinges and drawer slides come standard on our custom and semi-custom lines.' },
      { title: 'Cabinets and stone from one team', text: 'We design the layout, build the cabinets and fabricate the countertop in-house, so measurements line up from day one.' }
    ],
    photosHeading: 'Cabinet projects from our team',
    photos: [
      { src: P + 'kitchen-navy-cabinets-pendant-lighting-island-atlanta.jpg', alt: 'Navy shaker kitchen cabinets with pendant lighting in Atlanta' },
      { src: P + 'cabinets-glass-front-hutch-built-in-atlanta.jpg', alt: 'Built-in glass front hutch cabinet in Atlanta' },
      { src: P + 'cabinets-wet-bar-marble-backsplash-wine-storage-atlanta.jpg', alt: 'Wet bar cabinets with marble backsplash and wine storage in Atlanta' },
      { src: P + 'kitchen-oak-cabinets-double-wall-oven-gas-cooktop-atlanta.jpg', alt: 'Oak kitchen cabinets with double wall oven in Atlanta' }
    ],
    faqs: [
      { q: 'Do you install kitchen cabinets near me?', a: 'Yes. We design, supply and install custom and semi-custom cabinets across Metro Atlanta, including Duluth, Alpharetta, Johns Creek, Roswell and Suwanee.' },
      { q: 'What are your cabinets made of?', a: 'Solid wood and plywood. We do not use particle board. Drawers are dovetailed and hinges and slides are soft-close.' },
      { q: 'Can I see the layout before you build?', a: 'Yes. We offer a 3D kitchen design service so you can review the layout, storage and workflow before anything is ordered.' },
      { q: 'Can I choose a custom color or finish?', a: 'Yes. Custom colors and finishes are available. Bring a sample to the showroom or ask us to match a color from your home.' }
    ]
  },
  'kitchen-remodeling': {
    label: 'Kitchen Remodeling',
    reasons: [
      { title: 'One team from demo to done', text: 'We manage the whole project A to Z: demolition and haul away, plumbing and electrical prep, cabinets, stone, backsplash and lighting.' },
      { title: 'Stone cut in our own shop', text: 'Countertops are fabricated in our Duluth facility, so the most precise part of the remodel never leaves our hands.' },
      { title: 'Weeks, not months', text: 'Our process is built to keep your kitchen out of service for as little time as possible, with installs that are clean and on schedule.' }
    ],
    photosHeading: 'Kitchens we remodeled',
    photos: [
      { src: P + 'kitchen-vaulted-ceiling-wood-beams-quartz-island-atlanta.jpg', alt: 'Kitchen with vaulted ceiling, wood beams and quartz island in Atlanta' },
      { src: P + 'kitchen-open-concept-island-black-appliances-staircase-atlanta.jpg', alt: 'Open concept kitchen with island and black appliances in Atlanta' },
      { src: P + 'kitchen-navy-cabinets-subway-tile-backsplash-range-atlanta.jpg', alt: 'Navy cabinets with subway tile backsplash in an Atlanta kitchen' },
      { src: P + 'kitchen-white-cabinets-island-quartz-countertop-atlanta.jpg', alt: 'White cabinet kitchen with quartz island countertop in Atlanta' }
    ],
    faqs: [
      { q: 'What does a full kitchen remodel include?', a: 'Demolition and haul away, plumbing and electrical prep, cabinets, countertops, backsplash and lighting installation, all managed by our team.' },
      { q: 'Do I need to hire separate contractors?', a: 'No. We handle project management from start to finish, so you have one point of contact for the whole kitchen.' },
      { q: 'Where do your countertops come from?', a: 'We fabricate them in our own Duluth facility using laser templating, which keeps cost and quality under our control.' },
      { q: 'Can I visit the showroom before deciding?', a: 'Yes. Our showroom at 4579 Abbotts Bridge Rd in Duluth has 500+ slabs plus cabinet samples. Walk-ins are welcome Monday to Saturday.' }
    ]
  },
  'bathroom-remodeling': {
    label: 'Bathroom Remodeling',
    reasons: [
      { title: 'Shower conversions and tubs', text: 'We handle walk-in shower conversions and freestanding tub installations, plus custom tile work.' },
      { title: 'Vanity tops cut in-house', text: 'Double vanity tops are fabricated in our Duluth shop with the undermount sink cutouts done to fit.' },
      { title: 'Clean, protected work area', text: 'Floors and furniture are covered before any tool comes in, and we clean up the workspace when we leave.' }
    ],
    photosHeading: 'Bathrooms we built',
    photos: [
      { src: P + 'bathroom-freestanding-tub-glass-shower-walnut-vanity-atlanta.jpg', alt: 'Bathroom with freestanding tub, glass shower and walnut vanity in Atlanta' },
      { src: P + 'bathroom-calacatta-marble-shower-lighted-niche-atlanta.jpg', alt: 'Calacatta marble shower with lighted niche in Atlanta' },
      { src: P + 'bathroom-navy-cabinets-white-quartz-double-vanity-atlanta.jpg', alt: 'Navy double vanity with white quartz top in Atlanta' },
      { src: P + 'bathroom-charcoal-marble-shower-rainfall-head-atlanta.jpg', alt: 'Charcoal marble shower with rainfall head in Atlanta' }
    ],
    faqs: [
      { q: 'What bathroom projects do you take on?', a: 'Master bathrooms and powder rooms, including walk-in shower conversions, freestanding tubs, custom tile and double vanities with stone tops.' },
      { q: 'Do you fabricate the vanity top yourselves?', a: 'Yes. Vanity tops are cut and polished in our Duluth shop, including the undermount sink cutout.' },
      { q: 'Can I use a remnant for a smaller bathroom?', a: 'Yes. Our remnant yard in Duluth has stone pieces sized for vanities and powder rooms at a lower price than a full slab.' },
      { q: 'What areas do you serve?', a: 'Metro Atlanta, including Duluth, Alpharetta, Johns Creek, Roswell, Suwanee, Sandy Springs and Lawrenceville.' }
    ]
  },
  'vanity-tops': {
    label: 'Vanity Tops',
    reasons: [
      { title: 'Remnant yard in Duluth', text: 'Pick from hundreds of stone remnants sized for vanities, laundry rooms and fireplaces.' },
      { title: 'Undermount sink included', text: 'Vanity tops include the undermount sink and the cutout is made in our shop.' },
      { title: 'Quick turnaround', text: 'Small projects move fast because the stone is already in our yard and cut in-house.' }
    ],
    photosHeading: 'Vanity tops we installed',
    photos: [
      { src: P + 'bathroom-walnut-vanity-blue-quartzite-backsplash-atlanta.jpg', alt: 'Walnut vanity with blue quartzite top and backsplash in Atlanta' },
      { src: P + 'bathroom-gray-cabinets-quartz-vanity-wood-tile-wall-atlanta.jpg', alt: 'Gray vanity with quartz top in Atlanta' },
      { src: P + 'bathroom-kohler-undermount-sink-quartz-countertop-atlanta.jpg', alt: 'Undermount sink in a quartz vanity top in Atlanta' },
      { src: P + 'bathroom-black-granite-trough-sink-fabrication.jpg', alt: 'Black granite trough sink fabricated by AGS Stones' }
    ],
    faqs: [
      { q: 'What is a stone remnant?', a: 'A remnant is the piece left over after a full slab is cut for a kitchen. It is the same quality stone, sold at a lower price because it is smaller.' },
      { q: 'Is the sink included?', a: 'Yes. Our vanity tops include an undermount sink and the custom cutout.' },
      { q: 'Can I choose the remnant myself?', a: 'Yes. Visit our Duluth showroom and pick from the remnant yard in person.' },
      { q: 'What else can remnants be used for?', a: 'Laundry rooms, fireplace surrounds, powder rooms and other small surfaces.' }
    ]
  },
  'outdoor-kitchens': {
    label: 'Outdoor Kitchens',
    reasons: [
      { title: 'Stone that handles Georgia summers', text: 'We fabricate UV and weather resistant stone like granite and Dekton for patios and BBQ islands.' },
      { title: 'Cutouts made to fit', text: 'Built-in grill cutouts and outdoor bar tops are cut in our Duluth shop to your exact measurements.' },
      { title: 'Leathered and honed finishes', text: 'Choose a finish with more grip and less glare for outdoor use.' }
    ],
    photosHeading: 'Recent stone work from our Duluth shop',
    photos: [
      { src: P + 'fireplace-black-granite-surround-white-mantle-atlanta.jpg', alt: 'Black granite fireplace surround fabricated in Atlanta' },
      { src: P + 'bathroom-black-granite-trough-sink-fabrication.jpg', alt: 'Black granite trough sink fabricated by AGS Stones' },
      { src: P + 'kitchen-quartz-waterfall-island-black-fixtures-atlanta.jpg', alt: 'Quartz waterfall island fabricated in Atlanta' },
      { src: P + 'kitchen-gas-cooktop-stainless-hood-quartz-backsplash-atlanta.jpg', alt: 'Gas cooktop with quartz backsplash in Atlanta' }
    ],
    faqs: [
      { q: 'What stone works best outdoors?', a: 'Granite and Dekton hold up well to UV and weather. We can show you outdoor-friendly options in the showroom.' },
      { q: 'Can you cut the opening for my grill?', a: 'Yes. Grill cutouts are made in our shop from your grill specs and on-site measurements.' },
      { q: 'Which finish should I pick for outdoors?', a: 'Leathered and honed finishes are popular outside because they reduce glare and are less slippery than polished stone.' },
      { q: 'Do you build outdoor bar tops too?', a: 'Yes. We fabricate outdoor bar tops and patio counters along with BBQ islands.' }
    ]
  },
  'backsplash-tile': {
    label: 'Backsplash & Tile',
    reasons: [
      { title: 'Backsplash matched to your stone', text: 'We install the countertop and the backsplash, so the tile is planned around the stone from the start.' },
      { title: 'From subway to large format', text: 'Our tile setters install subway tile, mosaics, herringbone patterns and large format porcelain.' },
      { title: 'Showers and floors too', text: 'Beyond the kitchen, we tile shower walls and floors for full bathroom projects.' }
    ],
    photosHeading: 'Backsplash and tile we installed',
    photos: [
      { src: P + 'kitchen-honey-oak-cabinets-black-subway-tile-backsplash-atlanta.jpg', alt: 'Black subway tile backsplash with oak cabinets in Atlanta' },
      { src: P + 'kitchen-navy-cabinets-subway-tile-backsplash-range-atlanta.jpg', alt: 'White subway tile backsplash with navy cabinets in Atlanta' },
      { src: P + 'kitchen-gas-cooktop-stainless-hood-quartz-backsplash-atlanta.jpg', alt: 'Quartz backsplash behind a gas cooktop in Atlanta' },
      { src: P + 'bathroom-marble-basketweave-floor-tile-detail-atlanta.jpg', alt: 'Marble basketweave floor tile detail in Atlanta' }
    ],
    faqs: [
      { q: 'Do you install backsplash with the countertops?', a: 'Yes. We can install the backsplash as part of your countertop or kitchen project, so both are planned together.' },
      { q: 'What tile styles do you install?', a: 'Classic subway tile, mosaics, herringbone patterns and large format porcelain.' },
      { q: 'Do you tile showers and floors?', a: 'Yes. We install shower walls and floors as well as kitchen backsplashes.' },
      { q: 'Can I use a full-height stone backsplash?', a: 'Yes. We fabricate stone backsplashes in our Duluth shop to match your countertop slab.' }
    ]
  }
};
