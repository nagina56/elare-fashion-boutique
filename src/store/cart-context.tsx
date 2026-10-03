"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { products, formatPrice } from "@/lib/products";
import { siteConfig } from "@/lib/site";
import type { Product } from "@/lib/types";

export type CartLine = {
  /** Stable key: product slug + size + colour. */
  key: string;
  slug: string;
  name: string;
  subtitle: string;
  image: Product["images"][number];
  imageAlt: string;
  price: number;
  compareAtPrice?: number;
  size: string;
  color: string;
  quantity: number;
};

type CartState = {
  lines: CartLine[];
  /** Slug of the most recently added product, used for add-to-bag feedback. */
  lastAddedKey: string | null;
};

type CartAction =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; line: Omit<CartLine, "key" | "quantity">; quantity: number }
  | { type: "setQuantity"; key: string; quantity: number }
  | { type: "remove"; key: string }
  | { type: "clear" }
  | { type: "clearLastAdded" };

const STORAGE_KEY = "elare.bag.v1";

const initialState: CartState = { lines: [], lastAddedKey: null };

function lineKey(slug: string, size: string, color: string) {
  return `${slug}__${size}__${color}`;
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return { lines: action.lines, lastAddedKey: null };

    case "add": {
      const key = lineKey(action.line.slug, action.line.size, action.line.color);
      const existing = state.lines.find((line) => line.key === key);
      const lines = existing
        ? state.lines.map((line) =>
            line.key === key
              ? { ...line, quantity: Math.min(line.quantity + action.quantity, 10) }
              : line,
          )
        : [...state.lines, { ...action.line, key, quantity: action.quantity }];
      return { lines, lastAddedKey: key };
    }

    case "setQuantity":
      return {
        ...state,
        lines: state.lines.flatMap((line) =>
          line.key === action.key
            ? action.quantity <= 0
              ? []
              : [{ ...line, quantity: Math.min(action.quantity, 10) }]
            : [line],
        ),
      };

    case "remove":
      return { ...state, lines: state.lines.filter((line) => line.key !== action.key) };

    case "clear":
      return { lines: [], lastAddedKey: null };

    case "clearLastAdded":
      return state.lastAddedKey === null ? state : { ...state, lastAddedKey: null };
  }
}

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  savings: number;
  shipping: number;
  total: number;
  freeShippingRemaining: number;
  hasFreeShipping: boolean;
  isReady: boolean;
  lastAddedKey: string | null;
  addToBag: (product: Product, options: { size: string; color: string; quantity?: number }) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeLine: (key: string) => void;
  clearBag: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

/** Drops any persisted lines whose product no longer exists in the catalogue. */
function sanitise(lines: CartLine[]): CartLine[] {
  return lines.filter((line) => products.some((product) => product.slug === line.slug));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isReady, setIsReady] = useState(false);

  // Restore on mount so server and client markup always match on first paint.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) {
          dispatch({ type: "hydrate", lines: sanitise(parsed) });
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
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      /* Storage may be unavailable in private browsing — the bag still works. */
    }
  }, [state.lines, isReady]);

  const addToBag = useCallback<CartContextValue["addToBag"]>(
    (product, { size, color, quantity = 1 }) => {
      dispatch({
        type: "add",
        line: {
          slug: product.slug,
          name: product.name,
          subtitle: product.subtitle,
          image: product.images[0],
          imageAlt: product.imageAlts[0],
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          size,
          color,
        },
        quantity,
      });
    },
    [],
  );

  const value = useMemo<CartContextValue>(() => {
    const count = state.lines.reduce((sum, line) => sum + line.quantity, 0);
    const subtotal = state.lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
    const savings = state.lines.reduce(
      (sum, line) => sum + (line.compareAtPrice ? (line.compareAtPrice - line.price) * line.quantity : 0),
      0,
    );
    const hasFreeShipping = subtotal >= siteConfig.freeShippingThreshold || subtotal === 0;
    const shipping = hasFreeShipping ? 0 : siteConfig.shippingFlatRate;

    return {
      lines: state.lines,
      count,
      subtotal,
      savings,
      shipping,
      total: subtotal + shipping,
      freeShippingRemaining: Math.max(siteConfig.freeShippingThreshold - subtotal, 0),
      hasFreeShipping,
      isReady,
      lastAddedKey: state.lastAddedKey,
      addToBag,
      setQuantity: (key, quantity) => dispatch({ type: "setQuantity", key, quantity }),
      removeLine: (key) => dispatch({ type: "remove", key }),
      clearBag: () => dispatch({ type: "clear" }),
    };
  }, [state, addToBag, isReady]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}

export { formatPrice };
