import type { Metadata } from "next";
import { SITE } from "@/content/projects";
import { fonts } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: { default: `${SITE.name} — ${SITE.role}`, template: `%s — ${SITE.name}` },
  description: SITE.intro,
  keywords: ["colourist", "colorist", "film colour grading", "HDR mastering", "remote DI", "DaVinci Resolve", "DCP finishing", "Dolby Vision"],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    url: SITE.domain,
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.intro,
    siteName: SITE.name,
  },
  twitter: { card: "summary_large_image", title: `${SITE.name} — ${SITE.role}`, description: SITE.intro },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    jobTitle: "Film Colourist",
    email: SITE.email,
    url: SITE.domain,
    sameAs: [SITE.links.imdb, SITE.links.linkedin, SITE.links.instagram],
    knowsAbout: ["Colour grading", "HDR mastering", "Digital intermediate", "DCP finishing", "Dolby Vision"],
  };
  return (
    <html lang="en" className={fonts}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
