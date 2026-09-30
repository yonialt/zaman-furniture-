/* ------------------------------------------------------------------
 * Domain types for the AEROFORM luxury furniture platform.
 * Shape these to your commerce API (Shopify, Medusa, Sanity, custom)
 * when wiring up real data — every section consumes these contracts.
 * ------------------------------------------------------------------ */

export type CategorySlug =
  | "sofas"
  | "tables"
  | "chairs"
  | "storage"
  | "collections";

/** Top-level navigation entry with a mega-menu dropdown. */
export interface NavItem {
  label: string;
  intent: string;
  /** Optional featured panel content for the dropdown's right column. */
  featured?: {
    title: string;
    caption: string;
    href: string;
    /** Optional product image shown above the label in the featured card. */
    image?: string;
  };
  children: NavChild[];
}

export interface NavChild {
  label: string;
  href: string;
  description: string;
}

/** Material swatch shown on product cards (Wood, Leather, Fabric, Stone…). */
export interface MaterialSwatch {
  id: string;
  name: string;
  /** CSS color or gradient used to render the swatch chip. */
  color: string;
  /** Optional surcharge label, e.g. "+ $1,200". */
  priceDelta?: string;
}

/**
 * A selectable colour variant of a product. The swatch dot (hex), the
 * label under the swatches and the card photograph all come from this one
 * object, so they can never disagree with each other.
 */
export interface ProductColor {
  id: string;
  /** Human label shown under the swatch row and in Quick View. */
  label: string;
  /** CSS hex (or any CSS color) used to render the swatch dot. */
  hex: string;
  /** Photograph of the product in this colour (4:5, same framing per product). */
  image: string;
}

/** Material library entry for the Craftsmanship section. */
export interface MaterialStory {
  title: string;
  subtitle: string;
  description: string;
  /** Photography shown at the top of the card (4:5, object-cover). */
  image: string;
  /** Descriptive alt text for the photograph. */
  imageAlt: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategorySlug;
  categoryLabel: string;
  price: number;
  /** Compare-at price; renders a strikethrough when present. */
  compareAtPrice?: number;
  badge?: string;
  description: string;
  dimensions: string;
  /** Colour variants. The first entry is the product's default variant. */
  colors: ProductColor[];
  /** Descriptive alt text for the colour photographs. */
  imageAlt: string;
}

/** Interactive pin on a "Shop the Look" scene. */
export interface LookHotspot {
  /** Percent-based coordinates within the scene frame (0–100). */
  x: number;
  y: number;
  product: string;
  categoryLabel: string;
  price: string;
  href: string;
}

/** One shoppable room in the "Shop the Look" gallery. */
export interface LookScene {
  id: string;
  name: string;
  location: string;
  /** Room photograph used as the pin-area background. */
  image: string;
  /** Descriptive alt text for the room photograph. */
  imageAlt: string;
  /** Pins positioned over the matching furniture in the photo. */
  hotspots: LookHotspot[];
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

/** One finish of a bespoke product, with its real photograph. */
export interface BespokeFinish {
  id: string;
  label: string;
  /** Photograph of the product in this finish (shown object-contain). */
  image: string;
}

/** A configurable bespoke product in the configurator promo. */
export interface BespokeProduct {
  id: string;
  label: string;
  /** Natural width/height ratio of the finish photography (e.g. 1024/637). */
  previewRatio: number;
  /** Finishes differ per product; the first is the default. */
  finishes: BespokeFinish[];
  /** Available widths in cm (e.g. [240, 320, 420]). */
  widths: number[];
  /** Placeholder price model: basePrice + width × pricePerCm. */
  basePrice: number;
  pricePerCm: number;
}
