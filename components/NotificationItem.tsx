"use client";

import { useState } from "react";
import Link from "next/link";

interface NotificationItemProps {
  notification: {
    id: string;
    type: "like" | "comment" | "follow" | "mention" | "tag" | "other";
    username: string;
    userAvatar: string;
    message: string;
    postId?: string;
    postImageUrl?: string;
    timeAgo: string;
    isRead: boolean;
  };
  onMarkAsRead?: (notificationId: string) => void;
}

export default function NotificationItem({
  notification,
  onMarkAsRead,
}: NotificationItemProps) {
  const [isRead, setIsRead] = useState(notification.isRead);

  // 通知をクリックしたときに既読にする
  const handleClick = () => {
    if (!isRead && onMarkAsRead) {
      setIsRead(true);
      onMarkAsRead(notification.id);
    }
  };

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
      case "tag":
        return (
          <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900/30">
            <svg
              className="w-5 h-5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
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

  // 通知のリンク先を決定
  const getNotificationLink = () => {
    switch (notification.type) {
      case "like":
      case "comment":
      case "mention":
      case "tag":
        return notification.postId ? `/posts/${notification.postId}` : "#";
      case "follow":
        return `/profile/${notification.username}`;
      default:
        return "#";
    }
  };

  return (
    <Link
      href={getNotificationLink()}
      className={`flex items-start p-4 ${
        isRead ? "" : "bg-blue-50 dark:bg-blue-900/10"
      } hover:bg-gray-50 dark:hover:bg-gray-800 transition rounded-lg mb-2`}
      onClick={handleClick}
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
            <span className="font-bold hover:underline">
              {notification.username}
            </span>{" "}
            {notification.message}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
            {notification.timeAgo}
          </p>
        </div>
        {notification.postImageUrl && (
          <div className="mt-2">
            <div className="h-14 w-14 overflow-hidden rounded">
              <img
                src={notification.postImageUrl}
                alt="投稿画像"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
      <div className="ml-4 flex-shrink-0">{renderIcon()}</div>
    </Link>
  );
}

// 通知プレビューコンポーネント（ヘッダーのドロップダウンなどで使用）
export function NotificationPreview({
  notifications,
  onViewAll,
  onMarkAllAsRead,
}: {
  notifications: Array<{
    id: string;
    type: "like" | "comment" | "follow" | "mention" | "tag" | "other";
    username: string;
    userAvatar: string;
    message: string;
    timeAgo: string;
    isRead: boolean;
  }>;
  onViewAll: () => void;
  onMarkAllAsRead: () => void;
}) {
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden max-w-sm w-full">
      <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold dark:text-white">通知</h3>
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllAsRead}
            className="text-primary text-sm hover:underline"
          >
            すべて既読にする
          </button>
        )}
      </div>

      <div className="max-h-72 overflow-y-auto">
        {notifications.length > 0 ? (
          <div>
            {notifications.slice(0, 5).map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">通知はありません</p>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onViewAll}
          className="text-primary text-sm w-full text-center hover:underline"
        >
          すべての通知を見る
        </button>
      </div>
    </div>
  );
}
