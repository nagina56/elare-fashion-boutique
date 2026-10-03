export const siteConfig = {
  name: "ELARÉ",
  tagline: "Modern Elegance, Made to Be Remembered.",
  description:
    "ELARÉ is a Pakistani dressmaking house from Lahore — five chapters of kameez, lawn, co-ords and floor-length tailoring, hand-worked in Gulberg and cut from cloth chosen to last.",
  url: "https://www.elare.studio",
  email: "atelier@elare.pk",
  phone: "+92 42 3577 0142",
  whatsapp: "+92 300 3577 0142",
  whatsappHref: "https://wa.me/9230035770142",
  address: {
    line1: "Studio 4, Zamzama Boulevard",
    line2: "Gulberg III",
    city: "Lahore",
    postcode: "54660",
    country: "Pakistan",
  },
  hours: [
    { days: "Monday — Friday", time: "11:00 — 20:00" },
    { days: "Saturday", time: "12:00 — 21:00" },
    { days: "Sunday", time: "By appointment" },
  ],
  social: [
    { label: "Instagram", handle: "@elare.studio", href: "https://instagram.com/" },
    { label: "Pinterest", handle: "ELARÉ Studio", href: "https://pinterest.com/" },
    { label: "LinkedIn", handle: "ELARÉ Atelier", href: "https://linkedin.com/" },
  ],
  freeShippingThreshold: 20000,
  shippingFlatRate: 450,
  deliveryWindow: "2 — 4 working days",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const sizeGuideRows = [
  { size: "XS", bust: "32 in", waist: "26 in", length: "38 in", hip: "35 in" },
  { size: "S", bust: "34 in", waist: "28 in", length: "39 in", hip: "37 in" },
  { size: "M", bust: "36 in", waist: "30 in", length: "40 in", hip: "39 in" },
  { size: "L", bust: "38 in", waist: "32 in", length: "41 in", hip: "41 in" },
  { size: "XL", bust: "40 in", waist: "34 in", length: "42 in", hip: "43 in" },
];
