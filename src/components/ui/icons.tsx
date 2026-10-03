import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.35,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="10.8" cy="10.8" r="6.3" />
      <path d="m15.4 15.4 4.1 4.1" />
    </svg>
  );
}

export function HeartIcon({ filled = false, ...props }: IconProps & { filled?: boolean }) {
  return (
    <svg {...base} fill={filled ? "currentColor" : "none"} {...props}>
      <path d="M12 20.2s-7.4-4.6-7.4-9.5A4.2 4.2 0 0 1 12 8.2a4.2 4.2 0 0 1 7.4 2.5c0 4.9-7.4 9.5-7.4 9.5Z" />
    </svg>
  );
}

export function BagIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.6 7.6h14.8l-1.1 12a1.3 1.3 0 0 1-1.3 1.2H7a1.3 1.3 0 0 1-1.3-1.2Z" />
      <path d="M8.7 9.6V6.9a3.3 3.3 0 0 1 6.6 0v2.7" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5.5 5.5 13 13m0-13-13 13" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5.5 9 6.5 6.5L18.5 9" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.8 12h16.4M13.8 5.6 20.2 12l-6.4 6.4" />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20.2 12H3.8M10.2 5.6 3.8 12l6.4 6.4" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="4.6" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="16.9" cy="7.1" r="0.85" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PinterestIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M10.4 17.4c.6-2.2 1.5-4.8 1.5-4.8m-.6-1.9c-.4-1.1.5-2.4 1.7-2.4 1 0 1.6.8 1.6 1.8 0 1.3-.8 3-.8 3s1.5 1.7 1.5 3.4c0 1.7-1.4 2.7-2.9 2.7-1.2 0-2.2-.8-2.2-1.7" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="3" />
      <path d="M7.6 10.4v6M7.6 7.6v.1M11.4 16.4v-6m0 2.2c.5-1.2 1.5-1.9 2.6-1.9 1.2 0 2.4.8 2.4 2.7v3" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.9 20.1 5 16.2a7.9 7.9 0 1 1 3 2.9Z" />
      <path d="M9.1 8.6c.2-.5.5-.5.8-.5h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.5l-.5.6c-.1.2-.2.3-.1.5a5.6 5.6 0 0 0 2.7 2.3c.2.1.4 0 .5-.1l.6-.7c.2-.2.3-.2.5-.1l1.7.8c.2.1.4.2.4.4v.5c0 .3-.2.7-.4.9-.3.3-.7.5-1.2.5-1.4 0-3.5-1.1-4.9-2.5-1.3-1.3-2.2-3-2.2-4.1 0-.5.2-1 .4-1.2Z" />
    </svg>
  );
}

export function RulerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.6" y="8.4" width="18.8" height="7.2" rx="1.4" />
      <path d="M7 8.4v3M11 8.4v4.4M15 8.4v3M19 8.4v4.4" />
    </svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.8 6.4h10.4v9.2H2.8zM13.2 9.6h3.6l3.4 3v3h-7z" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="16.8" cy="18" r="1.8" />
    </svg>
  );
}

export function ReturnIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.6 9.4A8.6 8.6 0 1 1 3.4 14" />
      <path d="M3.2 4.6v4.8H8" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m4.6 12.4 4.6 4.6L19.4 6.8" />
    </svg>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.8v4.6M12 15.9v.1" />
    </svg>
  );
}

export function StarIcon({ filled = true, ...props }: IconProps & { filled?: boolean }) {
  return (
    <svg {...base} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} {...props}>
      <path d="m12 3.6 2.5 5.4 5.9.7-4.4 4 1.2 5.8L12 16.7l-5.2 2.8L8 13.7l-4.4-4 5.9-.7Z" />
    </svg>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.6 12S6 6.4 12 6.4 21.4 12 21.4 12 18 17.6 12 17.6 2.6 12 2.6 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </svg>
  );
}

export function FilterIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.6 5.6h16.8L14 13v5.4l-4 2V13Z" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.2 5 5.8v5.4c0 4.2 2.9 7.6 7 9.6 4.1-2 7-5.4 7-9.6V5.8Z" />
      <path d="m9.2 12 2 2 3.6-3.8" />
    </svg>
  );
}

export function ScissorsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="6.4" cy="17.6" r="2.6" />
      <circle cx="17.6" cy="17.6" r="2.6" />
      <path d="M8.2 15.8 17.4 4M15.8 15.8 6.6 4" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.4c.5 3.5 1.9 4.9 5.4 5.4-3.5.5-4.9 1.9-5.4 5.4-.5-3.5-1.9-4.9-5.4-5.4 3.5-.5 4.9-1.9 5.4-5.4Z" />
      <path d="M17.8 14.2c.3 1.9 1 2.6 2.9 2.9-1.9.3-2.6 1-2.9 2.9-.3-1.9-1-2.6-2.9-2.9 1.9-.3 2.6-1 2.9-2.9Z" />
    </svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 4c-8 0-13.4 3.4-13.4 9.2A5.4 5.4 0 0 0 12 18.6c5.8 0 8-4.6 8-14.6Z" />
      <path d="M4.4 20c1.6-4.4 4.4-7.4 8.6-9.4" />
    </svg>
  );
}

export type { IconProps };
