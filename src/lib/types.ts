import type { ImageKey } from "./images";

export type CollectionSlug = "elan" | "noor" | "aura" | "veil" | "signature";

export type ProductCategory = "Kameez" | "Lawn" | "Outerwear" | "Co-ords" | "Accessories";

export type ColorOption = {
  name: string;
  hex: string;
};

export type SizeOption = {
  label: string;
  /** Bust/chest circumference in inches, used by the size guide. */
  bust?: number;
  waist?: number;
  length?: number;
  available: boolean;
};

export type Product = {
  slug: string;
  name: string;
  /** Short line shown under the product name on cards. */
  subtitle: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  collections: CollectionSlug[];
  colors: readonly ColorOption[];
  sizes: readonly SizeOption[];
  /** Three views: front, full outfit, detail. Never shared between products. */
  images: readonly [ImageKey, ImageKey, ImageKey];
  imageAlts: readonly [string, string, string];
  shortDescription: string;
  story: string;
  fabric: string;
  care: string;
  details: string[];
  delivery: string;
  returns: string;
  badge?: "New" | "Signature" | "Limited" | "Archive";
  isNew: boolean;
  isBestSeller: boolean;
  rating: number;
  reviewCount: number;
  stylistNote: string;
};

export type Collection = {
  slug: CollectionSlug;
  name: string;
  /** The accented house name, e.g. `ÉLAN`. */
  monogram: string;
  eyebrow: string;
  tagline: string;
  description: string;
  /** The silhouette language that makes this chapter distinct. */
  signature: string;
  image: ImageKey;
  imageAlt: string;
  accentImage: ImageKey;
  accentImageAlt: string;
  season: string;
};