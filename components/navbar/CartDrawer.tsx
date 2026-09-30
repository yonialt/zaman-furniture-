"use client";

/**
 * CartDrawer — right-hand slide-over fed by the global store.
 * Lists cart lines, allows quantity edits/removal, and shows the subtotal.
 */
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { EASE_LUXE } from "@/lib/motion";

export default function CartDrawer() {
  const { cart, isCartOpen, setCartOpen, cartCount } = useStore();

  const subtotal = cart.reduce(
    (sum, line) => sum + line.product.price * line.qty,
    0
  );

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setCartOpen(false)}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#08090c]/95 backdrop-blur-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: EASE_LUXE }}
            role="dialog"
            aria-label="Shopping bag"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <h2 className="text-sm font-medium uppercase tracking-[0.25em] text-white">
                  Your Bag
                </h2>
                <p className="mt-0.5 text-xs text-white/40">
                  {cartCount} {cartCount === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="rounded-full border border-white/15 p-2 text-white/60 transition-colors hover:border-white/40 hover:text-white"
                aria-label="Close bag"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 1l12 12M13 1L1 13" />
                </svg>
              </button>
            </div>

            {/* Lines */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <p className="text-sm text-white/50">Your bag is empty.</p>
                  <Link
                    href="/collections"
                    onClick={() => setCartOpen(false)}
                    className="border-b border-white/25 pb-0.5 text-xs tracking-wide text-white/70 transition-colors hover:border-white hover:text-white"
                  >
                    Explore the collections
                  </Link>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  {cart.map((line, i) => (
                    <li
                      key={`${line.product.id}-${line.material}-${i}`}
                      className="flex gap-4 border-b border-white/5 pb-4"
                    >
                      <div className="h-20 w-20 shrink-0 rounded-lg border border-white/10 bg-[radial-gradient(120%_120%_at_50%_0%,#1a1d24,#0b0d12)]" />
                      <div className="flex flex-1 flex-col">
                        <p className="text-sm font-medium text-white">
                          {line.product.name}
                        </p>
                        <p className="mt-0.5 text-xs text-white/45">
                          {line.material}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <span className="text-xs text-white/60">
                            Qty {line.qty}
                          </span>
                          <span className="text-sm text-white/90">
                            {formatPrice(line.product.price * line.qty)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-white/10 px-6 py-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.25em] text-white/50">
                    Subtotal
                  </span>
                  <span className="text-lg font-light text-white">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-white/35">
                  White-glove delivery & installation included.
                </p>
                <button className="mt-4 w-full rounded-full bg-white py-3 text-sm font-medium text-black transition-colors hover:bg-white/85">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
