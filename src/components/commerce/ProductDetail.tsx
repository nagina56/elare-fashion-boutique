"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { getRelatedProducts } from "@/lib/products";
import { collections as allCollections } from "@/lib/collections";
import { imageSrc } from "@/lib/images";
import { siteConfig } from "@/lib/site";
import { ProductOptions } from "@/components/commerce/ProductOptions";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Accordion } from "@/components/ui/Accordion";
import { Price, Rating } from "@/components/ui/Price";
import { ButtonLink, cx } from "@/components/ui/Button";
import { SectionHeading } from "@/components/layout/PageHeader";
import { ArrowRightIcon, ReturnIcon, RulerIcon, TruckIcon } from "@/components/ui/icons";

export function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const related = getRelatedProducts(product.slug, 4);
  const collections = allCollections.filter((entry) => product.collections.includes(entry.slug));
  const isOnSale = typeof product.compareAtPrice === "number" && product.compareAtPrice > product.price;

  const accordionItems = [
    {
      id: "story",
      title: "The story",
      content: <p className="leading-relaxed text-espresso-500">{product.story}</p>,
    },
    {
      id: "fabric",
      title: "Fabric & feel",
      content: <p className="leading-relaxed text-espresso-500">{product.fabric}</p>,
      meta: "Woven & finished in Pakistan",
    },
    {
      id: "details",
      title: "Details",
      content: (
        <ul className="space-y-2 text-espresso-500">
          {product.details.map((detail) => (
            <li key={detail} className="flex gap-3">
              <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-champagne-500" />
              {detail}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "care",
      title: "Care",
      content: <p className="leading-relaxed text-espresso-500">{product.care}</p>,
    },
    {
      id: "delivery",
      title: "Delivery & returns",
      content: (
        <div className="space-y-4">
          <p className="leading-relaxed text-espresso-500">{product.delivery}</p>
          <p className="leading-relaxed text-espresso-500">{product.returns}</p>
        </div>
      ),
    },
  ];

  const promises = [
    { icon: TruckIcon, label: `Free delivery over PKR ${siteConfig.freeShippingThreshold.toLocaleString("en-PK")}` },
    { icon: ReturnIcon, label: "14-day returns, unworn" },
    { icon: RulerIcon, label: "Inches, not centimetres" },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="container-elare pt-24 sm:pt-28 lg:pt-32">
        <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.12em] text-espresso-400">
          <li>
            <Link href="/" className="transition-colors hover:text-rose-600">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/shop" className="transition-colors hover:text-rose-600">
              Shop
            </Link>
          </li>
          {collections[0] ? (
            <>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`/collections/${collections[0].slug}`}
                  className="transition-colors hover:text-rose-600"
                >
                  {collections[0].monogram}
                </Link>
              </li>
            </>
          ) : null}
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-espresso-600">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Gallery + buy box */}
      <section className="container-elare py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 xl:gap-20">
          {/* Gallery */}
          <div className="lg:flex lg:flex-col-reverse lg:gap-4">
            {/* Thumbnails */}
            <div className="order-first flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] lg:w-auto lg:flex-col lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`View image ${index + 1} of ${product.name}`}
                  aria-current={activeImage === index ? "true" : undefined}
                  className={cx(
                    "relative h-24 w-20 shrink-0 overflow-hidden bg-ivory-200 transition-all duration-400 lg:h-28 lg:w-full",
                    activeImage === index
                      ? "ring-1 ring-plum-900 ring-offset-2 ring-offset-ivory-50"
                      : "opacity-65 hover:opacity-100",
                  )}
                >
                  <Image
                    src={imageSrc(image, 300)}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory-200">
              {product.images.map((image, index) => (
                <Image
                  key={image}
                  src={imageSrc(image, 1600)}
                  alt={product.imageAlts[index] ?? product.imageAlts[0]}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 52vw, 92vw"
                  className={cx(
                    "object-cover transition-opacity duration-700 [transition-timing-function:var(--ease-elegant)]",
                    activeImage === index ? "opacity-100" : "pointer-events-none opacity-0",
                  )}
                />
              ))}

              {isOnSale ? (
                <span className="absolute left-4 top-4 bg-rose-500 px-3 py-1.5 text-[0.5625rem] font-medium uppercase tracking-[0.18em] text-ivory-50">
                  Reduced
                </span>
              ) : null}
              {product.badge && !isOnSale ? (
                <span className="absolute left-4 top-4 bg-plum-800 px-3 py-1.5 text-[0.5625rem] font-medium uppercase tracking-[0.18em] text-ivory-100">
                  {product.badge}
                </span>
              ) : null}
            </div>
          </div>

          {/* Buy box */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center justify-between gap-4">
              <p className="eyebrow text-rose-600">{product.category}</p>
              <Rating value={product.rating} count={product.reviewCount} />
            </div>

            <h1 className="mt-3 text-[clamp(2rem,4.5vw,3rem)] leading-[1.06]">{product.name}</h1>
            <p className="mt-2 font-display text-lg italic text-espresso-400">{product.subtitle}</p>

            <div className="mt-5">
              <Price price={product.price} compareAtPrice={product.compareAtPrice} size="lg" />
            </div>

            <p className="mt-6 text-[0.9375rem] leading-relaxed text-espresso-600">
              {product.shortDescription}
            </p>

            {/* Stylist note */}
            <div className="mt-7 border-l-2 border-champagne-500 bg-ivory-50 px-5 py-4">
              <p className="eyebrow text-plum-800">Stylist&apos;s note</p>
              <p className="mt-2 text-sm leading-relaxed text-espresso-600">{product.stylistNote}</p>
            </div>

            {/* Options */}
            <div className="mt-9">
              <ProductOptions product={product} layout="full" />
            </div>

            {/* Collection links */}
            {collections.length > 0 ? (
              <div className="mt-8 border-t border-plum-800/10 pt-6">
                <p className="eyebrow text-espresso-400">Also in</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {collections.map((collection) => (
                    <li key={collection.slug}>
                      <Link
                        href={`/collections/${collection.slug}`}
                        className="inline-block border border-plum-800/20 px-3.5 py-2 text-xs uppercase tracking-[0.12em] text-plum-900 transition-colors duration-300 hover:border-plum-900 hover:bg-plum-900 hover:text-ivory-100"
                      >
                        {collection.monogram}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Promises */}
            <ul className="mt-8 space-y-3 border-t border-plum-800/10 pt-6">
              {promises.map((promise) => (
                <li key={promise.label} className="flex items-center gap-3 text-sm text-espresso-600">
                  <promise.icon className="h-[1.15rem] w-[1.15rem] shrink-0 text-plum-800" />
                  {promise.label}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Accordion items={accordionItems} />
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 ? (
        <section className="container-elare border-t border-plum-800/10 py-20 lg:py-24">
          <SectionHeading
            eyebrow="Worn Together"
            title="Pieces that sit beside it"
            intro="Chosen from the same chapters — they share fabric weight and colour, so they layer without thought."
            action={
              <ButtonLink href="/shop" variant="outline" size="md">
                Browse everything
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1" />
              </ButtonLink>
            }
          />

          <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-7">
            {related.map((item, index) => (
              <li key={item.slug}>
                <ProductCard product={item} index={index} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}