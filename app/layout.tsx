import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luxury Villa",
  description: "Experience the extraordinary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      {/* ✅ FIX: overflow-x-hidden on body prevents any side scroll */}
      <body className="overflow-x-hidden bg-[#050505]">
        {/* ✅ FIX: main has no padding, no max-width, no constraints */}
        <main className="w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
