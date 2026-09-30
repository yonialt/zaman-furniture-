"use client";

/**
 * Craftsmanship — editorial material-library grid:
 * kiln-dried hardwoods, Italian leather, precision joinery,
 * sustainable fabrics. Ends with the physical Sample Box CTA.
 */
import Link from "next/link";
import { MATERIAL_STORIES } from "@/lib/data";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Craftsmanship() {
  return (
    <section id="craftsmanship" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="04 — Craftsmanship"
          title="A material library built to outlive trends."
          lede="Every AEROFORM piece begins in the material archive: 200+ woods, leathers, stones and textiles, each tested beyond residential standards."
        />

        {/* Editorial grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MATERIAL_STORIES.map((story, i) => (
            <Reveal key={story.title} delay={i * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0b0e]/60 transition-colors duration-500 hover:border-white/25">
                {/* Visual header — 4:5 photo with subtle zoom on hover */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <SmartImage
                    src={story.image}
                    alt={story.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    zoomOnGroupHover
                  />
                  <span className="absolute left-4 top-4 z-10 text-[10px] uppercase tracking-[0.25em] text-white/60 [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">
                    {story.subtitle}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-light tracking-tight text-white">
                    {story.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/50">
                    {story.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Physical Sample Box CTA */}
        <Reveal delay={0.1} className="mt-6">
          <div className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(100%_160%_at_0%_0%,#1c1710_0%,#0a0906_55%,#060504_100%)] p-8 md:flex-row md:items-center md:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.16'/%3E%3C/svg%3E\")",
              }}
            />
            <div className="relative max-w-xl">
              <p className="text-[10px] uppercase tracking-[0.3em] text-amber-200/60">
                The Sample Box
              </p>
              <h3 className="mt-3 text-2xl font-light tracking-tight text-white md:text-3xl">
                Order your Free Swatch Kit.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                Eight curated materials from the current archive — wood,
                leather, fabric and stone — delivered in a linen-wrapped box.
                Complimentary for trade members.
              </p>
            </div>
            <Link
              href="/swatches"
              className="relative shrink-0 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black transition-colors hover:bg-white/85"
            >
              Order Free Swatch Kit
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
