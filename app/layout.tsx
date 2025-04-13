import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { ClientProviders } from "../components/ClientProviders";

// Inter フォントを使用
const inter = Inter({ subsets: ["latin"] });

// メタデータ定義
export const metadata = {
  title: "Instagram Clone",
  description:
    "Next.js と Supabase で構築された Instagram クローンアプリケーション",
};

interface RootLayoutProps {
  children: ReactNode;
}

// ルートレイアウト
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
