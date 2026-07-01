import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/legal-document";
import { Footer } from "@/components/sections/footer";
import { cookiePolicy } from "@/content/cookie-policy";
import { createPageMetadata } from "@/lib/site";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = createPageMetadata({
  title: "Cookie Policy",
  description:
    "Read Get A Ticket's Cookie Policy to understand how we use cookies and similar technologies on our website.",
  path: ROUTES.cookiePolicy,
});

export default function CookiePolicyPage() {
  return (
    <>
      <LegalDocument
        title={cookiePolicy.title}
        intro={cookiePolicy.intro}
        sections={cookiePolicy.sections}
      />
      <Footer />
    </>
  );
}
