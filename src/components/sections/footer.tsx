"use client";

import { AtSign, Globe2, Mail, MapPin, Phone, Share2 } from "lucide-react";
import { FooterLogo } from "@/components/ui/logo";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: ROUTES.about },
  { label: "Destinations", href: "/#destinations" },
  { label: "Tours", href: "/#tours" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Reviews", href: "/#reviews" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: ROUTES.privacyPolicy },
  { label: "Terms & Conditions", href: ROUTES.termsAndConditions },
  { label: "Refunds & Cancellations", href: ROUTES.refundAndCancellationPolicy },
  { label: "Disclaimer", href: ROUTES.disclaimer },
  { label: "Cookie Policy", href: ROUTES.cookiePolicy },
];

const FOOTER_HEADING_CLASS =
  "mb-4 font-display text-xs font-semibold uppercase tracking-[0.14em] text-cloud after:mt-2.5 after:block after:h-0.5 after:w-9 after:rounded-full after:bg-kingfisher/70";

const FOOTER_HEADING_MOBILE_CENTER = cn(
  FOOTER_HEADING_CLASS,
  "after:mx-auto sm:after:mx-0"
);

const FOOTER_COLUMN_MOBILE_CENTER = "text-center sm:text-left";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-cloud">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.1fr]">
          <div className={FOOTER_COLUMN_MOBILE_CENTER}>
            <a
              href="/"
              className="mb-5 flex items-center justify-center sm:justify-start"
            >
              <FooterLogo />
            </a>
            <p className="mx-auto max-w-sm text-sm leading-relaxed text-cloud/55 sm:mx-0">
              Get A Ticket is an independent travel agency and travel booking
              assistance provider. We are not affiliated with, endorsed by, or
              associated with any airline, hotel chain, travel supplier, or
              travel brand unless expressly stated otherwise.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3 sm:justify-start">
              {[Globe2, Share2, AtSign].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-cloud/70 transition-colors hover:border-kingfisher hover:text-kingfisher"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className={FOOTER_COLUMN_MOBILE_CENTER}>
            <h4 className={FOOTER_HEADING_MOBILE_CENTER}>Quick links</h4>
            <ul className="flex flex-col gap-3 text-sm text-cloud/65">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-kingfisher">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={FOOTER_COLUMN_MOBILE_CENTER}>
            <h4 className={FOOTER_HEADING_MOBILE_CENTER}>Legal</h4>
            <ul className="flex flex-col gap-3 text-sm text-cloud/65">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-kingfisher">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={FOOTER_COLUMN_MOBILE_CENTER}>
            <h4 className={FOOTER_HEADING_MOBILE_CENTER}>Stay in the loop</h4>
            <ul className="flex flex-col gap-3 text-sm text-cloud/65">
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <MapPin className="h-4 w-4 shrink-0 text-kingfisher" /> 14 Skyline Way, London EC1
              </li>
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <Phone className="h-4 w-4 shrink-0 text-kingfisher" />
                <a href={`tel:${PHONE_TEL}`} className="transition-colors hover:text-kingfisher">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <Mail className="h-4 w-4 shrink-0 text-kingfisher" /> hello@skyward.co.uk
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-center text-xs text-cloud/40">
          <p>© {new Date().getFullYear()} Skyward Travel Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
