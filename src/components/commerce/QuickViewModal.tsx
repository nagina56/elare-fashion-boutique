"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { imageSrc } from "@/lib/images";
import type { Product } from "@/lib/types";
import { Modal } from "@/components/ui/Modal";
import { ProductOptions } from "./ProductOptions";
import { Price, Rating } from "@/components/ui/Price";
import { ArrowRightIcon } from "@/components/ui/icons";

type QuickViewModalProps = {
  product: Product | null;
  open: boolean;
  onClose: () => void;
};

export function QuickViewModal({ product, open, onClose }: QuickViewModalProps) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
  }, [product?.slug]);

  if (!product) return null;

  return (
    <Modal open={open} onClose={onClose} title={`Quick view — ${product.name}`} size="wide">
      <div className="grid max-h-[92dvh] overflow-y-auto sm:max-h-[88dvh] md:grid-cols-2">
        {/* Gallery */}
        <div className="relative bg-ivory-200">
          <div className="relative aspect-[4/5] w-full">
            <Image
              key={activeImage}
              src={imageSrc(product.images[activeImage], 1000)}
              alt={product.imageAlts[activeImage]}
              fill
              sizes="(min-width: 768px) 45vw, 92vw"
              className="object-cover motion-safe:animate-[fadeIn_0.45s_var(--ease-elegant)]"
            />
          </div>

          {product.images.length > 1 ? (
            <div className="absolute inset-x-3 bottom-3 flex justify-center gap-2">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`View image ${index + 1} of ${product.name}`}
                  aria-current={index === activeImage}
                  className={`h-11 w-9 overflow-hidden border-2 transition-all duration-400 ${
                    index === activeImage
                      ? "border-champagne-300 opacity-100"
                      : "border-ivory-50/50 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={imageSrc(image, 120)}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {/* Purchase panel */}
        <div className="flex flex-col gap-5 p-6 sm:p-8">
          <div>
            <p className="eyebrow text-rose-600">{product.category}</p>
            <h2 className="mt-2 text-2xl leading-tight sm:text-3xl">{product.name}</h2>
            <p className="mt-2 font-display text-base italic text-espresso-400">{product.subtitle}</p>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <Price price={product.price} compareAtPrice={product.compareAtPrice} />
              <Rating value={product.rating} count={product.reviewCount} />
            </div>
          </div>

          <p className="text-sm leading-relaxed text-espresso-500">{product.shortDescription}</p>

          <ProductOptions product={product} layout="compact" onAdded={onClose} />

          <Link
            href={`/product/${product.slug}`}
            onClick={onClose}
            className="link-underline inline-flex w-fit items-center gap-2 text-[0.6875rem] uppercase tracking-[0.16em] text-plum-800 transition-colors hover:text-rose-600"
          >
            View full details
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </Modal>
  );
}
