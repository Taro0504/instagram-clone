"use client";

import { useState } from "react";
import Link from "next/link";

interface CommentProps {
  comment: {
    id: string;
    postId: string;
    username: string;
    userAvatar: string;
    text: string;
    createdAt: string;
    likes: number;
  };
  onReply?: (username: string) => void;
  onDelete?: (commentId: string) => void;
  currentUsername?: string; // 現在ログイン中のユーザー名
}

export default function Comment({
  comment,
  onReply,
  onDelete,
  currentUsername,
}: CommentProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likes);
  const [showOptions, setShowOptions] = useState(false);

  const isOwner = currentUsername === comment.username;

  // いいね処理
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    // ここでAPIを呼び出していいね情報を保存
  };

  // 返信処理
  const handleReply = () => {
    if (onReply) {
      onReply(comment.username);
    }
  };

  // 削除処理
  const handleDelete = () => {
    if (onDelete) {
      onDelete(comment.id);
    }
    // ここでオプションメニューを閉じる
    setShowOptions(false);
  };

  return (
    <div className="flex items-start mb-4 group">
      <div className="h-8 w-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
        <Link href={`/profile/${comment.username}`}>
          <img
            src={comment.userAvatar}
            alt={comment.username}
            className="h-full w-full object-cover"
          />
        </Link>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start">
          <div className="flex-1">
            <div className="inline-flex items-center">
              <Link
                href={`/profile/${comment.username}`}
                className="font-semibold text-sm mr-2 hover:underline dark:text-white"
              >
                {comment.username}
              </Link>
              <p className="text-sm dark:text-gray-300 break-words">
                {comment.text}
              </p>
            </div>
            <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
              <span>
                {new Date(comment.createdAt).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              {likesCount > 0 && (
                <span className="ml-2">{likesCount}件のいいね</span>
              )}
              <button
                onClick={handleReply}
                className="ml-3 hover:text-gray-700 dark:hover:text-gray-300"
              >
                返信
              </button>
              <button
                onClick={handleLike}
                className={`ml-3 ${
                  isLiked
                    ? "text-red-500"
                    : "hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                いいね
              </button>
            </div>
          </div>

          {/* オプションボタン（自分のコメントのみ表示） */}
          <div className="relative ml-2">
            {isOwner && (
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg
                  className="w-4 h-4"
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
              </button>
            )}

            {/* オプションメニュー */}
            {showOptions && (
              <div className="absolute right-0 top-6 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleDelete}
                  className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  削除
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// コメント入力コンポーネント
export function CommentInput({
  postId,
  onSubmit,
  placeholder = "コメントを追加...",
  replyingTo = "",
  autoFocus = false,
}: {
  postId: string;
  onSubmit: (text: string) => void;
  placeholder?: string;
  replyingTo?: string;
  autoFocus?: boolean;
}) {
  const [commentText, setCommentText] = useState(
    replyingTo ? `@${replyingTo} ` : ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    onSubmit(commentText);
    setCommentText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex mt-2">
      <input
        type="text"
        placeholder={placeholder}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white text-sm"
        autoFocus={autoFocus}
      />
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded-r-lg disabled:opacity-50 text-sm"
        disabled={!commentText.trim()}
      >
        投稿
      </button>
    </form>
  );
}
