"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/store/cart-context";
import { UIProvider } from "@/store/ui-context";
import { WishlistProvider } from "@/store/wishlist-context";

/** Single client boundary for the three storefront stores. */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <UIProvider>
      <CartProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartProvider>
    </UIProvider>
  );
}
