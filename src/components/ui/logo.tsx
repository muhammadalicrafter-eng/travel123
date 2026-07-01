import { cn } from "@/lib/utils";

export const LOGO_SRC = "/logo-travel-removebg-preview.png";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <img
      src={LOGO_SRC}
      alt="Get A Ticket"
      width={220}
      height={68}
      className={cn("h-14 w-auto object-contain sm:h-16", className)}
    />
  );
}

type FooterLogoProps = {
  className?: string;
};

export function FooterLogo({ className }: FooterLogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-2xl bg-cloud px-4 py-2.5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.45)] ring-1 ring-white/10",
        className
      )}
    >
      <Logo className="h-11 w-auto sm:h-12" />
    </span>
  );
}
