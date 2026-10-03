/**
 * Central image manifest for ELARÉ.
 *
 * Every entry is a hotlink-verified CDN asset (HTTP 200) depicting Pakistani
 * dress silhouettes — kameez, shalwar kameez, lawn, chikankari, dupatta —
 * photographed in Lahore. Nothing in this manifest is Western fashion, and no
 * image is reused across two products.
 *
 * Sizing params are applied by `next/image`, so we only store base URLs here.
 */

const UNSPLASH = "https://images.unsplash.com";
const PEXELS = "https://images.pexels.com/photos";

/** Unsplash asset id, e.g. `photo-1773439878437-11da66df98e9`. */
type UnsplashId = `photo-${string}`;
/** Pexels numeric photo id. */
type PexelsId = `${number}`;

const u = (id: UnsplashId) => `${UNSPLASH}/${id}`;
const p = (id: PexelsId) => `${PEXELS}/${id}/pexels-photo-${id}.jpeg`;

const raw = {
  // --- Opening frames ---------------------------------------------------
  /** Ornate eastern kameez framed by Lahore architecture — the house hero. */
  heroOrnate: p("34182978"),

  // --- ÉLAN · contemporary formalwear -----------------------------------
  elaFormal: u("photo-1773439877255-55e63cf17b2c"),
  elaNoir: u("photo-1773439878258-3c5fa24afa75"),
  elaLilac: u("photo-1773439877326-2e8d114ffdf7"),
  elaCharcoal: u("photo-1773439877855-cd193d949717"),
  elaPlumSculpt: p("36325956"),
  elaIndigo: p("36325918"),
  elaIndigoKameez: u("photo-1773439877368-64c055ca440b"),
  elaIndigoStudio: p("36325952"),
  elaSculpt: p("28390566"),
  elaSculptAlt: p("28390506"),
  elaSky: u("photo-1773439877821-5263730dd799"),
  elaSkyKameez: p("20791992"),
  elaBluePattern: p("20690518"),
  elaEspresso: p("19956428"),

  // --- NOOR · refined traditional silhouettes ---------------------------
  noorTaupe: u("photo-1773439878437-11da66df98e9"),
  noorPista: p("28512779"),
  noorKhaddar: p("19556885"),
  noorBlushKurta: p("22064199"),
  noorBlushSet: p("14975739"),
  noorFloral: p("20690539"),
  noorFloralNeck: p("20690517"),
  noorEmbroider: p("18898090"),
  noorEmbroiderAlt: p("18898082"),
  noorSheer: p("36325834"),
  noorSalwar: p("25184999"),
  noorKurtaTrouser: p("19281311"),
  noorKurtaShalwar: p("19281310"),

  // --- AURA · modern fusion ---------------------------------------------
  auraGrass: u("photo-1773439878916-eaeacd159a68"),
  auraMint: u("photo-1773439877245-79b5ac3244a8"),
  auraSage: u("photo-1773439878222-c383967772de"),
  auraJade: p("19956021"),
  auraEmber: p("25184994"),
  auraCoral: p("20690524"),
  auraModern: p("20420559"),
  auraEthnic: p("19589520"),
  auraSeated: p("19511768"),

  // --- VEIL · sophisticated modest fashion ------------------------------
  veilArch: p("36634897"),
  veilGarden: p("28771744"),
  veilGardenSoft: p("28771741"),
  veilHead: p("20702643"),
  veilStudio: p("27603169"),
  veilStudioSoft: p("27603247"),
  veilStudioBright: p("27603173"),
  veilOutdoor: p("36567505"),
  veilStreet: p("31526074"),

  // --- SIGNATURE · statement pieces -------------------------------------
  sigVelvetDeep: p("34688076"),
  sigVelvetSoft: p("34182999"),
  sigLuxe: p("36325964"),
  sigBlush: u("photo-1773439879035-4a2f33b30bbc"),
  sigBlushArch: p("28213798"),
  sigEmbellish: p("19956418"),

  // --- Studio set: wider the frame, softer the light --------------------
  portraitLahoreA: p("31874435"),
  portraitLahorePink: p("31874436"),
  portraitLahoreEditorial: p("31874439"),
  portraitLahoreB: p("33210490"),
  portraitLahoreC: p("33210502"),
  studioLahoreA: p("33210511"),
  studioLahoreB: p("33210524"),
  studioLahoreC: p("33300898"),
  studioLahoreD: p("33667874"),
  attireTraditional: p("35485411"),
  attireTraditionalB: p("31874438"),
  attireTraditionalC: p("28851459"),
  attireLahore: p("29413534"),
  attireChic: p("29413568"),
  attireIndoor: p("29413648"),
  attireShalwar: p("31874448"),
  attireJewellery: p("28771729"),
  shalwarFloral: p("31323212"),
  craftPortrait: p("20792015"),
  craftSleeve: p("36567502"),
} as const satisfies Record<string, string>;

export type ImageKey = keyof typeof raw;

/** Base CDN URL for a manifest key — useful for CSS backgrounds and preload. */
export function imageUrl(key: ImageKey): string {
  return raw[key];
}

/** Ready-to-use src string for `next/image` with an explicit width. */
export function imageSrc(key: ImageKey, width: number): string {
  return `${raw[key]}?auto=format&fit=crop&w=${width}&q=72`;
}