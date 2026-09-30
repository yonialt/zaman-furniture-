import type { Product } from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  Product catalogue — one typed source of truth                      */
/*                                                                     */
/*  Every colour variant carries its own swatch hex, label and photo.  */
/*  The first colour of each product is the default variant shown on   */
/*  the card and in Quick View.                                        */
/*                                                                     */
/*  The -2 filenames cache-bust the older copies: the first downloads  */
/*  shipped two byte-identical closet photos (rift oak = champagne     */
/*  bronze) and were replaced on disk without changing URLs, so        */
/*  browsers kept the stale wrong images.                              */
/* ------------------------------------------------------------------ */

export const PRODUCTS: Product[] = [
  {
    id: "meridian-01",
    name: "Meridian Modular Sofa",
    category: "sofas",
    categoryLabel: "Sofas & Living",
    price: 12800,
    badge: "Best Seller",
    description:
      "Fourteen reconfigurable modules on a kiln-dried beech chassis. Cold-cured foam cores wrapped in feather down.",
    dimensions: "W 320 × D 96 × H 68 cm",
    imageAlt:
      "Meridian modular sofa photographed in a dark studio",
    colors: [
      {
        id: "black",
        label: "Black Leather",
        hex: "#1f2937",
        image: "/images/products/meridian-sofa-black-2.jpg",
      },
      {
        id: "cognac",
        label: "Cognac Leather",
        hex: "#a0522d",
        image: "/images/products/meridian-sofa-cognac-2.jpg",
      },
      {
        id: "burgundy",
        label: "Burgundy Leather",
        hex: "#7b1f2b",
        image: "/images/products/meridian-sofa-burgundy-2.jpg",
      },
      {
        id: "bone",
        label: "Bone Leather",
        hex: "#e8e2d6",
        image: "/images/products/meridian-sofa-bone-2.jpg",
      },
    ],
  },
  {
    id: "atlas-02",
    name: "Atlas Dining Table",
    category: "tables",
    categoryLabel: "Tables & Surfaces",
    price: 9450,
    compareAtPrice: 11200,
    badge: "Studio Edition",
    description:
      "A single 3.2 m porcelain slab, 12 mm thick, on hand-cast bronze legs. Seats ten without a central pedestal.",
    dimensions: "W 320 × D 110 × H 74 cm",
    imageAlt:
      "Atlas dining table photographed in a dark studio",
    colors: [
      {
        id: "dark-stone",
        label: "Dark Stone",
        hex: "#374151",
        image: "/images/products/atlas-table-dark-stone-2.jpg",
      },
      {
        id: "statuario",
        label: "Statuario Porcelain",
        hex: "#e9e7e2",
        image: "/images/products/atlas-table-statuario-2.jpg",
      },
      {
        id: "walnut",
        label: "Black Walnut",
        hex: "#5c4028",
        image: "/images/products/atlas-table-walnut-2.jpg",
      },
      {
        id: "navy",
        label: "Navy Lacquer",
        hex: "#1f2a44",
        image: "/images/products/atlas-table-navy-2.jpg",
      },
    ],
  },
  {
    id: "elyse-03",
    name: "Elyse Lounge Chair",
    category: "chairs",
    categoryLabel: "Chairs & Seating",
    price: 4280,
    badge: "New Arrival",
    description:
      "Full-grain aniline leather over cold-cured foam, suspended on a swivelling polished-aluminium base.",
    dimensions: "W 78 × D 82 × H 96 cm",
    imageAlt:
      "Elyse lounge chair photographed in a dark studio",
    colors: [
      {
        id: "cognac",
        label: "Cognac Leather",
        hex: "#a0522d",
        image: "/images/products/elyse-chair-cognac-2.jpg",
      },
      {
        id: "onyx",
        label: "Onyx Leather",
        hex: "#1f2937",
        image: "/images/products/elyse-chair-onyx-2.jpg",
      },
      {
        id: "sheepskin",
        label: "Cream Sheepskin",
        hex: "#f5f0e8",
        image: "/images/products/elyse-chair-sheepskin-2.jpg",
      },
      {
        id: "forest",
        label: "Forest Green",
        hex: "#2f4a35",
        image: "/images/products/elyse-chair-forest-2.jpg",
      },
    ],
  },
  {
    id: "atelier-04",
    name: "Atelier Walk-In System",
    category: "storage",
    categoryLabel: "Closets & Storage",
    price: 21500,
    badge: "Made to Measure",
    description:
      "Anodised aluminium profiles with integrated LED reveal lighting. Planned, produced and installed to the centimetre.",
    dimensions: "From W 240 × H 260 cm",
    imageAlt:
      "Atelier walk-in closet photographed in a dark studio",
    colors: [
      {
        id: "marble",
        label: "White Marble",
        hex: "#eceae4",
        image: "/images/products/atelier-closet-marble-2.jpg",
      },
      {
        id: "bronze",
        label: "Champagne Bronze",
        hex: "#8a7855",
        image: "/images/products/atelier-closet-champagne-bronze-4.jpg",
      },
      {
        id: "graphite",
        label: "Matte Graphite",
        hex: "#2b3138",
        image: "/images/products/atelier-closet-graphite-2.jpg",
      },
      {
        id: "oak",
        label: "Rift Oak",
        hex: "#9c7b53",
        image: "/images/products/atelier-closet-rift-oak-3.jpg",
      },
    ],
  },
];
