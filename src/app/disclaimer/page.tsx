import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/legal-document";
import { Footer } from "@/components/sections/footer";
import { disclaimer } from "@/content/disclaimer";
import { createPageMetadata } from "@/lib/site";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = createPageMetadata({
  title: "Disclaimer",
  description:
    "Read Get A Ticket's Disclaimer regarding travel information, booking assistance, and website use.",
  path: ROUTES.disclaimer,
});

export default function DisclaimerPage() {
  return (
    <>
      <LegalDocument
        title={disclaimer.title}
        intro={disclaimer.intro}
        sections={disclaimer.sections}
      />
      <Footer />
    </>
  );
}
