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
import type { Product } from "@/lib/types";

export type Overlay =
  | { kind: "none" }
  | { kind: "bag" }
  | { kind: "wishlist" }
  | { kind: "search" }
  | { kind: "menu" }
  | { kind: "quick-view"; product: Product }
  | { kind: "size-guide"; product?: Product };

type UIContextValue = {
  overlay: Overlay;
  isOpen: boolean;
  openBag: () => void;
  openWishlist: () => void;
  openSearch: () => void;
  openMenu: () => void;
  openQuickView: (product: Product) => void;
  openSizeGuide: (product?: Product) => void;
  close: () => void;
};

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [overlay, setOverlay] = useState<Overlay>({ kind: "none" });

  const close = useCallback(() => setOverlay({ kind: "none" }), []);
  const open = useCallback((next: Overlay) => setOverlay(next), []);

  // Escape closes, and the page behind an overlay must not scroll.
  useEffect(() => {
    if (overlay.kind === "none") return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = "";
    };
  }, [overlay, close]);

  // Route changes should never leave an overlay stranded behind the new page.
  useEffect(() => {
    const onPopState = () => setOverlay({ kind: "none" });
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const value = useMemo<UIContextValue>(
    () => ({
      overlay,
      isOpen: overlay.kind !== "none",
      openBag: () => open({ kind: "bag" }),
      openWishlist: () => open({ kind: "wishlist" }),
      openSearch: () => open({ kind: "search" }),
      openMenu: () => open({ kind: "menu" }),
      openQuickView: (product: Product) => open({ kind: "quick-view", product }),
      openSizeGuide: (product?: Product) => open({ kind: "size-guide", product }),
      close,
    }),
    [overlay, open, close],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used inside <UIProvider>");
  return context;
}
