"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/site";
import { useCart } from "@/store/cart-context";
import { useUI } from "@/store/ui-context";
import { useWishlist } from "@/store/wishlist-context";
import { cx } from "@/components/ui/Button";
import { LogoLink } from "@/components/ui/Logo";
import { AnnouncementBar, MobileMenu } from "./Navigation";
import { BagIcon, HeartIcon, MenuIcon, SearchIcon } from "@/components/ui/icons";

const LEFT_LINKS = navLinks.slice(0, 3);
const RIGHT_LINKS = navLinks.slice(3);

function Counter({ count, tone }: { count: number; tone: "light" | "dark" }) {
  if (count <= 0) return null;
  return (
    <span
      className={cx(
        "absolute right-1 top-1 grid h-[1.05rem] min-w-[1.05rem] place-content-center rounded-full px-1 text-[0.5625rem] font-medium tabular-nums leading-none",
        tone === "light" ? "bg-champagne-300 text-plum-900" : "bg-rose-500 text-ivory-50",
      )}
    >
      {count}
    </span>
  );
}

/**
 * Fixed header. On the homepage it floats transparently over the hero until the
 * visitor scrolls, then condenses to a solid ivory bar.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const { count: bagCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { overlay, openBag, openWishlist, openSearch } = useUI();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === "/";
  const overHero = isHome && !scrolled;
  const tone = overHero ? "light" : "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (overlay.kind !== "none") setMenuOpen(false);
  }, [overlay]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const linkTone = (isActive: boolean) =>
    overHero
      ? isActive
        ? "text-champagne-300"
        : "text-ivory-100/85 hover:text-champagne-300"
      : isActive
        ? "text-rose-600"
        : "text-plum-900/80 hover:text-rose-600";

  const iconTone = overHero ? "text-ivory-100 hover:text-champagne-300" : "text-plum-900 hover:text-rose-600";

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-plum-900 focus:px-5 focus:py-3 focus:text-xs focus:uppercase focus:tracking-[0.18em] focus:text-ivory-100"
      >
        Skip to content
      </a>

      <header
        className={cx(
          "fixed inset-x-0 top-0 z-[80] w-full transition-colors duration-500",
          overHero
            ? "bg-transparent"
            : "border-b border-plum-800/10 bg-ivory-100/95 backdrop-blur-md supports-[backdrop-filter]:bg-ivory-100/85",
        )}
      >
        {isHome && !scrolled ? <AnnouncementBar /> : null}

        <div className="container-elare flex h-16 items-center justify-between gap-4 lg:h-[4.75rem]">
          {/* Left cluster */}
          <div className="flex flex-1 items-center">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className={cx("-ml-2 grid h-11 w-11 place-content-center transition-colors lg:hidden", iconTone)}
            >
              <MenuIcon className="h-5 w-5" />
            </button>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-7">
                {LEFT_LINKS.map((link) => {
                  const isActive = link.href === "/" ? isHome : pathname.startsWith(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cx(
                          "link-underline text-[0.6875rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300",
                          linkTone(isActive),
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Wordmark */}
          <LogoLink tone={tone} size="lg" className="shrink-0" />

          {/* Right cluster */}
          <div className="flex flex-1 items-center justify-end gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search the collection"
              className={cx("grid h-11 w-11 place-content-center transition-colors duration-300", iconTone)}
            >
              <SearchIcon className="h-[1.15rem] w-[1.15rem]" />
            </button>

            <button
              type="button"
              onClick={openWishlist}
              aria-label={`Open wishlist, ${wishlistCount} ${wishlistCount === 1 ? "item" : "items"}`}
              className={cx(
                "relative hidden h-11 w-11 place-content-center transition-colors duration-300 sm:grid",
                iconTone,
              )}
            >
              <HeartIcon className="h-[1.15rem] w-[1.15rem]" />
              <Counter count={wishlistCount} tone={tone} />
            </button>

            <button
              type="button"
              onClick={openBag}
              aria-label={`Open shopping bag, ${bagCount} ${bagCount === 1 ? "item" : "items"}`}
              className={cx("relative grid h-11 w-11 place-content-center transition-colors duration-300", iconTone)}
            >
              <BagIcon className="h-[1.15rem] w-[1.15rem]" />
              <Counter count={bagCount} tone={tone} />
            </button>

            <nav aria-label="Secondary" className="ml-4 hidden lg:block">
              <ul className="flex items-center gap-7">
                {RIGHT_LINKS.map((link) => {
                  const isActive = pathname.startsWith(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cx(
                          "link-underline text-[0.6875rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300",
                          linkTone(isActive),
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>

        <span
          aria-hidden="true"
          className={cx(
            "block h-px origin-left bg-champagne-400/60 transition-transform duration-700 [transition-timing-function:var(--ease-elegant)]",
            !overHero ? "scale-x-100" : "scale-x-0",
          )}
        />
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenBag={openBag}
        onOpenWishlist={openWishlist}
        onOpenSearch={openSearch}
        wishlistCount={wishlistCount}
        bagCount={bagCount}
      />
    </>
  );
}
