"use client";

import { useMemo, useState } from "react";
import { products, categories, sizes as allSizes } from "@/lib/products";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Button, cx } from "@/components/ui/Button";
import { CloseIcon, FilterIcon } from "@/components/ui/icons";

type CategoryFilter = "All" | (typeof categories)[number];
type SizeFilter = "All" | (typeof allSizes)[number];

const MAX_PRICE = Math.max(...products.map((product) => product.price));

/** Radio-style group that behaves correctly with keyboards. */
function ChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  name,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  name: string;
}) {
  return (
    <fieldset>
      <legend className="eyebrow text-espresso-400">{label}</legend>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((option) => {
          const id = `${name}-${option}`;
          const isActive = option === value;
          return (
            <div key={option}>
              <input
                type="radio"
                id={id}
                name={name}
                value={option}
                checked={isActive}
                onChange={() => onChange(option)}
                className="peer sr-only"
              />
              <label
                htmlFor={id}
                data-active={isActive ? "true" : undefined}
                className={cx(
                  "block cursor-pointer border px-4 py-2 text-xs uppercase tracking-[0.12em] transition-colors duration-300",
                  "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-plum-800",
                  "peer-checked:border-plum-900 peer-checked:bg-plum-900 peer-checked:text-ivory-100",
                  isActive
                    ? "border-plum-900 bg-plum-900 text-ivory-100"
                    : "border-espresso-900/20 text-espresso-600 hover:border-plum-800/60",
                )}
              >
                {option}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

/** Collapsible filter panel used both inline and inside the mobile sheet. */
function FilterPanel({
  category,
  setCategory,
  size,
  setSize,
  inStockOnly,
  setInStockOnly,
  saleOnly,
  setSaleOnly,
  maxPrice,
  setMaxPrice,
}: {
  category: CategoryFilter;
  setCategory: (value: CategoryFilter) => void;
  size: SizeFilter;
  setSize: (value: SizeFilter) => void;
  inStockOnly: boolean;
  setInStockOnly: (value: boolean) => void;
  saleOnly: boolean;
  setSaleOnly: (value: boolean) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
}) {
  return (
    <div className="space-y-9">
      <ChipGroup
        label="Category"
        name="category"
        options={["All", ...categories] as const}
        value={category}
        onChange={setCategory}
      />

      <ChipGroup
        label="Size"
        name="size"
        options={["All", ...allSizes] as const}
        value={size}
        onChange={setSize}
      />

      <fieldset>
        <legend className="eyebrow text-espresso-400">Availability</legend>
        <div className="mt-4 space-y-3">
          {[
            { id: "in-stock", label: "In stock only", checked: inStockOnly, onChange: setInStockOnly },
            { id: "sale", label: "Reduced only", checked: saleOnly, onChange: setSaleOnly },
          ].map((option) => (
            <div key={option.id} className="flex items-center gap-3">
              <input
                type="checkbox"
                id={option.id}
                checked={option.checked}
                onChange={(event) => option.onChange(event.target.checked)}
                className="peer sr-only"
              />
              <label
                htmlFor={option.id}
                className="flex cursor-pointer items-center gap-3 text-sm text-espresso-600"
              >
                <span
                  aria-hidden="true"
                  className={cx(
                    "grid h-[1.15rem] w-[1.15rem] shrink-0 place-content-center border transition-colors duration-200",
                    "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-plum-800",
                    option.checked
                      ? "border-plum-900 bg-plum-900"
                      : "border-espresso-900/30",
                  )}
                >
                  <svg
                    viewBox="0 0 12 12"
                    className={cx(
                      "h-3 w-3 fill-none stroke-ivory-100 transition-opacity duration-200",
                      option.checked ? "opacity-100" : "opacity-0",
                    )}
                    strokeWidth={2}
                    strokeLinecap="round"
                  >
                    <path d="m2.5 6.2 2.2 2.2 4.8-4.9" />
                  </svg>
                </span>
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="price-range" className="eyebrow text-espresso-400">
          Maximum price
        </label>
        <input
          type="range"
          id="price-range"
          min={0}
          max={MAX_PRICE}
          step={1000}
          value={maxPrice}
          onChange={(event) => setMaxPrice(Number(event.target.value))}
          className="mt-4 h-1 w-full cursor-pointer appearance-none rounded-full bg-espresso-900/15 accent-plum-900"
        />
        <p className="mt-2 flex justify-between text-xs text-espresso-500">
          <span>PKR 0</span>
          <span className="font-medium text-plum-900">Up to {maxPrice.toLocaleString("en-PK")}</span>
        </p>
      </div>
    </div>
  );
}

export function ShopBrowser() {
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [size, setSize] = useState<SizeFilter>("All");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [saleOnly, setSaleOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [sheetOpen, setSheetOpen] = useState(false);

  const results = useMemo(() => {
    const filtered = products.filter((product) => {
      if (category !== "All" && product.category !== category) return false;
      if (size !== "All" && !product.sizes.some((s) => s.label === size && s.available)) return false;
      if (inStockOnly && !product.sizes.some((s) => s.available)) return false;
      if (saleOnly && !(product.compareAtPrice && product.compareAtPrice > product.price)) return false;
      if (product.price > maxPrice) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "rating":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      default:
        return [...filtered].sort(
          (a, b) => Number(b.isBestSeller) - Number(a.isBestSeller) || Number(b.isNew) - Number(a.isNew),
        );
    }
  }, [category, size, inStockOnly, saleOnly, maxPrice, sort]);

  const activeFilterCount =
    (category !== "All" ? 1 : 0) +
    (size !== "All" ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (saleOnly ? 1 : 0) +
    (maxPrice < MAX_PRICE ? 1 : 0);

  function reset() {
    setCategory("All");
    setSize("All");
    setInStockOnly(false);
    setSaleOnly(false);
    setMaxPrice(MAX_PRICE);
  }

  const filterProps = {
    category,
    setCategory,
    size,
    setSize,
    inStockOnly,
    setInStockOnly,
    saleOnly,
    setSaleOnly,
    maxPrice,
    setMaxPrice,
  };

  return (
    <div className="container-elare pb-20 lg:pb-28">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-plum-800/10 py-5">
        <p className="text-sm text-espresso-500" aria-live="polite">
          {results.length} {results.length === 1 ? "piece" : "pieces"}
          {activeFilterCount > 0 ? ` · ${activeFilterCount} filter${activeFilterCount === 1 ? "" : "s"} active` : ""}
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="flex items-center gap-2 border border-plum-800/20 px-4 py-2.5 text-[0.6875rem] uppercase tracking-[0.14em] text-plum-900 transition-colors hover:border-plum-900 lg:hidden"
          >
            <FilterIcon className="h-4 w-4" />
            Filter
            {activeFilterCount > 0 ? (
              <span className="grid h-5 min-w-5 place-content-center rounded-full bg-plum-900 px-1 text-[0.625rem] text-ivory-100">
                {activeFilterCount}
              </span>
            ) : null}
          </button>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="sr-only">
              Sort products
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as typeof sort)}
              className="border border-plum-800/20 bg-transparent px-4 py-2.5 text-[0.6875rem] uppercase tracking-[0.14em] text-plum-900 transition-colors hover:border-plum-900 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum-800"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating">Best rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-10 pt-10 lg:grid-cols-[240px_1fr] lg:gap-14">
        {/* Desktop filters */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <div className="flex items-center justify-between">
              <h2 className="eyebrow text-plum-900">Filters</h2>
              {activeFilterCount > 0 ? (
                <button
                  type="button"
                  onClick={reset}
                  className="text-[0.6875rem] uppercase tracking-[0.14em] text-rose-600 underline-offset-4 hover:underline"
                >
                  Clear
                </button>
              ) : null}
            </div>
            <div className="mt-7">
              <FilterPanel {...filterProps} />
            </div>
          </div>
        </aside>

        {/* Results */}
        <div>
          {results.length > 0 ? (
            <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-14">
              {results.map((product, index) => (
                <li key={product.slug}>
                  <ProductCard product={product} index={index} priority={index < 3} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="border border-plum-800/12 bg-ivory-50 px-6 py-16 text-center">
              <p className="eyebrow text-rose-600">No matches</p>
              <h3 className="mt-3 text-2xl">Nothing fits those filters</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-espresso-500">
                Try widening the price range, or clear the filters to see the whole season. We only
                make around two hundred pieces, so gaps are normal.
              </p>
              <Button variant="outline" size="md" onClick={reset} className="mt-8">
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      {sheetOpen ? (
        <div className="fixed inset-0 z-[95] lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setSheetOpen(false)}
            className="absolute inset-0 bg-plum-950/55 backdrop-blur-sm"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Product filters"
            className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto bg-ivory-100 px-5 pb-8 pt-5 shadow-[0_-24px_60px_-24px_rgba(43,24,38,0.45)] motion-safe:animate-[sheetUp_420ms_var(--ease-elegant)]"
          >
            <div className="flex items-center justify-between border-b border-plum-800/10 pb-4">
              <h2 className="text-xl">Filters</h2>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                aria-label="Close filters"
                className="grid h-10 w-10 place-content-center text-plum-900"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="pt-7">
              <FilterPanel {...filterProps} />
            </div>

            <div className="sticky bottom-0 -mx-5 mt-8 flex gap-3 border-t border-plum-800/10 bg-ivory-100 px-5 pb-2 pt-4">
              {activeFilterCount > 0 ? (
                <Button variant="ghost" size="md" onClick={reset} className="shrink-0">
                  Clear
                </Button>
              ) : null}
              <Button
                variant="solid"
                size="md"
                fullWidth
                onClick={() => setSheetOpen(false)}
              >
                Show {results.length} {results.length === 1 ? "piece" : "pieces"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}