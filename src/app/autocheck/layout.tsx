import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AutoCheck Vehicle Reports API | GlobalVIN",
  description:
    "Integrate AutoCheck by Experian into your platform. 600M+ vehicle records, comprehensive damage reports. Get API access now.",
  keywords: [
    "AutoCheck API",
    "Experian vehicle data",
    "VIN check API",
    "vehicle history reports",
    "car damage reports API",
  ],
  openGraph: {
    title: "AutoCheck Vehicle Reports | GlobalVIN",
    description: "Integrate AutoCheck by Experian. 600M+ vehicle records, comprehensive damage reports.",
    url: "https://globalvin.com/autocheck",
    siteName: "GlobalVIN",
    type: "website",
  },
};

export default function AutoCheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
