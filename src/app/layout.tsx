import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import HideNavbarWrapper from "@/components/HideNavbarWrapper/HideNavbarWrapper";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Providers from "./Providers";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GlobalVIN - Vehicle History Reports Worldwide | Start Your Franchise",
  description: "Start your own vehicle history report business with GlobalVIN. Access 50M+ reports, 150+ countries coverage, comprehensive VIN check platform. Join the GlobalVIN franchise network today.",
  keywords: "VIN check, vehicle history report, car history, vehicle report, franchise business, GlobalVIN, car report business, VIN decoder, vehicle history, auto check",
  authors: [{ name: "GlobalVIN" }],
  creator: "GlobalVIN",
  publisher: "GlobalVIN",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://globalvin.com",
    siteName: "GlobalVIN",
    title: "GlobalVIN - Vehicle History Reports Worldwide",
    description: "Start your own vehicle history report business. Access comprehensive vehicle data from 150+ countries.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GlobalVIN - Vehicle History Reports",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GlobalVIN - Vehicle History Reports Worldwide",
    description: "Start your own vehicle history report business with GlobalVIN franchise.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Toaster position="top-right" richColors />
          <HideNavbarWrapper />
          {children}
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
