"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

// 投稿の型定義
interface Post {
  id: string;
  username: string;
  userAvatar?: string;
  imageUrl: string;
  caption: string;
  likes: number;
  commentsCount: number;
  createdAt: string;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");

  // いいねの切り替え
  const toggleLike = () => {
    setLiked(!liked);
  };

  // 保存の切り替え
  const toggleSave = () => {
    setSaved(!saved);
  };

  // コメント送信ハンドラ
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      // TODO: コメント送信処理
      setComment("");
    }
  };

  return (
    <div className="card overflow-hidden">
      {/* ポストヘッダー */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden mr-2 bg-gray-300">
            {post.userAvatar ? (
              <img
                src={post.userAvatar}
                alt={post.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              </div>
            )}
          </div>
          <Link
            href={`/profile/${post.username}`}
            className="font-semibold text-sm hover:underline"
          >
            {post.username}
          </Link>
        </div>
        <button className="text-gray-500">
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
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </button>
      </div>

      {/* 投稿画像 */}
      <div className="relative aspect-square">
        <img
          src={post.imageUrl}
          alt={post.caption}
          className="w-full h-full object-cover"
        />
      </div>

      {/* アクションボタン */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between mb-2">
          <div className="flex space-x-4">
            <button
              onClick={toggleLike}
              className={
                liked ? "text-danger" : "text-gray-700 dark:text-gray-300"
              }
            >
              {liked ? (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              )}
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="text-gray-700 dark:text-gray-300"
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
            </button>
            <button className="text-gray-700 dark:text-gray-300">
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </button>
          </div>
          <button
            onClick={toggleSave}
            className={
              saved ? "text-primary" : "text-gray-700 dark:text-gray-300"
            }
          >
            {saved ? (
              <svg
                className="w-6 h-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
              </svg>
            ) : (
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
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                ></path>
              </svg>
            )}
          </button>
        </div>

        {/* いいね数 */}
        <p className="font-semibold text-sm dark:text-white">
          {liked ? post.likes + 1 : post.likes}件のいいね
        </p>
      </div>

      {/* キャプションとコメント */}
      <div className="p-3">
        <div className="mb-2 text-sm dark:text-white">
          <Link
            href={`/profile/${post.username}`}
            className="font-semibold mr-2 hover:underline"
          >
            {post.username}
          </Link>
          <span>{post.caption}</span>
        </div>

        {/* コメント一覧 */}
        {showComments && (
          <div className="mt-2 text-sm space-y-1">
            <Link
              href={`/posts/${post.id}`}
              className="text-gray-500 block hover:underline dark:text-gray-400"
            >
              {post.commentsCount}件のコメントをすべて見る
            </Link>
          </div>
        )}

        {/* 投稿日時 */}
        <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
          {formatDate(post.createdAt)}
        </p>

        {/* コメント入力 */}
        <form onSubmit={handleSubmitComment} className="mt-3 flex items-center">
          <input
            type="text"
            placeholder="コメントを追加..."
            className="flex-grow bg-transparent outline-none text-sm dark:text-white"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {comment.trim() && (
            <button
              type="submit"
              className="text-primary font-semibold text-sm ml-2"
            >
              投稿
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
