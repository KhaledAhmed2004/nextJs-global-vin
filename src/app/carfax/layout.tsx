import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carfax Vehicle History Reports API | GlobalVIN",
  description:
    "Access Carfax vehicle history data through GlobalVIN API. 40B+ records, accident history, service records. Start your free trial today.",
  keywords: [
    "Carfax API",
    "vehicle history API",
    "VIN lookup API",
    "car history reports",
    "accident history API",
  ],
  openGraph: {
    title: "Carfax Vehicle History Reports | GlobalVIN",
    description: "Access Carfax vehicle history data through GlobalVIN. 40B+ records, accident history, service records.",
    url: "https://globalvin.com/carfax",
    siteName: "GlobalVIN",
    type: "website",
  },
};

export default function CarfaxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
