import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export const cx = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");

type Variant = "solid" | "outline" | "ghost" | "ivory" | "champagne";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden " +
  "font-sans font-medium uppercase tracking-[0.16em] transition-colors duration-500 " +
  "disabled:cursor-not-allowed disabled:opacity-45 whitespace-nowrap";

const variants: Record<Variant, string> = {
  solid:
    "bg-plum-800 text-ivory-100 border border-plum-800 hover:text-plum-800 " +
    "before:absolute before:inset-0 before:-translate-x-full before:bg-champagne-200 " +
    "before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)] " +
    "hover:before:translate-x-0 motion-reduce:before:hidden",
  outline:
    "bg-transparent text-plum-800 border border-plum-800/40 hover:border-plum-800 " +
    "hover:bg-plum-800 hover:text-ivory-100",
  ghost:
    "bg-transparent text-plum-800 border border-transparent hover:text-rose-600",
  ivory:
    "bg-ivory-100 text-plum-800 border border-ivory-100/70 hover:border-champagne-300 " +
    "hover:bg-ivory-200",
  champagne:
    "bg-champagne-300 text-plum-900 border border-champagne-300 hover:bg-champagne-200 " +
    "hover:border-champagne-200",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.625rem]",
  md: "h-12 px-7 text-[0.6875rem]",
  lg: "h-14 px-9 text-xs",
};

type SharedProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  fullWidth?: boolean;
};

function classes({ variant = "solid", size = "md", className, fullWidth }: SharedProps) {
  return cx(base, variants[variant], sizes[size], fullWidth && "w-full", className);
}

/** Interior of a button — always sits above the sliding fill layer. */
function Inner({ children }: { children: ReactNode }) {
  return <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>;
}

type ButtonProps = SharedProps &
  Omit<ComponentProps<"button">, "className" | "children">;

export function Button({
  variant,
  size,
  className,
  children,
  fullWidth,
  ...rest
}: ButtonProps) {
  return (
    <button className={classes({ variant, size, className, children, fullWidth })} {...rest}>
      <Inner>{children}</Inner>
    </button>
  );
}

type ButtonLinkProps = SharedProps &
  Omit<ComponentProps<typeof Link>, "className" | "children">;

export function ButtonLink({
  variant,
  size,
  className,
  children,
  fullWidth,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={classes({ variant, size, className, children, fullWidth })} {...rest}>
      <Inner>{children}</Inner>
    </Link>
  );
}
