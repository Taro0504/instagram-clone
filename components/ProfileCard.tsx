"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface ProfileCardProps {
  user: {
    id: string;
    username: string;
    fullName: string;
    bio?: string;
    avatarUrl: string;
    postsCount?: number;
    followersCount?: number;
    followingCount?: number;
    isFollowing: boolean;
    isCurrentUser: boolean;
  };
  size?: "small" | "medium" | "large";
  showStats?: boolean;
  showBio?: boolean;
  className?: string;
}

export default function ProfileCard({
  user,
  size = "medium",
  showStats = true,
  showBio = true,
  className = "",
}: ProfileCardProps) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);
  const [followersCount, setFollowersCount] = useState(
    user.followersCount || 0
  );

  // フォロー/アンフォロー処理
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowersCount(isFollowing ? followersCount - 1 : followersCount + 1);
    // ここでAPIを呼び出してフォロー情報を保存
  };

  // サイズに基づくスタイルの設定
  const getStyles = () => {
    switch (size) {
      case "small":
        return {
          wrapper: "p-3",
          avatar: "h-10 w-10",
          username: "text-sm",
          fullName: "text-xs",
          bio: "text-xs mt-1",
          stats: "text-xs mt-2",
          button: "text-xs px-2 py-1",
        };
      case "large":
        return {
          wrapper: "p-6",
          avatar: "h-24 w-24 md:h-32 md:w-32",
          username: "text-xl",
          fullName: "text-base",
          bio: "text-sm mt-2",
          stats: "text-sm mt-3",
          button: "text-sm px-3 py-1.5",
        };
      default: // medium
        return {
          wrapper: "p-4",
          avatar: "h-16 w-16",
          username: "text-base",
          fullName: "text-sm",
          bio: "text-xs mt-1",
          stats: "text-xs mt-2",
          button: "text-xs px-2.5 py-1",
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm ${styles.wrapper} ${className}`}
    >
      <div className="flex items-center">
        {/* アバター */}
        <div
          className={`${styles.avatar} rounded-full overflow-hidden mr-4 flex-shrink-0`}
        >
          <Link href={`/profile/${user.username}`}>
            <img
              src={user.avatarUrl}
              alt={user.username}
              className="w-full h-full object-cover"
            />
          </Link>
        </div>

        <div className="flex-1 min-w-0">
          {/* ユーザー名と表示名 */}
          <div className="flex items-start justify-between">
            <div>
              <Link
                href={`/profile/${user.username}`}
                className={`font-semibold ${styles.username} hover:underline block dark:text-white`}
              >
                {user.username}
              </Link>
              <p
                className={`text-gray-600 dark:text-gray-400 ${styles.fullName}`}
              >
                {user.fullName}
              </p>

              {/* バイオ（オプション） */}
              {showBio && user.bio && (
                <p
                  className={`text-gray-600 dark:text-gray-400 line-clamp-2 ${styles.bio}`}
                >
                  {user.bio}
                </p>
              )}
            </div>

            {/* フォローボタン（自分自身の場合は表示しない） */}
            {!user.isCurrentUser && (
              <button
                onClick={handleFollow}
                className={`rounded-md ${styles.button} ${
                  isFollowing
                    ? "border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
                    : "bg-primary text-white"
                }`}
              >
                {isFollowing ? "フォロー中" : "フォローする"}
              </button>
            )}
          </div>

          {/* 統計情報（オプション） */}
          {showStats && (
            <div className={`flex space-x-4 ${styles.stats}`}>
              {user.postsCount !== undefined && (
                <div className="text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {user.postsCount}
                  </span>{" "}
                  投稿
                </div>
              )}
              {followersCount !== undefined && (
                <Link
                  href={`/profile/${user.username}/followers`}
                  className="text-gray-600 dark:text-gray-400 hover:underline"
                >
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {followersCount}
                  </span>{" "}
                  フォロワー
                </Link>
              )}
              {user.followingCount !== undefined && (
                <Link
                  href={`/profile/${user.username}/following`}
                  className="text-gray-600 dark:text-gray-400 hover:underline"
                >
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {user.followingCount}
                  </span>{" "}
                  フォロー中
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 小さいプロファイルアイテム（リストに表示するタイプ）
export function ProfileListItem({
  user,
  onFollow,
}: {
  user: {
    id: string;
    username: string;
    fullName: string;
    avatarUrl: string;
    isFollowing: boolean;
    isCurrentUser: boolean;
  };
  onFollow?: (userId: string, follow: boolean) => void;
}) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    if (onFollow) {
      onFollow(user.id, !isFollowing);
    }
  };

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
          <Link href={`/profile/${user.username}`}>
            <img
              src={user.avatarUrl}
              alt={user.username}
              className="h-full w-full object-cover"
            />
          </Link>
        </div>
        <div>
          <Link
            href={`/profile/${user.username}`}
            className="font-semibold text-sm hover:underline block dark:text-white"
          >
            {user.username}
          </Link>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {user.fullName}
          </p>
        </div>
      </div>

      {!user.isCurrentUser && (
        <button
          onClick={handleFollow}
          className={`px-2 py-1 text-xs rounded-md ${
            isFollowing
              ? "border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
              : "bg-primary text-white"
          }`}
        >
          {isFollowing ? "フォロー中" : "フォローする"}
        </button>
      )}
    </div>
  );
}
