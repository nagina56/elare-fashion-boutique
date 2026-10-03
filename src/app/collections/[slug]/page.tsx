import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { collections, getCollection } from "@/lib/collections";
import { getProductsByCollection } from "@/lib/products";
import { imageSrc } from "@/lib/images";
import { siteConfig } from "@/lib/site";

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);

  if (!collection) return { title: "Collection not found" };

  return {
    title: `${collection.monogram} · ${collection.tagline}`,
    description: collection.description,
    alternates: { canonical: `${siteConfig.url}/collections/${collection.slug}` },
    openGraph: {
      title: `${collection.monogram} · ${siteConfig.name}`,
      description: collection.description,
      images: [{ url: imageSrc(collection.image, 1400), alt: collection.imageAlt }],
    },
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollection(slug);

  if (!collection) notFound();

  const items = getProductsByCollection(collection.slug);
  const others = collections.filter((entry) => entry.slug !== collection.slug);

  return (
    <>
      <PageHeader
        eyebrow={`${collection.eyebrow} · ${collection.season}`}
        title={collection.monogram}
        intro={collection.description}
        image={collection.image}
        imageAlt={collection.imageAlt}
        meta={[
          { label: "Pieces", value: `${items.length} in this edit` },
          { label: "Silhouette", value: collection.signature },
          { label: "Made in", value: "Lahore, Pakistan" },
        ]}
      />

      {/* Tagline band */}
      <section className="border-b border-plum-800/10 bg-ivory-50">
        <div className="container-elare flex flex-col items-center gap-4 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="font-display text-xl italic text-espresso-600">{collection.tagline}</p>
          <ButtonLink href="/shop" variant="ghost" size="sm">
            Or browse the whole season
          </ButtonLink>
        </div>
      </section>

      {/* Grid */}
      <section className="container-elare py-20 lg:py-24">
        <h2 className="sr-only">{collection.monogram} products</h2>
        {items.length > 0 ? (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-14">
            {items.map((product, index) => (
              <li key={product.slug}>
                <ProductCard product={product} index={index} priority={index < 4} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="border border-dashed border-plum-800/20 px-8 py-20 text-center">
            <p className="font-display text-2xl text-plum-800">
              This chapter is between runs.
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-espresso-500">
              {collection.monogram} is re-cut twice a year, and we do not manufacture restocks. The
              pieces from the last run are still available while sizes last.
            </p>
            <ButtonLink href="/shop" variant="solid" size="md" className="mt-8">
              Browse everything in stock
            </ButtonLink>
          </div>
        )}
      </section>

      {/* Accent editorial block */}
      <section className="relative isolate overflow-hidden bg-plum-900 py-20 text-ivory-100 lg:py-24">
        <Image
          src={imageSrc(collection.accentImage, 1800)}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="-z-10 object-cover opacity-30"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-plum-950 via-plum-950/85 to-plum-900/50" />

        <div className="container-elare">
          <div className="max-w-xl">
            <p className="eyebrow text-champagne-300">{collection.season}</p>
            <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.75rem)] text-ivory-50">
              How this edit comes together
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ivory-200/70">
              Every piece in {collection.monogram} is cut from the same set of bolts, so the colours
              sit together without effort. The silhouette runs through all of it — {collection.signature.toLowerCase()}.
              Sizes XS through XL are made in the first run; anything sold out is not re-cut until the
              next season.
            </p>
          </div>
        </div>
      </section>

      {/* Other collections */}
      <section className="container-elare py-20 lg:py-24">
        <h2 className="text-2xl">Continue through the season</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((other) => (
            <li key={other.slug}>
              <Link
                href={`/collections/${other.slug}`}
                className="group/next flex items-center justify-between gap-4 border border-plum-800/12 px-5 py-5 transition-colors duration-400 hover:border-plum-900 hover:bg-plum-900"
              >
                <span>
                  <span className="block text-xs uppercase tracking-[0.14em] text-espresso-400 transition-colors duration-400 group-hover/next:text-champagne-300/90">
                    {other.season}
                  </span>
                  <span className="mt-1.5 block font-display text-xl text-plum-900 transition-colors duration-400 group-hover/next:text-ivory-50">
                    {other.monogram}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="text-xl text-plum-900 transition-colors duration-400 group-hover/next:text-champagne-300"
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