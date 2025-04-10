import PostCard from "@/components/PostCard";
import Link from "next/link";

// ダミーデータ
const dummyPosts = [
  {
    id: "1",
    username: "user1",
    userAvatar: "/images/avatar1.jpg",
    imageUrl: "https://xsgames.co/randomusers/avatar.php?g=male&rand=1",
    caption: "美しい景色です！#旅行 #自然",
    likes: 120,
    commentsCount: 15,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "2",
    username: "user2",
    userAvatar: "/images/avatar2.jpg",
    imageUrl: "https://xsgames.co/randomusers/avatar.php?g=female&rand=2",
    caption: "今日のランチ🍣 #グルメ #おいしい",
    likes: 85,
    commentsCount: 7,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "3",
    username: "user3",
    userAvatar: "/images/avatar3.jpg",
    imageUrl: "https://xsgames.co/randomusers/avatar.php?g=male&rand=3",
    caption: "プログラミング中... #コーディング #開発者の日常",
    likes: 234,
    commentsCount: 19,
    createdAt: new Date(Date.now() - 10800000).toISOString(),
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* メインコンテンツ */}
        <div className="md:col-span-8">
          <h1 className="sr-only">Instagram Clone</h1>

          {/* 投稿フィード */}
          <div className="space-y-6">
            {dummyPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}

            <div className="flex justify-center py-4">
              <button className="text-primary font-medium hover:text-opacity-80">
                さらに読み込む
              </button>
            </div>
          </div>
        </div>

        {/* サイドバー */}
        <div className="md:col-span-4 hidden md:block">
          <div className="sticky top-20">
            {/* ユーザープロフィール情報 */}
            <div className="bg-white rounded-lg border border-gray-300 p-4 mb-4 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
                ようこそ
              </h2>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-300 mr-3 flex items-center justify-center text-gray-600">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      ゲスト
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      アカウントがありません
                    </p>
                  </div>
                </div>
                <Link
                  href="/auth/login"
                  className="text-primary text-sm font-medium"
                >
                  ログイン
                </Link>
              </div>
              <Link
                href="/auth/register"
                className="w-full block text-center bg-primary text-white py-2 rounded-md mt-3 hover:bg-opacity-90 transition"
              >
                アカウント作成
              </Link>
            </div>

            {/* おすすめのアカウント */}
            <div className="bg-white rounded-lg border border-gray-300 p-4 mb-4 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-sm font-bold mb-4 text-gray-800 dark:text-white">
                おすすめのアカウント
              </h2>
              <div className="space-y-3">
                {dummyPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <div className="w-9 h-9 rounded-full bg-gray-300 mr-2 overflow-hidden">
                        <img
                          src={post.imageUrl}
                          alt={post.username}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">
                          {post.username}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          人気のアカウント
                        </p>
                      </div>
                    </div>
                    <button className="text-xs text-primary font-medium">
                      フォロー
                    </button>
                  </div>
                ))}
              </div>
              <button className="w-full text-center text-primary text-sm font-medium mt-3">
                すべて見る
              </button>
            </div>

            {/* フッターリンク */}
            <div className="text-xs text-gray-500 space-y-4 dark:text-gray-400">
              <div className="flex flex-wrap gap-x-2">
                <Link href="/about" className="hover:underline">
                  About
                </Link>
                <span>•</span>
                <Link href="/help" className="hover:underline">
                  Help
                </Link>
                <span>•</span>
                <Link href="/press" className="hover:underline">
                  Press
                </Link>
                <span>•</span>
                <Link href="/api" className="hover:underline">
                  API
                </Link>
                <span>•</span>
                <Link href="/jobs" className="hover:underline">
                  Jobs
                </Link>
                <span>•</span>
                <Link href="/privacy" className="hover:underline">
                  Privacy
                </Link>
                <span>•</span>
                <Link href="/terms" className="hover:underline">
                  Terms
                </Link>
              </div>
              <p>© 2023 INSTAGRAM CLONE FROM NEXT.JS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
