"use client";

/**
 * ConfiguratorPromo — interactive split-screen promo for the custom
 * configurator. Left: editorial copy + option pickers (product, finish,
 * dimensions). Right: live "preview" showing the real photograph for the
 * selected product + finish with a 200ms crossfade, a dimension line for
 * the selected width, and a live "From $" estimate.
 *
 * Every product×finish photograph is mounted and preloaded, stacked
 * absolutely inside a fixed-size box; selection just toggles opacity, so
 * switching never swaps a src and nothing shifts or crops. The dimension
 * line grows with the chosen width (a diagram, not an image filter) so
 * the width choice is visible without faking zoom.
 *
 * Selection is click/tap + keyboard (aria-pressed buttons). Changing the
 * product resets finish and width to that product's own options, so an
 * invalid combination can never be shown.
 */
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BESPOKE_PRODUCTS } from "@/data/bespoke";
import { formatPrice } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";

/** Shared button styling for the option pills. */
const PILL_BASE =
  "rounded-full border px-4 py-2 text-xs tracking-wide transition-all duration-300";
const PILL_ACTIVE = "border-white bg-white text-black";
const PILL_IDLE =
  "border-white/15 text-white/70 hover:border-white/45 hover:text-white";

export default function ConfiguratorPromo() {
  const [productId, setProductId] = useState(BESPOKE_PRODUCTS[0].id);
  const [finishId, setFinishId] = useState(BESPOKE_PRODUCTS[0].finishes[0].id);
  const [width, setWidth] = useState<number>(BESPOKE_PRODUCTS[0].widths[1]);

  const product = useMemo(
    () =>
      BESPOKE_PRODUCTS.find((p) => p.id === productId) ?? BESPOKE_PRODUCTS[0],
    [productId]
  );
  const finish = useMemo(
    () => product.finishes.find((f) => f.id === finishId) ?? product.finishes[0],
    [product, finishId]
  );
  // Keep the width valid for the current product.
  const activeWidth = product.widths.includes(width)
    ? width
    : product.widths[1];
  const estimate = product.basePrice + activeWidth * product.pricePerCm;

  // Every product × finish pair, mounted and preloaded once.
  const previewPairs = useMemo(
    () =>
      BESPOKE_PRODUCTS.flatMap((p) =>
        p.finishes.map((f) => ({ product: p, finish: f }))
      ),
    []
  );

  // Dimension rule length tracks the selected width (55%–85% of the
  // preview column) so the choice reads visually.
  const minW = product.widths[0];
  const maxW = product.widths[product.widths.length - 1];
  const linePct =
    55 + ((activeWidth - minW) / Math.max(1, maxW - minW)) * 30;

  const selectProduct = (id: string) => {
    const next = BESPOKE_PRODUCTS.find((p) => p.id === id);
    if (!next) return;
    setProductId(id);
    // Reset to the new product's own options — never keep an invalid finish.
    setFinishId(next.finishes[0].id);
    setWidth(next.widths[1]);
  };

  return (
    <section
      id="configurator"
      className="relative overflow-hidden border-y border-white/8 bg-[#07080a] py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-2 lg:gap-16">
        {/* Copy + controls */}
        <Reveal from="left">
          <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/40">
            03 — Bespoke
          </span>
          <h2 className="mt-4 text-balance text-4xl font-light leading-[1.05] tracking-tight text-white md:text-5xl">
            Made to your millimetre.
          </h2>
          <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-white/50 md:text-base">
            Compose walk-in closets, wardrobes and modular sofas to your exact
            architecture. Choose the product, the finish and the dimensions —
            our atelier produces and installs to the millimetre.
          </p>

          {/* Option groups */}
          <div className="mt-10 flex flex-col gap-7">
            {/* Product */}
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                Product
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {BESPOKE_PRODUCTS.map((p) => {
                  const active = p.id === product.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => selectProduct(p.id)}
                      aria-pressed={active}
                      className={`${PILL_BASE} ${active ? PILL_ACTIVE : PILL_IDLE}`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Finish — options come from the selected product */}
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                Finish
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.finishes.map((f) => {
                  const active = f.id === finish.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFinishId(f.id)}
                      aria-pressed={active}
                      className={`${PILL_BASE} ${active ? PILL_ACTIVE : PILL_IDLE}`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dimensions */}
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                Dimensions
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.widths.map((w) => {
                  const active = w === activeWidth;
                  return (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setWidth(w)}
                      aria-pressed={active}
                      className={`${PILL_BASE} ${active ? PILL_ACTIVE : PILL_IDLE}`}
                    >
                      W {w} cm
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Live estimate from the placeholder price model */}
          <p className="mt-8 text-sm text-white/55">
            From{" "}
            <span className="text-base font-light text-white">
              {formatPrice(estimate)}
            </span>
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6">
            <Link
              href="/collections/configurator"
              className="rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-colors hover:bg-white/85"
            >
              Launch Full Configurator
            </Link>
            <span className="text-xs text-white/40">
              Free atelier consultation included
            </span>
          </div>
        </Reveal>

        {/* Live preview — fixed-size box; all product×finish photos are
            stacked and preloaded, selection toggles opacity (200ms). */}
        <Reveal from="right" className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(120%_120%_at_50%_0%,#171a20_0%,#0a0c10_55%,#050608_100%)] lg:aspect-auto lg:h-[560px]">
            {previewPairs.map(({ product: p, finish: f }) => {
              const active = p.id === product.id && f.id === finish.id;
              return (
                <motion.div
                  key={`${p.id}-${f.id}`}
                  className="absolute inset-0 flex items-center justify-center p-6 pt-12 md:p-10 md:pt-14"
                  initial={false}
                  animate={{ opacity: active ? 1 : 0 }}
                  transition={{ duration: 0.2, ease: "linear" }}
                  aria-hidden={!active}
                >
                  {/* Photo keeps its natural ratio inside the box:
                      object-contain, never cropped. */}
                  <div
                    className="relative w-full"
                    style={{ aspectRatio: `${p.previewRatio}` }}
                  >
                    <Image
                      src={f.image}
                      alt={active ? `${p.label} in ${f.label}` : ""}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      preload
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              );
            })}

            {/* Dimension rule — length tracks the selected width. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-14 flex flex-col items-center gap-1.5">
              <div
                className="relative h-px bg-white/35 transition-all duration-300"
                style={{ width: `${linePct}%`, maxWidth: "24rem" }}
              >
                <span className="absolute left-0 top-1/2 h-2 w-px -translate-y-1/2 bg-white/35" />
                <span className="absolute right-0 top-1/2 h-2 w-px -translate-y-1/2 bg-white/35" />
              </div>
              <span className="rounded-full border border-white/12 bg-black/50 px-3 py-1 text-[10px] tracking-wide text-white/70 backdrop-blur-md">
                W {activeWidth} cm
              </span>
            </div>

            {/* HUD chips */}
            <div className="absolute left-5 top-5 flex flex-col gap-2">
              <span className="rounded-full border border-white/12 bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-md">
                Live Preview
              </span>
              <span className="rounded-full border border-white/12 bg-black/50 px-3 py-1 text-[10px] tracking-wide text-white/60 backdrop-blur-md">
                {finish.label}
              </span>
            </div>
            <div className="absolute bottom-5 right-5 rounded-full border border-white/12 bg-black/50 px-3 py-1 text-[10px] tracking-wide text-white/60 backdrop-blur-md">
              W {activeWidth} cm · {finish.label} · Made to measure
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
