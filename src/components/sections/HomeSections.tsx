"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { imageSrc } from "@/lib/images";
import { collections } from "@/lib/collections";
import { products } from "@/lib/products";
import { ButtonLink, cx } from "@/components/ui/Button";
import { SectionHeading } from "@/components/layout/PageHeader";
import { ProductCard } from "@/components/commerce/ProductCard";
import { CampaignSplit } from "@/components/sections/Hero";
import {
  ArrowRightIcon,
  ScissorsIcon,
  ShieldIcon,
  SparkleIcon,
  TruckIcon,
  type IconProps,
} from "@/components/ui/icons";

const MARQUEE_WORDS = [
  "Mul Chikankari",
  "Cut-Work",
  "Hand Block Print",
  "Fine-Count Lawn",
  "Cut Velvet",
  "Khaddar",
  "Chanderi",
  "Lahore Atelier",
  "Small Batch",
];

const SERVICES: Array<{
  icon: (props: IconProps) => React.ReactNode;
  title: string;
  body: string;
}> = [
  {
    icon: TruckIcon,
    title: "Complimentary delivery",
    body: "Free shipping across Pakistan on orders above PKR 20,000, dispatched within 48 hours from Lahore.",
  },
  {
    icon: ScissorsIcon,
    title: "Hand-finished in Lahore",
    body: "Chikankari, cut-work and finishing done by hand in our Gulberg atelier — never by machine.",
  },
  {
    icon: ShieldIcon,
    title: "14-day easy returns",
    body: "Unworn pieces with tags intact may be returned or exchanged within fourteen days of delivery.",
  },
  {
    icon: SparkleIcon,
    title: "Alterations on request",
    body: "Write to us with your measurements and we will advise on the cleanest way to adjust the length.",
  },
];

const PILLARS = [
  {
    index: "01",
    title: "Cloth before trend",
    body: "We begin with the fabric, not the season. Every bolt is washed and checked by hand before a single cut is marked.",
  },
  {
    index: "02",
    title: "Five chapters, not fifty",
    body: "Eighteen pieces at most per season. When a silhouette works, we refine it across four seasons rather than replace it.",
  },
  {
    index: "03",
    title: "Made to be kept",
    body: "French seams, bound plackets, lined bodices — details you only notice years later, when the piece still holds its shape.",
  },
];

const LOOKS = [
  { image: "portraitLahoreB" as const, label: "ÉLAN, photographed in a Lahore lane" },
  { image: "studioLahoreB" as const, label: "NOOR, in a tiled bathroom set" },
  { image: "studioLahoreC" as const, label: "VEIL, inside a Lahore courtyard" },
  { image: "attireTraditionalC" as const, label: "SIGNATURE, in an embroidered dress" },
];

const SOCIAL_POSTS = [
  { image: "noorPista" as const, caption: "Tonal chikankari, worked in the same dye lot" },
  { image: "craftSleeve" as const, caption: "One hundred and six motifs on Velvet Noor" },
  { image: "portraitLahoreA" as const, caption: "Ayesha, in Sitara, on a Tuesday" },
  { image: "veilGarden" as const, caption: "Hina, cut for the hour between afternoon and dinner" },
];

const TESTIMONIALS = [
  {
    quote:
      "I have worn the Gulnar set to three weddings and one funeral. It still looks like the day it arrived, and I am asked about it every time.",
    name: "Ayesha Rehman",
    detail: "Lahore · with us since 2022",
  },
  {
    quote:
      "The chikankari on the Gulnar set is the finest I have owned, and I have owned a great many. You can see every single thread.",
    name: "Mahnoor T.",
    detail: "Karachi · with us since 2023",
  },
  {
    quote:
      "They shortened a dupatta for me at the atelier without being asked, then wrote to explain what they had done. That is rare now.",
    name: "Hira Siddiqui",
    detail: "Islamabad · with us since 2021",
  },
];

/** Scrolling strip of fabric and craft words. */
function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-plum-800/10 bg-ivory-50 py-4">
      <div className="flex w-max motion-safe:animate-[marquee_42s_linear_infinite] motion-reduce:justify-center">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 ? "true" : undefined} className="flex shrink-0 items-center">
            {MARQUEE_WORDS.map((word) => (
              <li
                key={`${copy}-${word}`}
                className="flex items-center gap-6 px-6 text-[0.6875rem] uppercase tracking-[0.24em] text-plum-800/55"
              >
                {word}
                <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-champagne-500" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

/** Best sellers rail; horizontal on small screens, grid from `sm` up. */
function BestSellers() {
  const featured = products.slice(0, 8);
  const scroller = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function updateArrows() {
    const el = scroller.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  function scrollBy(direction: 1 | -1) {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.max(el.clientWidth * 0.8, 280), behavior: "smooth" });
  }

  const arrowClass =
    "grid h-11 w-11 place-content-center border border-plum-800/20 text-plum-900 transition-colors duration-300 hover:border-plum-900 hover:bg-plum-900 hover:text-ivory-100 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-plum-800/20 disabled:hover:bg-transparent disabled:hover:text-plum-900";

  return (
    <section className="container-elare py-20 lg:py-28">
      <SectionHeading
        eyebrow="The Season's Favourites"
        title="Most wanted, restocked twice"
        intro="The pieces our clients come back for. Each has already been through two production runs this season."
        action={
          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={!canScrollLeft}
              aria-label="Scroll to earlier products"
              className={arrowClass}
            >
              <ArrowRightIcon className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={!canScrollRight}
              aria-label="Scroll to later products"
              className={arrowClass}
            >
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        }
      />

      <ul
        ref={scroller}
        className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
      >
        {featured.map((product, index) => (
          <li key={product.slug} className="w-[72vw] shrink-0 snap-start sm:w-auto">
            <ProductCard product={product} index={index} />
          </li>
        ))}
      </ul>

      <div className="mt-12 flex justify-center">
        <ButtonLink href="/shop" variant="outline" size="md">
          Shop all pieces
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1" />
        </ButtonLink>
      </div>
    </section>
  );
}

/** Five collection tiles plus an atelier panel. */
function CollectionTiles() {
  return (
    <section className="bg-plum-900 py-20 text-ivory-100 lg:py-28">
      <div className="container-elare">
        <SectionHeading
          eyebrow="Five Collections"
          title="Find the room you'll wear it in"
          intro="Each collection is designed to work alone, and to be worn together across seasons."
          tone="plum"
          action={
            <ButtonLink href="/collections" variant="ivory" size="md">
              All collections
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1" />
            </ButtonLink>
          }
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {collections.map((collection) => (
            <li key={collection.slug}>
              <Link href={`/collections/${collection.slug}`} className="group/tile block">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-plum-800">
                  <Image
                    src={imageSrc(collection.image, 800)}
                    alt={collection.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 46vw, 90vw"
                    className="object-cover transition-transform duration-[1100ms] [transition-timing-function:var(--ease-elegant)] group-hover/tile:scale-[1.07]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-plum-950/90 via-plum-950/15 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="eyebrow text-champagne-300/90">{collection.season}</p>
                    <h3 className="mt-2 text-xl text-ivory-50">
                      <span className="link-underline">{collection.monogram}</span>
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-ivory-200/65">{collection.tagline}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-6 bg-champagne-300 p-7 text-plum-900 sm:p-9 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div>
            <p className="eyebrow text-plum-700/70">The Atelier</p>
            <h3 className="mt-2 max-w-xl text-2xl lg:text-3xl">
              Come and see how the work is actually done
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-plum-900/75">
              Private fittings run Tuesday to Saturday by appointment. Bring a piece you already own
              and we will take it apart for you.
            </p>
          </div>
          <ButtonLink href="/contact" variant="solid" size="md" className="shrink-0">
            Book a fitting
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/** Lookbook strip. */
function LookbookPreview() {
  return (
    <section className="container-elare py-20 lg:py-28">
<SectionHeading
          eyebrow="The Lookbook"
          title="Shot in Lahore, in real rooms"
          intro="Courtyards, tiled bathrooms, garden walls and one lane behind Zamzama. Our own clothes, our own light."
        action={
          <ButtonLink href="/lookbook" variant="outline" size="md">
            Open the lookbook
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1" />
          </ButtonLink>
        }
      />

      <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
        {LOOKS.map((look, index) => (
          <li key={look.image}>
            <Link href="/lookbook" className="group/look block" aria-label={`${look.label} — open lookbook`}>
              <div className={cx("relative aspect-[3/4] w-full overflow-hidden bg-ivory-200", index % 2 === 1 && "lg:mt-10")}>
                <Image
                  src={imageSrc(look.image, 900)}
                  alt={look.label}
                  fill
                  sizes="(min-width: 1024px) 24vw, 46vw"
                  className="object-cover transition-transform duration-[1200ms] [transition-timing-function:var(--ease-elegant)] group-hover/look:scale-[1.06]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-plum-950/0 transition-colors duration-700 group-hover/look:bg-plum-950/25"
                />
              </div>
              <p className="mt-3 font-display text-base italic leading-snug text-espresso-600">
                {look.label}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Service promises. */
function Services() {
  return (
    <section className="border-y border-plum-800/10 bg-ivory-50 py-16 lg:py-20">
      <div className="container-elare">
        <h2 className="sr-only">How we work</h2>
        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {SERVICES.map((service) => (
            <li key={service.title} className="flex flex-col items-start">
              <span className="grid h-11 w-11 place-content-center rounded-full border border-champagne-500/50 text-plum-800">
                <service.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg leading-snug text-plum-900">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-espresso-500">{service.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Founder note and working principles. */
function FounderNote() {
  return (
    <section className="relative isolate overflow-hidden bg-espresso-900 py-20 text-ivory-100 lg:py-28">
      <Image
        src={imageSrc("studioLahoreB", 1600)}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-20"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-espresso-900/70" />

      <div className="container-elare">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="eyebrow text-champagne-300">From the Founder</p>
            <blockquote className="mt-6">
              <p className="font-display text-3xl leading-tight text-ivory-100 sm:text-4xl">
                “I started ELARÉ because I could not find a kurta that survived a fifth wash.”
              </p>
            </blockquote>
            <p className="mt-6 text-sm text-ivory-200/60">Sadaf Iqbal · Founder & Creative Director</p>
            <ButtonLink href="/about" variant="ivory" size="md" className="mt-8">
              Read our story
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1" />
            </ButtonLink>
          </div>

          <ol className="space-y-7">
            {PILLARS.map((pillar) => (
              <li key={pillar.index} className="border-t border-ivory-100/15 pt-6">
                <div className="flex gap-5">
                  <span className="font-display text-2xl text-champagne-300/70">{pillar.index}</span>
                  <div>
                    <h3 className="text-xl text-ivory-50">{pillar.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-ivory-200/65">{pillar.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** Testimonials. */
function Testimonials() {
  return (
    <section className="container-elare py-20 lg:py-28">
      <SectionHeading eyebrow="In Their Words" title="What clients tell us afterwards" align="center" />

      <ul className="mt-14 grid gap-9 md:grid-cols-3 md:gap-10">
        {TESTIMONIALS.map((item) => (
          <li key={item.name} className="flex flex-col border-t border-plum-800/15 pt-7">
            <blockquote>
              <p className="font-display text-xl italic leading-relaxed text-plum-800">
                “{item.quote}”
              </p>
            </blockquote>
            <div className="mt-auto pt-6">
              <p className="text-sm font-medium uppercase tracking-[0.12em] text-espresso-600">
                {item.name}
              </p>
              <p className="mt-1 text-xs text-espresso-400">{item.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Social grid. */
function SocialGrid() {
  return (
    <section className="border-t border-plum-800/10 bg-ivory-50 py-20 lg:py-24">
      <div className="container-elare">
        <SectionHeading
          eyebrow="@elare.atelier"
          title="From the workroom"
          action={
            <ButtonLink href="/contact" variant="ghost" size="md">
              Follow along
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1" />
            </ButtonLink>
          }
        />

        <ul className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {SOCIAL_POSTS.map((post) => (
            <li key={post.image}>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group/post block"
              >
                <div className="relative aspect-square overflow-hidden bg-ivory-200">
                  <Image
                    src={imageSrc(post.image, 700)}
                    alt={post.caption}
                    fill
                    sizes="(min-width: 1024px) 24vw, 46vw"
                    className="object-cover transition-transform duration-[900ms] [transition-timing-function:var(--ease-elegant)] group-hover/post:scale-[1.08]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-end bg-gradient-to-t from-plum-950/85 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover/post:opacity-100 group-focus-within/post:opacity-100"
                  >
                    <span className="text-xs leading-snug text-ivory-100">{post.caption}</span>
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Closing call to action. */
function ClosingCta() {
  return (
    <section className="relative isolate overflow-hidden bg-plum-950 py-20 text-ivory-100 lg:py-28">
      <Image
        src={imageSrc("veilStreet", 1800)}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-25"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-plum-950 via-plum-950/85 to-plum-900/40" />

      <div className="container-elare">
        <div className="max-w-2xl">
          <p className="eyebrow text-champagne-300">Private Client Service</p>
          <h2 className="mt-4 text-[clamp(2.25rem,6vw,4rem)] text-ivory-50">
            Not sure which piece suits you?
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-ivory-200/70">
            Send us your height, your usual size and where you will wear it. A stylist replies within
            one working day with three suggestions — and will tell you plainly if something will not
            work for you.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="champagne" size="lg">
              Speak to a stylist
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="/shop" variant="ivory" size="lg">
              Browse the collection
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeSections() {
  return (
    <>
      <Marquee />
      <CampaignSplit
        eyebrow="Chapter One · ÉLAN"
        title="Formal, with a raised shoulder"
        body="ÉLAN is drafted like tailoring that happens to be modest — a squared shoulder built with canvas, a nipped waist and a long vertical fall, with the embroidery concentrated at the neckline and cuff so the silhouette does the talking."
        image="elaSculptAlt"
        imageAlt="Model in a formal embroidered Pakistani dress, photographed indoors against warm architecture"
        href="/collections/elan"
        cta="Enter ÉLAN"
      />
      <Services />
      <BestSellers />
      <CollectionTiles />
      <LookbookPreview />
      <FounderNote />
      <Testimonials />
      <SocialGrid />
      <ClosingCta />
    </>
  );
}