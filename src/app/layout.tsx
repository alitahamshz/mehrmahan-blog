import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mehrmahan",
  description: "Next.js 16, TypeScript, Tailwind CSS, and react-hook-form starter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
