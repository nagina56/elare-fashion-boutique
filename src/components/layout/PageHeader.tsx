import Image from "next/image";
import type { ReactNode } from "react";
import { imageSrc } from "@/lib/images";
import type { ImageKey } from "@/lib/images";
import { cx } from "@/components/ui/Button";

/** Shared banner for every page except the homepage. */
type PageHeaderProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  image?: ImageKey;
  imageAlt?: string;
  meta?: Array<{ label: string; value: string }>;
  children?: ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  meta,
  children,
}: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden bg-plum-900 pt-28 text-ivory-100 sm:pt-32 lg:pt-40">
      {image ? (
        <>
          <Image
            src={imageSrc(image, 1800)}
            alt={imageAlt ?? ""}
            aria-hidden={imageAlt ? undefined : true}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-plum-950 via-plum-900/85 to-plum-900/45"
          />
        </>
      ) : null}

      <div className="container-elare relative pb-14 sm:pb-16 lg:pb-20">
        <p className="eyebrow text-champagne-300">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-[clamp(2.5rem,7vw,4.75rem)] text-ivory-100">{title}</h1>

        {intro ? (
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ivory-200/70 sm:text-base">
            {intro}
          </p>
        ) : null}

        {children ? <div className="mt-8">{children}</div> : null}

        {meta && meta.length > 0 ? (
          <dl className="mt-10 grid gap-px overflow-hidden border border-ivory-100/12 bg-ivory-100/10 sm:grid-cols-3">
            {meta.map((item) => (
              <div key={item.label} className="bg-plum-900/70 px-5 py-5">
                <dt className="eyebrow text-champagne-300/85">{item.label}</dt>
                <dd className="mt-2 font-display text-lg text-ivory-100">{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </header>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "dark" | "light" | "plum";
  action?: ReactNode;
  className?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  action,
  className,
  id,
}: SectionHeadingProps) {
  const isLight = tone === "light";
  const isPlum = tone === "plum";

  return (
    <div
      className={cx(
        "flex flex-col gap-6",
        align === "center" ? "items-center text-center" : "lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <div className={cx(align === "center" ? "max-w-2xl" : "max-w-2xl")}>
        {eyebrow ? (
          <p className={cx("eyebrow", isPlum ? "text-champagne-300" : "text-rose-600")}>{eyebrow}</p>
        ) : null}
        <h2
          id={id}
          className={cx(
            "mt-3 text-[clamp(2rem,4.5vw,3.25rem)]",
            isLight ? "text-ivory-100" : isPlum ? "text-ivory-100" : "text-plum-900",
          )}
        >
          {title}
        </h2>
        {intro ? (
          <p
            className={cx(
              "mt-4 text-sm leading-relaxed sm:text-[0.9375rem]",
              isLight ? "text-ivory-200/70" : isPlum ? "text-ivory-200/70" : "text-espresso-500",
              align === "center" && "mx-auto",
            )}
          >
            {intro}
          </p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
