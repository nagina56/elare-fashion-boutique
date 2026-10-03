"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger in milliseconds. */
  delay?: number;
  /** Travel distance on the Y axis. */
  distance?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header" | "figure";
};

/**
 * Fades and lifts its children into view once, the first time they enter the
 * viewport. Falls back to visible immediately when IntersectionObserver is
 * unavailable or the visitor prefers reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 22,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      data-visible={visible}
      style={{
        transitionDelay: `${delay}ms`,
        transform: visible ? undefined : `translate3d(0, ${distance}px, 0)`,
      }}
    >
      {children}
    </Tag>
  );
}
