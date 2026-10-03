"use client";

import { BagDrawer } from "@/components/commerce/BagDrawer";
import { QuickViewModal } from "@/components/commerce/QuickViewModal";
import { SearchOverlay } from "@/components/commerce/SearchOverlay";
import { SizeGuideModal } from "@/components/commerce/SizeGuideModal";
import { WishlistDrawer } from "@/components/commerce/WishlistDrawer";
import { useUI } from "@/store/ui-context";

/**
 * Mounts every global overlay once, at the root, so any page can open them.
 * Renders `null` when nothing is open, keeping the DOM light.
 */
export function OverlayHost() {
  const { overlay, close } = useUI();

  if (overlay.kind === "none") return null;

  return (
    <>
      {overlay.kind === "bag" ? <BagDrawer open onClose={close} /> : null}
      {overlay.kind === "wishlist" ? <WishlistDrawer open onClose={close} /> : null}
      {overlay.kind === "search" ? <SearchOverlay open onClose={close} /> : null}
      {overlay.kind === "quick-view" ? (
        <QuickViewModal product={overlay.product} open onClose={close} />
      ) : null}
      {overlay.kind === "size-guide" ? (
        <SizeGuideModal open onClose={close} productName={overlay.product?.name} />
      ) : null}
    </>
  );
}
