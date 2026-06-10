import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mehrmahan",
  description: "Next.js 16, TypeScript, Tailwind CSS, and react-hook-form starter.",
};

const yekanBakh = localFont({
  src: [
    {
      path: "../../public/fonts/yekanBakh/Yekan-Bakh-FaNum-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/yekanBakh/Yekan-Bakh-FaNum-Medium.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/yekanBakh/Yekan-Bakh-FaNum-Bold.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-my-local",
  display: "swap",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${yekanBakh.variable} font-sans`}>
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </body>
    </html>
  );
}
