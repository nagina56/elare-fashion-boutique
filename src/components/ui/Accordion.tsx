"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { cx } from "./Button";

type AccordionItemData = {
  id: string;
  title: string;
  content: ReactNode;
  meta?: string;
};

type AccordionProps = {
  items: AccordionItemData[];
  /** Index opened on first paint. */
  defaultOpen?: number | null;
  tone?: "dark" | "light";
  className?: string;
};

/**
 * Accessible disclosure list. Rendered with real buttons and
 * `aria-expanded` / `aria-controls`, driven by roving focus on the headers.
 */
export function Accordion({
  items,
  defaultOpen = 0,
  tone = "dark",
  className,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const headers = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();

  const isDark = tone === "dark";

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = items.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;

    if (next !== null) {
      event.preventDefault();
      headers.current[next]?.focus();
    }
  }

  return (
    <div className={cx("divide-y", isDark ? "divide-ivory-300" : "divide-plum-800/12", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${item.id}`;
        const buttonId = `${baseId}-button-${item.id}`;

        return (
          <div key={item.id}>
            <h3 className="m-0">
              <button
                ref={(node) => {
                  headers.current[index] = node;
                }}
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={cx(
                  "group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-300",
                  isDark
                    ? "text-plum-900 hover:text-plum-600"
                    : "text-ivory-100 hover:text-champagne-300",
                )}
              >
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-[0.6875rem] font-medium uppercase tracking-[0.2em]">
                    {item.title}
                  </span>
                  {item.meta ? (
                    <span
                      className={cx(
                        "font-display text-sm italic",
                        isDark ? "text-espresso-300" : "text-ivory-200/60",
                      )}
                    >
                      {item.meta}
                    </span>
                  ) : null}
                </span>

                <span
                  aria-hidden="true"
                  className={cx(
                    "relative grid h-7 w-7 shrink-0 place-content-center rounded-full border transition-all duration-500",
                    isOpen
                      ? isDark
                        ? "rotate-180 border-plum-800 bg-plum-800 text-ivory-100"
                        : "border-champagne-300 bg-champagne-300 text-plum-900"
                      : isDark
                        ? "border-plum-800/25 text-plum-800 group-hover:border-plum-800/60"
                        : "border-ivory-100/35 text-ivory-100 group-hover:border-champagne-300/70",
                  )}
                >
                  <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor">
                    <path d="M1 6h10" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={cx(
                "pb-6 text-sm leading-relaxed",
                isDark ? "text-espresso-500" : "text-ivory-200/75",
              )}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
