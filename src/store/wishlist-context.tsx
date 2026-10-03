"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products } from "@/lib/products";
import type { Product } from "@/lib/types";

export type WishlistEntry = {
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  compareAtPrice?: number;
  image: Product["images"][number];
  imageAlt: string;
  color: string;
  size: string;
};

type WishlistContextValue = {
  items: WishlistEntry[];
  count: number;
  isReady: boolean;
  has: (slug: string) => boolean;
  toggle: (product: Product, options?: { color?: string; size?: string }) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "elare.wishlist.v1";

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistEntry[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as WishlistEntry[];
        if (Array.isArray(parsed)) {
          setItems(
            parsed.filter((entry) => products.some((product) => product.slug === entry.slug)),
          );
        }
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* Storage may be unavailable — the wishlist still works for the session. */
    }
  }, [items, isReady]);

  const toggle = useCallback<WishlistContextValue["toggle"]>((product, options) => {
    const entry: WishlistEntry = {
      slug: product.slug,
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      image: product.images[0],
      imageAlt: product.imageAlts[0],
      color: options?.color ?? product.colors[0].name,
      size: options?.size ?? product.sizes.find((s) => s.available)?.label ?? product.sizes[0].label,
    };

    setItems((current) =>
      current.some((item) => item.slug === product.slug)
        ? current.filter((item) => item.slug !== product.slug)
        : [...current, entry],
    );
  }, []);

  const value = useMemo<WishlistContextValue>(
    () => ({
      items,
      count: items.length,
      isReady,
      has: (slug) => items.some((item) => item.slug === slug),
      toggle,
      remove: (slug) => setItems((current) => current.filter((item) => item.slug !== slug)),
      clear: () => setItems([]),
    }),
    [items, isReady, toggle],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return context;
}
