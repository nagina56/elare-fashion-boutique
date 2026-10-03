"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/lib/site";
import { cx } from "@/components/ui/Button";
import { CloseIcon } from "@/components/ui/icons";

const messages = [
  `Complimentary delivery on orders above ${siteConfig.freeShippingThreshold.toLocaleString("en-PK")} PKR`,
  "Festive appointments open — book a fitting in Lahore",
  "Hand-worked pieces dispatched within 48 hours",
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % messages.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative z-50 bg-plum-900 text-ivory-100">
      <div className="container-elare flex h-9 items-center justify-center">
        <p
          key={index}
          aria-live="polite"
          className="text-center text-[0.625rem] uppercase tracking-[0.24em] motion-safe:animate-[fadeIn_0.6s_var(--ease-elegant)] sm:text-[0.6875rem]"
        >
          {messages[index]}
        </p>
      </div>
    </div>
  );
}

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  onOpenBag: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  wishlistCount: number;
  bagCount: number;
};

/** Full-height navigation panel for viewports below the `lg` breakpoint. */
export function MobileMenu({
  open,
  onClose,
  onOpenBag,
  onOpenWishlist,
  onOpenSearch,
  wishlistCount,
  bagCount,
}: MobileMenuProps) {
  const pathname = usePathname();

  // Lock the page behind the panel.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Close whenever the route changes.
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      className={cx(
        "fixed inset-0 z-[88] lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Close navigation menu"
        onClick={onClose}
        className={cx(
          "absolute inset-0 bg-espresso-900/50 backdrop-blur-[2px] transition-opacity duration-500",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      <nav
        id="mobile-navigation"
        aria-label="Main"
        className={cx(
          "absolute inset-y-0 right-0 flex w-full max-w-[22rem] flex-col bg-plum-900 text-ivory-100",
          "transition-transform duration-[550ms] [transition-timing-function:var(--ease-elegant)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-ivory-100/12 px-6 py-5">
          <p className="eyebrow text-champagne-300">Menu</p>
          <button
            type="button"
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            aria-label="Close navigation menu"
            className="-mr-2 grid h-10 w-10 place-content-center text-ivory-100 transition-colors hover:text-champagne-300"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <ul className="flex-1 overflow-y-auto px-6 py-2">
          {navLinks.map((link, index) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

            return (
              <li key={link.href} className="border-b border-ivory-100/8 last:border-b-0">
                <Link
                  href={link.href}
                  onClick={onClose}
                  tabIndex={open ? 0 : -1}
                  aria-current={isActive ? "page" : undefined}
                  className={cx(
                    "flex items-baseline justify-between py-4 transition-colors duration-300",
                    isActive ? "text-champagne-300" : "text-ivory-100 hover:text-champagne-300",
                  )}
                >
                  <span
                    className="font-display text-2xl font-light tracking-wide"
                    style={{
                      transitionDelay: `${index * 20}ms`,
                    }}
                  >
                    {link.label}
                  </span>
                  <span className="text-[0.5625rem] tracking-[0.2em] text-ivory-200/40">
                    0{index + 1}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="border-t border-ivory-100/12 px-6 py-5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenSearch();
              }}
              tabIndex={open ? 0 : -1}
              className="flex h-11 flex-1 items-center justify-center gap-2 border border-ivory-100/25 text-[0.625rem] uppercase tracking-[0.16em] text-ivory-100 transition-colors hover:border-champagne-300 hover:text-champagne-300"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenWishlist();
              }}
              tabIndex={open ? 0 : -1}
              className="flex h-11 flex-1 items-center justify-center gap-2 border border-ivory-100/25 text-[0.625rem] uppercase tracking-[0.16em] text-ivory-100 transition-colors hover:border-champagne-300 hover:text-champagne-300"
            >
              Wishlist
              {wishlistCount > 0 ? (
                <span className="text-champagne-300">({wishlistCount})</span>
              ) : null}
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenBag();
              }}
              tabIndex={open ? 0 : -1}
              className="flex h-11 flex-1 items-center justify-center gap-2 border border-champagne-300 bg-champagne-300 text-[0.625rem] uppercase tracking-[0.16em] text-plum-900 transition-colors hover:bg-champagne-200"
            >
              Bag
              {bagCount > 0 ? <span className="text-plum-700">({bagCount})</span> : null}
            </button>
          </div>

          <div className="mt-5 space-y-1 text-xs text-ivory-200/60">
            <p>{siteConfig.email}</p>
            <p>{siteConfig.phone}</p>
            <p>
              {siteConfig.address.line1}, {siteConfig.address.city}
            </p>
          </div>
        </div>
      </nav>
    </div>
  );
}
