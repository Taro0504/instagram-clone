"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// あとでコンポーネントに置き換え
const NotificationItemPlaceholder = ({
  notification,
}: {
  notification: any;
}) => {
  // 通知タイプに基づいたアイコンを表示
  const renderIcon = () => {
    switch (notification.type) {
      case "like":
        return (
          <div className="rounded-full bg-red-100 p-2 dark:bg-red-900/30">
            <svg
              className="w-5 h-5 text-red-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        );
      case "comment":
        return (
          <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
            <svg
              className="w-5 h-5 text-blue-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
            </svg>
          </div>
        );
      case "follow":
        return (
          <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/30">
            <svg
              className="w-5 h-5 text-green-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 14c-5.56 0-9 2.5-9 6v2h18v-2c0-3.5-3.44-6-9-6z" />
            </svg>
          </div>
        );
      case "mention":
        return (
          <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/30">
            <svg
              className="w-5 h-5 text-purple-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-7 14c-1.1 0-2-.9-2-2v-2h2v2h2v-2h2v2c0 1.1-.9 2-2 2h-2zm4-8h-2V7h-2v2H9V7H7v2c0 1.1.9 2 2 2h2v2h2v-2h2c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-700">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div
      className={`flex items-start p-4 ${
        notification.isRead ? "" : "bg-blue-50 dark:bg-blue-900/10"
      } hover:bg-gray-50 dark:hover:bg-gray-800 transition rounded-lg mb-2`}
    >
      <div className="flex-shrink-0 mr-4">
        <div className="h-10 w-10 rounded-full overflow-hidden">
          <img
            src={notification.userAvatar}
            alt={notification.username}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <p className="text-sm font-medium dark:text-white">
            <Link
              href={`/profile/${notification.username}`}
              className="font-bold hover:underline"
            >
              {notification.username}
            </Link>{" "}
            {notification.message}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
            {notification.timeAgo}
          </p>
        </div>
        {notification.postImageUrl && (
          <div className="mt-2">
            <Link href={`/posts/${notification.postId}`}>
              <div className="h-14 w-14 overflow-hidden rounded">
                <img
                  src={notification.postImageUrl}
                  alt="投稿画像"
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>
          </div>
        )}
      </div>
      <div className="ml-4 flex-shrink-0">{renderIcon()}</div>
    </div>
  );
};

// ダミーデータ（後でSupabaseからのデータに置き換え）
const dummyNotifications = [
  {
    id: "1",
    type: "like",
    username: "taro_suzuki",
    userAvatar: "https://xsgames.co/randomusers/avatar.php?g=male&rand=1",
    message: "があなたの投稿にいいねしました",
    postId: "101",
    postImageUrl: "https://source.unsplash.com/random/600x800?nature,1",
    timeAgo: "5分前",
    isRead: false,
  },
  {
    id: "2",
    type: "comment",
    username: "hanako_tanaka",
    userAvatar: "https://xsgames.co/randomusers/avatar.php?g=female&rand=2",
    message: 'があなたの投稿にコメントしました: "素敵な写真ですね！"',
    postId: "102",
    postImageUrl: "https://source.unsplash.com/random/600x800?city,1",
    timeAgo: "30分前",
    isRead: false,
  },
  {
    id: "3",
    type: "follow",
    username: "kenji_yamada",
    userAvatar: "https://xsgames.co/randomusers/avatar.php?g=male&rand=3",
    message: "があなたをフォローしました",
    timeAgo: "2時間前",
    isRead: true,
  },
  {
    id: "4",
    type: "mention",
    username: "yuki_sato",
    userAvatar: "https://xsgames.co/randomusers/avatar.php?g=female&rand=4",
    message: 'があなたをメンションしました: "@username 一緒に行きましょう！"',
    postId: "103",
    postImageUrl: "https://source.unsplash.com/random/600x800?travel,1",
    timeAgo: "1日前",
    isRead: true,
  },
  {
    id: "5",
    type: "like",
    username: "akira_ito",
    userAvatar: "https://xsgames.co/randomusers/avatar.php?g=male&rand=5",
    message: "があなたの投稿にいいねしました",
    postId: "104",
    postImageUrl: "https://source.unsplash.com/random/600x800?food,1",
    timeAgo: "2日前",
    isRead: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  // 本来はここでSupabaseからデータを取得する
  useEffect(() => {
    // ここにデータ取得ロジックを実装
    // 例: const fetchNotifications = async () => {...}
  }, []);

  // 通知を既読にするハンドラ
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, isRead: true }))
    );
    // Supabaseでの通知の既読更新ロジック
  };

  // フィルタリングされた通知を取得
  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((notification) => !notification.isRead)
      : notifications;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">通知</h1>
        <div className="flex space-x-2 items-center">
          <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1 text-sm">
            <button
              className={`px-3 py-1 rounded-md ${
                filter === "all"
                  ? "bg-white dark:bg-gray-600 shadow"
                  : "text-gray-600 dark:text-gray-300"
              }`}
              onClick={() => setFilter("all")}
            >
              すべて
            </button>
            <button
              className={`px-3 py-1 rounded-md ${
                filter === "unread"
                  ? "bg-white dark:bg-gray-600 shadow"
                  : "text-gray-600 dark:text-gray-300"
              }`}
              onClick={() => setFilter("unread")}
            >
              未読
            </button>
          </div>
          <button
            onClick={markAllAsRead}
            className="text-primary hover:underline text-sm"
          >
            すべて既読にする
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationItemPlaceholder
                key={notification.id}
                notification={notification}
              />
            ))
          ) : (
            <div className="text-center py-16">
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                {filter === "all"
                  ? "通知はありません"
                  : "未読の通知はありません"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
