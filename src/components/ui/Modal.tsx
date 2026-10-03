"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cx } from "./Button";
import { CloseIcon } from "./icons";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** `wide` suits the product quick view. */
  size?: "md" | "wide";
  className?: string;
};

export function Modal({ open, onClose, title, children, size = "md", className }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector<HTMLElement>("button, a[href], input, select")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      returnFocusRef.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="presentation"
      className={cx(
        "fixed inset-0 z-[95] flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-6",
        "motion-safe:animate-[fadeIn_0.35s_var(--ease-elegant)]",
      )}
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="fixed inset-0 bg-espresso-900/55 backdrop-blur-[3px]"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cx(
          "relative w-full overflow-hidden bg-ivory-50 shadow-[0_30px_80px_-25px_rgba(28,21,19,0.5)]",
          "motion-safe:animate-[modalIn_0.5s_var(--ease-elegant)]",
          "max-h-[92dvh] sm:max-h-[88dvh]",
          size === "wide" ? "sm:max-w-3xl" : "sm:max-w-xl",
          className,
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 z-20 grid h-10 w-10 place-content-center rounded-full bg-ivory-50/90 text-plum-800 backdrop-blur transition-colors duration-300 hover:bg-ivory-200"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
}
