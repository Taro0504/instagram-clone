"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// 後でコンポーネントへ置き換え
const CommentPlaceholder = ({ comment }: { comment: any }) => (
  <div className="flex items-start mb-4">
    <div className="h-8 w-8 rounded-full overflow-hidden mr-3">
      <img
        src={comment.userAvatar}
        alt={comment.username}
        className="h-full w-full object-cover"
      />
    </div>
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
  const { id } = params;

  const [post, setPost] = useState<any>(dummyPost);
  const [comments, setComments] = useState<any[]>(dummyComments);
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(dummyPost.likes);
  const [isSaved, setIsSaved] = useState(false);

  // 本来はここでSupabaseからデータを取得する
  useEffect(() => {
    // 投稿IDからデータを取得するロジックを実装
    // const fetchPostAndComments = async () => {...}
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    // Supabaseにいいね情報を保存するロジック
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // Supabaseに保存情報を記録するロジック
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    // 新しいコメントを追加
    const newComment = {
      id: `temp-${Date.now()}`,
      postId: post.id,
      username: "current_user", // 現在のユーザー名
      userAvatar: "https://xsgames.co/randomusers/avatar.php?g=male", // 現在のユーザーのアバター
      text: commentText,
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    setComments([...comments, newComment]);
    setCommentText("");
    // Supabaseにコメントを保存するロジック
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
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
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800">
        {/* 投稿ヘッダー */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
              <img
                src={post.userAvatar}
                alt={post.username}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <Link
                href={`/profile/${post.username}`}
                className="font-semibold dark:text-white"
              >
                {post.username}
              </Link>
              {post.location && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {post.location}
                </p>
              )}
            </div>
          </div>
          <button className="text-gray-500 dark:text-gray-400">
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
          </button>
        </div>

        {/* 投稿画像 */}
        <div className="relative pb-[100%] md:pb-[75%] bg-gray-100 dark:bg-gray-900">
          <img
            src={post.imageUrl}
            alt={post.caption}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>

        {/* アクションボタン */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex space-x-4">
            <button onClick={handleLike} className="focus:outline-none">
              <svg
                className={`w-6 h-6 ${
                  isLiked
                    ? "text-red-500 fill-current"
                    : "text-gray-600 dark:text-gray-300"
                }`}
                fill={isLiked ? "currentColor" : "none"}
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
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                ></path>
              </svg>
            </button>
          </div>
          <button onClick={handleSave} className="focus:outline-none">
            <svg
              className={`w-6 h-6 ${
                isSaved
                  ? "text-gray-900 dark:text-white fill-current"
                  : "text-gray-600 dark:text-gray-300"
              }`}
              fill={isSaved ? "currentColor" : "none"}
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

        {/* いいね数 */}
        <div className="px-4 pb-2">
          <p className="font-semibold dark:text-white">
            {likesCount}件のいいね
          </p>
        </div>

        {/* キャプション */}
        <div className="px-4 pb-2">
          <div className="flex">
            <Link
              href={`/profile/${post.username}`}
              className="font-semibold mr-2 dark:text-white"
            >
              {post.username}
            </Link>
            <p className="text-gray-800 dark:text-gray-200">{post.caption}</p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {new Date(post.createdAt).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* コメントセクション */}
        <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-4 dark:text-white">コメント</h3>
          <div className="max-h-80 overflow-y-auto mb-4">
            {comments.map((comment) => (
              <CommentPlaceholder key={comment.id} comment={comment} />
            ))}
          </div>

          {/* コメント入力フォーム */}
          <form onSubmit={handleCommentSubmit} className="flex">
            <input
              type="text"
              placeholder="コメントを追加..."
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-r-lg disabled:opacity-50"
              disabled={!commentText.trim()}
            >
              投稿
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
