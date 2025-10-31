// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "./ThemeProvider"; // Yangi import

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ilmiy Arxiv",
  description: "Ilmiy konferensiyalar va maqolalar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" data-theme="light">
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
