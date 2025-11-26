import { Metadata } from "next";

export const metadata: Metadata = {
  title: "China Vehicle Data API | GlobalVIN",
  description:
    "Access Chinese vehicle registration, inspection, and manufacturing data. Comprehensive China market coverage for dealers and exporters.",
  keywords: [
    "China vehicle API",
    "Chinese car data",
    "China VIN lookup",
    "Chinese vehicle history",
    "China auto export API",
  ],
  openGraph: {
    title: "China Vehicle Data API | GlobalVIN",
    description: "Access Chinese vehicle registration, inspection, and manufacturing data for dealers and exporters.",
    url: "https://globalvin.com/chinese-api",
    siteName: "GlobalVIN",
    type: "website",
  },
};

export default function ChineseApiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
