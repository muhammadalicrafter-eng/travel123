import type { Metadata } from "next";

export const SITE_URL = "https://getaticket.co.uk";

export const SITE_NAME = "Get A Ticket";

export const SITE_TAGLINE = "Travel. Book. Go.";

export const SITE_DESCRIPTION =
  "Get A Ticket helps UK travellers find competitive flights and holiday deals. Compare routes, explore packages, and get friendly booking support for your next trip.";

export const SITE_KEYWORDS = [
  "Get A Ticket",
  "getaticket.co.uk",
  "UK travel",
  "flight booking UK",
  "holiday packages UK",
  "cheap flights UK",
  "travel booking assistance",
  "city breaks",
  "family holidays",
  "last minute travel deals",
];

export const SITE_OG_IMAGE = "/logo-travel-removebg-preview.png";

export const DEFAULT_PAGE_TITLE = `${SITE_NAME} — UK Flights & Holiday Booking`;

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      url,
      title: fullTitle,
      description,
    },
  };
}
