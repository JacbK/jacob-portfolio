import type { Metadata } from "next";
import { Source_Serif_4, Inter } from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jacob Kieser",
  description: "Software engineer. Previously Uber and Palantir.",
  authors: [{ name: "Jacob Kieser" }],
  openGraph: {
    title: "Jacob Kieser",
    description: "Software engineer. Previously Uber and Palantir.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${sourceSerif.variable} ${inter.variable} antialiased bg-neutral-950 text-neutral-100`}
      >
        {children}
      </body>
    </html>
  );
}
