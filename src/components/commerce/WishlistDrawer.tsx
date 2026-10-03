"use client";

import Image from "next/image";
import Link from "next/link";
import { imageSrc } from "@/lib/images";
import { formatPrice, getProduct } from "@/lib/products";
import { useCart } from "@/store/cart-context";
import { useUI } from "@/store/ui-context";
import { useWishlist } from "@/store/wishlist-context";
import { Drawer } from "@/components/ui/Drawer";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, CloseIcon, HeartIcon } from "@/components/ui/icons";

type WishlistDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function WishlistDrawer({ open, onClose }: WishlistDrawerProps) {
  const { items, count, remove, clear } = useWishlist();
  const { addToBag } = useCart();
  const { openBag } = useUI();

  function moveToBag(slug: string, size: string, color: string) {
    const product = getProduct(slug);
    if (!product) return;
    addToBag(product, { size, color });
    onClose();
    window.setTimeout(openBag, 260);
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Wishlist"
      eyebrow={count > 0 ? `${count} ${count === 1 ? "saved piece" : "saved pieces"}` : "Empty"}
      side="left"
      footer={
        items.length > 0 ? (
          <div className="flex flex-col gap-3">
            <ButtonLink
              href="/shop"
              variant="solid"
              size="md"
              fullWidth
              onClick={onClose}
            >
              Explore the Collection
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1" />
            </ButtonLink>
            <button
              type="button"
              onClick={clear}
              className="mx-auto text-[0.6875rem] uppercase tracking-[0.16em] text-espresso-400 underline-offset-4 transition-colors hover:text-rose-600 hover:underline"
            >
              Clear wishlist
            </button>
          </div>
        ) : null
      }
    >
      {items.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center py-10 text-center">
          <span className="grid h-20 w-20 place-content-center rounded-full border border-champagne-300/70 text-plum-700">
            <HeartIcon className="h-7 w-7" />
          </span>
          <h3 className="mt-6 text-2xl">Nothing saved yet</h3>
          <p className="mx-auto mt-2.5 max-w-xs text-sm leading-relaxed text-espresso-400">
            Tap the heart on any piece to keep it here while you decide. Your wishlist stays on this
            device.
          </p>
          <ButtonLink href="/shop" variant="outline" size="md" className="mt-7" onClick={onClose}>
            Browse New Arrivals
          </ButtonLink>
        </div>
      ) : (
        <ul className="flex flex-col divide-y divide-ivory-300">
          {items.map((item) => (
            <li key={item.slug} className="flex gap-4 py-5 first:pt-0">
              <Link
                href={`/product/${item.slug}`}
                onClick={onClose}
                className="relative h-32 w-24 shrink-0 overflow-hidden bg-ivory-200"
              >
                <Image
                  src={imageSrc(item.image, 300)}
                  alt={item.imageAlt}
                  fill
                  sizes="96px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base leading-tight">
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={onClose}
                      className="transition-colors hover:text-plum-600"
                    >
                      {item.name}
                    </Link>
                  </h3>
                  <button
                    type="button"
                    onClick={() => remove(item.slug)}
                    aria-label={`Remove ${item.name} from wishlist`}
                    className="-mr-1 -mt-1 grid h-8 w-8 shrink-0 place-content-center text-espresso-400 transition-colors hover:text-rose-600"
                  >
                    <CloseIcon className="h-4 w-4" />
                  </button>
                </div>

                <p className="mt-1 text-xs text-espresso-400">
                  {item.color} · Size {item.size}
                </p>

                <div className="mt-auto pt-3">
                  <p className="text-sm font-medium text-plum-900">
                    {formatPrice(item.price)}
                    {item.compareAtPrice ? (
                      <span className="ml-2 text-espresso-300 line-through">
                        {formatPrice(item.compareAtPrice)}
                      </span>
                    ) : null}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2.5"
                    onClick={() => moveToBag(item.slug, item.size, item.color)}
                  >
                    Move to Bag
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  );
}
