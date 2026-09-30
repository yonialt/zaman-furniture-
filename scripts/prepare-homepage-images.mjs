/**
 * prepare-homepage-images.mjs — one-off asset organizer.
 *
 * Builds the exact image paths used by the homepage sections from the
 * downloaded photography in public/images/nav:
 *   public/images/cards/{sofa,table,chair,closet}.jpg         — best-seller cards (4:5 crop)
 *   public/images/materials/{wood,leather}.jpg               — material library (4:5 crop)
 *   public/images/materials/{joinery,fabric}-2.jpg           — material library (4:5 crop, cache-busted)
 *   public/images/bespoke/closet-{oak,bronze,graphite}.jpg    — real closet finish variants
 *   public/images/bespoke/{wardrobe,sofa}.jpg                 — real wardrobe / sofa photos
 *   public/images/rooms/{milan,copenhagen,lakecomo}.jpg       — shop-the-look backdrops
 *
 * No synthetic tinting: the finish variants are the real per-finish
 * photographs downloaded into public/images/nav/bespoke.
 * Run once: node scripts/prepare-homepage-images.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(process.cwd());
const NAV = path.join(ROOT, "public", "images", "nav");

await Promise.all(
  ["cards", "materials", "bespoke", "rooms"].map((d) =>
    mkdir(path.join(ROOT, "public", "images", d), { recursive: true })
  )
);

/**
 * Crop to the largest centered 4:5 portrait that fits inside the source
 * (never upscales), at whatever resolution the source allows.
 */
async function toPortrait45(src, dest, { position = "centre" } = {}) {
  const meta = await sharp(src).metadata();
  const w = Math.min(meta.width, Math.round(meta.height * 0.8));
  const h = Math.round(w / 0.8);
  await sharp(src)
    .resize(w, h, { fit: "cover", position })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(dest);
  console.log("✓", path.relative(ROOT, dest), `${w}x${h}`);
}

/** Re-encode a landscape master at native resolution (no crop, no upscale). */
async function toLandscape(src, dest) {
  const meta = await sharp(src).metadata();
  await sharp(src)
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(dest);
  console.log("✓", path.relative(ROOT, dest), `${meta.width}x${meta.height}`);
}

/* ------------------------------------------------------------------ */
/* 1. Best-seller cards — 4:5 product photography                      */
/* ------------------------------------------------------------------ */
await toPortrait45(path.join(NAV, "card", "sofa.jpg"), path.join(ROOT, "public/images/cards/sofa.jpg"));
await toPortrait45(path.join(NAV, "card", "table.jpg"), path.join(ROOT, "public/images/cards/table.jpg"));
// Landscape source — keep the chair itself in frame, not the floor.
await toPortrait45(path.join(NAV, "card", "chair.jpg"), path.join(ROOT, "public/images/cards/chair.jpg"), { position: "attention" });
await toPortrait45(path.join(NAV, "card", "closet.jpg"), path.join(ROOT, "public/images/cards/closet.jpg"));

/* ------------------------------------------------------------------ */
/* 2. Material library — 4:5 texture photography                       */
/* ------------------------------------------------------------------ */
await toPortrait45(path.join(NAV, "materila", "wood.jpg"), path.join(ROOT, "public/images/materials/wood.jpg"));
await toPortrait45(path.join(NAV, "materila", "leather.jpg"), path.join(ROOT, "public/images/materials/leather.jpg"));
// fabric/joinery photos were replaced after launch; the -2 filename
// cache-busts every next/image optimizer + browser copy of the old asset.
await toPortrait45(path.join(NAV, "materila", "joinery.jpg"), path.join(ROOT, "public/images/materials/joinery-2.jpg"));
await toPortrait45(path.join(NAV, "materila", "fabric.jpg"), path.join(ROOT, "public/images/materials/fabric-2.jpg"));

/* ------------------------------------------------------------------ */
/* 3. Bespoke configurator photography — real per-finish closet shots  */
/*    plus single real wardrobe / sofa photos (finish applies to the   */
/*    closet only, matching the section's behavior).                   */
/* ------------------------------------------------------------------ */
await toLandscape(path.join(NAV, "bespoke", "closet-oak.jpg"), path.join(ROOT, "public/images/bespoke/closet-oak.jpg"));
await toLandscape(path.join(NAV, "bespoke", "closet-bronze.jpg"), path.join(ROOT, "public/images/bespoke/closet-bronze.jpg"));
await toLandscape(path.join(NAV, "bespoke", "closet-graphite.jpg"), path.join(ROOT, "public/images/bespoke/closet-graphite.jpg"));
await toLandscape(path.join(NAV, "bespoke", "wardrobe.jpg"), path.join(ROOT, "public/images/bespoke/wardrobe.jpg"));
await toLandscape(path.join(NAV, "bespoke", "sofa.jpg"), path.join(ROOT, "public/images/bespoke/sofa.jpg"));

/* ------------------------------------------------------------------ */
/* 4. Shop-the-look rooms — real scene photography                     */
/* ------------------------------------------------------------------ */
await toLandscape(path.join(NAV, "room", "milan.jpg"), path.join(ROOT, "public/images/rooms/milan.jpg"));
await toLandscape(path.join(NAV, "room", "copenhagen.jpg"), path.join(ROOT, "public/images/rooms/copenhagen.jpg"));
await toLandscape(path.join(NAV, "room", "lakecomo.jpg"), path.join(ROOT, "public/images/rooms/lakecomo.jpg"));

console.log("\nAll homepage assets prepared from the new photography.");
