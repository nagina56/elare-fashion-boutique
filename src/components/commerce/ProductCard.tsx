"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { imageSrc } from "@/lib/images";
import type { Product } from "@/lib/types";
import { useCart } from "@/store/cart-context";
import { useUI } from "@/store/ui-context";
import { useWishlist } from "@/store/wishlist-context";
import { Price, Rating } from "@/components/ui/Price";
import { BagIcon, CheckIcon, EyeIcon, HeartIcon } from "@/components/ui/icons";
import { cx } from "@/components/ui/Button";

type ProductCardProps = {
  product: Product;
  /** `editorial` uses a taller ratio for lookbook-style rails. */
  variant?: "grid" | "editorial";
  priority?: boolean;
  index?: number;
  className?: string;
};

const badgeTone: Record<NonNullable<Product["badge"]>, string> = {
  New: "bg-plum-800 text-ivory-100",
  Signature: "bg-champagne-300 text-plum-900",
  Limited: "bg-espresso-800 text-champagne-200",
  Archive: "bg-ivory-200 text-espresso-600",
};

export function ProductCard({
  product,
  variant = "grid",
  priority = false,
  index = 0,
  className,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const { addToBag } = useCart();
  const { has, toggle } = useWishlist();
  const { openQuickView, openBag } = useUI();

  const wished = has(product.slug);
  const secondary = product.images[1] ?? product.images[0];
  const onSale = typeof product.compareAtPrice === "number" && product.compareAtPrice > product.price;

  const defaultSize = product.sizes.find((size) => size.available)?.label ?? product.sizes[0].label;

  function handleAdd() {
    addToBag(product, { size: defaultSize, color: product.colors[0].name });
    setJustAdded(true);
    window.setTimeout(() => {
      setJustAdded(false);
      openBag();
    }, 650);
  }

  return (
    <article
      className={cx("group/card relative flex flex-col", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      <div
        className={cx(
          "relative overflow-hidden bg-ivory-200",
          variant === "editorial" ? "aspect-[3/4]" : "aspect-[4/5]",
        )}
      >
        <Link
          href={`/product/${product.slug}`}
          className="absolute inset-0 z-10"
          aria-label={`View ${product.name}`}
          tabIndex={-1}
        />

        {/* Primary image */}
        <Image
          src={imageSrc(product.images[0], 900)}
          alt={product.imageAlts[0]}
          fill
          priority={priority}
          sizes={
            variant === "editorial"
              ? "(min-width: 1280px) 24vw, (min-width: 768px) 32vw, 78vw"
              : "(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 46vw"
          }
          className={cx(
            "object-cover transition-[opacity,transform] duration-[900ms] [transition-timing-function:var(--ease-elegant)]",
            hovered ? "scale-[1.06] opacity-0" : "scale-100 opacity-100",
          )}
        />

        {/* Alternate image revealed on hover */}
        <Image
          src={imageSrc(secondary, 900)}
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 46vw"
          className={cx(
            "object-cover transition-[opacity,transform] duration-[900ms] [transition-timing-function:var(--ease-elegant)]",
            hovered ? "scale-[1.06] opacity-100" : "scale-100 opacity-0",
          )}
        />

        {/* Champagne frame */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 z-10 border border-transparent transition-colors duration-500 group-hover/card:border-champagne-300/45"
        />

        {/* Badges */}
        <div className="pointer-events-none absolute left-3 top-3 z-20 flex flex-col items-start gap-1.5">
          {product.badge ? (
            <span
              className={cx(
                "px-2.5 py-1 text-[0.5625rem] font-medium uppercase tracking-[0.18em]",
                badgeTone[product.badge],
              )}
            >
              {product.badge}
            </span>
          ) : null}
          {onSale ? (
            <span className="bg-rose-500 px-2.5 py-1 text-[0.5625rem] font-medium uppercase tracking-[0.18em] text-ivory-50">
              Sale
            </span>
          ) : null}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => toggle(product)}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className={cx(
            "absolute right-3 top-3 z-20 grid h-10 w-10 place-content-center rounded-full backdrop-blur-sm transition-all duration-400",
            wished
              ? "bg-plum-800 text-champagne-200"
              : "bg-ivory-50/85 text-plum-800 hover:bg-ivory-50",
          )}
        >
          <HeartIcon className="h-[1.15rem] w-[1.15rem]" filled={wished} />
        </button>

        {/* Quick view / add — pointer devices only, always keyboard reachable */}
        <div
          className={cx(
            "absolute inset-x-2.5 bottom-2.5 z-20 hidden translate-y-3 items-center gap-1.5 opacity-0 transition-all duration-500 [transition-timing-function:var(--ease-elegant)] sm:flex",
            "group-hover/card:translate-y-0 group-hover/card:opacity-100 group-focus-within/card:translate-y-0 group-focus-within/card:opacity-100",
          )}
        >
          <button
            type="button"
            onClick={handleAdd}
            className={cx(
              "flex h-11 flex-1 items-center justify-center gap-2 text-[0.625rem] font-medium uppercase tracking-[0.16em] transition-colors duration-400",
              justAdded
                ? "bg-champagne-300 text-plum-900"
                : "bg-ivory-50/95 text-plum-900 hover:bg-plum-800 hover:text-ivory-100",
            )}
          >
            {justAdded ? (
              <>
                <CheckIcon className="h-3.5 w-3.5" />
                Added
              </>
            ) : (
              <>
                <BagIcon className="h-3.5 w-3.5" />
                Add to Bag
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => openQuickView(product)}
            aria-label={`Quick view ${product.name}`}
            className="grid h-11 w-11 shrink-0 place-content-center bg-ivory-50/95 text-plum-900 transition-colors duration-400 hover:bg-plum-800 hover:text-ivory-100"
          >
            <EyeIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-start justify-between gap-3">
          <p className="eyebrow text-rose-600">{product.category}</p>
          <Rating value={product.rating} className="shrink-0" />
        </div>

        <h3 className="mt-2 text-lg leading-snug">
          <Link href={`/product/${product.slug}`} className="transition-colors hover:text-plum-600">
            {product.name}
          </Link>
        </h3>

        <p className="mt-1 font-display text-sm italic leading-relaxed text-espresso-400">
          {product.subtitle}
        </p>

        <Price
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          size="sm"
          className="mt-3 sm:hidden"
        />

        {/* Colours */}
        <div className="mt-3 hidden items-center gap-1.5 sm:flex">
          {product.colors.map((color) => (
            <span
              key={color.name}
              title={color.name}
              style={{ backgroundColor: color.hex }}
              className="h-3.5 w-3.5 rounded-full border border-espresso-900/12"
            />
          ))}
          <span className="ml-1 text-[0.6875rem] text-espresso-400">
            {product.colors.length} colours
          </span>
        </div>

        <div className="mt-3 hidden sm:block">
          <Price price={product.price} compareAtPrice={product.compareAtPrice} size="sm" />
        </div>

        {/* Mobile action row */}
        <div className="mt-4 flex items-center gap-2 sm:hidden">
          <button
            type="button"
            onClick={handleAdd}
            className="flex h-11 flex-1 items-center justify-center gap-1.5 border border-plum-800/30 text-[0.625rem] font-medium uppercase tracking-[0.14em] text-plum-900"
          >
            {justAdded ? (
              <>
                <CheckIcon className="h-3.5 w-3.5" />
                Added
              </>
            ) : (
              <>
                <BagIcon className="h-3.5 w-3.5" />
                Add
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => openQuickView(product)}
            aria-label={`Quick view ${product.name}`}
            className="grid h-11 w-11 shrink-0 place-content-center border border-plum-800/30 text-plum-900"
          >
            <EyeIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
