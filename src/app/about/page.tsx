import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { imageSrc } from "@/lib/images";
import { siteConfig } from "@/lib/site";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "ELARÉ was founded in Lahore in 2019 to make fewer pieces, better. Read how we work, who makes the clothes, and what we refuse to compromise on.",
  alternates: { canonical: `${siteConfig.url}/about` },
};

const TIMELINE = [
  {
    year: "2019",
    title: "One hundred and forty pieces",
    body: "The first run was made in a two-room studio on Qarbal Road with three chikankari karigars and a single tailor. We sold out in nine days and then waited a year to make more.",
  },
  {
    year: "2021",
    title: "We stopped using a studio",
    body: "Photographing a kameez on a white sweep flatters everything and explains nothing. From that season onward every lookbook has been shot on location, in daylight, with real clients.",
  },
  {
    year: "2023",
    title: "The atelier moved to Gulberg",
    body: "A dedicated workroom with cutting tables, an embroidery floor, and a fitting room clients can actually sit in. Eleven people work there now.",
  },
  {
    year: "2025",
    title: "Eighteen pieces, and no more",
    body: "We cap every season at eighteen styles. It limits revenue and it keeps the work honest.",
  },
];

const PRINCIPLES = [
  {
    title: "We buy fabric before we design",
    body: "Bolts are chosen first, washed, and checked under daylight. If the cloth is not right, the design does not happen — we have cancelled a piece over this more than once.",
  },
  {
    title: "Hand work is not a marketing line",
    body: "Chikankari, resham, cut-work and aarish are done by people we pay by the piece at rates we would not accept ourselves. Every maker is named in the pack.",
  },
  {
    title: "Construction you only notice later",
    body: "French seams, bound plackets, lined bodices, real pockets. These cost us time and margin now, and they are the reason clients write to us years afterwards.",
  },
  {
    title: "We would rather sell out",
    body: "No manufactured restocks, no second-quality runs sold as first. When a size is gone it is gone until the next season.",
  },
];

const TEAM = [
  { name: "Sadaf Iqbal", role: "Founder & Creative Director", image: "portraitLahoreEditorial" as const },
  { name: "Hina Yousaf", role: "Head of Pattern Cutting", image: "portraitLahoreB" as const },
  { name: "Zarina Bibi", role: "Chikankari, Lead Artisan", image: "craftSleeve" as const },
  { name: "Imran Ali", role: "Cutting Master", image: "studioLahoreA" as const },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="The House"
        title="Fewer pieces, made properly"
        intro="ELARÉ began because a kameez could not survive five washes. It has grown into an atelier of eleven people who make eighteen styles a season in Lahore — and who will tell you when something is not right."
        image="sigVelvetDeep"
        imageAlt="Model in a cut velvet eastern dress inside a Lahore interior"
        meta={[
          { label: "Founded", value: "2019 · Lahore" },
          { label: "Makers", value: "Eleven people" },
          { label: "Seasonal output", value: "Eighteen styles" },
        ]}
      />

      {/* Founder statement */}
      <section className="container-elare py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <p className="eyebrow text-rose-600">Why we exist</p>
            <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)]">
              A kurta that survived five washes
            </h2>
            <div className="mt-7 space-y-5 text-[0.9375rem] leading-relaxed text-espresso-600">
              <p>
                I grew up in a house where mending was normal and replacing was a decision. My mother
                could take a 1990s kurta apart, replace the lining, and it would outlast everything
                newer in the wardrobe. I could not find that anywhere in Lahore in 2019 — everything
                was beautiful and nothing lasted.
              </p>
              <p>
                So I started with a simple constraint. If a seam cannot survive being opened and
                closed twice, we do not use it. That rule cost us money for about three years and
                it is the only reason the atelier still exists.
              </p>
              <p>
                Everything here follows from that. We make fewer pieces. We buy better cloth. We pay
                our karigars properly and slowly. We would rather tell you a size will not work than
                sell you something that fails in month three.
              </p>
            </div>

            <p className="mt-8 border-l-2 border-champagne-500 pl-5 font-display text-xl italic leading-relaxed text-plum-800">
              — Sadaf Iqbal, Founder
            </p>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory-200">
              <Image
                src={imageSrc("craftPortrait", 1200)}
                alt="Portrait of a model in an embroidered Pakistani kameez with a dupatta"
                fill
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="object-cover"
              />
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-5 -left-5 -z-10 hidden h-40 w-40 border-b border-l border-champagne-400/70 lg:block"
            />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-y border-plum-800/10 bg-ivory-50 py-20 lg:py-28">
        <div className="container-elare">
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)]">How we got here</h2>

          <ol className="mt-12 grid gap-px overflow-hidden border border-plum-800/12 bg-plum-800/12 sm:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((entry) => (
              <li key={entry.year} className="bg-ivory-50 px-6 py-8">
                <p className="font-display text-4xl text-plum-900">{entry.year}</p>
                <h3 className="mt-4 text-lg leading-snug text-plum-800">{entry.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-espresso-500">{entry.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Principles */}
      <section className="container-elare py-20 lg:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow text-rose-600">How we work</p>
          <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.75rem)]">Four things we will not compromise</h2>
        </div>

        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:gap-12">
          {PRINCIPLES.map((principle, index) => (
            <li key={principle.title} className="border-t border-plum-800/15 pt-7">
              <span className="font-display text-2xl text-champagne-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl leading-snug text-plum-900">{principle.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-espresso-500">{principle.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* People */}
      <section className="relative isolate overflow-hidden bg-plum-900 py-20 text-ivory-100 lg:py-28">
        <Image
          src={imageSrc("noorKhaddar", 1800)}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="-z-10 object-cover opacity-15"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-plum-900/85" />

        <div className="container-elare">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow text-champagne-300">The atelier</p>
              <h2 className="mt-3 max-w-xl text-[clamp(1.75rem,4vw,2.75rem)] text-ivory-50">
                The eleven people who make the clothes
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ivory-200/65">
              Every maker is named on the pack that ships with your piece. You are welcome to visit and
              meet them — write to us and we will arrange it.
            </p>
          </div>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {TEAM.map((person) => (
              <li key={person.name}>
                <figure>
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-plum-800">
                    <Image
                      src={imageSrc(person.image, 700)}
                      alt={`${person.name}, ${person.role}`}
                      fill
                      sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 90vw"
                      className="object-cover opacity-90 transition-transform duration-[1100ms] [transition-timing-function:var(--ease-elegant)] hover:scale-[1.05]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-plum-950/80 to-transparent"
                    />
                  </div>
                  <figcaption className="mt-4">
                    <p className="text-base text-ivory-50">{person.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-champagne-300/80">
                      {person.role}
                    </p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Materials */}
      <section className="container-elare py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="relative">
            <div className="relative aspect-square w-full overflow-hidden bg-ivory-200">
              <Image
                src={imageSrc("auraModern", 1000)}
                alt="A modern Pakistani dress photographed in a styled interior"
                fill
                sizes="(min-width: 1024px) 44vw, 92vw"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <p className="eyebrow text-rose-600">Materials</p>
            <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.75rem)]">Where the cloth comes from</h2>
            <div className="mt-6 space-y-5 text-[0.9375rem] leading-relaxed text-espresso-600">
              <p>
                Our cottons are woven in Faisalabad and stitched in Lahore. Khaddar comes from a
                family mill in Gujranwala we have used for four seasons. Mul for the chikankari is
                sourced inside Lahore, and the chiffon we use for dupattas is woven for us on the
                same looms we have used since 2021.
              </p>
              <p>
                Silk blends and cut velvet are made for us and imported through Karachi. We can tell
                you the mill and the loom number, and we will — but we will not claim a heritage we
                do not have. Nothing in this house is described as Banarasi or Kashmiri, because
                neither is true.
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/shop" variant="solid" size="md">
                See what we made from it
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline" size="md">
                Ask us anything
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Closing quote */}
      <section className="border-t border-plum-800/10 bg-espresso-900 py-20 text-ivory-100 lg:py-24">
        <div className="container-elare">
          <blockquote className="mx-auto max-w-3xl text-center">
            <p className="font-display text-[clamp(1.5rem,4vw,2.5rem)] italic leading-tight text-ivory-50">
              “We make eighteen styles a season, and we will make fewer if the cloth is not
              right. That is the whole business model, and it works.”
            </p>
            <footer className="mt-8 text-sm text-ivory-200/55">
              Sadaf Iqbal · {products.length} pieces currently available
            </footer>
          </blockquote>
        </div>
      </section>
    </>
  );
}