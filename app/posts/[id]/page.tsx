"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { selectedPostAtom, commentsAtom, type Comment } from "@/lib/atoms";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Link from "next/link";

// コメントコンポーネント
const CommentItem = ({ comment }: { comment: Comment }) => (
  <div className="flex items-start mb-4">
    <Avatar className="h-8 w-8 mr-3">
      <AvatarImage src={comment.userAvatar} alt={comment.username} />
      <AvatarFallback>{comment.username[0].toUpperCase()}</AvatarFallback>
    </Avatar>
    <div className="flex-1">
      <div className="flex items-center">
        <Link
          href={`/profile/${comment.username}`}
          className="font-semibold text-sm mr-2 dark:text-white"
        >
          {comment.username}
        </Link>
        <p className="text-sm dark:text-gray-300">{comment.text}</p>
      </div>
      <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
        <span>{new Date(comment.createdAt).toLocaleDateString("ja-JP")}</span>
        <button className="ml-3 hover:text-gray-700 dark:hover:text-gray-300">
          返信
        </button>
        <button className="ml-3 hover:text-gray-700 dark:hover:text-gray-300">
          いいね
        </button>
      </div>
    </div>
  </div>
);

// ダミーデータ（後でSupabaseからのデータに置き換え）
const dummyPost = {
  id: "1",
  username: "taro_suzuki",
  userAvatar: "https://xsgames.co/randomusers/avatar.php?g=male&rand=1",
  imageUrl: "https://source.unsplash.com/random/600x800?nature,1",
  caption:
    "美しい景色です！#旅行 #自然 長い文章の場合はこのように表示されます。この投稿は自然の美しさについて語っています。山や川、森の緑など、自然の素晴らしさを感じることができます。",
  likes: 120,
  commentsCount: 15,
  createdAt: new Date(Date.now() - 3600000).toISOString(),
  location: "富士山",
};

const dummyComments = [
  {
    id: "1",
    postId: "1",
    username: "hanako_tanaka",
    userAvatar: "https://xsgames.co/randomusers/avatar.php?g=female&rand=2",
    text: "素敵な写真ですね！どこで撮影したんですか？",
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    likes: 5,
  },
  {
    id: "2",
    postId: "1",
    username: "kenji_yamada",
    userAvatar: "https://xsgames.co/randomusers/avatar.php?g=male&rand=3",
    text: "いいね！僕も行ってみたいです。",
    createdAt: new Date(Date.now() - 1200000).toISOString(),
    likes: 2,
  },
  {
    id: "3",
    postId: "1",
    username: "yuki_sato",
    userAvatar: "https://xsgames.co/randomusers/avatar.php?g=female&rand=4",
    text: "すごくきれいな景色ですね。次の旅行先の候補にします！",
    createdAt: new Date(Date.now() - 600000).toISOString(),
    likes: 1,
  },
];

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;

  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom);
  const [allComments, setAllComments] = useAtom(commentsAtom);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (selectedPost === null) {
      // ダミーデータ（実際の実装では、APIからデータを取得）
      const dummyPost = {
        id: postId,
        username: "john_doe",
        userAvatar: "/placeholder.svg",
        imageUrl: "https://source.unsplash.com/random/600x600/?nature",
        caption: "素晴らしい景色！",
        likes: 42,
        commentsCount: 5,
        createdAt: new Date().toISOString(),
        location: "Unknown",
      };
      setSelectedPost(dummyPost);
    }

    // コメントのフィルタリング
    if (allComments && allComments[postId]) {
      setComments(allComments[postId]);
    }
  }, [selectedPost, allComments, postId, setSelectedPost]);

  // 新しいコメントを追加
  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const comment: Comment = {
      id: Date.now().toString(),
      postId: postId,
      username: "current_user",
      text: newComment,
      createdAt: new Date().toISOString(),
      likes: 0,
      userAvatar: "https://xsgames.co/randomusers/avatar.php?g=male",
    };

    // グローバルの comments 状態を更新
    setAllComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), comment],
    }));

    // ローカルの状態を更新
    setComments((prev) => [...prev, comment]);
    setNewComment("");
  };

  const handleLike = () => {
    // Supabaseにいいね情報を保存するロジック
  };

  const handleSave = () => {
    // Supabaseに保存情報を記録するロジック
  };

  if (selectedPost === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button
        variant="ghost"
        className="mb-4 flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        onClick={() => router.push("/posts")}
      >
        <svg
          className="w-5 h-5 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        戻る
      </Button>

      <Card>
        <CardHeader className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage
                src={selectedPost.userAvatar}
                alt={selectedPost.username}
              />
              <AvatarFallback>
                {selectedPost.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <Link
                href={`/profile/${selectedPost.username}`}
                className="font-semibold dark:text-white"
              >
                {selectedPost.username}
              </Link>
              {selectedPost.location && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {selectedPost.location}
                </p>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 dark:text-gray-400"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              ></path>
            </svg>
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          <div className="relative pb-[100%] md:pb-[75%] bg-gray-100 dark:bg-gray-900">
            <img
              src={selectedPost.imageUrl}
              alt={selectedPost.caption}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-start p-4">
          <div className="flex items-center justify-between w-full mb-2">
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLike}
                className="focus:outline-none"
              >
                <svg
                  className={`w-6 h-6 ${
                    false
                      ? "text-red-500 fill-current"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                  fill={false ? "currentColor" : "none"}
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
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="focus:outline-none"
              >
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
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="focus:outline-none"
              >
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
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  ></path>
                </svg>
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
              className="focus:outline-none"
            >
              <svg
                className={`w-6 h-6 ${
                  false
                    ? "text-gray-900 dark:text-white fill-current"
                    : "text-gray-600 dark:text-gray-300"
                }`}
                fill={false ? "currentColor" : "none"}
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
            </Button>
          </div>

          <p className="font-semibold dark:text-white mb-2">
            {selectedPost.likes}件のいいね
          </p>

          <div className="flex mb-2">
            <Link
              href={`/profile/${selectedPost.username}`}
              className="font-semibold mr-2 dark:text-white"
            >
              {selectedPost.username}
            </Link>
            <p className="text-gray-800 dark:text-gray-200">
              {selectedPost.caption}
            </p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            {new Date(selectedPost.createdAt).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="w-full border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="font-semibold mb-4 dark:text-white">コメント</h3>
            <div className="max-h-80 overflow-y-auto mb-4">
              {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddComment();
              }}
              className="flex gap-2"
            >
              <Input
                type="text"
                placeholder="コメントを追加..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={!newComment.trim()}>
                投稿
              </Button>
            </form>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
