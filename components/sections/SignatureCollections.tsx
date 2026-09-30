"use client";

/**
 * SignatureCollections — best-seller showcase cards with:
 * - product photography filling the top of the card at 4:5
 * - colour swatches that swap the card photo + label (click/tap + keyboard,
 *   never hover, so it works on touch)
 * - whole-card link with a 1.04 hover zoom; wishlist heart + hover "Quick View"
 * - "Quick View" modal with full details, opening on the selected colour
 */
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { PRODUCTS } from "@/data/products";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { EASE_LUXE } from "@/lib/motion";
import type { Product } from "@/lib/types";
import ColorStackImage from "@/components/ui/ColorStackImage";
import MaterialSwatches from "@/components/ui/MaterialSwatches";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function SignatureCollections() {
  const { toggleWishlist, wishlist } = useStore();
  // One selected colour id per product, defaulting to the first colour.
  const [selectedColorIds, setSelectedColorIds] = useState<
    Record<string, string>
  >(() => Object.fromEntries(PRODUCTS.map((p) => [p.id, p.colors[0].id])));
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [quickViewColorId, setQuickViewColorId] = useState<string>("");

  const selectedColor = (product: Product) => {
    const id = selectedColorIds[product.id] ?? product.colors[0].id;
    return (
      product.colors.find((c) => c.id === id) ?? product.colors[0]
    );
  };

  const openQuickView = (product: Product) => {
    // Start Quick View on the colour currently selected on the card.
    setQuickViewColorId(selectedColorIds[product.id] ?? product.colors[0].id);
    setQuickView(product);
  };

  return (
    <section id="best-sellers" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="02 — Signature Collections"
            title="Best sellers, chosen by architects."
            lede="The pieces specified most often by our trade partners — each available in the full material library."
          />
          <Reveal delay={0.15}>
            <a
              href="/collections"
              className="hidden shrink-0 items-center gap-2 border-b border-white/25 pb-1 text-sm tracking-wide text-white/70 transition-colors hover:border-white hover:text-white md:inline-flex"
            >
              View all 175 pieces <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>

        {/* Product grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product, i) => {
            const wished = wishlist.includes(product.id);
            const color = selectedColor(product);
            return (
              <Reveal key={product.id} delay={i * 0.08}>
                {/* Whole card is the link — children use stopPropagation so the
                    heart / swatches / quick view don't navigate. */}
                <a
                  href={`/products/${product.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0b0e]/60 transition-colors duration-500 hover:border-white/25"
                  aria-label={`${product.name} — ${formatPrice(product.price)}`}
                >
                  {/* Visual — 4:5 photo, crossfades between colour variants */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <ColorStackImage
                      colors={product.colors}
                      selectedId={color.id}
                      alt={`${product.name} in ${color.label}`}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      preload={i < 2}
                      zoomOnGroupHover
                    />
                    {product.badge && (
                      <span className="absolute left-4 top-4 z-10 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
                        {product.badge}
                      </span>
                    )}
                    {/* Quick view trigger — revealed on card hover */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openQuickView(product);
                      }}
                      className="absolute inset-x-4 bottom-4 z-10 translate-y-2 rounded-full border border-white/20 bg-black/55 py-2.5 text-xs tracking-wide text-white opacity-0 backdrop-blur-md transition-all duration-400 hover:border-white/50 focus-visible:translate-y-0 focus-visible:opacity-100 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      Quick View
                    </button>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                          {product.categoryLabel}
                        </p>
                        <h3 className="mt-1.5 text-base font-light tracking-tight text-white">
                          {product.name}
                        </h3>
                      </div>
                      {/* Wishlist */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                        aria-pressed={wished}
                        className={`mt-0.5 shrink-0 p-1 transition-all duration-300 ${
                          wished ? "scale-110 text-amber-300/90" : "text-white/35 hover:text-white"
                        }`}
                      >
                        <svg width="17" height="17" viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
                          <path d="M12 21s-7.5-4.7-10-9.3C.5 8 2.6 4 6.5 4c2.2 0 3.9 1.2 5.5 3.4C13.6 5.2 15.3 4 17.5 4 21.4 4 23.5 8 22 11.7 19.5 16.3 12 21 12 21Z" />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-sm text-white/90">
                        {formatPrice(product.price)}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-xs text-white/35 line-through">
                          {formatPrice(product.compareAtPrice)}
                        </span>
                      )}
                    </div>

                    {/* Colour swatches — click swaps the photo + label */}
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <MaterialSwatches
                        colors={product.colors}
                        selected={color.id}
                        onSelect={(id) =>
                          setSelectedColorIds((prev) => ({ ...prev, [product.id]: id }))
                        }
                      />
                    </div>
                    <p className="mt-2 text-[11px] text-white/40">
                      {color.label}
                    </p>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Quick View modal */}
      <QuickViewModal
        product={quickView}
        initialColorId={quickViewColorId}
        onClose={() => setQuickView(null)}
      />
    </section>
  );
}

/* ------------------------------------------------------------------ */

function QuickViewModal({
  product,
  initialColorId,
  onClose,
}: {
  product: Product | null;
  initialColorId: string;
  onClose: () => void;
}) {  const { addToCart } = useStore();
  // Tracks the colour picked inside the open modal. Keyed per product so a
  // previous product's pick (e.g. "cognac" on both sofa and chair) can't
  // leak into the next open modal.
  const [picks, setPicks] = useState<Record<string, string>>({});

  // Default the modal to the colour selected on the card when it opens,
  // falling back to the product's first colour.
  const effectiveColorId = product
    ? picks[product.id] ??
      (product.colors.some((c) => c.id === initialColorId)
        ? initialColorId
        : product.colors[0].id)
    : "";
  const color = useMemo(
    () => product?.colors.find((c) => c.id === effectiveColorId),
    [product, effectiveColorId]
  );

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Quick view — ${product.name}`}
            className="relative z-10 grid max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/12 bg-[#0a0b0e]/95 md:grid-cols-2"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE_LUXE }}
          >
            <div className="relative min-h-[280px] md:min-h-full">
              <ColorStackImage
                colors={product.colors}
                selectedId={effectiveColorId}
                alt={`${product.name} in ${color?.label ?? ""}`}
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>

            <div className="flex flex-col p-7 md:p-9">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                    {product.categoryLabel}
                  </p>
                  <h3 className="mt-2 text-2xl font-light tracking-tight text-white">
                    {product.name}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full border border-white/15 p-2 text-white/60 transition-colors hover:border-white/40 hover:text-white"
                  aria-label="Close quick view"
                >
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 1l12 12M13 1L1 13" />
                  </svg>
                </button>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-white/55">
                {product.description}
              </p>

              <div className="mt-5 space-y-1.5 border-t border-white/10 pt-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/40">Price</span>
                  <span className="text-white">{formatPrice(product.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Dimensions</span>
                  <span className="text-white/75">{product.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Colour</span>
                  <span className="text-white/75">{color?.label}</span>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                  Colour — {color?.label}
                </p>
                <div className="mt-3">
                  <MaterialSwatches
                    size="md"
                    showLabels
                    colors={product.colors}
                    selected={effectiveColorId}
                    onSelect={(id) =>
                      setPicks((prev) => ({ ...prev, [product.id]: id }))
                    }
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart(product, color?.label ?? product.colors[0].label);
                  onClose();
                }}
                className="mt-7 w-full rounded-full bg-white py-3.5 text-sm font-medium text-black transition-colors hover:bg-white/85"
              >
                Add to Bag — {formatPrice(product.price)}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
