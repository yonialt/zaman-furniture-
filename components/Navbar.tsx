"use client";

/**
 * Navbar — glassmorphic floating header for the multi-category catalog.
 * - Hover mega-dropdowns per category (desktop)
 * - Search overlay, Free Swatches CTA, cart badge + drawer
 * - Full mobile menu with accordion categories
 */
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/lib/data";
import { useStore } from "@/lib/store";
import { EASE_LUXE } from "@/lib/motion";
import CartDrawer from "./navbar/CartDrawer";
import NavDropdown from "./navbar/NavDropdown";

const SEARCH_INDEX = NAV_ITEMS.flatMap((item) =>
  item.children.map((child) => ({
    label: `${child.label}`,
    group: item.label,
    href: child.href,
  }))
);

/**
 * FeaturedNavImage — hidden, preloaded copy of a dropdown featured image.
 * Warms the browser cache (and the /_next/image pipeline) on page load so
 * the image is already available when the mega-menu opens — no pop-in.
 */
function FeaturedNavImage({ src }: { src: string }) {
  return (
    <div className="sr-only" aria-hidden="true">
      <Image src={src} alt="" width={800} height={600} preload sizes="240px" />
    </div>
  );
}

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileCategory, setMobileCategory] = useState<string | null>(null);
  const { cartCount, setCartOpen } = useStore();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Lock body scroll while the mobile menu or search is open
  useEffect(() => {
    const shouldLock = isMobileOpen || isSearchOpen;
    document.body.style.overflow = shouldLock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen, isSearchOpen]);

  // Close everything on route change is unnecessary for a one-pager,
  // but Escape should always dismiss overlays.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setIsSearchOpen(false);
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = query.trim()
    ? SEARCH_INDEX.filter((entry) =>
        `${entry.group} ${entry.label}`.toLowerCase().includes(query.toLowerCase())
      )
    : SEARCH_INDEX;

  return (
    <>
      <motion.nav
        className={`fixed inset-x-0 top-0 z-50 transition-[background,border,padding] duration-500 ${
          isScrolled
            ? "border-b border-white/5 bg-[#050505]/75 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: EASE_LUXE }}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6 md:h-20 md:px-10">
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 text-lg font-semibold tracking-[0.18em] text-white transition-opacity hover:opacity-70"
          >
            AEROFORM
          </Link>

          {/* Category links + dropdowns */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
              >
                <button
                  className={`px-3.5 py-2 text-[13px] tracking-wide transition-colors duration-300 ${
                    openMenu === item.label ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                  aria-expanded={openMenu === item.label}
                >
                  {item.label}
                </button>
                {/* Hover bridge so the pointer can travel to the panel */}
                <div className="absolute inset-x-0 top-full h-3" aria-hidden="true" />
                <NavDropdown item={item} open={openMenu === item.label} />
              </div>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex shrink-0 items-center gap-1.5 md:gap-3">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="rounded-full p-2.5 text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Search"
            >
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="9" cy="9" r="6.5" />
                <path d="M14 14l4.5 4.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* Free Swatches CTA */}
            <Link
              href="/swatches"
              className="hidden rounded-full border border-white/15 px-4 py-2 text-xs tracking-wide text-white/80 transition-all duration-300 hover:border-white/50 hover:text-white md:block"
            >
              Free Swatches
            </Link>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative rounded-full p-2.5 text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              aria-label={`Open bag${cartCount ? ` (${cartCount} items)` : ""}`}
            >
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 6h12l-1 11H5L4 6Z" strokeLinejoin="round" />
                <path d="M7 6V5a3 3 0 0 1 6 0v1" strokeLinecap="round" />
              </svg>
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-semibold text-black"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
              {/* Keep drawer mounted next to the trigger for context */}
              <span className="sr-only">Shopping bag</span>
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="rounded-full p-2.5 text-white/70 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
              aria-label="Open menu"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M2 5h16M2 10h16M2 15h10" />
              </svg>
            </button>
          </div>
        </div>

        {/* Preload featured dropdown images off-screen so they're cached when the menu opens */}
        <div className="hidden">
          {NAV_ITEMS.map(
            (item) =>
              item.featured?.image && (
                <FeaturedNavImage key={item.label} src={item.featured.image} />
              )
          )}
        </div>
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              className="absolute inset-x-0 top-0 border-b border-white/10 bg-[#050505]/95 backdrop-blur-2xl"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: EASE_LUXE }}
            >
              <div className="mx-auto max-w-3xl px-6 py-6">
                <div className="flex items-center gap-4 border-b border-white/15 pb-3 focus-within:border-white/50">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/40">
                    <circle cx="9" cy="9" r="6.5" />
                    <path d="M14 14l4.5 4.5" strokeLinecap="round" />
                  </svg>
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search sofas, tables, closets…"
                    className="w-full bg-transparent text-lg font-light text-white placeholder:text-white/30 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setQuery("");
                    }}
                    className="text-xs uppercase tracking-widest text-white/40 transition-colors hover:text-white"
                  >
                    Esc
                  </button>
                </div>
                {query.trim() && (
                  <ul className="mt-4 max-h-72 overflow-y-auto">
                    {filtered.length === 0 && (
                      <li className="px-2 py-3 text-sm text-white/40">
                        No results for “{query}”.
                      </li>
                    )}
                    {filtered.slice(0, 8).map((entry) => (
                      <li key={entry.href}>
                        <Link
                          href={entry.href}
                          onClick={() => {
                            setIsSearchOpen(false);
                            setQuery("");
                          }}
                          className="flex items-center justify-between rounded-lg px-2 py-2.5 transition-colors hover:bg-white/5"
                        >
                          <span className="text-sm text-white/85">{entry.label}</span>
                          <span className="text-xs text-white/35">{entry.group}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-[55] flex flex-col bg-[#050505]/97 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex h-16 items-center justify-between px-6">
              <span className="text-lg font-semibold tracking-[0.18em] text-white">AEROFORM</span>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="rounded-full border border-white/15 p-2 text-white/60 hover:text-white"
                aria-label="Close menu"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 1l12 12M13 1L1 13" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-10">
              <div className="flex flex-col">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label} className="border-b border-white/8">
                    <button
                      onClick={() =>
                        setMobileCategory((prev) =>
                          prev === item.label ? null : item.label
                        )
                      }
                      className="flex w-full items-center justify-between py-4 text-left"
                      aria-expanded={mobileCategory === item.label}
                    >
                      <span className="text-base font-light text-white">{item.label}</span>
                      <motion.span
                        animate={{ rotate: mobileCategory === item.label ? 45 : 0 }}
                        className="text-lg text-white/40"
                        aria-hidden="true"
                      >
                        +
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileCategory === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE_LUXE }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1 pb-4">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setIsMobileOpen(false)}
                                className="rounded-lg px-2 py-2 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                <Link
                  href="/swatches"
                  onClick={() => setIsMobileOpen(false)}
                  className="mt-6 block rounded-full border border-white/20 py-3 text-center text-sm text-white/85 transition-colors hover:border-white/60 hover:text-white"
                >
                  Order Free Swatches
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart drawer */}
      <CartDrawer />
    </>
  );
}
