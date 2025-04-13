import { atom } from "jotai";

// ユーザー関連のアトム
export interface User {
  id: string;
  username: string;
  fullName: string;
  bio?: string;
  avatarUrl: string;
  postsCount?: number;
  followersCount?: number;
  followingCount?: number;
  isFollowing?: boolean;
  isCurrentUser?: boolean;
}

export const currentUserAtom = atom<User | null>(null);
export const isAuthenticatedAtom = atom<boolean>(false);

// 投稿関連のアトム
export interface Post {
  id: string;
  username: string;
  userAvatar: string;
  imageUrl: string;
  caption: string;
  likes: number;
  commentsCount: number;
  createdAt: string;
  location?: string;
}

export const postsAtom = atom<Post[]>([]);
export const selectedPostAtom = atom<Post | null>(null);

// コメント関連のアトム
export interface Comment {
  id: string;
  postId: string;
  username: string;
  userAvatar: string;
  text: string;
  createdAt: string;
  likes: number;
}

export const commentsAtom = atom<Record<string, Comment[]>>({});

// 通知関連のアトム
export interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "mention" | "tag" | "other";
  username: string;
  userAvatar: string;
  message: string;
  postId?: string;
  postImageUrl?: string;
  timeAgo: string;
  isRead: boolean;
}

export const notificationsAtom = atom<Notification[]>([]);
export const unreadNotificationsCountAtom = atom<number>(0);

// 検索関連のアトム
export const searchQueryAtom = atom<string>("");
export const searchResultsUsersAtom = atom<User[]>([]);
export const searchResultsHashtagsAtom = atom<
  { id: string; name: string; postsCount: number }[]
>([]);
export const searchResultsPostsAtom = atom<Post[]>([]);

// テーマ関連のアトム
export type Theme = "light" | "dark" | "system";
export const themeAtom = atom<Theme>("system");
