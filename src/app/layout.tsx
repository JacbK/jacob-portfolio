import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Site-in-a-Box | AI-Powered Portfolio",
  description: "A personal portfolio website built with AI assistance using Claude Code.",
  keywords: ["portfolio", "developer", "engineer", "projects"],
  authors: [{ name: "Site-in-a-Box" }],
  openGraph: {
    title: "Site-in-a-Box | AI-Powered Portfolio",
    description: "A personal portfolio website built with AI assistance using Claude Code.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Site-in-a-Box | AI-Powered Portfolio",
    description: "A personal portfolio website built with AI assistance using Claude Code.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-neutral-950 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
