"use client";

/**
 * FeaturedCategories — asymmetric 4-card bento grid routing to
 * Sofas, Tables, Chairs, and Closets/Storage. Scale-on-hover imagery
 * (real photography) with high-contrast typography and dark overlays.
 */
import Link from "next/link";
import { FEATURED_CATEGORIES } from "@/lib/data";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function FeaturedCategories() {
  return (
    <section id="categories" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="01 — The Catalog"
            title="Furniture for every room, engineered as one system."
            lede="Five collections, one design language. Every piece shares the same tolerances, materials and finish codes — so rooms compose, not clash."
          />
        </div>

        {/* Bento grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[repeat(2,minmax(220px,1fr))]">
          {FEATURED_CATEGORIES.map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 0.08} className={cat.span}>
              <Link
                href={`/${cat.slug}`}
                className="group block h-full w-full overflow-hidden rounded-2xl border border-white/10 transition-colors duration-500 hover:border-white/25"
              >
                <div className={`relative h-full w-full ${cat.aspect}`}>
                  <SmartImage
                    src={cat.image}
                    alt={cat.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />

                  {/* Dark overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Copy */}
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-7">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-white/45">
                        {cat.count}
                      </p>
                      <h3 className="mt-2 text-xl font-light tracking-tight text-white md:text-2xl">
                        {cat.title}
                      </h3>
                      <p className="mt-1 text-xs text-white/50 md:text-sm">
                        {cat.tagline}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/70 transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:text-black"
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
