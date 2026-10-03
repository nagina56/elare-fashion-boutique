import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ShopBrowser } from "@/components/commerce/ShopBrowser";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop",
  description: `Browse every piece in the ELARÉ season — formalwear, lawn, co-ords, tailoring and signature pieces. Filter by size, category and price.`,
  alternates: { canonical: `${siteConfig.url}/shop` },
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="Autumn / Winter · Five Chapters"
        title="Every piece, in one place"
        intro="Eighteen silhouettes, cut in Lahore in small runs. Filter by size, category or price — the size grid tells you exactly what is left in the run."
        image="noorSalwar"
        imageAlt="Model in an embroidered salwar kameez with a matching dupatta"
        meta={[
          { label: "Free delivery", value: `Over ${siteConfig.freeShippingThreshold.toLocaleString("en-PK")}` },
          { label: "Returns", value: "14 days, unworn" },
          { label: "Dispatch", value: "Within 48 hours" },
        ]}
      />
      <ShopBrowser />
    </>
  );
}