"use client";

/**
 * ShopTheLook — full-bleed inspiration scenes with interactive hotspot
 * pins. Each pin reveals a shoppable tag; scenes are paged via a minimal
 * progress control. The pin area's background is the room photograph,
 * crossfading when the scene changes; a dark gradient keeps pins readable.
 */
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { LOOK_SCENES } from "@/lib/data";
import { EASE_LUXE } from "@/lib/motion";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";

export default function ShopTheLook() {
  const [activeScene, setActiveScene] = useState(0);
  const [activePin, setActivePin] = useState<number | null>(null);

  const scene = LOOK_SCENES[activeScene];

  return (
    <section id="shop-the-look" className="relative">
      <div className="mx-auto max-w-7xl px-6 pt-24 md:px-10 md:pt-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal from="left" className="flex flex-col gap-4">
            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/40">
              05 — Inspiration
            </span>
            <h2 className="max-w-2xl text-balance text-4xl font-light leading-[1.05] tracking-tight text-white md:text-5xl">
              Shop the look, room by room.
            </h2>
            <p className="max-w-xl text-pretty text-sm leading-relaxed text-white/50 md:text-base">
              Tap a pin to see the piece — sofas, tables, chairs and closets,
              styled together in real architecture.
            </p>
          </Reveal>

          {/* Scene switcher */}
          <Reveal delay={0.15} className="flex shrink-0 gap-2">
            {LOOK_SCENES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveScene(i);
                  setActivePin(null);
                }}
                aria-pressed={activeScene === i}
                className={`rounded-full border px-4 py-2 text-xs tracking-wide transition-all duration-300 ${
                  activeScene === i
                    ? "border-white bg-white text-black"
                    : "border-white/15 text-white/55 hover:border-white/45 hover:text-white"
                }`}
              >
                {s.location}
              </button>
            ))}
          </Reveal>
        </div>
      </div>

      {/* Full-bleed scene */}
      <div className="mt-12">
        <div className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
          {/* Room photography — crossfades on scene change */}
          <AnimatePresence initial={false}>
            <motion.div
              key={scene.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: EASE_LUXE }}
            >
              <SmartImage
                src={scene.image}
                alt={scene.imageAlt}
                fill
                sizes="100vw"
              />
              {/* Dark gradient so pins and labels stay readable */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/35" />
            </motion.div>
          </AnimatePresence>

          {/* Scene caption */}
          <div className="pointer-events-none absolute left-6 top-6 z-10 md:left-10 md:top-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/60 [text-shadow:0_1px_8px_rgba(0,0,0,0.9)]">
              {scene.location}
            </p>
            <h3 className="mt-1 text-xl font-light tracking-tight text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.9)] md:text-2xl">
              {scene.name}
            </h3>
          </div>

          {/* Hotspots */}
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {scene.hotspots.map((spot, i) => {
                const isActive = activePin === i;
                return (
                  <div
                    key={`${spot.product}-${i}`}
                    className="absolute"
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  >
                    <motion.button
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease: EASE_LUXE }}
                      onClick={() => setActivePin(isActive ? null : i)}
                      aria-label={`${spot.product} — ${spot.price}`}
                      aria-expanded={isActive}
                      className="relative flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                    >
                      {/* Pulse ring */}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-0 rounded-full border transition-colors duration-300 ${
                          isActive ? "border-white/70" : "border-white/40"
                        }`}
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 animate-ping rounded-full border border-white/25 [animation-duration:2.5s]"
                      />
                      <span
                        className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                          isActive ? "bg-white" : "bg-white/70"
                        }`}
                      />
                    </motion.button>

                    {/* Shoppable tag */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.97 }}
                          transition={{ duration: 0.3, ease: EASE_LUXE }}
                          className="absolute left-0 top-6 z-20 w-60 -translate-x-1/4"
                        >
                          <div className="overflow-hidden rounded-xl border border-white/12 bg-[#0a0c10]/90 shadow-2xl backdrop-blur-2xl">
                            <div className="flex items-center justify-between gap-3 px-4 py-3.5">
                              <div>
                                <p className="text-[9px] uppercase tracking-[0.25em] text-white/40">
                                  {spot.categoryLabel}
                                </p>
                                <p className="mt-1 text-sm font-medium text-white">
                                  {spot.product}
                                </p>
                                <p className="mt-0.5 text-xs text-white/60">{spot.price}</p>
                              </div>
                              <Link
                                href={spot.href}
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105"
                                aria-label={`View ${spot.product}`}
                              >
                                →
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Edge vignette to seat the full-bleed panel */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050505] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050505] to-transparent" />
        </div>
      </div>
    </section>
  );
}
