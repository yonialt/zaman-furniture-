"use client";

/**
 * NavDropdown — the glassmorphic hover mega-dropdown for one nav item.
 * Pure hover/focus driven (desktop); the parent tracks which menu is open.
 */
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { NavItem } from "@/lib/types";
import { EASE_LUXE } from "@/lib/motion";

interface NavDropdownProps {
  item: NavItem;
  open: boolean;
}

export default function NavDropdown({ item, open }: NavDropdownProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.99 }}
          transition={{ duration: 0.35, ease: EASE_LUXE }}
          className="absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-3"
        >
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0c10]/85 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
            <div className="grid grid-cols-[1.2fr_1fr]">
              {/* Link column */}
              <div className="flex flex-col gap-1 p-6">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="group rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-white/5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white/85 group-hover:text-white">
                        {child.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="translate-x-0 text-white/0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/60"
                      >
                        →
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs leading-relaxed text-white/40">
                      {child.description}
                    </p>
                  </Link>
                ))}
              </div>

              {/* Featured panel */}
              {item.featured && <FeaturedCard featured={item.featured} />}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * FeaturedCard — the entire right-hand panel is one clickable link.
 * The product image sits on top at a fixed 4:3 ratio so every dropdown
 * renders the identical panel shape; a dark gradient shows through while
 * the image loads and remains as the fallback if it fails.
 */
function FeaturedCard({
  featured,
}: {
  featured: NonNullable<NavItem["featured"]>;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <Link
      href={featured.href}
      className="group relative m-3 ml-0 flex flex-col justify-end overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(120%_120%_at_50%_0%,#232830_0%,#0c0e12_60%,#07080b_100%)]"
    >
      {/* Product image — fixed 4:3, cover-cropped, top corners match the card */}
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-t-xl bg-[linear-gradient(to_bottom,#1d2129_0%,#0b0d11_65%,#060709_100%)]">
        {!imageFailed && featured.image && (
          <Image
            src={featured.image}
            alt=""
            fill
            sizes="240px"
            className="object-cover"
            onError={() => setImageFailed(true)}
          />
        )}
      </div>

      {/* Film-grain / texture overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.14'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mt-auto p-5">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          Featured
        </span>
        <p className="mt-2 text-base font-medium text-white">
          {featured.title}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-white/50">
          {featured.caption}
        </p>
        <span className="mt-4 inline-flex w-fit items-center gap-1.5 border-b border-white/25 pb-0.5 text-xs tracking-wide text-white/80 transition-colors group-hover:border-white group-hover:text-white">
          Discover
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
