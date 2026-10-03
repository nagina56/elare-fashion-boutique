"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { collections } from "@/lib/collections";
import { imageSrc } from "@/lib/images";
import { formatPrice, products } from "@/lib/products";
import type { Product } from "@/lib/types";
import { cx } from "@/components/ui/Button";
import { CloseIcon, SearchIcon } from "@/components/ui/icons";

const SUGGESTED = ["chikankari", "kameez", "lawn", "khaddar", "cut-work", "co-ord"];

function scoreProduct(product: Product, term: string): number {
  const q = term.toLowerCase();
  const name = product.name.toLowerCase();
  const subtitle = product.subtitle.toLowerCase();
  const category = product.category.toLowerCase();
  const tags = product.collections.join(" ").toLowerCase();

  let score = 0;
  if (name === q) score += 100;
  if (name.startsWith(q)) score += 60;
  if (name.includes(q)) score += 40;
  if (subtitle.includes(q)) score += 22;
  if (category.includes(q)) score += 16;
  if (tags.includes(q)) score += 12;
  if (product.colors.some((c) => c.name.toLowerCase().includes(q))) score += 10;
  if (product.fabric.toLowerCase().includes(q)) score += 8;

  return score;
}

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [term, setTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 90);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
      returnFocusRef.current?.focus?.();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setTerm("");
  }, [open]);

  const results = useMemo(() => {
    const query = term.trim();
    if (query.length < 2) return [];

    return products
      .map((product) => ({ product, score: scoreProduct(product, query) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.product.name.localeCompare(b.product.name))
      .slice(0, 6)
      .map((entry) => entry.product);
  }, [term]);

  const matchedCollections = useMemo(() => {
    const query = term.trim().toLowerCase();
    if (query.length < 2) return [];
    return collections.filter(
      (collection) =>
        collection.monogram.toLowerCase().includes(query) ||
        collection.tagline.toLowerCase().includes(query) ||
        collection.signature.toLowerCase().includes(query),
    );
  }, [term]);

  const hasQuery = term.trim().length >= 2;

  return (
    <div
      className={cx(
        "fixed inset-0 z-[92] transition-opacity duration-400",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!open}
      role="dialog"
      aria-modal={open}
      aria-label="Search the ELARÉ catalogue"
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-espresso-900/70 backdrop-blur-md"
      />

      <div
        className={cx(
          "relative mx-auto flex h-full max-h-full w-full max-w-4xl flex-col bg-ivory-50",
          "transition-transform duration-[550ms] [transition-timing-function:var(--ease-elegant)]",
          open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
        )}
      >
        {/* Search field */}
        <div className="flex items-center gap-3 border-b border-ivory-300 px-5 py-5 sm:px-8">
          <SearchIcon className="h-5 w-5 shrink-0 text-plum-700" />
          <label htmlFor="site-search" className="sr-only">
            Search by name, fabric or collection
          </label>
          <input
            ref={inputRef}
            id="site-search"
            type="search"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="Search by name, fabric or collection…"
            autoComplete="off"
            tabIndex={open ? 0 : -1}
            className="min-w-0 flex-1 bg-transparent font-display text-xl text-plum-900 placeholder:text-espresso-300 focus:outline-none sm:text-2xl"
          />
          <button
            type="button"
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            aria-label="Close search"
            className="grid h-10 w-10 shrink-0 place-content-center rounded-full text-plum-800 transition-colors hover:bg-ivory-200"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8">
          {!hasQuery ? (
            <div className="space-y-8">
              <div>
                <p className="eyebrow text-rose-600">Popular searches</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {SUGGESTED.map((suggestion) => (
                    <li key={suggestion}>
                      <button
                        type="button"
                        onClick={() => setTerm(suggestion)}
                        tabIndex={open ? 0 : -1}
                        className="border border-ivory-400 px-4 py-2 text-xs uppercase tracking-[0.14em] text-espresso-600 transition-colors duration-300 hover:border-plum-700 hover:bg-plum-800 hover:text-ivory-100"
                      >
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="eyebrow text-rose-600">Browse collections</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {collections.map((collection) => (
                    <li key={collection.slug}>
                      <Link
                        href={`/collections/${collection.slug}`}
                        onClick={onClose}
                        tabIndex={open ? 0 : -1}
                        className="group flex items-center gap-4 border border-ivory-300 bg-ivory-100 p-3 transition-colors duration-400 hover:border-plum-700"
                      >
                        <span className="relative h-16 w-14 shrink-0 overflow-hidden bg-ivory-200">
                          <Image
                            src={imageSrc(collection.image, 200)}
                            alt=""
                            aria-hidden="true"
                            fill
                            sizes="56px"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </span>
                        <span>
                          <span className="block text-[0.6875rem] uppercase tracking-[0.18em] text-rose-600">
                            {collection.eyebrow}
                          </span>
                          <span className="mt-0.5 block font-display text-lg text-plum-900">
                            {collection.monogram}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : results.length === 0 && matchedCollections.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-display text-2xl text-plum-900">No pieces matched “{term}”</p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-espresso-400">
                Try a fabric — chikankari, lawn, khaddar — or browse the full collection.
              </p>
              <Link
                href="/shop"
                onClick={onClose}
                tabIndex={open ? 0 : -1}
                className="mt-6 inline-block border border-plum-800 px-7 py-3 text-[0.6875rem] uppercase tracking-[0.18em] text-plum-900 transition-colors hover:bg-plum-800 hover:text-ivory-100"
              >
                View all pieces
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {matchedCollections.length > 0 ? (
                <section>
                  <p className="eyebrow text-rose-600">Chapters</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {matchedCollections.map((collection) => (
                      <li key={collection.slug}>
                        <Link
                          href={`/collections/${collection.slug}`}
                          onClick={onClose}
                          tabIndex={open ? 0 : -1}
                          className="inline-block border border-champagne-400 bg-champagne-100 px-4 py-2 text-xs tracking-[0.08em] text-plum-900 transition-colors duration-300 hover:bg-champagne-300"
                        >
                          {collection.monogram}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {results.length > 0 ? (
                <section>
                  <p className="eyebrow text-rose-600">
                    {results.length} {results.length === 1 ? "piece" : "pieces"}
                  </p>
                  <ul className="mt-4 grid gap-x-6 gap-y-5 sm:grid-cols-2">
                    {results.map((product) => (
                      <li key={product.slug} className="flex gap-4">
                        <Link
                          href={`/product/${product.slug}`}
                          onClick={onClose}
                          tabIndex={open ? 0 : -1}
                          className="group relative h-24 w-16 shrink-0 overflow-hidden bg-ivory-200"
                        >
                          <Image
                            src={imageSrc(product.images[0], 240)}
                            alt={product.imageAlts[0]}
                            fill
                            sizes="64px"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </Link>
                        <div className="min-w-0">
                          <h3 className="truncate text-base leading-tight">
                            <Link
                              href={`/product/${product.slug}`}
                              onClick={onClose}
                              tabIndex={open ? 0 : -1}
                              className="transition-colors hover:text-plum-600"
                            >
                              {product.name}
                            </Link>
                          </h3>
                          <p className="mt-1 text-xs text-espresso-400">{product.category}</p>
                          <p className="mt-1.5 text-sm font-medium text-plum-900">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
