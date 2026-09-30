import type {
  FooterColumn,
  LookScene,
  MaterialStory,
  NavItem,
} from "./types";

/* ------------------------------------------------------------------
 * NAVIGATION — multi-category mega menu
 * ------------------------------------------------------------------ */

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Sofas & Living",
    intent: "Architectural seating engineered around the human form.",
    featured: {
      title: "Modular Reimagined",
      caption: "The Meridian system — 14 modules, one silhouette.",
      href: "/sofas/meridian",
      image: "/images/nav/sofas-featured.jpg",
    },
    children: [
      { label: "Modular Sofas", href: "/sofas/modular", description: "Configurable corner, chaise & island units" },
      { label: "Sectionals", href: "/sofas/sectionals", description: "Grand-scale compositions up to 5.4 m" },
      { label: "Daybeds", href: "/sofas/daybeds", description: "Gallery-scale lounging for open plans" },
      { label: "Accent Chairs", href: "/sofas/accent-chairs", description: "Sculptural counterpoints to the sofa" },
    ],
  },
  {
    label: "Tables & Surfaces",
    intent: "Stone, timber and steel resolved to the millimetre.",
    featured: {
      title: "Atlas Dining",
      caption: "A single 3.2 m porcelain slab on cast bronze.",
      href: "/tables/atlas",
      image: "/images/nav/tables-featured.jpg",
    },
    children: [
      { label: "Dining Tables", href: "/tables/dining", description: "Monolithic tops, hand-finished edges" },
      { label: "Desks", href: "/tables/desks", description: "Executive & studio work surfaces" },
      { label: "Coffee Tables", href: "/tables/coffee", description: "Low composition for the salon" },
      { label: "Sideboards", href: "/tables/sideboards", description: "Storage as architecture" },
    ],
  },
  {
    label: "Chairs & Seating",
    intent: "Precision ergonomics, tailored like couture.",
    featured: {
      title: "Elyse Lounge",
      caption: "Full-grain leather over cold-cured foam.",
      href: "/chairs/elyse",
      image: "/images/nav/chairs-featured.jpg",
    },
    children: [
      { label: "Dining Chairs", href: "/chairs/dining", description: "Feather-light, rated for a lifetime" },
      { label: "Lounge Chairs", href: "/chairs/lounge", description: "Deep-seat comfort, gallery presence" },
      { label: "Ergonomic Seats", href: "/chairs/ergonomic", description: "Task seating with 14 adjustments" },
      { label: "Stools", href: "/chairs/stools", description: "Counter, bar & vanity heights" },
    ],
  },
  {
    label: "Closets & Storage",
    intent: "Walk-in systems planned to the centimetre.",
    featured: {
      title: "Atelier Walk-In",
      caption: "Aluminium profiles, LED-lit in 9 finishes.",
      href: "/storage/atelier",
      image: "/images/nav/closets-featured.jpg",
    },
    children: [
      { label: "Walk-In Systems", href: "/storage/walk-in", description: "Made-to-measure wardrobe architecture" },
      { label: "Wardrobes", href: "/storage/wardrobes", description: "Hinged, sliding & pivot doors" },
      { label: "Credenzas", href: "/storage/credenzas", description: "Low units for dining & living" },
      { label: "Shelving", href: "/storage/shelving", description: "Wall-mounted & freestanding systems" },
    ],
  },
  {
    label: "Collections",
    intent: "Complete rooms, curated by our studio.",
    featured: {
      title: "Configurator",
      caption: "Compose your own in real time, in 3D.",
      href: "/collections/configurator",
      image: "/images/nav/collections-featured.jpg",
    },
    children: [
      { label: "Room Sets", href: "/collections/room-sets", description: "Complete looks, styled & priced" },
      { label: "Materials & Swatches", href: "/collections/materials", description: "Browse the full material library" },
      { label: "Custom Configurator", href: "/collections/configurator", description: "Design your own dimensions" },
    ],
  },
];

/* ------------------------------------------------------------------
 * FEATURED CATEGORIES — bento grid
 * ------------------------------------------------------------------ */

export const FEATURED_CATEGORIES = [
  {
    slug: "sofas" as const,
    title: "Sofas & Living",
    tagline: "Modular architecture for the salon",
    count: "48 pieces",
    span: "lg:col-span-2 lg:row-span-2",
    aspect: "aspect-[4/3] lg:aspect-auto lg:h-full",
    image: "/images/cards/sofa.jpg",
    imageAlt:
      "Meridian modular sofa in full-grain leather on a kiln-dried beech chassis, photographed in a dark studio",
  },
  {
    slug: "tables" as const,
    title: "Tables & Surfaces",
    tagline: "Monolithic tops, bronze bases",
    count: "36 pieces",
    span: "lg:col-span-2 lg:row-span-1",
    aspect: "aspect-[16/9] lg:aspect-auto lg:h-full",
    image: "/images/cards/table.jpg",
    imageAlt:
      "Atlas dining table with a monolithic stone top on hand-cast bronze legs, photographed in a dark studio",
  },
  {
    slug: "chairs" as const,
    title: "Chairs & Seating",
    tagline: "Sculptural, ergonomic, tailored",
    count: "62 pieces",
    span: "lg:col-span-1 lg:row-span-1",
    aspect: "aspect-[4/3] lg:aspect-auto lg:h-full",
    image: "/images/cards/chair.jpg",
    imageAlt:
      "Elyse lounge chair in textured bouclé upholstery on a sculptural base, photographed in a dark studio",
  },
  {
    slug: "storage" as const,
    title: "Closets & Storage",
    tagline: "Walk-in systems to the centimetre",
    count: "29 pieces",
    span: "lg:col-span-1 lg:row-span-1",
    aspect: "aspect-[4/3] lg:aspect-auto lg:h-full",
    image: "/images/cards/closet.jpg",
    imageAlt:
      "Atelier walk-in closet with fluted marble doors, brass handles and integrated LED reveal lighting",
  },
];

/* ------------------------------------------------------------------
 * CONFIGURATOR PROMO — catalogue now lives in ../data/bespoke.ts
 * (typed products with real per-finish photography and a price model).
 * ------------------------------------------------------------------ */

/* ------------------------------------------------------------------
 * CRAFTSMANSHIP — material library
 * ------------------------------------------------------------------ */

export const MATERIAL_STORIES: MaterialStory[] = [
  {
    title: "Kiln-Dried Hardwoods",
    subtitle: "Chassis & carcass",
    description:
      "European beech and black walnut, dried to 8% moisture over 21 days — frames guaranteed against warping for 25 years.",
    image: "/images/materials/wood.jpg",
    imageAlt: "Close-up of rift-sawn oak planks showing a fine, straight grain",
  },
  {
    title: "Italian Leather",
    subtitle: "Full-grain, aniline",
    description:
      "Tanned in Tuscany from the top 5% of hides. It earns patina; it never peels.",
    image: "/images/materials/leather.jpg",
    imageAlt: "Close-up of full-grain leather with a soft, natural pebbled texture",
  },
  {
    title: "Precision Joinery",
    subtitle: "Tolerances of 0.3 mm",
    description:
      "Mortise-and-tenon and CNC-milled dovetails, assembled by a single master joiner and signed inside the frame.",
    image: "/images/materials/joinery-2.jpg",
    imageAlt:
      "Macro detail of precision wood joinery showing a tight, machined seam between components",
  },
  {
    title: "Sustainable Fabrics",
    subtitle: "OEKO-TEX & GOTS",
    description:
      "Recycled bouclé and organic linen woven in Como — 120,000-cycle abrasion rated, free of Restricted Substances.",
    image: "/images/materials/fabric-2.jpg",
    imageAlt:
      "Close-up of woven bouclé upholstery showing its nubby, textured weave",
  },
];

/* ------------------------------------------------------------------
 * SHOP THE LOOK — scenes with pins on the photographed furniture
 * ------------------------------------------------------------------ */

export const LOOK_SCENES: LookScene[] = [
  {
    id: "penthouse",
    name: "The Meridian Penthouse",
    location: "Milan",
    image: "/images/rooms/milan.jpg",
    imageAlt:
      "Warm walnut walk-in closet with LED-lit open shelves, a central hanging section above a valet drawer and a wide double-drawer unit at right",
    hotspots: [
      // Left shelving bay, open shelves with folded items
      { x: 14, y: 42, product: "Atelier Shelving", categoryLabel: "Storage", price: "$8,900", href: "/storage/shelving" },
      // Central hanging section with drawer above
      { x: 40, y: 71, product: "Atelier Walk-In System", categoryLabel: "Storage", price: "$21,500", href: "/storage/atelier" },
      // Wide drawer unit, center-right
      { x: 60, y: 70, product: "Atelier Drawer Module", categoryLabel: "Storage", price: "$4,600", href: "/storage/credenzas" },
      // Right shelving bay, open shelves
      { x: 83, y: 47, product: "Atelier Shelving", categoryLabel: "Storage", price: "$8,900", href: "/storage/shelving" },
    ],
  },
  {
    id: "loft",
    name: "Atelier Loft",
    location: "Copenhagen",
    image: "/images/rooms/copenhagen.jpg",
    imageAlt:
      "Dusk living room in a Copenhagen loft with a dark sectional sofa, a round pedestal dining table with chairs and floor-to-ceiling windows over the city skyline",
    hotspots: [
      // Dark sectional sofa, main seat
      { x: 22, y: 73, product: "Meridian Sofa", categoryLabel: "Sofas", price: "$12,800", href: "/sofas/meridian" },
      // Sectional chaise end, front-left
      { x: 10, y: 81, product: "Meridian Chaise", categoryLabel: "Sofas", price: "$4,900", href: "/sofas/meridian" },
      // Round pedestal dining table
      { x: 59, y: 63, product: "Atlas Dining Table", categoryLabel: "Tables", price: "$9,450", href: "/tables/atlas" },
      // Dining chair, right of the table
      { x: 71, y: 69, product: "Elyse Lounge Chair", categoryLabel: "Chairs", price: "$4,280", href: "/chairs/elyse" },
    ],
  },
  {
    id: "villa",
    name: "Casa Vela",
    location: "Lake Como",
    image: "/images/rooms/lakecomo.jpg",
    imageAlt:
      "Lake Como villa living room at dusk with arched lake-view windows, a brown leather sectional sofa at left, a dark wood dining table and a lit closet niche at right",
    hotspots: [
      // Left end of the leather sectional, chaise back cushion
      { x: 13, y: 74, product: "Meridian Chaise", categoryLabel: "Sofas", price: "$4,900", href: "/sofas/meridian" },
      // Main seat of the sectional
      { x: 28, y: 82, product: "Meridian Sofa", categoryLabel: "Sofas", price: "$12,800", href: "/sofas/meridian" },
      // Dark wood dining table under the arches
      { x: 61, y: 69, product: "Atlas Dining Table", categoryLabel: "Tables", price: "$9,450", href: "/tables/atlas" },
      // Lit walk-in closet in the right-hand wall
      { x: 90, y: 60, product: "Atelier Walk-In System", categoryLabel: "Storage", price: "$21,500", href: "/storage/atelier" },
    ],
  },
];

/* ------------------------------------------------------------------
 * FOOTER
 * ------------------------------------------------------------------ */

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Categories",
    links: [
      { label: "Sofas & Living", href: "/sofas" },
      { label: "Tables & Surfaces", href: "/tables" },
      { label: "Chairs & Seating", href: "/chairs" },
      { label: "Closets & Storage", href: "/storage" },
      { label: "Collections", href: "/collections" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Interior Design Studio", href: "/services/studio" },
      { label: "Custom Configurator", href: "/collections/configurator" },
      { label: "Delivery & Installation", href: "/services/delivery" },
      { label: "Trade Program", href: "/trade" },
      { label: "Care & Repair", href: "/services/care" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Dimension Guides", href: "/resources/dimensions" },
      { label: "Assembly Manuals", href: "/resources/manuals" },
      { label: "Materials & Swatches", href: "/collections/materials" },
      { label: "Warranty", href: "/resources/warranty" },
      { label: "Fabric Care", href: "/resources/fabric-care" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Ateliers", href: "/company/ateliers" },
      { label: "Sustainability", href: "/company/sustainability" },
      { label: "Showrooms", href: "/company/showrooms" },
      { label: "Press", href: "/company/press" },
      { label: "Careers", href: "/company/careers" },
    ],
  },
];
