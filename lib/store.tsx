"use client";

/**
 * Minimal global store for cart & wishlist interactions.
 * Swap the bodies of addToCart/toggleWishlist for real API mutations —
 * the UI consumes it identically either way.
 */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "./types";

interface CartLine {
  product: Product;
  material: string;
  qty: number;
}

interface StoreValue {
  cart: CartLine[];
  wishlist: string[];
  cartCount: number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: Product, material: string) => void;
  toggleWishlist: (productId: string) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);

  const addToCart = useCallback((product: Product, material: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (l) => l.product.id === product.id && l.material === material
      );
      if (existing) {
        return prev.map((l) =>
          l === existing ? { ...l, qty: l.qty + 1 } : l
        );
      }
      return [...prev, { product, material, qty: 1 }];
    });
    setCartOpen(true);
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const cartCount = useMemo(
    () => cart.reduce((sum, line) => sum + line.qty, 0),
    [cart]
  );

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      cartCount,
      isCartOpen,
      setCartOpen,
      addToCart,
      toggleWishlist,
    }),
    [cart, wishlist, cartCount, isCartOpen, addToCart, toggleWishlist]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within <StoreProvider>");
  return ctx;
}
