import { cx } from "./Button";
import { StarIcon } from "./icons";
import { formatPrice } from "@/lib/products";

type PriceProps = {
  price: number;
  compareAtPrice?: number;
  size?: "sm" | "md" | "lg";
  tone?: "dark" | "light";
  className?: string;
};

const sizeClasses = {
  sm: "text-[0.8125rem]",
  md: "text-sm",
  lg: "text-base",
} as const;

export function Price({
  price,
  compareAtPrice,
  size = "md",
  tone = "dark",
  className,
}: PriceProps) {
  const onSale = typeof compareAtPrice === "number" && compareAtPrice > price;

  return (
    <p className={cx("flex flex-wrap items-baseline gap-x-2.5 gap-y-1", sizeClasses[size], className)}>
      <span className={cx("font-medium tracking-wide", tone === "light" ? "text-ivory-100" : "text-plum-900")}>
        {formatPrice(price)}
      </span>
      {onSale ? (
        <>
          <span
            className={cx(
              "text-espresso-300 line-through decoration-rose-400/70",
              tone === "light" && "text-ivory-200/50",
            )}
          >
            {formatPrice(compareAtPrice)}
          </span>
          <span className="eyebrow text-rose-600">Sale</span>
        </>
      ) : null}
    </p>
  );
}

type RatingProps = {
  value: number;
  count?: number;
  tone?: "dark" | "light";
  className?: string;
  size?: "sm" | "md";
};

export function Rating({
  value,
  count,
  tone = "dark",
  className,
  size = "sm",
}: RatingProps) {
  const starSize = size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5";

  return (
    <p className={cx("flex items-center gap-2", className)}>
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((index) => (
          <StarIcon
            key={index}
            className={cx(starSize, index < Math.round(value) ? "text-champagne-500" : "text-ivory-400")}
            filled={index < Math.round(value)}
          />
        ))}
      </span>
      <span
        className={cx(
          "text-[0.6875rem] tracking-[0.12em]",
          tone === "light" ? "text-ivory-200/70" : "text-espresso-400",
        )}
      >
        <span className="sr-only">Rated </span>
        {value.toFixed(1)}
        {typeof count === "number" ? (
          <>
            <span className="sr-only"> out of 5 from </span>
            <span aria-hidden="true"> ({count})</span>
          </>
        ) : null}
      </span>
    </p>
  );
}
