import Link from "next/link";
import { cx } from "./Button";

type LogoProps = {
  /** `light` for dark backgrounds, `dark` for light backgrounds. */
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  withMark?: boolean;
  className?: string;
};

const sizes = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
} as const;

/**
 * ELARÉ wordmark: a wide-tracked serif wordmark paired with a hand-drawn
 * laurel monogram. The accent grave on the final E is drawn in champagne so
 * the mark reads as jewellery rather than type.
 */
export function Logo({ tone = "dark", size = "md", withMark = true, className }: LogoProps) {
  const wordColor = tone === "light" ? "text-ivory-100" : "text-plum-900";
  const ruleColor = tone === "light" ? "border-ivory-100/25" : "border-plum-900/20";

  return (
    <span className={cx("inline-flex items-center gap-2.5", className)}>
      {withMark ? (
        <svg
          viewBox="0 0 40 40"
          aria-hidden="true"
          className={cx(
            "shrink-0",
            tone === "light" ? "text-champagne-300" : "text-plum-800",
            size === "lg" ? "h-8 w-8" : size === "sm" ? "h-5 w-5" : "h-6 w-6",
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.15"
        >
          <circle cx="20" cy="20" r="18.4" strokeWidth="0.7" opacity="0.55" />
          {/* laurel branches */}
          <path d="M20 8.6c-4.6 0-8.2 3.3-8.2 8 0 6.6 4.4 11 8.2 14.8 3.8-3.8 8.2-8.2 8.2-14.8 0-4.7-3.6-8-8.2-8Z" opacity="0.35" />
          <path d="M11.4 19.4c-1.5.6-2.4 2-2.4 3.6m19.6-3.6c1.5.6 2.4 2 2.4 3.6" strokeWidth="0.9" />
          <path d="M20 12.4v15.2" strokeWidth="0.9" />
          <path d="M15.6 16.2 20 19l4.4-2.8" strokeWidth="0.9" />
          <path d="M15.6 21 20 23.8l4.4-2.8" strokeWidth="0.9" strokeLinecap="round" />
          <circle cx="20" cy="31.4" r="1.5" fill="currentColor" stroke="none" opacity="0.75" />
        </svg>
      ) : null}

      <span className={cx("flex flex-col leading-none", wordColor)}>
        <span
          className={cx(
            "font-display font-light tracking-[0.34em]",
            sizes[size],
            "pr-[0.34em]",
          )}
          style={{ fontVariantCaps: "all-small-caps" }}
        >
          ELAR
          <span className="text-champagne-500">É</span>
        </span>
        <span
          className={cx(
            "mt-1 h-px w-full",
            ruleColor,
            "hidden sm:block",
          )}
          aria-hidden="true"
        />
      </span>
    </span>
  );
}

type LogoLinkProps = {
  href?: string;
  tone?: LogoProps["tone"];
  size?: LogoProps["size"];
  className?: string;
  withMark?: boolean;
  onClick?: () => void;
};

export function LogoLink({
  href = "/",
  tone = "dark",
  size = "md",
  className,
  withMark = true,
  onClick,
}: LogoLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label="ELARÉ — home"
      className={cx("inline-flex rounded-sm transition-opacity hover:opacity-80", className)}
    >
      <Logo tone={tone} size={size} withMark={withMark} />
    </Link>
  );
}
