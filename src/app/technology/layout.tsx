import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GlobalVIN Technology | Vehicle Report Platform",
  description: "Discover GlobalVIN's technology platform. White-label solutions, admin dashboard, mobile apps, and comprehensive vehicle history report tools for your franchise.",
  keywords: "vehicle report technology, VIN platform, white-label reports, car history software, GlobalVIN franchise",
  openGraph: {
    title: "GlobalVIN Technology | Vehicle Report Platform",
    description: "Discover GlobalVIN's technology platform. White-label solutions and comprehensive vehicle history report tools.",
    url: "https://globalvin.com/technology",
    siteName: "GlobalVIN",
    type: "website",
  },
};

export default function TechnologyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}