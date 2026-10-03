import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader, SectionHeading } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { imageSrc } from "@/lib/images";
import { siteConfig } from "@/lib/site";
import { collections } from "@/lib/collections";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lookbook",
  description:
    "The ELARÉ lookbook — four chapters photographed on location across Lahore across three weeks, with real clients and real weather.",
  alternates: { canonical: `${siteConfig.url}/lookbook` },
};

const CHAPTERS = [
  {
    number: "01",
    title: "The Shoulder",
    location: "Lahore · Zamzama Boulevard",
    body: "ÉLAN, photographed at the end of the day when the light goes sideways. The whole chapter is about one decision: a squared shoulder, built with canvas, that everything else is cut to hang from.",
    images: [
      { image: "elaSky" as const, alt: "Model in an embroidered formal kameez against a cool blue wall" },
      { image: "elaSkyKameez" as const, alt: "Formal Pakistani kameez with a dupatta, photographed front on" },
      { image: "elaSculpt" as const, alt: "Model in a formal eastern dress posing indoors" },
    ],
  },
  {
    number: "02",
    title: "The Hand",
    location: "Lahore · the Gulberg workroom",
    body: "NOOR, in the room where it is actually made. Tonal chikankari worked in the same dye lot as the ground cloth — texture from across a room, pattern from two feet away. Nothing in this chapter is louder than the person who made it.",
    images: [
      { image: "noorSalwar" as const, alt: "Model in an embroidered salwar kameez with a matching dupatta" },
      { image: "noorKurtaShalwar" as const, alt: "Model in a kurta and shalwar set, seated" },
      { image: "elaBluePattern" as const, alt: "Blue and white embroidered Pakistani dress" },
    ],
  },
  {
    number: "03",
    title: "The Re-cut",
    location: "Lahore · MM Alam Road",
    body: "AURA, shot where it is worn rather than displayed. Shortened kameez, wide trouser, and a dupatta knotted at the shoulder. This is the chapter that gets asked about most and understood least, so we photographed it in daylight, on a footpath, in June.",
    images: [
      { image: "auraEthnic" as const, alt: "Model in an embroidered Pakistani kameez against modern decor" },
      { image: "studioLahoreA" as const, alt: "Model in a contemporary eastern dress inside a bright Lahore studio" },
      { image: "portraitLahoreA" as const, alt: "Portrait of a model in Pakistani attire in natural light" },
    ],
  },
  {
    number: "04",
    title: "The Signature",
    location: "Lahore · a courtyard in Gulberg",
    body: "The five pieces we are judged on, photographed in one afternoon in a courtyard we borrowed. Cut velvet, couture cut-work, and a long embroidered coat worn open. This chapter is made in runs of thirty, so the clothes you see may already be spoken for.",
    images: [
      { image: "studioLahoreD" as const, alt: "Model in an ornate embroidered eastern dress inside a Lahore courtyard" },
      { image: "studioLahoreC" as const, alt: "Model in a heavily embroidered eastern dress during a studio shoot" },
      { image: "attireTraditionalC" as const, alt: "Model in a hand-embroidered Pakistani dress" },
    ],
  },
];

const CREDITS = [
  { role: "Photography", name: "Zara Qureshi" },
  { role: "Styling", name: "Amna Sheikh" },
  { role: "Hair & Makeup", name: "Fatima Noor" },
  { role: "Production", name: "ELARÉ Atelier" },
];

export default function LookbookPage() {
  return (
    <>
      <PageHeader
        eyebrow="Autumn / Winter · Five Chapters"
        title="The Lookbook"
        intro="Three weeks, one city, no studio. Everything here was shot on location in Lahore with the people who wear the clothes."
        image="veilStudioBright"
        imageAlt="Model in a flowing eastern dress photographed in a bright Lahore room"
        meta={[
          { label: "Chapters", value: "Four" },
          { label: "Location", value: "Lahore, throughout" },
          { label: "Photography", value: "Zara Qureshi" },
        ]}
      />

      {/* Opening statement */}
      <section className="container-elare py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow text-rose-600">Editor&apos;s Note</p>
            <p className="mt-5 font-display text-2xl italic leading-relaxed text-plum-800 sm:text-3xl">
              We stopped using a studio in 2021. A kameez photographed on a white sweep looks
              perfect and tells you nothing.
            </p>
          </div>
          <div className="space-y-5 text-[0.9375rem] leading-relaxed text-espresso-600">
            <p>
              Every look here is worn by someone who actually owns it. Nothing was borrowed from a
              stylist bank, and nothing was made for the shoot. If a piece creases in Chapter Three,
              it creases because that is how it sits after a long day in June.
            </p>
            <p>
              We shot across three weeks because that is how long it takes to see what a garment
              really does. The first day you notice the cut. The second day you notice the fabric
              moving. By the third day you have forgotten you were being photographed, and that is the
                picture worth printing.
            </p>
            <p>
              Four chapters, in order: the shoulder, the hand, the re-cut, and the signature. They are
              meant to be read in sequence, but any one of them stands on its own.
            </p>
          </div>
        </div>
      </section>

      {/* Chapters */}
      {CHAPTERS.map((chapter, chapterIndex) => (
        <section
          key={chapter.number}
          className={`border-t border-plum-800/10 py-20 lg:py-28 ${
            chapterIndex % 2 === 1 ? "bg-ivory-50" : ""
          }`}
        >
          <div className="container-elare">
            <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
              <div>
                <p className="font-display text-5xl text-champagne-500">{chapter.number}</p>
                <h2 className="mt-3 text-[clamp(2rem,4.5vw,3rem)]">{chapter.title}</h2>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-rose-600">
                  {chapter.location}
                </p>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-espresso-500">
                  {chapter.body}
                </p>
              </div>

              {/* Mixed-ratio editorial grid */}
              <ul className="grid grid-cols-2 gap-4 sm:gap-5">
                {chapter.images.map((item, imageIndex) => (
                  <li
                    key={item.image}
                    className={
                      imageIndex === 0
                        ? "col-span-2"
                        : imageIndex === 2
                          ? "col-span-2 sm:col-span-1 sm:col-start-2"
                          : ""
                    }
                  >
                    <figure
                      className={`relative w-full overflow-hidden bg-ivory-200 ${
                        imageIndex === 0 ? "aspect-[16/10]" : "aspect-[3/4]"
                      }`}
                    >
                      <Image
                        src={imageSrc(item.image, 1400)}
                        alt={item.alt}
                        fill
                        sizes={imageIndex === 0 ? "(min-width: 1024px) 62vw, 92vw" : "(min-width: 640px) 30vw, 46vw"}
                        className="object-cover transition-transform duration-[1400ms] hover:scale-[1.04] [transition-timing-function:var(--ease-elegant)]"
                      />
                    </figure>
                    <figcaption className="mt-2.5 text-xs text-espresso-400">
                      {chapter.title} · {String(imageIndex + 1).padStart(2, "0")}
                    </figcaption>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      {/* Credits */}
      <section className="border-t border-plum-800/10 bg-espresso-900 py-20 text-ivory-100 lg:py-24">
        <div className="container-elare">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <p className="eyebrow text-champagne-300">Credits</p>
              <h2 className="mt-3 text-3xl text-ivory-50">Who made this</h2>
              <dl className="mt-9 space-y-5">
                {CREDITS.map((credit) => (
                  <div key={credit.role} className="flex items-baseline justify-between gap-6 border-b border-ivory-100/12 pb-4">
                    <dt className="text-xs uppercase tracking-[0.16em] text-ivory-200/55">
                      {credit.role}
                    </dt>
                    <dd className="font-display text-lg text-ivory-100">{credit.name}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative overflow-hidden bg-plum-950">
              <Image
                src={imageSrc("portraitLahoreB", 1200)}
                alt="Two finished pieces side by side in the atelier"
                fill
                sizes="(min-width: 1024px) 48vw, 92vw"
                className="object-cover opacity-80"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-plum-950/85 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="font-display text-2xl italic leading-snug text-ivory-50">
                  Every piece in the book was made by the same eleven people.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop the lookbook */}
      <section className="container-elare py-20 lg:py-24">
        <SectionHeading
          eyebrow="Shop the Chapters"
          title="Everything in the book is still available"
          intro="Nothing was made for the camera alone. Pieces come and go with the runs, so sizes shift week to week."
          align="center"
          action={
            <ButtonLink href="/shop" variant="champagne" size="lg">
              Shop the season
            </ButtonLink>
          }
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection) => (
            <li key={collection.slug}>
              <Link
                href={`/collections/${collection.slug}`}
                className="group/ed flex h-full flex-col justify-between border border-plum-800/12 px-6 py-6 transition-colors duration-400 hover:border-plum-900 hover:bg-plum-900"
              >
                <span>
                  <span className="block text-xs uppercase tracking-[0.14em] text-espresso-400 transition-colors duration-400 group-hover/ed:text-champagne-300/90">
                    {collection.season}
                  </span>
                  <span className="mt-2 block font-display text-xl leading-snug text-plum-900 transition-colors duration-400 group-hover/ed:text-ivory-50">
                    {collection.monogram}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="mt-6 block text-rose-600 transition-transform duration-500 group-hover/ed:translate-x-1.5"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}