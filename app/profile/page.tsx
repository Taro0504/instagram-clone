"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PostCard from "@/components/PostCard";

// ダミーデータ
const dummyUserProfile = {
  id: "1",
  username: "username",
  fullName: "User Name",
  bio: "Webデベロッパー | 写真が好き | 旅行者 | 🇯🇵 東京在住",
  avatarUrl: "https://xsgames.co/randomusers/avatar.php?g=male",
  postsCount: 42,
  followersCount: 825,
  followingCount: 362,
  isFollowing: false,
  isCurrentUser: true,
};

const dummyPosts = [
  {
    id: "1",
    username: dummyUserProfile.username,
    userAvatar: dummyUserProfile.avatarUrl,
    imageUrl: "https://xsgames.co/randomusers/avatar.php?g=male&rand=1",
    caption: "美しい景色です！#旅行 #自然",
    likes: 120,
    commentsCount: 15,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "2",
    username: dummyUserProfile.username,
    userAvatar: dummyUserProfile.avatarUrl,
    imageUrl: "https://xsgames.co/randomusers/avatar.php?g=female&rand=2",
    caption: "今日のランチ🍣 #グルメ #おいしい",
    likes: 85,
    commentsCount: 7,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "3",
    username: dummyUserProfile.username,
    userAvatar: dummyUserProfile.avatarUrl,
    imageUrl: "https://xsgames.co/randomusers/avatar.php?g=male&rand=3",
    caption: "プログラミング中... #コーディング #開発者の日常",
    likes: 234,
    commentsCount: 19,
    createdAt: new Date(Date.now() - 10800000).toISOString(),
  },
];

// 投稿カード（グリッド表示用）の小さいバージョン
const PostThumbnail = ({ post }: { post: any }) => {
  return (
    <Link
      href={`/posts/${post.id}`}
      className="block aspect-square relative hover:opacity-90 transition"
    >
      <div className="w-full h-full">
        <img
          src={post.imageUrl}
          alt={post.caption}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-0 opacity-0 hover:bg-opacity-20 hover:opacity-100 flex items-center justify-center transition-all duration-200">
        <div className="flex items-center space-x-4 text-white">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>{post.likes}</span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
            </svg>
            <span>{post.commentsCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"posts" | "saved">("posts");
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(dummyUserProfile.isFollowing);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* プロフィールヘッダー */}
      <div className="flex flex-col md:flex-row items-center md:items-start mb-10">
        {/* プロフィール画像 */}
        <div className="w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden mr-0 md:mr-10 mb-4 md:mb-0">
          <img
            src={dummyUserProfile.avatarUrl}
            alt={dummyUserProfile.username}
            className="w-full h-full object-cover"
          />
        </div>

        {/* プロフィール情報 */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row items-center md:items-start mb-4">
            <h1 className="text-xl md:text-2xl font-semibold mb-2 md:mb-0 md:mr-4 dark:text-white">
              {dummyUserProfile.username}
            </h1>

            {dummyUserProfile.isCurrentUser ? (
              <div className="flex space-x-2">
                <Link
                  href="/profile/edit"
                  className="py-1 px-3 rounded border border-gray-300 text-sm font-medium dark:border-gray-700 dark:text-white"
                >
                  プロフィールを編集
                </Link>
                <button className="py-1 px-1 rounded border border-gray-300 text-sm font-medium dark:border-gray-700 dark:text-white">
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
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={toggleFollow}
                  className={`py-1 px-3 rounded text-sm font-medium ${
                    isFollowing
                      ? "border border-gray-300 dark:border-gray-700 dark:text-white"
                      : "bg-primary text-white"
                  }`}
                >
                  {isFollowing ? "フォロー中" : "フォローする"}
                </button>
                <button className="py-1 px-3 rounded border border-gray-300 text-sm font-medium dark:border-gray-700 dark:text-white">
                  メッセージ
                </button>
              </div>
            )}
          </div>

          {/* 統計情報 */}
          <div className="flex justify-center md:justify-start space-x-6 my-4">
            <div className="text-center md:text-left">
              <span className="font-semibold dark:text-white">
                {dummyUserProfile.postsCount}
              </span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">
                投稿
              </span>
            </div>
            <button
              onClick={() => setShowFollowers(true)}
              className="text-center md:text-left"
            >
              <span className="font-semibold dark:text-white">
                {dummyUserProfile.followersCount}
              </span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">
                フォロワー
              </span>
            </button>
            <button
              onClick={() => setShowFollowing(true)}
              className="text-center md:text-left"
            >
              <span className="font-semibold dark:text-white">
                {dummyUserProfile.followingCount}
              </span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">
                フォロー中
              </span>
            </button>
          </div>

          {/* 自己紹介 */}
          <div className="text-sm mt-2 dark:text-white">
            <p className="font-semibold">{dummyUserProfile.fullName}</p>
            <p className="whitespace-pre-line">{dummyUserProfile.bio}</p>
          </div>
        </div>
      </div>

      {/* タブ */}
      <div className="border-t border-gray-300 dark:border-gray-700">
        <div className="flex justify-center">
          <button
            className={`py-3 px-4 flex items-center uppercase text-xs font-semibold tracking-wider ${
              activeTab === "posts"
                ? "border-t border-gray-800 dark:border-white text-gray-800 dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("posts")}
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              ></path>
            </svg>
            投稿
          </button>

          {dummyUserProfile.isCurrentUser && (
            <button
              className={`py-3 px-4 flex items-center uppercase text-xs font-semibold tracking-wider ${
                activeTab === "saved"
                  ? "border-t border-gray-800 dark:border-white text-gray-800 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("saved")}
            >
              <svg
                className="w-4 h-4 mr-1"
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
              保存済み
            </button>
          )}
        </div>
      </div>

      {/* 投稿グリッド */}
      {activeTab === "posts" && (
        <div className="grid grid-cols-3 gap-1 md:gap-4 mt-4">
          {dummyPosts.map((post) => (
            <PostThumbnail key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* 保存済み投稿グリッド */}
      {activeTab === "saved" && (
        <div className="grid grid-cols-3 gap-1 md:gap-4 mt-4">
          {/* 例として同じダミーデータを使用 */}
          {dummyPosts.slice(0, 2).map((post) => (
            <PostThumbnail key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* フォロワーモーダル（簡易的な実装） */}
      {showFollowers && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
              <h3 className="font-semibold dark:text-white">フォロワー</h3>
              <button onClick={() => setShowFollowers(false)}>
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="py-2 max-h-96 overflow-y-auto">
              {/* ダミーフォロワーリスト */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <img
                        src={`https://xsgames.co/randomusers/avatar.php?g=${
                          i % 2 === 0 ? "male" : "female"
                        }&rand=${i}`}
                        alt={`Follower ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-sm dark:text-white">
                        ユーザー{i + 1}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ユーザー{i + 1}の名前
                      </p>
                    </div>
                  </div>
                  <button className="text-xs text-primary font-medium">
                    フォローする
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* フォロー中モーダル（簡易的な実装） */}
      {showFollowing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
              <h3 className="font-semibold dark:text-white">フォロー中</h3>
              <button onClick={() => setShowFollowing(false)}>
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="py-2 max-h-96 overflow-y-auto">
              {/* ダミーフォロー中リスト */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <img
                        src={`https://xsgames.co/randomusers/avatar.php?g=${
                          i % 2 === 0 ? "female" : "male"
                        }&rand=${i + 10}`}
                        alt={`Following ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-sm dark:text-white">
                        ユーザー{i + 10}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ユーザー{i + 10}の名前
                      </p>
                    </div>
                  </div>
                  <button className="text-xs bg-gray-200 dark:bg-gray-700 py-1 px-2 rounded font-medium dark:text-white">
                    フォロー中
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
