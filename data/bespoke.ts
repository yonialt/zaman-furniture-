import type { BespokeProduct } from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  Bespoke configurator catalogue — one typed source of truth         */
/*                                                                     */
/*  Each product carries its own finish list with a real photograph    */
/*  per finish, its available widths, and the price model              */
/*  (basePrice + width × pricePerCm). Edit the placeholder numbers     */
/*  here only.                                                         */
/*                                                                     */
/*  Photography lives in /public/images/bespoke (the spec'd /public/   */
/*  img/ folder does not exist). The sofa's "Black Leather" spec has   */
/*  no photo on disk, so the dark charcoal photo fills that slot.      */
/* ------------------------------------------------------------------ */

export const BESPOKE_PRODUCTS: BespokeProduct[] = [
  {
    id: "closet",
    label: "Walk-In Closet",
    // Landscape masters — shown object-contain inside the fixed preview
    // box, never cropped.
    previewRatio: 1024 / 637,
    finishes: [
      {
        id: "oak",
        label: "Rift Oak",
        image: "/images/bespoke/closet-oak.jpg",
      },
      {
        id: "bronze",
        label: "Champagne Bronze",
        image: "/images/bespoke/closet-bronze.jpg",
      },
      {
        id: "graphite",
        label: "Matte Graphite",
        image: "/images/bespoke/closet-graphite.jpg",
      },
    ],
    widths: [240, 320, 420],
    basePrice: 18900,
    pricePerCm: 11,
  },
  {
    id: "wardrobe",
    label: "Wardrobe",
    previewRatio: 1024 / 637,
    finishes: [
      {
        id: "oak",
        label: "Rift Oak",
        image: "/images/bespoke/bespoke-wardrobe-rift-oak.jpg",
      },
      {
        id: "bronze",
        label: "Champagne Bronze",
        image: "/images/bespoke/bespoke-wardrobe-champagne-bronze.jpg",
      },
      {
        id: "graphite",
        label: "Matte Graphite",
        image: "/images/bespoke/bespoke-wardrobe-graphite.jpg",
      },
    ],
    widths: [240, 320, 420],
    basePrice: 9800,
    pricePerCm: 6,
  },
  {
    id: "sofa",
    label: "Modular Sofa",
    previewRatio: 1024 / 637,
    finishes: [
      {
        id: "charcoal",
        label: "Black Leather",
        image: "/images/bespoke/bespoke-sofa-charcoal.jpg",
      },
      {
        id: "cognac",
        label: "Cognac Leather",
        image: "/images/bespoke/bespoke-sofa-cognac.jpg",
      },
      {
        id: "bone",
        label: "Bone Boucle",
        image: "/images/bespoke/bespoke-sofa-bone.jpg",
      },
    ],
    widths: [240, 320, 420],
    basePrice: 12800,
    pricePerCm: 9,
  },
];
