import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Inter フォントを使用
const inter = Inter({ subsets: ["latin"] });

// メタデータ設定
export const metadata: Metadata = {
  title: "Instagram Clone",
  description:
    "Next.js と Supabase で構築された Instagram クローンアプリケーション",
};

// ルートレイアウト
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
