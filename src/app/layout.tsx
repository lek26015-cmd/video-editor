import type { Metadata } from "next";
import "./globals.css";
import { LayoutProvider } from "@/components/portfolio/layout-provider";

export const metadata: Metadata = {
  title: "พอร์ตโฟลิโอตัดต่อวิดีโอ | Video Editing Portfolio",
  description: "รวบรวมผลงานตัดต่อวิดีโอระดับมืออาชีพ ประสบการณ์กว่า 10 ปี พร้อมร่วมงานกับทีมโปรดักชันชั้นนำ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="dark scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lazywasin/line-seed-th@master/css/line-seed-th.css" />
      </head>
      <body className="min-h-screen bg-[#0f0f0f] text-white antialiased">
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
