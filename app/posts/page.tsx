"use client";

import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { postsAtom, type Post } from "@/lib/atoms";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// ダミーデータ（後でSupabaseからのデータに置き換え）
const dummyPosts: Post[] = [
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

// 投稿カードコンポーネント
const PostCard = ({ post }: { post: Post }) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center">
          <Avatar className="mr-3 h-10 w-10">
            <AvatarImage src={post.userAvatar} alt={post.username} />
            <AvatarFallback>{post.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <Link
            to="/profile"
            className="font-medium hover:underline dark:text-white"
            params={{ username: post.username }}
          >
            {post.username}
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <img
          src={post.imageUrl}
          alt={post.caption}
          className="w-full object-cover max-h-[500px]"
        />
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 pt-4">
        <div className="flex items-center space-x-4 w-full">
          <button className="focus:outline-none">
            <svg
              className="w-6 h-6 text-gray-600 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </button>
          <button className="focus:outline-none">
            <svg
              className="w-6 h-6 text-gray-600 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
          </button>
          <div className="ml-auto">
            <button className="focus:outline-none">
              <svg
                className="w-6 h-6 text-gray-600 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <p className="font-semibold dark:text-white">{post.likes}件のいいね</p>
        <div className="flex flex-wrap">
          <Link
            to="/profile"
            className="font-semibold mr-2 dark:text-white"
            params={{ username: post.username }}
          >
            {post.username}
          </Link>
          <p className="text-gray-800 dark:text-gray-200">{post.caption}</p>
        </div>
        {post.commentsCount > 0 && (
          <Link
            to="/posts/$postId"
            params={{ postId: post.id }}
            className="text-gray-500 dark:text-gray-400 text-sm"
          >
            {post.commentsCount}件のコメントをすべて見る
          </Link>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(post.createdAt).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </CardFooter>
    </Card>
  );
};

export default function PostsPage() {
  const [posts, setPosts] = useAtom(postsAtom);

  // 投稿データの初期化（本来はここでSupabaseからデータを取得する）
  useEffect(() => {
    if (posts.length === 0) {
      setPosts(dummyPosts);
    }
  }, [posts, setPosts]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">投稿一覧</h1>

      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              まだ投稿がありません
            </p>
            <Button asChild>
              <Link to="/create-post">最初の投稿を作成する</Link>
            </Button>
          </div>
        )}
      </div>

      <div className="fixed bottom-6 right-6">
        <Button asChild className="rounded-full h-14 w-14 p-0">
          <Link to="/create-post">
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
        </Button>
      </div>
    </div>
  );
}
