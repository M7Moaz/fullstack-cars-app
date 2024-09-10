import type { Metadata } from "next";
import { Righteous } from "next/font/google";
import "./globals.css";

const inter = Righteous({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Modern Cars To Rent",
  description: "All cars in one place | Rent Your Car Here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>{children}</body>
    </html>
  );
}
