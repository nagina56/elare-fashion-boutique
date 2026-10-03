import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/commerce/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { imageSrc } from "@/lib/images";
import { siteConfig } from "@/lib/site";
import {
  ArrowRightIcon,
  InstagramIcon,
  LinkedInIcon,
  PinterestIcon,
  RulerIcon,
  TruckIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach the ELARÉ atelier in Gulberg, Lahore. Private fittings, styling advice, order help and WhatsApp — we reply within one working day.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
};

const FAQS = [
  {
    question: "How quickly do you reply?",
    answer:
      "Within one working day, Tuesday to Saturday. Messages sent Sunday or Monday are answered Tuesday morning. If it is urgent — a wedding this weekend, say — WhatsApp is faster than email.",
  },
  {
    question: "Do you offer alterations?",
    answer:
      "Yes. We shorten and adjust at the atelier in Gulberg, usually within four working days, and at no charge for the first adjustment on any piece. Bring the garment and we will tell you honestly what is possible.",
  },
  {
    question: "Can I book a private fitting?",
    answer:
      "Private fittings run Tuesday to Saturday by appointment. Write with two or three dates that suit you and a rough idea of what you are looking for, and we will confirm one.",
  },
  {
    question: "What does delivery cost?",
    answer: `Free across Pakistan on orders above PKR ${siteConfig.freeShippingThreshold.toLocaleString("en-PK")}, and PKR ${siteConfig.shippingFlatRate} below that. Lahore same-day, elsewhere ${siteConfig.deliveryWindow}.`,
  },
  {
    question: "Do you ship outside Pakistan?",
    answer:
      "Not at the moment. We are working through customs and packaging for the UK, UAE and Canada, and expect to open that in the next season. Write if you are outside Pakistan and we will tell you when it is live.",
  },
];

export default function ContactPage() {
  const socialIcons = {
    Instagram: InstagramIcon,
    Pinterest: PinterestIcon,
    LinkedIn: LinkedInIcon,
  } as const;

  return (
    <>
      <PageHeader
        eyebrow="Client Care"
        title="Talk to the atelier"
        intro="One of us reads every message. For styling advice, order questions, alterations or a private fitting, this is the fastest way to reach us."
        image="veilStudio"
        imageAlt="A finished embroidered kameez in the ELARÉ fitting room"
      />

      {/* Quick actions */}
      <section className="border-b border-plum-800/10 bg-ivory-50">
        <div className="container-elare grid gap-px overflow-hidden sm:grid-cols-3">
          {[
            {
              icon: WhatsAppIcon,
              label: "WhatsApp",
              value: siteConfig.whatsapp,
              href: siteConfig.whatsappHref,
              note: "Fastest — usually within the hour",
            },
            {
              icon: TruckIcon,
              label: "Order tracking",
              value: siteConfig.email,
              href: `mailto:${siteConfig.email}`,
              note: "Include your order number",
            },
            {
              icon: RulerIcon,
              label: "Sizing help",
              value: "Send us your measurements",
              href: "#message",
              note: "We will tell you if it will not work",
            },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group/quick flex items-start gap-4 px-1 py-8 transition-colors duration-400 sm:px-6"
            >
              <span className="grid h-11 w-11 shrink-0 place-content-center rounded-full border border-champagne-500/50 text-plum-800">
                <item.icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[0.6875rem] uppercase tracking-[0.16em] text-espresso-400">
                  {item.label}
                </span>
                <span className="mt-1.5 block font-display text-lg leading-snug text-plum-900">
                  {item.value}
                </span>
                <span className="mt-1 block text-xs text-espresso-400">{item.note}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Form + details */}
      <section className="container-elare py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          {/* Form */}
          <div id="message" className="scroll-mt-32">
            <p className="eyebrow text-rose-600">Send a message</p>
            <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)]">Tell us what you need</h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-espresso-500">
              The more you tell us — height, usual size, the occasion, what you have already tried —
              the more useful our answer will be. We would rather give you three honest suggestions
              than one sales line.
            </p>

            <div className="mt-10">
              <ContactForm />
            </div>
          </div>

          {/* Details */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-xl">The atelier</h2>

            <address className="mt-6 space-y-4 not-italic">
              <div className="border-l-2 border-champagne-500 pl-4">
                <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-espresso-400">
                  Address
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-espresso-600">
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.line2}
                  <br />
                  {siteConfig.address.city} {siteConfig.address.postcode}
                  <br />
                  {siteConfig.address.country}
                </p>
              </div>

              <div className="border-l-2 border-champagne-500 pl-4">
                <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-espresso-400">
                  Email
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="link-underline mt-1.5 block text-sm text-plum-800"
                >
                  {siteConfig.email}
                </a>
              </div>

              <div className="border-l-2 border-champagne-500 pl-4">
                <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-espresso-400">
                  Telephone
                </p>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="link-underline mt-1.5 block text-sm text-plum-800"
                >
                  {siteConfig.phone}
                </a>
              </div>
            </address>

            {/* Hours */}
            <div className="mt-8">
              <h3 className="eyebrow text-espresso-400">Opening hours</h3>
              <ul className="mt-4 divide-y divide-plum-800/10 border-y border-plum-800/10">
                {siteConfig.hours.map((entry) => (
                  <li key={entry.days} className="flex items-baseline justify-between gap-4 py-3.5">
                    <span className="text-sm text-espresso-600">{entry.days}</span>
                    <span className="text-sm tabular-nums text-plum-900">{entry.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div className="mt-8">
              <h3 className="eyebrow text-espresso-400">Follow the workroom</h3>
              <ul className="mt-4 space-y-2.5">
                {siteConfig.social.map((social) => {
                  const Icon = socialIcons[social.label as keyof typeof socialIcons];
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/social flex items-center justify-between gap-4 border-b border-plum-800/10 py-2.5 text-sm text-espresso-600 transition-colors duration-300 hover:text-rose-600"
                      >
                        <span className="flex items-center gap-3">
                          <Icon className="h-4 w-4 text-plum-800" />
                          {social.handle}
                        </span>
                        <ArrowRightIcon className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-400 group-hover/social:translate-x-0 group-hover/social:opacity-100" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Boutique photo */}
            <div className="relative mt-10 aspect-[4/5] w-full overflow-hidden bg-ivory-200">
              <Image
                src={imageSrc("studioLahoreB", 900)}
                alt="Model in a traditional Pakistani dress photographed inside the ELARÉ boutique"
                fill
                sizes="(min-width: 1024px) 40vw, 92vw"
                className="object-cover"
              />
            </div>

            <ButtonLink href="/shop" variant="outline" size="md" className="mt-6" fullWidth>
              Browse the collection
            </ButtonLink>
          </aside>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-plum-800/10 bg-plum-900 py-20 text-ivory-100 lg:py-28">
        <div className="container-elare">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="eyebrow text-champagne-300">Before you write</p>
              <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)] text-ivory-50">
                Answered already, most of the time
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory-200/65">
                If your question is here you will have your answer faster than we could send it. If it
                is not, write to us — we would rather answer a question twice than have you guess.
              </p>
            </div>

            <dl className="divide-y divide-ivory-100/12 border-y border-ivory-100/12">
              {FAQS.map((faq, index) => (
                <div key={faq.question} className="py-6">
                  <dt className="flex gap-5 text-lg text-ivory-50">
                    <span className="font-display text-lg text-champagne-300/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{faq.question}</span>
                  </dt>
                  <dd className="mt-3 pl-8 text-sm leading-relaxed text-ivory-200/65">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}