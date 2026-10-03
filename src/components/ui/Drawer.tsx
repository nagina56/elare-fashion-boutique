"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cx } from "./Button";
import { CloseIcon } from "./icons";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  side?: "right" | "left";
  title: string;
  eyebrow?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  /** Accessible label for the close control when `title` is visually hidden. */
  closeLabel?: string;
};

/**
 * Slide-over panel used for the shopping bag, wishlist and mobile menu.
 * Focus moves into the panel on open and returns to the trigger on close.
 */
export function Drawer({
  open,
  onClose,
  side = "right",
  title,
  eyebrow,
  children,
  footer,
  className,
  closeLabel = "Close panel",
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const focusable = panel?.querySelector<HTMLElement>(
      "button, a[href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
    );
    focusable?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const items = Array.from(
        panel.querySelectorAll<HTMLElement>(
          "button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
        ),
      ).filter((node) => node.offsetParent !== null);

      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      returnFocusRef.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div
      className={cx("fixed inset-0 z-[90]", open ? "pointer-events-auto" : "pointer-events-none")}
      aria-hidden={!open}
    >
      {/* Scrim */}
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label={closeLabel}
        onClick={onClose}
        className={cx(
          "absolute inset-0 bg-espresso-900/45 backdrop-blur-[3px] transition-opacity duration-500",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal={open}
        aria-label={title}
        className={cx(
          "absolute inset-y-0 flex w-full max-w-[27rem] flex-col bg-ivory-50 shadow-[0_0_60px_-15px_rgba(28,21,19,0.35)]",
          "transition-transform duration-[550ms] [transition-timing-function:var(--ease-elegant)]",
          side === "right" ? "right-0 border-l border-ivory-300" : "left-0 border-r border-ivory-300",
          open
            ? "translate-x-0"
            : side === "right"
              ? "translate-x-full"
              : "-translate-x-full",
          className,
        )}
      >
        <header className="flex items-start justify-between gap-4 border-b border-ivory-300 px-6 py-5">
          <div>
            {eyebrow ? <p className="eyebrow text-rose-600">{eyebrow}</p> : null}
            <h2 className="mt-1 text-2xl">{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            tabIndex={open ? 0 : -1}
            className="-mr-1.5 -mt-1 grid h-10 w-10 shrink-0 place-content-center rounded-full text-plum-800 transition-colors duration-300 hover:bg-ivory-200"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6">{children}</div>

        {footer ? (
          <footer className="border-t border-ivory-300 bg-ivory-100 px-6 py-5">{footer}</footer>
        ) : null}
      </div>
    </div>
  );
}
