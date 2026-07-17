import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Nex Mall - Premium Shopping",
  description: "India's premium shopping destination for fashion, accessories, and lifestyle products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <body className={inter.className} style={{ background: "#f9fafb", color: "#1f2937" }}>
        {children}
      </body>
    </html>
  );
}