import type { Metadata, Viewport } from "next";
import { Caveat, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Екатерина, у вас есть один тест",
  description:
    "Маленький тест. Формально развлекательный. Неформально — у нас и так всё слишком неформально.",
  openGraph: {
    title: "Екатерина, у вас есть один тест",
    description: "Время прохождения: примерно одна опасная улыбка.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#140810",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={`${cormorant.variable} ${inter.variable} ${caveat.variable}`}
    >
      <body className="font-sans text-cream boudoir-vignette boudoir-grain">
        {children}
      </body>
    </html>
  );
}
