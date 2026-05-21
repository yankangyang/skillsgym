import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "PrepGym — Consulting Interview Prep",
  description: "Find the gap. Fix that. The most targeted consulting interview prep platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#09090f] text-slate-100 min-h-screen font-sans">{children}</body>
    </html>
  );
}
