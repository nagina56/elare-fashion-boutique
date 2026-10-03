"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/products";
import type { Product } from "@/lib/types";
import { useCart } from "@/store/cart-context";
import { useUI } from "@/store/ui-context";
import { useWishlist } from "@/store/wishlist-context";
import { Button, cx } from "@/components/ui/Button";
import { RulerIcon, CheckIcon, HeartIcon, BagIcon, MinusIcon, PlusIcon } from "@/components/ui/icons";

type ProductOptionsProps = {
  product: Product;
  /** `full` shows fabric + accordions (product page); `compact` is the quick view. */
  layout?: "full" | "compact";
  onAdded?: () => void;
};

export function ProductOptions({ product, layout = "full", onAdded }: ProductOptionsProps) {
  const firstAvailable = product.sizes.find((size) => size.available) ?? product.sizes[0];

  const [size, setSize] = useState<string | null>(firstAvailable.available ? firstAvailable.label : null);
  const [color, setColor] = useState(product.colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [status, setStatus] = useState<"idle" | "added">("idle");

  const { addToBag } = useCart();
  const { has, toggle } = useWishlist();
  const { openSizeGuide, openBag } = useUI();

  const wished = has(product.slug);
  const colorOption = product.colors.find((c) => c.name === color) ?? product.colors[0];

  function handleAdd() {
    if (!size) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToBag(product, { size, color, quantity });
    setStatus("added");
    window.setTimeout(() => setStatus("idle"), 1500);
    if (layout === "compact") {
      window.setTimeout(() => {
        onAdded?.();
        openBag();
      }, 500);
    } else {
      window.setTimeout(openBag, 700);
    }
  }

  return (
    <div className={cx("flex flex-col", layout === "full" ? "gap-7" : "gap-5")}>
      {/* Colour */}
      <fieldset>
        <legend className="eyebrow mb-3 flex w-full items-baseline justify-between text-plum-900">
          <span>Colour</span>
          <span className="font-display text-sm normal-case italic tracking-normal text-espresso-400">
            {colorOption.name}
          </span>
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {product.colors.map((option) => {
            const isActive = option.name === color;
            return (
              <button
                key={option.name}
                type="button"
                onClick={() => setColor(option.name)}
                aria-pressed={isActive}
                title={option.name}
                className={cx(
                  "group relative h-9 w-9 rounded-full border transition-all duration-400",
                  isActive
                    ? "border-plum-800 ring-1 ring-plum-800 ring-offset-2 ring-offset-ivory-50"
                    : "border-espresso-900/15 hover:border-plum-600",
                )}
                style={{ backgroundColor: option.hex }}
              >
                <span className="sr-only">{option.name}</span>
                {isActive ? (
                  <CheckIcon className="absolute inset-0 m-auto h-3.5 w-3.5 text-ivory-100 mix-blend-difference" />
                ) : null}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Size */}
      <fieldset>
        <legend className="eyebrow mb-3 flex w-full items-baseline justify-between text-plum-900">
          <span>Size</span>
          <button
            type="button"
            onClick={() => openSizeGuide(product)}
            className="inline-flex items-center gap-1.5 normal-case tracking-normal text-espresso-500 underline-offset-4 transition-colors hover:text-plum-700 hover:underline"
          >
            <RulerIcon className="h-3.5 w-3.5" />
            Size guide
          </button>
        </legend>

        <div className="flex flex-wrap gap-2">
          {product.sizes.map((option) => {
            const isActive = option.label === size;
            return (
              <button
                key={option.label}
                type="button"
                disabled={!option.available}
                onClick={() => {
                  setSize(option.label);
                  setSizeError(false);
                }}
                aria-pressed={isActive}
                className={cx(
                  "relative min-w-[3.25rem] border px-3.5 py-2.5 text-xs uppercase tracking-[0.12em] transition-all duration-400",
                  !option.available && "cursor-not-allowed border-ivory-300 text-espresso-300",
                  option.available && !isActive &&
                    "border-ivory-400 text-espresso-600 hover:border-plum-600 hover:text-plum-800",
                  isActive && "border-plum-800 bg-plum-800 text-ivory-100",
                  sizeError && !isActive && "border-rose-500",
                )}
              >
                {option.label}
                {!option.available ? (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 grid place-content-center"
                  >
                    <span className="h-px w-full rotate-[-24deg] bg-ivory-400" />
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        <p
          className={cx(
            "mt-2.5 text-xs transition-opacity duration-300",
            sizeError ? "text-rose-600 opacity-100" : "opacity-0",
          )}
          aria-live="polite"
        >
          Please select a size to continue.
        </p>
      </fieldset>

      {/* Quantity + actions */}
      <div className={cx(layout === "full" ? "space-y-4" : "space-y-3")}>
        <div className="flex items-center justify-between gap-4">
          <span className="eyebrow text-plum-900">Quantity</span>
          <div className="flex items-center border border-ivory-400">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="grid h-11 w-11 place-content-center text-plum-800 transition-colors hover:bg-ivory-200 disabled:opacity-30"
            >
              <MinusIcon className="h-3 w-3" />
            </button>
            <span aria-live="polite" className="w-9 text-center text-sm tabular-nums text-plum-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              disabled={quantity >= 10}
              aria-label="Increase quantity"
              className="grid h-11 w-11 place-content-center text-plum-800 transition-colors hover:bg-ivory-200 disabled:opacity-30"
            >
              <PlusIcon className="h-3 w-3" />
            </button>
          </div>
        </div>

        <div className={cx("flex gap-2.5", layout === "full" && "sm:gap-3")}>
          <Button
            variant="solid"
            size="lg"
            fullWidth
            onClick={handleAdd}
            className={cx(status === "added" && "!border-champagne-300 !bg-champagne-300 !text-plum-900")}
          >
            {status === "added" ? (
              <>
                <CheckIcon className="h-4 w-4" />
                Added to Bag
              </>
            ) : (
              <>
                <BagIcon className="h-4 w-4" />
                Add to Bag · {formatPrice(product.price * quantity)}
              </>
            )}
          </Button>

          <button
            type="button"
            onClick={() => toggle(product, { color, size: size ?? firstAvailable.label })}
            aria-pressed={wished}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className={cx(
              "grid h-14 w-14 shrink-0 place-content-center border transition-all duration-400",
              wished
                ? "border-plum-800 bg-plum-800 text-champagne-200"
                : "border-ivory-400 text-plum-800 hover:border-plum-800",
            )}
          >
            <HeartIcon className="h-[1.15rem] w-[1.15rem]" filled={wished} />
          </button>
        </div>
      </div>

      {/* Remaining stock note */}
      <p className="flex items-center gap-2 text-xs text-espresso-400">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-plum-500" aria-hidden="true" />
        In stock — ships from our Lahore atelier within 48 hours.
      </p>
    </div>
  );
}
