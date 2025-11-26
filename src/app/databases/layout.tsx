import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehicle Data Partners & APIs | GlobalVIN Databases",
  description: "Explore GlobalVIN's trusted data partners including Carfax, AutoCheck, NMVTIS, and regional APIs. Access 500M+ vehicle records from 50+ countries worldwide.",
  keywords: "vehicle database, car data API, VIN database, auto data partners, Carfax, AutoCheck, NMVTIS, GlobalVIN",
  openGraph: {
    title: "Vehicle Data Partners & APIs | GlobalVIN",
    description: "Explore GlobalVIN's trusted data partners. Access 500M+ vehicle records from 50+ countries.",
    url: "https://globalvin.com/databases",
    siteName: "GlobalVIN",
    type: "website",
  },
};

export default function DatabasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}