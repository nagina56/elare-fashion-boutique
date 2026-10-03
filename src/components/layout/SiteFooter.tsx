"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { collections } from "@/lib/collections";
import { imageSrc } from "@/lib/images";
import { siteConfig } from "@/lib/site";
import { cx } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import {
  ArrowRightIcon,
  CheckIcon,
  InstagramIcon,
  LinkedInIcon,
  PinterestIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";

const helpLinks = [
  { href: "/contact", label: "Contact the Atelier" },
  { href: "/shop", label: "Size Guide" },
  { href: "/shop", label: "Delivery & Returns" },
  { href: "/shop", label: "Care Instructions" },
  { href: "/lookbook", label: "Book a Fitting" },
];

const houseLinks = [
  { href: "/about", label: "Our Story" },
  { href: "/about", label: "Craftsmanship" },
  { href: "/about", label: "Sustainability" },
  { href: "/contact", label: "Careers" },
  { href: "/lookbook", label: "Press" },
];

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

    if (!isValid) {
      setStatus("error");
      setMessage("Enter a valid email address so we can reach you.");
      return;
    }

    setStatus("success");
    setMessage(`Thank you — we will write to ${email.trim()} before the next drop.`);
    setEmail("");
  }

  return (
    <footer className="relative mt-24 overflow-hidden bg-plum-900 text-ivory-100">
      {/* Atelier texture */}
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.07]">
        <Image
          src={imageSrc("noorKhaddar", 1600)}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne-300/50 to-transparent"
      />

      <div className="container-elare relative">
        {/* Newsletter */}
        <div className="grid gap-8 border-b border-ivory-100/12 py-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-16">
          <div>
            <p className="eyebrow text-champagne-300">The ELARÉ Letter</p>
            <h2 className="mt-3 max-w-md text-3xl text-ivory-100 sm:text-4xl">
              First look at every drop, and an invitation to each fitting.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory-200/65">
              Four letters a year, never more. New collections, restocks, and the occasional note
              from the atelier about how a piece is made.
            </p>
          </div>

          <div className="lg:pt-3">
            <form onSubmit={handleSubscribe} noValidate className="max-w-lg">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="footer-email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status !== "idle") {
                      setStatus("idle");
                      setMessage("");
                    }
                  }}
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={status === "error" ? true : undefined}
                  aria-describedby="footer-email-status"
                  className={cx(
                    "h-12 w-full border bg-transparent px-4 text-sm text-ivory-100 placeholder:text-ivory-200/40",
                    "transition-colors duration-300 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne-300",
                    status === "error"
                      ? "border-rose-400"
                      : "border-ivory-100/25 hover:border-champagne-300/60",
                  )}
                />
                <Button
                  type="submit"
                  variant="champagne"
                  size="md"
                  className="shrink-0 sm:w-auto"
                >
                  Subscribe
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1" />
                </Button>
              </div>

              <p
                id="footer-email-status"
                aria-live="polite"
                className={cx(
                  "mt-3 flex items-center gap-2 text-xs transition-opacity duration-300",
                  status === "error" && "text-rose-300",
                  status === "success" && "text-champagne-300",
                  status === "idle" && "text-ivory-200/45",
                )}
              >
                {status === "success" ? <CheckIcon className="h-3.5 w-3.5 shrink-0" /> : null}
                {status === "idle"
                  ? "No spam. Unsubscribe from any letter in one click."
                  : message}
              </p>
            </form>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:gap-8">
          <div>
            <Logo tone="light" size="lg" />
            <p className="mt-5 max-w-xs font-display text-lg italic leading-relaxed text-champagne-200/85">
              {siteConfig.tagline}
            </p>
            <address className="mt-5 space-y-0.5 text-sm not-italic leading-relaxed text-ivory-200/65">
              <p>{siteConfig.address.line1}</p>
              <p>
                {siteConfig.address.line2}, {siteConfig.address.city} {siteConfig.address.postcode}
              </p>
              <p>{siteConfig.address.country}</p>
              <p className="pt-2">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="link-underline transition-colors hover:text-champagne-300"
                >
                  {siteConfig.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="link-underline transition-colors hover:text-champagne-300"
                >
                  {siteConfig.phone}
                </a>
              </p>
            </address>
          </div>

          <nav aria-labelledby="footer-shop">
            <h3 id="footer-shop" className="eyebrow text-champagne-300">
              Shop
            </h3>
            <ul className="mt-4 space-y-2.5">
              {collections.map((collection) => (
                <li key={collection.slug}>
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="text-sm text-ivory-200/70 transition-colors duration-300 hover:text-champagne-300"
                  >
                    {collection.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-house">
            <h3 id="footer-house" className="eyebrow text-champagne-300">
              The House
            </h3>
            <ul className="mt-4 space-y-2.5">
              {houseLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory-200/70 transition-colors duration-300 hover:text-champagne-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="eyebrow text-champagne-300">Client Care</h3>
            <ul className="mt-4 space-y-2.5">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory-200/70 transition-colors duration-300 hover:text-champagne-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 border border-champagne-300/60 px-4 py-2.5 text-[0.625rem] uppercase tracking-[0.16em] text-champagne-200 transition-colors duration-400 hover:border-champagne-300 hover:bg-champagne-300 hover:text-plum-900"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Message us on WhatsApp
            </a>

            <ul className="mt-5 flex items-center gap-3">
              {siteConfig.social.map((social) => {
                const Icon =
                  social.label === "Instagram"
                    ? InstagramIcon
                    : social.label === "Pinterest"
                      ? PinterestIcon
                      : LinkedInIcon;
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`ELARÉ on ${social.label}`}
                      className="grid h-10 w-10 place-content-center rounded-full border border-ivory-100/20 text-ivory-200/75 transition-all duration-400 hover:border-champagne-300 hover:text-champagne-300"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-4 border-t border-ivory-100/12 py-7 sm:flex-row sm:justify-between">
          <p className="text-xs text-ivory-200/50">
            © {new Date().getFullYear()} {siteConfig.name} Atelier, Lahore. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {["Privacy", "Terms", "Shipping Policy", "Accessibility"].map((item) => (
              <li key={item}>
                <Link
                  href="/contact"
                  className="text-xs text-ivory-200/50 transition-colors duration-300 hover:text-champagne-300"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
