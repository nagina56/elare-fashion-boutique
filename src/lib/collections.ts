import type { Collection } from "./types";

/**
 * The five ELARÉ chapters. Each is drafted as its own silhouette language —
 * different cut, different cloth, different embroidery — so that no two
 * chapters read as the same wardrobe.
 */
export const collections: Collection[] = [
  {
    slug: "elan",
    name: "ELARÉ ÉLAN",
    monogram: "ÉLAN",
    eyebrow: "Chapter One",
    tagline: "Formalwear with a raised shoulder",
    description:
      "Our evening register. ÉLAN is built on a squared shoulder, a nipped waist and a long vertical line — kameez drafted close through the body and released only below the hip. The embroidery is concentrated at the neckline and cuff so the silhouette itself does the talking. Cut in silk blend and structured lawn, in jewel tones deep enough to carry a room.",
    signature: "Squared shoulder · nipped waist · vertical fall",
    image: "elaSky",
    imageAlt:
      "Model in an embroidered formal kameez with a beige shawl, photographed against a cool blue wall",
    accentImage: "elaSculpt",
    accentImageAlt: "Model in a formal eastern dress posing indoors against a warm studio backdrop",
    season: "Autumn / Winter",
  },
  {
    slug: "noor",
    name: "ELARÉ NOOR",
    monogram: "NOOR",
    eyebrow: "Chapter Two",
    tagline: "The tradition, refined rather than restated",
    description:
      "NOOR is our quietest chapter and the one we refine longest. Tonal mul chikankari, hand-worked yoke panels, a dupatta that falls rather than floats. Nothing here is louder than the hand that made it — the embroidery is worked in the same family of tone as the ground cloth, so it reads as texture from across a room and as pattern up close.",
    signature: "Tonal hand-work · soft shoulder · long dupatta",
    image: "noorSalwar",
    imageAlt:
      "Model in an embroidered salwar kameez with a matching dupatta, photographed in soft daylight",
    accentImage: "noorKurtaShalwar",
    accentImageAlt: "Model in a kurta and shalwar set, seated in a relaxed pose",
    season: "All Year",
  },
  {
    slug: "aura",
    name: "ELARÉ AURA",
    monogram: "AURA",
    eyebrow: "Chapter Three",
    tagline: "The kameez, re-cut for now",
    description:
      "AURA is where the house experiments. Shortened kameez over a wide trouser, collarless plackets, a dupatta worn knotted at the shoulder instead of draped. The cloth is fine-count lawn and washed cotton — the pieces that survive a Karachi June and still look considered in October. Cuts here change season to season and are deliberately not repeated.",
    signature: "Shortened body · wide leg · knotted dupatta",
    image: "auraEthnic",
    imageAlt:
      "Model in an embroidered Pakistani kameez photographed indoors against modern decor",
    accentImage: "studioLahoreA",
    accentImageAlt: "Model in a contemporary eastern dress inside a bright Lahore studio",
    season: "Spring / Summer",
  },
  {
    slug: "veil",
    name: "ELARÉ VEIL",
    monogram: "VEIL",
    eyebrow: "Chapter Four",
    tagline: "Modest dressing, treated as couture",
    description:
      "VEIL exists because modest fashion has been asked to apologise. Floor-length kameez, a dupatta with real weight in it, sleeves that reach the wrist and a hem that never stops short of the ankle. Everything is drafted generously and finished invisibly. This is the chapter we build when someone asks for the most elegant thing in the room, quietly.",
    signature: "Floor length · full sleeve · weighted dupatta",
    image: "veilStudioBright",
    imageAlt:
      "Model in a flowing eastern dress photographed in a bright, high-ceilinged Lahore room",
    accentImage: "veilStreet",
    accentImageAlt: "Model in Pakistani attire photographed on the streets of Lahore",
    season: "All Year",
  },
  {
    slug: "signature",
    name: "ELARÉ SIGNATURE",
    monogram: "SIGNATURE",
    eyebrow: "Chapter Five",
    tagline: "The five pieces we are judged on",
    description:
      "Cut velvet, couture-grade cut-work, and the silhouettes we have re-drafted more than once. Each SIGNATURE piece takes between five and eleven weeks and is made in a run of thirty per colourway. These are the pieces that get restocked, altered and returned to — the house signatures, in the literal sense.",
    signature: "Cut velvet · couture hand-work · limited run",
    image: "studioLahoreD",
    imageAlt: "Model in an ornate eastern dress inside a Lahore studio",
    accentImage: "studioLahoreC",
    accentImageAlt: "Model in a heavily embroidered eastern dress during a studio shoot",
    season: "Permanent",
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((collection) => collection.slug === slug);
}

export function getCollectionName(slug: string): string {
  return getCollection(slug)?.name ?? "ELARÉ";
}