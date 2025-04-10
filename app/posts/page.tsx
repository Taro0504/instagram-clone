"use client";

import { useState, useEffect } from "react";
import PostCard from "@/components/PostCard";
import Link from "next/link";

// ダミーデータ（後でSupabaseからのデータに置き換え）
const dummyPosts = [
  {
    id: "1",
    username: "taro_suzuki",
    userAvatar: "https://xsgames.co/randomusers/avatar.php?g=male&rand=1",
    imageUrl: "https://source.unsplash.com/random/600x800?nature,1",
    caption: "美しい景色です！#旅行 #自然",
    likes: 120,
    commentsCount: 15,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "2",
    username: "hanako_tanaka",
    userAvatar: "https://xsgames.co/randomusers/avatar.php?g=female&rand=2",
    imageUrl: "https://source.unsplash.com/random/600x800?food,1",
    caption: "今日のランチ🍣 #グルメ #おいしい",
    likes: 85,
    commentsCount: 7,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "3",
    username: "kenji_yamada",
    userAvatar: "https://xsgames.co/randomusers/avatar.php?g=male&rand=3",
    imageUrl: "https://source.unsplash.com/random/600x800?programming,1",
    caption: "プログラミング中... #コーディング #開発者の日常",
    likes: 234,
    commentsCount: 19,
    createdAt: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    id: "4",
    username: "yuki_sato",
    userAvatar: "https://xsgames.co/randomusers/avatar.php?g=female&rand=4",
    imageUrl: "https://source.unsplash.com/random/600x800?travel,1",
    caption: "週末の小旅行 ✈️ #旅行 #観光",
    likes: 178,
    commentsCount: 24,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export default function PostsPage() {
  const [posts, setPosts] = useState(dummyPosts);
  const [loading, setLoading] = useState(false);

  // 本来はここでSupabaseからデータを取得する
  useEffect(() => {
    // ここにデータ取得ロジックを実装
    // 例: const fetchPosts = async () => {...}
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">投稿一覧</h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                まだ投稿がありません
              </p>
              <Link
                href="/create-post"
                className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
              >
                最初の投稿を作成する
              </Link>
            </div>
          )}
        </div>
      )}

      <div className="fixed bottom-6 right-6">
        <Link
          href="/create-post"
          className="bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-opacity-90 transition"
        >
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}
