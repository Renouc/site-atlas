import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import BackgroundPattern from "@/components/BackgroundPattern";
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
  title: "Site Atlas | 个人收藏导航",
  description: "一个服务单人自用场景的收藏站点导航首页。",
};

const themeInitScript = `
(function () {
  try {
    var root = document.documentElement;
    var stored = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = stored === "dark" || (!stored && prefersDark) ? "dark" : "light";

    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  } catch (error) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <BackgroundPattern />
        {children}
      </body>
    </html>
  );
}
