import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Almas & Nizar | From Dua To Forever",
  description:
    "A cinematic royal South Indian Muslim Nikah invitation for Almas and Nizar on 21 May 2026 at SNR Mahal, Pondicherry.",
  openGraph: {
    title: "Almas & Nizar | Nikah Invitation",
    description: "From Dua To Forever",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#7A1F44",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cormorant+Garamond:wght@500;600;700&family=Great+Vibes&family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
