import type { Metadata } from "next";
import { Michroma, Inter } from "next/font/google";
import "./globals.css";

const michroma = Michroma({
  weight: "400",
  variable: "--font-michroma",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Trener Personalny",
  description:
    "Bespoke training methodologies designed for those who demand excellence in their physical performance and daily life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${michroma.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
