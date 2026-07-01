import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/about-page-content";
import { Footer } from "@/components/sections/footer";
import { createPageMetadata } from "@/lib/site";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = createPageMetadata({
  title: "About Us",
  description:
    "Learn about Get A Ticket — UK travel booking assistance for flights, holidays, city breaks, and more.",
  path: ROUTES.about,
});

export default function AboutPage() {
  return (
    <>
      <AboutPageContent />
      <Footer />
    </>
  );
}
