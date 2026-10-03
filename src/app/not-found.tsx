"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";

export default function NotFound() {
  useEffect(() => {
    const title = "Page not found · ELARÉ";
    document.title = title;
  }, []);

  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-plum-950 py-32 text-ivory-100">
      <div className="container-elare relative text-center">
        <p className="eyebrow text-champagne-300">Error 404</p>

        <p
          aria-hidden="true"
          className="mt-4 font-display text-[clamp(5rem,18vw,11rem)] leading-none text-champagne-300/25"
        >
          404
        </p>

        <h1 className="-mt-4 text-[clamp(1.875rem,5vw,3.25rem)] text-ivory-50 sm:-mt-6">
          This page has been taken out of the pattern
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-ivory-200/70">
          Whatever you were looking for is not here — it may have sold out, moved, or never made it
          past the cutting table. The collection and the lookbook are both a good place to pick up.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/shop" variant="champagne" size="lg">
            Browse the collection
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1" />
          </ButtonLink>
          <ButtonLink href="/contact" variant="ivory" size="lg">
            Ask us instead
          </ButtonLink>
        </div>

        <nav aria-label="Suggested pages" className="mt-14 border-t border-ivory-100/12 pt-8">
          <p className="eyebrow text-ivory-200/45">Or try one of these</p>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {[
              { href: "/collections", label: "Collections" },
              { href: "/lookbook", label: "Lookbook" },
              { href: "/about", label: "Our Story" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[0.6875rem] uppercase tracking-[0.16em] text-ivory-200/65 transition-colors duration-300 hover:text-champagne-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}