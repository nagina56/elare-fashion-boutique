"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { imageSrc } from "@/lib/images";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * Full-bleed opening frame. The headline sits in a plum scrim panel so it
 * stays legible against any photograph.
 */
export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Ensures the headline animates in even if the image is cached instantly.
    const timer = window.setTimeout(() => setLoaded(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-plum-950">
      {/* Photograph */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc("heroOrnate", 2000)}
          alt="Model in an ornate hand-embroidered Pakistani dress photographed against carved architecture"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={82}
          className={`object-cover object-[58%_center] transition-transform duration-[2200ms] [transition-timing-function:var(--ease-elegant)] ${
            loaded ? "scale-100" : "scale-[1.08]"
          }`}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-plum-950 via-plum-950/45 to-plum-950/70"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-plum-950/85 via-plum-950/20 to-transparent"
        />
      </div>

      {/* Content */}
      <div className="container-elare relative z-10 pb-16 pt-40 sm:pb-20 lg:pb-24">
        <div className="max-w-2xl">
          <p
            className={`eyebrow text-champagne-300 transition-all duration-1000 [transition-timing-function:var(--ease-elegant)] ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Autumn / Winter · Five Collections
          </p>

          <h1
            className={`mt-5 text-[clamp(3rem,10vw,7rem)] font-light leading-[0.92] tracking-[-0.02em] text-ivory-50 transition-all duration-1000 delay-100 [transition-timing-function:var(--ease-elegant)] ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Cut in Lahore.
            <span className="block accent-serif text-champagne-200">Worn anywhere.</span>
          </h1>

          <div
            className={`mt-7 h-px w-24 bg-champagne-300/60 transition-all duration-1000 delay-200 [transition-timing-function:var(--ease-elegant)] ${
              loaded ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
            }`}
            aria-hidden="true"
          />

          <p
            className={`mt-7 max-w-lg text-sm leading-relaxed text-ivory-100/80 transition-all duration-1000 delay-250 sm:text-base ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Five chapters of Pakistani dressmaking — formalwear, the re-cut kameez, floor-length
            tailoring and the five pieces we are judged on. Chikankari and cut-work worked by hand in
            Gulberg, woven cloth chosen to outlast the season.
          </p>

          <div
            className={`mt-10 flex flex-col gap-3 transition-all duration-1000 delay-350 sm:flex-row sm:items-center ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <ButtonLink href="/shop" variant="champagne" size="lg">
              Explore the pieces
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="/collections" variant="ivory" size="lg">
              See the five chapters
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className={`absolute bottom-6 right-5 hidden z-10 items-center gap-3 transition-opacity duration-1000 delay-600 sm:flex lg:right-14 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <span className="vertical-label text-[0.5625rem] uppercase tracking-[0.3em] text-ivory-200/60">
          Scroll
        </span>
        <span className="relative h-14 w-px overflow-hidden bg-ivory-100/25">
          <span className="absolute inset-x-0 top-0 h-full bg-champagne-300 motion-safe:animate-[scrollHint_2.4s_ease-in-out_infinite]" />
        </span>
      </div>
    </section>
  );
}

type CampaignProps = {
  eyebrow: string;
  title: string;
  body: string;
  image: Parameters<typeof imageSrc>[0];
  imageAlt: string;
  href: string;
  cta: string;
};

/** Two-image editorial spread that introduces a chapter of the season. */
export function CampaignSplit({ eyebrow, title, body, image, imageAlt, href, cta }: CampaignProps) {
  return (
    <section className="container-elare py-20 lg:py-28">
      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-plum-100 sm:aspect-[16/11] lg:aspect-[4/5]">
            <Image
              src={imageSrc(image, 1400)}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 52vw, 92vw"
              className="object-cover image-lift hover:scale-[1.05]"
            />
          </div>
          {/* Offset champagne rule */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-4 -right-4 -z-10 hidden h-32 w-32 border-b border-r border-champagne-400/70 lg:block"
          />
        </div>

        <div className="order-1 lg:order-2 lg:pl-6">
          <p className="eyebrow text-rose-600">{eyebrow}</p>
          <h2 className="mt-4 text-[clamp(2.25rem,5.5vw,4rem)]">{title}</h2>
          <p className="mt-6 max-w-lg text-[0.9375rem] leading-relaxed text-espresso-500">{body}</p>

          <ButtonLink href={href} variant="outline" size="md" className="mt-9">
            {cta}
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
