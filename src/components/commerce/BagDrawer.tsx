"use client";

import Image from "next/image";
import Link from "next/link";
import { imageSrc } from "@/lib/images";
import { formatPrice } from "@/lib/products";
import { siteConfig } from "@/lib/site";
import { useCart } from "@/store/cart-context";
import { Drawer } from "@/components/ui/Drawer";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, BagIcon, CloseIcon, MinusIcon, PlusIcon, TruckIcon } from "@/components/ui/icons";

type BagDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function BagDrawer({ open, onClose }: BagDrawerProps) {
  const { lines, count, subtotal, savings, shipping, total, freeShippingRemaining, hasFreeShipping, setQuantity, removeLine, clearBag } =
    useCart();

  const progress = Math.min(
    100,
    Math.round((subtotal / siteConfig.freeShippingThreshold) * 100),
  );

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Your Bag"
      eyebrow={count > 0 ? `${count} ${count === 1 ? "piece" : "pieces"}` : "Empty"}
      footer={
        lines.length > 0 ? (
          <div className="flex flex-col gap-4">
            <dl className="space-y-2 text-sm">
              <div className="flex items-baseline justify-between">
                <dt className="text-espresso-500">Subtotal</dt>
                <dd className="font-medium text-plum-900">{formatPrice(subtotal)}</dd>
              </div>
              {savings > 0 ? (
                <div className="flex items-baseline justify-between">
                  <dt className="text-espresso-500">You save</dt>
                  <dd className="font-medium text-rose-600">−{formatPrice(savings)}</dd>
                </div>
              ) : null}
              <div className="flex items-baseline justify-between">
                <dt className="text-espresso-500">Estimated shipping</dt>
                <dd className="font-medium text-plum-900">
                  {shipping === 0 ? "Complimentary" : formatPrice(shipping)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-ivory-300 pt-2.5">
                <dt className="eyebrow text-plum-900">Total</dt>
                <dd className="font-display text-2xl text-plum-900">{formatPrice(total)}</dd>
              </div>
            </dl>

            <ButtonLink href="/shop" variant="solid" size="md" fullWidth onClick={onClose}>
              Continue Shopping
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1" />
            </ButtonLink>

            <button
              type="button"
              onClick={clearBag}
              className="mx-auto text-[0.6875rem] uppercase tracking-[0.16em] text-espresso-400 underline-offset-4 transition-colors hover:text-rose-600 hover:underline"
            >
              Empty the bag
            </button>
          </div>
        ) : null
      }
    >
      {lines.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center py-10 text-center">
          <span className="grid h-20 w-20 place-content-center rounded-full border border-champagne-300/70 text-plum-700">
            <BagIcon className="h-7 w-7" />
          </span>
          <h3 className="mt-6 text-2xl">Your bag is empty</h3>
          <p className="mx-auto mt-2.5 max-w-xs text-sm leading-relaxed text-espresso-400">
            Nothing here yet. Begin with NOOR — it is where most of our customers start.
          </p>
          <ButtonLink href="/shop" variant="outline" size="md" className="mt-7" onClick={onClose}>
            Explore the pieces
          </ButtonLink>
          <p className="mt-6 text-xs text-espresso-300">
            Complimentary delivery on orders above {formatPrice(siteConfig.freeShippingThreshold)}
          </p>
        </div>
      ) : (
        <>
          {/* Free shipping meter */}
          <div className="mb-6 rounded-sm border border-ivory-300 bg-ivory-100 p-4">
            <p className="flex items-start gap-2 text-xs leading-relaxed text-espresso-500">
              <TruckIcon className="mt-px h-4 w-4 shrink-0 text-plum-700" />
              {hasFreeShipping ? (
                <span>
                  Your order qualifies for <strong className="font-medium text-plum-900">complimentary delivery</strong>.
                </span>
              ) : (
                <span>
                  Add <strong className="font-medium text-plum-900">{formatPrice(freeShippingRemaining)}</strong> more
                  for complimentary delivery.
                </span>
              )}
            </p>
            <div className="mt-3 h-[3px] w-full overflow-hidden bg-ivory-300">
              <div
                className="h-full bg-champagne-500 transition-[width] duration-700 [transition-timing-function:var(--ease-elegant)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <ul className="flex flex-col divide-y divide-ivory-300">
            {lines.map((line) => (
              <li key={line.key} className="flex gap-4 py-5 first:pt-0">
                <Link
                  href={`/product/${line.slug}`}
                  onClick={onClose}
                  className="relative h-28 w-20 shrink-0 overflow-hidden bg-ivory-200"
                >
                  <Image
                    src={imageSrc(line.image, 300)}
                    alt={line.imageAlt}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-base leading-tight">
                        <Link
                          href={`/product/${line.slug}`}
                          onClick={onClose}
                          className="transition-colors hover:text-plum-600"
                        >
                          {line.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-xs text-espresso-400">
                        {line.color} · Size {line.size}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeLine(line.key)}
                      aria-label={`Remove ${line.name} from bag`}
                      className="-mr-1 -mt-1 grid h-8 w-8 shrink-0 place-content-center text-espresso-400 transition-colors hover:text-rose-600"
                    >
                      <CloseIcon className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                    <div className="flex items-center border border-ivory-400">
                      <button
                        type="button"
                        onClick={() => setQuantity(line.key, line.quantity - 1)}
                        aria-label={`Decrease quantity of ${line.name}`}
                        className="grid h-9 w-9 place-content-center text-plum-800 transition-colors hover:bg-ivory-200"
                      >
                        <MinusIcon className="h-3 w-3" />
                      </button>
                      <span
                        aria-live="polite"
                        className="w-8 text-center text-sm tabular-nums text-plum-900"
                      >
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(line.key, line.quantity + 1)}
                        disabled={line.quantity >= 10}
                        aria-label={`Increase quantity of ${line.name}`}
                        className="grid h-9 w-9 place-content-center text-plum-800 transition-colors hover:bg-ivory-200 disabled:opacity-35"
                      >
                        <PlusIcon className="h-3 w-3" />
                      </button>
                    </div>

                    <p className="text-sm font-medium text-plum-900">
                      {formatPrice(line.price * line.quantity)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-xs leading-relaxed text-espresso-400">
            Duties and taxes, where applicable, are calculated at checkout. Need help choosing a size?{" "}
            <Link
              href="/contact"
              onClick={onClose}
              className="text-plum-800 underline underline-offset-4 hover:text-rose-600"
            >
              Ask our styling team
            </Link>
            .
          </p>
        </>
      )}
    </Drawer>
  );
}
