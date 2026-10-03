import type { CollectionSlug, Product, ProductCategory } from "./types";

/** Currency formatting keeps PKR amounts readable across the whole storefront. */
export function formatPrice(amount: number): string {
  return `PKR ${amount.toLocaleString("en-PK")}`;
}

const APPAREL_SIZES = [
  { label: "XS", bust: 32, waist: 26, length: 38, available: false },
  { label: "S", bust: 34, waist: 28, length: 39, available: true },
  { label: "M", bust: 36, waist: 30, length: 40, available: true },
  { label: "L", bust: 38, waist: 32, length: 41, available: true },
  { label: "XL", bust: 40, waist: 34, length: 42, available: true },
] as const;

export const categories = [
  "Kameez",
  "Lawn",
  "Co-ords",
  "Outerwear",
] as const satisfies readonly ProductCategory[];

export const sizes = ["XS", "S", "M", "L", "XL"] as const;

const DELIVERY_STANDARD =
  "Complimentary delivery across Pakistan on orders above PKR 20,000. Dispatched within 48 hours from our Lahore atelier, arriving in 2–4 working days.";
const DELIVERY_COUTURE =
  "Complimentary insured delivery. Dispatched within 5 working days from our Lahore atelier, arriving in 4–6 working days. A fitting window can be arranged on request.";
const RETURNS_STANDARD =
  "Fourteen day returns on unworn pieces with tags intact. Length alterations are complimentary within the first fourteen days.";
const RETURNS_FINAL =
  "Fourteen day returns on unworn pieces with tags intact. Made-to-order and couture pieces are final sale.";

export const products: Product[] = [
  /* ---------------------------------------------------------------- ÉLAN -- */
  {
    slug: "zareen-ember-cutwork-kameez",
    name: "Zareen Ember Cut-Work Kameez",
    subtitle: "Squared-shoulder kameez in ember cut-work",
    price: 38900,
    compareAtPrice: 45000,
    category: "Kameez",
    collections: ["elan", "signature"],
    colors: [
      { name: "Deep Ember", hex: "#8c3a24" },
      { name: "Espresso", hex: "#3a2a24" },
      { name: "Antique Gold", hex: "#b08d4f" },
    ],
    sizes: APPAREL_SIZES,
    images: ["elaFormal", "elaNoir", "attireChic"],
    imageAlts: [
      "Model in formal Pakistani attire wearing the Zareen kameez, photographed front on",
      "The Zareen kameez in a near-black tonal treatment, showing the squared shoulder line",
      "Full-length view of the Zareen kameez styled against a traditional Lahore backdrop",
    ],
    shortDescription:
      "A structured kameez with a squared shoulder and hand-worked cut-work at the neckline and cuff, cut long through the body.",
    story:
      "Zareen was drafted from a jacket. We built the shoulder first — a firm square that sits above the natural line — then let the body fall straight from it, so the kameez reads as tailoring that happens to be modest. The cut-work is worked by hand across a six-inch placket and again at the cuff, which is why the piece takes a tailor nine days.",
    fabric:
      "Silk-blend kameez with hand-worked cut-work, lined bodice and a matching mulleton trouser.",
    care: "Dry clean only. Store on a broad hanger. Never fold the embroidery.",
    details: [
      "Squared shoulder built with a canvas interlining",
      "Hand-worked cut-work across a six-inch front placket",
      "Matching cut-work at both cuffs",
      "Concealed side zip with a self-covered placket",
      "Full-length with a 2 inch let-down allowance",
    ],
    delivery: DELIVERY_COUTURE,
    returns: RETURNS_FINAL,
    badge: "New",
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 41,
    stylistNote:
      "Worn with the hair up and nothing at the ear. The shoulder does the work — keep the neckline clear.",
  },
  {
    slug: "sitara-violet-sculpted-kameez",
    name: "Sitara Violet Sculpted Kameez",
    subtitle: "Aubergine kameez with a sculpted waist panel",
    price: 42500,
    category: "Kameez",
    collections: ["elan"],
    colors: [
      { name: "Aubergine", hex: "#4a2338" },
      { name: "Muted Plum", hex: "#7d4c68" },
      { name: "Warm Ivory", hex: "#faf5ee" },
    ],
    sizes: APPAREL_SIZES,
    images: ["elaLilac", "elaPlumSculpt", "portraitLahoreEditorial"],
    imageAlts: [
      "Model in a purple and beige outfit posing indoors in the Sitara kameez",
      "The Sitara kameez in deep aubergine, photographed indoors with artistic decor",
      "Editorial view of the Sitara kameez worn outdoors in natural Lahore light",
    ],
    shortDescription:
      "An aubergine kameez with a single sculpted panel at the waist, hand-embroidery kept to the edge of the seam.",
    story:
      "One seam does all the work on Sitara. A shaped panel is set into the side of the kameez, which pulls the cloth in at the waist without a single dart, and then releases it into a soft flare below the hip. It is the closest thing we make to a Western coutured line — drafted the same way, worn the same way.",
    fabric: "Crepe-back satin with a sculpted wool-blend panel and a full satin lining.",
    care: "Dry clean only. Hang immediately after wear. Cool iron on the reverse.",
    details: [
      "Single sculpted side panel, no darts",
      "Hand embroidery worked along the panel seam only",
      "Concealed centre-back zip",
      "Floor-sweeping hem with a 4 inch let-down allowance",
      "Fully lined through the bodice",
    ],
    delivery: DELIVERY_COUTURE,
    returns: RETURNS_FINAL,
    badge: "Signature",
    isNew: false,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 33,
    stylistNote:
      "The one to wear when you want to be the only thing in the room that is not beige.",
  },
  {
    slug: "zoya-espresso-embroidered-frock",
    name: "Zoya Espresso Embroidered Frock",
    subtitle: "Hand-worked frock in deep espresso",
    price: 34200,
    category: "Kameez",
    collections: ["elan", "noor"],
    colors: [
      { name: "Espresso", hex: "#3a2a24" },
      { name: "Charcoal", hex: "#4a4548" },
      { name: "Dusty Rose", hex: "#c08a92" },
    ],
    sizes: APPAREL_SIZES,
    images: ["elaEspresso", "elaCharcoal", "attireTraditional"],
    imageAlts: [
      "Model in an embroidered brown dress, the Zoya frock in deep espresso",
      "The Zoya frock in a charcoal tonal treatment, seated",
      "The Zoya frock shown indoors in a traditional styled room",
    ],
    shortDescription:
      "A knee-length frock in espresso with hand-worked embroidery across the yoke and a softly fluted skirt.",
    story:
      "A frock is harder to make look expensive than a kameez, because there is nowhere to hide. Zoya works because the embroidery stops exactly where the yoke ends — one clean horizontal line, and everything below it is left plain. The skirt is cut on a gentle flare with side vents so it moves without riding.",
    fabric: "Khaddar-cotton with hand-worked embroidery and a mul lining through the bodice.",
    care: "Hand wash cold with a mild detergent. Dry flat in shade. Warm iron on reverse.",
    details: [
      "Hand-worked yoke in a single horizontal line",
      "Side vents to mid-thigh",
      "Concealed placket with four self-covered buttons",
      "Fluted skirt cut with eight panels",
      "Knee length with a curved hem",
    ],
    delivery: DELIVERY_STANDARD,
    returns: RETURNS_STANDARD,
    badge: "Signature",
    isNew: false,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 58,
    stylistNote:
      "With flat jutti and wide trousers underneath. Never with a heel — it kills the line.",
  },
  {
    slug: "rania-indigo-panel-kameez",
    name: "Rania Indigo Panel Kameez",
    subtitle: "Indigo kameez with a contrast front panel",
    price: 31500,
    category: "Kameez",
    collections: ["elan", "aura"],
    colors: [
      { name: "Deep Indigo", hex: "#3c4a6b" },
      { name: "Mauve", hex: "#9b7f96" },
      { name: "Warm Ivory", hex: "#faf5ee" },
    ],
    sizes: APPAREL_SIZES,
    images: ["elaIndigo", "elaIndigoKameez", "elaIndigoStudio"],
    imageAlts: [
      "Model in a blue embroidered dress seated, showing the Rania panel kameez",
      "The Rania kameez in indigo with a beige shawl, photographed front on",
      "The Rania kameez in an indigo studio treatment with a embroidered contrast panel",
    ],
    shortDescription:
      "An indigo kameez built around a contrast front panel, with embroidery worked only across the panel.",
    story:
      "Rania began as a colour problem. We wanted the depth of indigo without the flatness, and the answer was a panel in a different weight of the same dye lot. The embroidery follows the panel edge — a single line of resham that turns a colour block into a border.",
    fabric: "Silk-cotton with a contrast front panel in a heavier weave, resham embroidery.",
    care: "Dry clean recommended. Cool iron on reverse. Store away from direct light.",
    details: [
      "Contrast front panel in a heavier weave of the same dye lot",
      "Single line of resham embroidery along the panel edge",
      "Three-quarter sleeve with a turned cuff",
      "Side slits to mid-thigh",
      "Full-length with a side slit to the ankle",
    ],
    delivery: DELIVERY_STANDARD,
    returns: RETURNS_STANDARD,
    badge: "Archive",
    isNew: false,
    isBestSeller: false,
    rating: 4.7,
    reviewCount: 46,
    stylistNote:
      "Add the Nimra shawl in espresso over the top and the whole thing becomes evening.",
  },

  /* ---------------------------------------------------------------- NOOR -- */
  {
    slug: "gulnar-taupe-mul-chikankari-set",
    name: "Gulnar Taupe Mul Chikankari Set",
    subtitle: "Tonal mul chikankari over a tapered trouser",
    price: 27500,
    compareAtPrice: 32000,
    category: "Kameez",
    collections: ["noor"],
    colors: [
      { name: "Warm Taupe", hex: "#a88f7d" },
      { name: "Soft Ivory", hex: "#f3ece2" },
      { name: "Muted Rose", hex: "#b4757f" },
    ],
    sizes: APPAREL_SIZES,
    images: ["noorTaupe", "noorPista", "noorKhaddar"],
    imageAlts: [
      "Model in an embroidered taupe kameez with a pink dupatta, the Gulnar set",
      "The Gulnar set in a pistachio tonal treatment in soft sunlight",
      "Detail of the Gulnar set's embroidered khaddar surface",
    ],
    shortDescription:
      "Tone-on-tone mul chikankari worked across the yoke and cuffs, worn with a slim tapered trouser.",
    story:
      "Gulnar began as a study in restraint — what happens when a classic shalwar kameez is stripped of everything ornamental except the hand itself. The chikankari is worked in the same family of tone as the ground, so it reads as texture from a distance and as pattern from two feet away. This is the piece we re-draft more often than any other, and we are not finished with it.",
    fabric: "Cotton lawn with mul chikankari, mulleton trouser and a printed chiffon dupatta.",
    care: "Hand wash separately in cold water. Dry in shade. Iron on reverse at medium heat.",
    details: [
      "Mul chikankari worked across the yoke and both cuffs",
      "Concealed side zip with a self-covered placket",
      "Tapered trouser with a 2.5 inch hem allowance",
      "Printed chiffon dupatta with a hand-rolled edge",
      "Quarter-length sleeve with a slight bell finish",
    ],
    delivery: DELIVERY_STANDARD,
    returns: RETURNS_STANDARD,
    badge: "Signature",
    isNew: false,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 118,
    stylistNote:
      "Best with a wide gold bangle and flat jutti. Keep the hem mid-calf so the trouser reads.",
  },
  {
    slug: "zohra-blush-embellished-kameez",
    name: "Zohra Blush Embellished Kameez",
    subtitle: "Blush kameez with a worked yoke and slim trouser",
    price: 29800,
    category: "Kameez",
    collections: ["noor"],
    colors: [
      { name: "Blush Rose", hex: "#d7a3a8" },
      { name: "Warm Ivory", hex: "#faf5ee" },
      { name: "Dusty Rose", hex: "#c08a92" },
    ],
    sizes: APPAREL_SIZES,
    images: ["noorBlushKurta", "noorFloral", "portraitLahorePink"],
    imageAlts: [
      "Model in a blush embellished kameez with a scarf, photographed indoors",
      "The Zohra kameez in a floral treatment, studio lit",
      "The Zohra kameez worn outdoors in Lahore afternoon light",
    ],
    shortDescription:
      "A blush kameez with embellishment worked across the yoke, cut long and worn over a slim straight trouser.",
    story:
      "Zohra exists because our clients asked for a kameez that could go to a Friday meeting and to a dinner on Saturday without a change. The embellishment is placed only on the yoke, so the body of the garment stays completely plain and the piece reads as quiet from across a room.",
    fabric: "Fine-count lawn with a worked yoke and a mulleton straight trouser.",
    care: "Machine wash cold on a gentle cycle. Dry in shade. Cool iron on reverse.",
    details: [
      "Embellishment worked across the yoke only",
      "Straight cut with side vents to mid-thigh",
      "Matching slim straight trouser",
      "Full-length kameez with a 2 inch let-down allowance",
      "Quarter-length sleeve",
    ],
    delivery: DELIVERY_STANDARD,
    returns: RETURNS_STANDARD,
    isNew: true,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 74,
    stylistNote:
      "Buy it in two colourways. You will not wear the same one twice in a season.",
  },
  {
    slug: "meh-e-noor-sheer-dupatta-ensemble",
    name: "Meh-e-Noor Sheer Dupatta Ensemble",
    subtitle: "Light kameez under a weighted sheer dupatta",
    price: 36500,
    category: "Kameez",
    collections: ["noor", "veil"],
    colors: [
      { name: "Soft Ivory", hex: "#f3ece2" },
      { name: "Pista", hex: "#b9c4a3" },
      { name: "Mauve", hex: "#9b7f96" },
    ],
    sizes: APPAREL_SIZES,
    images: ["noorSheer", "veilHead", "noorEmbroider"],
    imageAlts: [
      "Model in an embroidered kameez with a sheer dupatta, the Meh-e-Noor ensemble",
      "The Meh-e-Noor ensemble with the dupatta drawn over the head",
      "Detail of the Meh-e-Noor kameez's embroidered surface",
    ],
    shortDescription:
      "A light embroidered kameez under a full-weight sheer dupatta, weighted at the edge so it falls rather than floats.",
    story:
      "Every cheap dupatta floats, and a floating dupatta undoes a good kameez. We weighted the hem of this one with a fine chain so it hangs in a single line from the shoulder — a small piece of engineering that took two seasons to get right and is the reason this kameez photographs the way it does.",
    fabric:
      "Fine lawn kameez with hand-worked embroidery, organza dupatta with a weighted hem chain.",
    care: "Dry clean only. Store the dupatta flat. Press on reverse at low heat.",
    details: [
      "Weighted hem chain sewn into the dupatta edge",
      "Hand-worked embroidery across the front placket",
      "Full-length kameez with a deep side slit",
      "Dupatta measured at 70 × 260 cm",
      "Hand-rolled dupatta edge",
    ],
    delivery: DELIVERY_STANDARD,
    returns: RETURNS_STANDARD,
    badge: "New",
    isNew: true,
    isBestSeller: false,
    rating: 4.8,
    reviewCount: 29,
    stylistNote:
      "The dupatta is the point. Wear it over one shoulder, never both — both looks bridal.",
  },
  {
    slug: "sana-pista-floral-kameez",
    name: "Sana Pista Floral Kameez",
    subtitle: "Printed lawn kameez with a worked neckline",
    price: 18900,
    category: "Lawn",
    collections: ["noor", "aura"],
    colors: [
      { name: "Pista", hex: "#b9c4a3" },
      { name: "Soft Ivory", hex: "#f3ece2" },
      { name: "Dusty Rose", hex: "#c08a92" },
    ],
    sizes: APPAREL_SIZES,
    images: ["noorFloralNeck", "attireShalwar", "shalwarFloral"],
    imageAlts: [
      "Model in a floral shalwar kameez with a necklace, photographed in a Lahore studio",
      "The Sana kameez in a traditional shalwar kameez treatment",
      "The Sana kameez worn outdoors in a floral lawn",
    ],
    shortDescription:
      "A printed lawn kameez with a narrow worked neckline and a matching straight trouser — the everyday answer.",
    story:
      "Printed with wooden blocks carved in our Lahore studio, Sana is the piece our clients buy three of. It washes well, it layers under a coat, and it never dates. We have made it in eleven colourways and stopped at eleven on purpose.",
    fabric: "Mul cotton with a hand block print and a worked neckline border.",
    care: "Machine wash cold on a gentle cycle. Line dry in shade. Warm iron on reverse.",
    details: [
      "Hand block-printed front and back panel",
      "Narrow worked neckline border",
      "Matching straight trouser with a 2 inch let-down allowance",
      "Straight cut with side vents to mid-thigh",
      "Half placket with three self-covered buttons",
    ],
    delivery: DELIVERY_STANDARD,
    returns: RETURNS_STANDARD,
    isNew: false,
    isBestSeller: true,
    rating: 4.6,
    reviewCount: 142,
    stylistNote:
      "The one kameez to buy for the office. Tuck the front into the trouser to sharpen the line.",
  },

  /* ---------------------------------------------------------------- AURA -- */
  {
    slug: "neelam-jade-fusion-separates",
    name: "Neelam Jade Fusion Separates",
    subtitle: "Shortened kameez over a wide trouser",
    price: 26500,
    category: "Co-ords",
    collections: ["aura"],
    colors: [
      { name: "Jade", hex: "#4f6b57" },
      { name: "Blush Rose", hex: "#d7a3a8" },
      { name: "Warm Ivory", hex: "#faf5ee" },
    ],
    sizes: APPAREL_SIZES,
    images: ["auraJade", "auraGrass", "auraModern"],
    imageAlts: [
      "Model in a green embroidered dress with jewellery, the Neelam separates",
      "The Neelam separates in a pink and green treatment, worn outdoors on grass",
      "The Neelam separates photographed in a modern studio interior",
    ],
    shortDescription:
      "A hip-length kameez over a wide trouser, with the dupatta meant to be knotted rather than draped.",
    story:
      "Neelam is the clearest expression of what AURA is trying to do: keep the kameez, lose the formality. The body is shortened by four inches, the trouser is cut wide from the hip, and the dupatta is sold with a note asking you to knot it at the shoulder. It looks better tied than draped, and we will argue about that with anyone.",
    fabric: "Fine-count lawn kameez, wide tencel-blend trouser and a chiffon dupatta.",
    care: "Machine wash cold on a gentle cycle. Dry in shade. Cool iron.",
    details: [
      "Kameez shortened to four inches above the natural hip",
      "Wide-leg trouser with a flat front and elasticated back waist",
      "Dupatta cut for shoulder knotting at 70 × 220 cm",
      "Collarless placket with three concealed buttons",
      "Side vents to mid-thigh",
    ],
    delivery: DELIVERY_STANDARD,
    returns: RETURNS_STANDARD,
    badge: "New",
    isNew: true,
    isBestSeller: true,
    rating: 4.7,
    reviewCount: 62,
    stylistNote:
      "Knot the dupatta on the left shoulder and let the wide leg do the rest.",
  },
  {
    slug: "ira-ember-kurta-trouser",
    name: "Ira Ember Kurta & Trouser",
    subtitle: "Embroidered kurta with a wide summer trouser",
    price: 22400,
    compareAtPrice: 26000,
    category: "Lawn",
    collections: ["aura"],
    colors: [
      { name: "Ember", hex: "#c2703a" },
      { name: "Pista", hex: "#b9c4a3" },
      { name: "Sage", hex: "#a9b39a" },
    ],
    sizes: APPAREL_SIZES,
    images: ["auraEmber", "auraCoral", "auraSage"],
    imageAlts: [
      "Model in an ember embroidered kameez with a light dupatta",
      "The Ira kurta in a floral orange treatment, indoors",
      "The Ira kurta in a light green traditional treatment",
    ],
    shortDescription:
      "An embroidered kurta in ember, cut for summer with a wide trouser in the same dye lot.",
    story:
      "Ira is the piece we send people who are going to be photographed in daylight and do not want to look like they tried. The embroidery is worked in a green from the same dye lot as the trouser, which means the whole outfit is two colours and reads deliberate rather than assembled.",
    fabric: "Slub cotton with hand embroidery, wide cotton trouser and a chiffon dupatta.",
    care: "Machine wash cold on a gentle cycle. Do not soak. Dry in shade.",
    details: [
      "Hand embroidery in a matching green thread",
      "Wide-leg trouser with a 3 inch hem allowance",
      "Side slits to mid-thigh",
      "Quarter-length sleeve with a worked cuff",
      "Full-length kurta",
    ],
    delivery: DELIVERY_STANDARD,
    returns: RETURNS_STANDARD,
    badge: "Archive",
    isNew: false,
    isBestSeller: false,
    rating: 4.6,
    reviewCount: 38,
    stylistNote:
      "The easiest thing in AURA to dress up — add gold at the ear and nothing else.",
  },
  {
    slug: "tara-mint-coord",
    name: "Tara Mint Co-ord",
    subtitle: "Minimal co-ord in a soft mint lawn",
    price: 24200,
    category: "Co-ords",
    collections: ["aura", "noor"],
    colors: [
      { name: "Soft Mint", hex: "#b7ccc0" },
      { name: "Warm Ivory", hex: "#faf5ee" },
      { name: "Mauve", hex: "#9b7f96" },
    ],
    sizes: APPAREL_SIZES,
    images: ["auraMint", "portraitLahoreC", "noorBlushSet"],
    imageAlts: [
      "Model in a light green traditional outfit with a white dupatta, the Tara co-ord",
      "The Tara co-ord in a portrait treatment, Lahore",
      "The Tara co-ord in a studio-set blush treatment",
    ],
    shortDescription:
      "A collarless shirt and wide trouser in soft mint lawn — the quietest co-ord we make.",
    story:
      "Tara has no embroidery at all, which after a decade of working with our embroiderers felt worth doing. Everything on this piece is in the cloth: a collarless placket, a single covered button at the throat, and a trouser wide enough to read as a skirt when you stand still. It is the piece our own team wears most.",
    fabric: "Fine-count mint lawn with a matching wide trouser and a sheer white dupatta.",
    care: "Machine wash cold on a gentle cycle. Line dry in shade. Warm iron.",
    details: [
      "Collarless shirt with a single covered button at the throat",
      "Wide trouser with an elasticated back waist",
      "Sheer white dupatta with a hand-rolled edge",
      "No embellishment — the cloth is the detail",
      "Garment-washed for immediate softness",
    ],
    delivery: DELIVERY_STANDARD,
    returns: RETURNS_STANDARD,
    isNew: true,
    isBestSeller: false,
    rating: 4.5,
    reviewCount: 27,
    stylistNote:
      "Wear the shirt out over the trouser and leave the sleeves pushed. That is the whole styling.",
  },
  {
    slug: "rayan-seated-modern-coord",
    name: "Rayan Seated Modern Co-ord",
    subtitle: "Embroidered kameez with a matching straight trouser",
    price: 25700,
    category: "Co-ords",
    collections: ["aura"],
    colors: [
      { name: "Dusty Rose", hex: "#c08a92" },
      { name: "Jade", hex: "#4f6b57" },
      { name: "Soft Ivory", hex: "#f3ece2" },
    ],
    sizes: APPAREL_SIZES,
    images: ["auraSeated", "attireTraditionalB", "attireIndoor"],
    imageAlts: [
      "Model in an embroidered dress seated in a styled interior, the Rayan co-ord",
      "The Rayan co-ord in a traditional indoor treatment",
      "The Rayan co-ord photographed indoors in a dressed room",
    ],
    shortDescription:
      "An embroidered kameez with a matching straight trouser, cut to sit well and to travel folded.",
    story:
      "Rayan is drafted for someone who is on a train for four hours and then has to look composed. The kameez is cut straight with a clean shoulder, the trouser is straight rather than slim, and there is not one button on the piece that can come undone in transit. It is the least decorative thing we make and the one that sells best in October.",
    fabric: "Cotton cambric with embroidery, straight cotton trouser and a chiffon dupatta.",
    care: "Machine wash cold on a gentle cycle. Dry in shade. Warm iron on reverse.",
    details: [
      "Straight cut with a clean, unpadded shoulder",
      "Straight trouser with a flat front and two side pockets",
      "No closures that can open in transit",
      "Dupatta with a hand-rolled edge at 70 × 220 cm",
      "Side slits to mid-thigh",
    ],
    delivery: DELIVERY_STANDARD,
    returns: RETURNS_STANDARD,
    isNew: false,
    isBestSeller: false,
    rating: 4.5,
    reviewCount: 21,
    stylistNote:
      "Roll it, do not fold it. The embroidery survives a suitcase better than most things.",
  },

  /* ---------------------------------------------------------------- VEIL -- */
  {
    slug: "lail-architectured-kameez",
    name: "Lail Architectured Kameez",
    subtitle: "Floor-length kameez in embroidered blush",
    price: 39800,
    category: "Kameez",
    collections: ["veil", "signature"],
    colors: [
      { name: "Blush Rose", hex: "#d7a3a8" },
      { name: "Warm Champagne", hex: "#d9b98a" },
      { name: "Soft Ivory", hex: "#f3ece2" },
    ],
    sizes: APPAREL_SIZES,
    images: ["veilArch", "veilStudio", "noorKurtaTrouser"],
    imageAlts: [
      "Model in an embroidered blush kameez set against Lahore architecture",
      "The Lail kameez photographed indoors in a styled room",
      "Detail of the Lail kameez's embroidered trouser set",
    ],
    shortDescription:
      "A floor-length embroidered kameez in blush, with a full sleeve and a hem that stops at the ankle.",
    story:
      "Lail is the answer to the question we get most: can modest dressing be the most elegant thing in the room. It can, but only if the cloth has weight and the sleeve actually reaches the wrist. Everything here is generous — the kameez, the sleeve, the dupatta — and nothing is visible that should not be.",
    fabric: "Chanderi with hand embroidery, matching trouser and a full dupatta.",
    care: "Dry clean only. Store folded with tissue. Press on reverse at low heat.",
    details: [
      "Floor-length kameez with an ankle-length hem",
      "Full sleeve reaching the wrist with a worked cuff",
      "Hand embroidery across the front placket and hem",
      "Matching straight trouser",
      "Dupatta measured at 70 × 280 cm",
    ],
    delivery: DELIVERY_COUTURE,
    returns: RETURNS_FINAL,
    badge: "Signature",
    isNew: false,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 51,
    stylistNote:
      "The safest and the smartest thing in the house. Nothing to coordinate, nothing to get wrong.",
  },
  {
    slug: "hina-garden-floor-kameez",
    name: "Hina Garden Floor Kameez",
    subtitle: "Garden-weight floor kameez with a long dupatta",
    price: 33400,
    category: "Kameez",
    collections: ["veil"],
    colors: [
      { name: "Sage", hex: "#a9b39a" },
      { name: "Warm Ivory", hex: "#faf5ee" },
      { name: "Dusty Rose", hex: "#c08a92" },
    ],
    sizes: APPAREL_SIZES,
    images: ["veilGarden", "veilGardenSoft", "veilOutdoor"],
    imageAlts: [
      "Model in a traditional dress posing in a green Lahore garden",
      "The Hina kameez in a garden setting, photographed in natural light",
      "The Hina kameez worn outdoors with floral planting in the foreground",
    ],
    shortDescription:
      "A floor-length kameez in sage, cut in a cloth light enough for an outdoor evening and heavy enough to fall.",
    story:
      "Hina was made for the hour between a day outdoors and a dinner indoors, which is the hour most Pakistani clothing fails. The lawn is fine-count but finished with a light silk warp, so it breathes at four in the afternoon and still hangs properly at nine at night. We photograph it in a garden because it was designed in one.",
    fabric: "Fine-count lawn with a light silk warp, matching trouser and a long chiffon dupatta.",
    care: "Hand wash cold. Dry in shade. Iron on reverse at medium heat.",
    details: [
      "Floor length with a 3 inch let-down allowance",
      "Light silk warp for fall without weight",
      "Long dupatta measured at 70 × 280 cm",
      "Side vents to the knee",
      "Narrow worked neckline border",
    ],
    delivery: DELIVERY_STANDARD,
    returns: RETURNS_STANDARD,
    isNew: true,
    isBestSeller: false,
    rating: 4.7,
    reviewCount: 22,
    stylistNote:
      "Bring a shawl for the second half of the evening. Everyone does, and nobody minds.",
  },
  {
    slug: "nimra-shawl-wrapped-long-coat",
    name: "Nimra Shawl-Wrapped Long Coat",
    subtitle: "Embroidered long coat worn over a kameez",
    price: 44500,
    category: "Outerwear",
    collections: ["veil", "signature"],
    colors: [
      { name: "Espresso", hex: "#3a2a24" },
      { name: "Deep Plum", hex: "#4a2338" },
      { name: "Antique Gold", hex: "#b08d4f" },
    ],
    sizes: APPAREL_SIZES,
    images: ["veilStudioSoft", "attireJewellery", "attireLahore"],
    imageAlts: [
      "Model in traditional Pakistani attire seated gracefully, wearing the Nimra coat",
      "The Nimra long coat styled with jewellery in a Lahore setting",
      "The Nimra long coat in a traditional Lahore interior",
    ],
    shortDescription:
      "An embroidered long coat in espresso, worn open over a kameez and falling to mid-calf.",
    story:
      "Nimra is a coat that happens to be modest. It is cut from a heavy silk blend, falls to mid-calf, and is meant to be worn open over a kameez — which means it has to be drafted with a facing wide enough to look finished from behind. Ours is six inches. That detail is why it photographs well and why it took three rounds.",
    fabric: "Heavy silk-blend coat with hand embroidery, fully lined through the body.",
    care: "Dry clean only. Store on a broad hanger. Never fold the embroidery.",
    details: [
      "Falls to mid-calf when worn open over a kameez",
      "Six-inch facing so the back reads finished",
      "Hand embroidery across the front placket and cuffs",
      "Full lining through the body and sleeve",
      "Horn-look covered buttons at the closure",
    ],
    delivery: DELIVERY_COUTURE,
    returns: RETURNS_FINAL,
    badge: "Limited",
    isNew: false,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 64,
    stylistNote:
      "Wear it open, over the Gulnar set in Soft Ivory. Closed, it becomes a different — and worse — outfit.",
  },

  /* ----------------------------------------------------------- SIGNATURE -- */
  {
    slug: "velvet-noor-signature-kameez",
    name: "Velvet Noor Signature Kameez",
    subtitle: "Cut-velvet kameez with couture hand-work",
    price: 68000,
    category: "Kameez",
    collections: ["signature"],
    colors: [
      { name: "Deep Plum", hex: "#4a2338" },
      { name: "Espresso", hex: "#3a2a24" },
      { name: "Aubergine", hex: "#3a1f33" },
    ],
    sizes: APPAREL_SIZES,
    images: ["sigVelvetDeep", "sigVelvetSoft", "sigLuxe"],
    imageAlts: [
      "Model in a cut velvet eastern dress inside a Lahore interior",
      "The Velvet Noor kameez in a soft velvet interior treatment",
      "The Velvet Noor kameez with couture hand-work, photographed indoors",
    ],
    shortDescription:
      "A cut-velvet kameez with couture hand-work at the neckline, made in a run of thirty per colourway.",
    story:
      "Velvet Noor took eleven weeks. The velvet is cut, not crushed, so it holds a directional pile across the body — which means the kameez has to be cut on a consistent grain all the way around, or the light breaks in the wrong place. The hand-work is applied motif by motif and there are one hundred and six of them.",
    fabric: "Silk-cut velvet with couture hand-work, full satin lining and a matching trouser.",
    care: "Dry clean only. Hang on a padded hanger. Brush the pile in one direction.",
    details: [
      "Silk-cut velvet with a directional pile",
      "One hundred and six hand-worked motifs at the neckline",
      "Full satin lining through the body and sleeve",
      "Matching straight trouser in the same velvet",
      "Limited run of thirty pieces per colourway",
    ],
    delivery: DELIVERY_COUTURE,
    returns: RETURNS_FINAL,
    badge: "Limited",
    isNew: false,
    isBestSeller: true,
    rating: 5,
    reviewCount: 19,
    stylistNote:
      "Keep the jewellery short and let the neckline do the talking. Two earrings fight this piece.",
  },
  {
    slug: "aurora-blush-couture-kameez",
    name: "Aurora Blush Couture Kameez",
    subtitle: "Couture-cut kameez in blush with a long drape",
    price: 62500,
    category: "Kameez",
    collections: ["signature"],
    colors: [
      { name: "Blush Rose", hex: "#d7a3a8" },
      { name: "Warm Champagne", hex: "#d9b98a" },
      { name: "Soft Ivory", hex: "#f3ece2" },
    ],
    sizes: APPAREL_SIZES,
    images: ["sigBlush", "sigBlushArch", "craftSleeve"],
    imageAlts: [
      "Model in a vibrant blush embroidered kameez with couture hand-work",
      "The Aurora kameez in blush against Lahore architecture",
      "Detail of the Aurora kameez's embroidered sleeve",
    ],
    shortDescription:
      "A couture-cut kameez in blush, with a long drape and hand-worked sleeve running to the wrist.",
    story:
      "Aurora is built around one sleeve. The hand-work runs the full length of it, from shoulder to wrist, and the sleeve is set into the armhole at a shallower angle than we would normally draft so the embroidery follows the arm rather than the seam. It is the single most expensive thing our sample room has ever produced.",
    fabric: "Silk-blend with a hand-worked sleeve, draped dupatta and full lining.",
    care: "Dry clean only. Store in the garment bag provided. Never fold the sleeve.",
    details: [
      "Hand-worked sleeve running shoulder to wrist",
      "Shallow armhole set so the work follows the arm",
      "Floor-length with a long side drape",
      "Full lining through the body",
      "Limited run of thirty pieces per colourway",
    ],
    delivery: DELIVERY_COUTURE,
    returns: RETURNS_FINAL,
    badge: "Signature",
    isNew: false,
    isBestSeller: false,
    rating: 4.9,
    reviewCount: 26,
    stylistNote:
      "Book the fitting. The sleeve is the only place this look can go wrong, and we can fix it.",
  },
  {
    slug: "mehr-statement-cutwork-kameez",
    name: "Mehr Statement Cut-Work Kameez",
    subtitle: "Cut-work kameez in ivory with a worked cuff",
    price: 47500,
    category: "Kameez",
    collections: ["signature", "noor"],
    colors: [
      { name: "Soft Ivory", hex: "#f3ece2" },
      { name: "Warm Champagne", hex: "#d9b98a" },
      { name: "Dusty Rose", hex: "#c08a92" },
    ],
    sizes: APPAREL_SIZES,
    images: ["craftPortrait", "noorEmbroiderAlt", "sigEmbellish"],
    imageAlts: [
      "Portrait of a model in a traditional embroidered kameez with a dupatta",
      "Detail of the Mehr kameez's cut-work and embroidered surface",
      "The Mehr kameez styled with jewellery in a formal setting",
    ],
    shortDescription:
      "An ivory kameez with cut-work at the neckline and a heavily worked cuff, cut long and clean through the body.",
    story:
      "Mehr is the house's quietest couture piece — no bead, no sequin, no stone. Everything is cut-work, which means the pattern is made by removing thread rather than adding it. Done well it looks like lace; done badly it looks like a mistake. Ours took four attempts before the neckline held.",
    fabric: "Silk-cotton with cut-work at the neckline and a worked cuff, full lining.",
    care: "Dry clean only. Store flat in the muslin wrap provided.",
    details: [
      "Cut-work neckline made by removing thread, not adding it",
      "Heavily worked cuff on both sleeves",
      "Floor length with a clean, unpadded body",
      "Full lining through the bodice",
      "Matching straight trouser",
    ],
    delivery: DELIVERY_COUTURE,
    returns: RETURNS_FINAL,
    badge: "New",
    isNew: true,
    isBestSeller: false,
    rating: 4.8,
    reviewCount: 17,
    stylistNote:
      "Ivory against skin, and nothing else. No jewellery — the neckline is the whole story.",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCollection(slug: CollectionSlug): Product[] {
  return products.filter((product) => product.collections.includes(slug));
}

export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const current = getProduct(slug);
  if (!current) return products.slice(0, limit);

  const scored = products
    .filter((product) => product.slug !== slug)
    .map((product) => {
      let score = 0;
      if (product.category === current.category) score += 3;
      score += product.collections.filter((c) => current.collections.includes(c)).length * 2;
      if (product.colors.some((c) => current.colors.some((cc) => cc.name === c.name))) score += 1;
      return { product, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((entry) => entry.product);
}

export const featuredProducts = products.filter((product) => product.isBestSeller).slice(0, 8);
export const newArrivals = products.filter((product) => product.isNew);