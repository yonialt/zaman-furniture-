"use client";

/**
 * TradeProgram — B2B card for interior designers & architects:
 * trade discounts, dedicated support, commercial custom builds.
 */
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

const BENEFITS = [
  {
    title: "Tiered Trade Discounts",
    detail: "Up to 25% off list pricing, scaled to your annual volume.",
  },
  {
    title: "Dedicated Account Studio",
    detail: "A named specialist for specs, quotes and lead times within 24h.",
  },
  {
    title: "Commercial Custom Builds",
    detail: "Contract-grade engineering, NFPA compliance and bulk MOQs.",
  },
  {
    title: "3D Blocks & CAD Library",
    detail: "Revit, SketchUp and 2D/3D DWG files for every product.",
  },
];

export default function TradeProgram() {
  return (
    <section id="trade" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10">
            {/* Ambient backdrop */}
            <div className="absolute inset-0 bg-[radial-gradient(90%_140%_at_85%_10%,#151a22_0%,#0a0c10_50%,#060708_100%)]" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.16'/%3E%3C/svg%3E\")",
              }}
            />

            <div className="relative grid grid-cols-1 gap-10 p-8 md:p-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
              {/* Pitch */}
              <div className="flex flex-col justify-center">
                <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/40">
                  06 — Trade Program
                </span>
                <h2 className="mt-4 text-balance text-3xl font-light leading-[1.08] tracking-tight text-white md:text-4xl">
                  For interior designers & architects.
                </h2>
                <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-white/50 md:text-base">
                  Specify AEROFORM with confidence: dedicated trade pricing,
                  contract-grade engineering and a studio that speaks your
                  language — from FF&E schedules to white-glove installation.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/trade/apply"
                    className="rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-colors hover:bg-white/85"
                  >
                    Apply for Trade Access
                  </Link>
                  <Link
                    href="/trade/benefits"
                    className="border-b border-white/25 pb-0.5 text-sm text-white/70 transition-colors hover:border-white hover:text-white"
                  >
                    See all benefits
                  </Link>
                </div>
              </div>

              {/* Benefits */}
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {BENEFITS.map((b, i) => (
                  <Reveal key={b.title} delay={0.08 * i} className="h-full">
                    <li className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-colors duration-500 hover:border-white/25">
                      <span className="text-[10px] tracking-[0.2em] text-white/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-2 text-sm font-medium text-white">{b.title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-white/45">
                        {b.detail}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
