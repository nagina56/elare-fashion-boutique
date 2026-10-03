import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/commerce/ProductDetail";
import { products, getProduct } from "@/lib/products";
import { imageSrc } from "@/lib/images";
import { siteConfig } from "@/lib/site";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) return { title: "Piece not found" };

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `${siteConfig.url}/product/${product.slug}` },
    openGraph: {
      title: `${product.name} · ${siteConfig.name}`,
      description: product.shortDescription,
      images: [{ url: imageSrc(product.images[0], 1400), alt: product.imageAlts[0] }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  return <ProductDetail product={product} />;
}