import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { collections } from "@/lib/collections";
import { getProductsByCollection } from "@/lib/products";
import { imageSrc } from "@/lib/images";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Five chapters at ELARÉ — ÉLAN formalwear, NOOR tradition refined, AURA the re-cut kameez, VEIL modest couture, and the SIGNATURE pieces.",
  alternates: { canonical: `${siteConfig.url}/collections` },
};

export default function CollectionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Season"
        title="Five chapters, one wardrobe"
        intro="Each chapter is drafted as its own silhouette language — a different cut, a different cloth, a different hand. Pieces overlap between chapters on purpose: most clients own two or three and wear all of them."
        image="attireLahore"
        imageAlt="Model in a traditional embroidered dress inside a Lahore interior"
        meta={[
          { label: "Chapters", value: "Five" },
          { label: "Season", value: "Autumn / Winter" },
          { label: "Pieces", value: "Eighteen styles" },
        ]}
      />

      <div className="container-elare py-20 lg:py-28">
        <ul className="space-y-16 lg:space-y-24">
          {collections.map((collection, index) => {
            const count = getProductsByCollection(collection.slug).length;

            return (
              <li key={collection.slug}>
                <article
                  className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                    index % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                  }`}
                >
                  <figure className="relative">
                    <Link href={`/collections/${collection.slug}`} className="group/fig block">
                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory-200 sm:aspect-[16/10] lg:aspect-[4/5]">
                        <Image
                          src={imageSrc(collection.image, 1400)}
                          alt={collection.imageAlt}
                          fill
                          sizes="(min-width: 1024px) 48vw, 92vw"
                          className="object-cover transition-transform duration-[1200ms] [transition-timing-function:var(--ease-elegant)] group-hover/fig:scale-[1.05]"
                        />
                      </div>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-4 border border-transparent transition-colors duration-500 group-hover/fig:border-champagne-300/45"
                      />
                    </Link>

                    {/* Overlapping accent image */}
                    <div
                      className={`pointer-events-none absolute hidden w-[38%] overflow-hidden bg-ivory-200 shadow-[0_18px_50px_-20px_rgba(43,24,38,0.5)] lg:block ${
                        index % 2 === 1 ? "-left-8 bottom-8" : "-right-8 -bottom-8"
                      }`}
                    >
                      <div className="relative aspect-square w-full">
                        <Image
                          src={imageSrc(collection.accentImage, 500)}
                          alt=""
                          aria-hidden="true"
                          fill
                          sizes="18vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </figure>

                  <div className="lg:px-6">
                    <p className="eyebrow text-rose-600">
                      {collection.eyebrow} · {collection.season}
                    </p>
                    <h2 className="mt-3 text-[clamp(1.875rem,4vw,3rem)]">
                      <Link href={`/collections/${collection.slug}`} className="link-underline">
                        {collection.monogram}
                      </Link>
                    </h2>
                    <p className="mt-4 font-display text-lg italic leading-relaxed text-espresso-400">
                      {collection.tagline}
                    </p>
                    <p className="mt-5 max-w-lg text-sm leading-relaxed text-espresso-500">
                      {collection.description}
                    </p>

                    <p className="mt-6 border-l-2 border-champagne-500 pl-4 font-display text-sm italic leading-relaxed text-plum-800">
                      {collection.signature}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <ButtonLink href={`/collections/${collection.slug}`} variant="solid" size="md">
                        View {count} {count === 1 ? "piece" : "pieces"}
                      </ButtonLink>
                      <p className="text-xs uppercase tracking-[0.14em] text-espresso-400">
                        {count} in the edit
                      </p>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}