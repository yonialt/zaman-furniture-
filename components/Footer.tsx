"use client";

/**
 * Footer — organized category columns, newsletter signup, and the
 * resource strip (warranty, dimension guides, assembly manuals).
 */
import { useState } from "react";
import Link from "next/link";
import { FOOTER_COLUMNS } from "@/lib/data";
import { EASE_LUXE } from "@/lib/motion";
import { motion } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    // Hook up to your newsletter API here.
    setSubscribed(true);
  };

  return (
    <footer className="relative border-t border-white/8 bg-[#040405]">
      {/* Newsletter */}
      <div className="border-b border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-14 md:flex-row md:items-center md:px-10">
          <div className="max-w-md">
            <h3 className="text-2xl font-light tracking-tight text-white">
              The Atelier Letter
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/45">
              New collections, material stories and private showroom events —
              once a month, nothing more.
            </p>
          </div>
          {subscribed ? (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE_LUXE }}
              className="text-sm text-white/70"
            >
              Welcome to the atelier — check your inbox.
            </motion.p>
          ) : (
            <form onSubmit={onSubmit} className="flex w-full max-w-md items-center gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full rounded-full border border-white/15 bg-transparent px-5 py-3 text-sm text-white placeholder:text-white/30 transition-colors focus:border-white/50 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/85"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/40">
                {col.title}
              </h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Brand + assurance strip */}
          <div className="col-span-2 lg:col-span-1">
            <p className="text-lg font-semibold tracking-[0.18em] text-white">AEROFORM</p>
            <p className="mt-3 text-sm leading-relaxed text-white/45">
              Furniture engineered as architecture. Designed in Milan,
              crafted in our ateliers.
            </p>
            <ul className="mt-5 flex flex-col gap-2 text-xs text-white/40">
              <li>25-year structural warranty</li>
              <li>White-glove delivery worldwide</li>
              <li>100-night home trial</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Resource strip */}
      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 px-6 py-6 md:px-10">
          {[
            { label: "Dimension Guides", href: "/resources/dimensions" },
            { label: "Assembly Manuals", href: "/resources/manuals" },
            { label: "Warranty Registration", href: "/resources/warranty" },
            { label: "Care & Maintenance", href: "/services/care" },
            { label: "Contact", href: "/contact" },
          ].map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="text-xs uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white"
            >
              {r.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Legal */}
      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-6 text-xs text-white/30 md:flex-row md:items-center md:px-10">
          <p>© {new Date().getFullYear()} AEROFORM. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/legal/privacy" className="transition-colors hover:text-white/70">Privacy</Link>
            <Link href="/legal/terms" className="transition-colors hover:text-white/70">Terms</Link>
            <Link href="/legal/cookies" className="transition-colors hover:text-white/70">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
