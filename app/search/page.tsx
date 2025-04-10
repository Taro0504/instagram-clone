"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// ダミーデータ（後でSupabaseからのデータに置き換え）
const dummyUsers = [
  {
    id: "1",
    username: "taro_suzuki",
    fullName: "鈴木 太郎",
    bio: "写真家 / 旅行好き / 東京在住",
    avatarUrl: "https://xsgames.co/randomusers/avatar.php?g=male&rand=1",
    isFollowing: false,
  },
  {
    id: "2",
    username: "hanako_tanaka",
    fullName: "田中 花子",
    bio: "料理研究家 / 美食家 / 大阪在住",
    avatarUrl: "https://xsgames.co/randomusers/avatar.php?g=female&rand=2",
    isFollowing: true,
  },
  {
    id: "3",
    username: "kenji_yamada",
    fullName: "山田 健二",
    bio: "エンジニア / 技術ブロガー / 京都在住",
    avatarUrl: "https://xsgames.co/randomusers/avatar.php?g=male&rand=3",
    isFollowing: false,
  },
  {
    id: "4",
    username: "yuki_sato",
    fullName: "佐藤 ゆき",
    bio: "デザイナー / イラストレーター / 福岡在住",
    avatarUrl: "https://xsgames.co/randomusers/avatar.php?g=female&rand=4",
    isFollowing: false,
  },
];

const dummyHashtags = [
  { id: "1", name: "旅行", postsCount: 1205 },
  { id: "2", name: "グルメ", postsCount: 986 },
  { id: "3", name: "プログラミング", postsCount: 456 },
  { id: "4", name: "ファッション", postsCount: 1860 },
  { id: "5", name: "アート", postsCount: 720 },
];

const dummyPosts = [
  {
    id: "1",
    username: "taro_suzuki",
    userAvatar: "https://xsgames.co/randomusers/avatar.php?g=male&rand=1",
    imageUrl: "https://source.unsplash.com/random/300x300?nature,1",
    caption: "美しい景色です！#旅行 #自然",
    likes: 120,
    commentsCount: 15,
  },
  {
    id: "2",
    username: "hanako_tanaka",
    userAvatar: "https://xsgames.co/randomusers/avatar.php?g=female&rand=2",
    imageUrl: "https://source.unsplash.com/random/300x300?food,1",
    caption: "今日のランチ🍣 #グルメ #おいしい",
    likes: 85,
    commentsCount: 7,
  },
  {
    id: "3",
    username: "kenji_yamada",
    userAvatar: "https://xsgames.co/randomusers/avatar.php?g=male&rand=3",
    imageUrl: "https://source.unsplash.com/random/300x300?programming,1",
    caption: "プログラミング中... #コーディング #開発者の日常",
    likes: 234,
    commentsCount: 19,
  },
  {
    id: "4",
    username: "yuki_sato",
    userAvatar: "https://xsgames.co/randomusers/avatar.php?g=female&rand=4",
    imageUrl: "https://source.unsplash.com/random/300x300?art,1",
    caption: "新作イラスト完成！ #アート #イラスト",
    likes: 178,
    commentsCount: 24,
  },
  {
    id: "5",
    username: "akira_ito",
    userAvatar: "https://xsgames.co/randomusers/avatar.php?g=male&rand=5",
    imageUrl: "https://source.unsplash.com/random/300x300?fashion,1",
    caption: "今日のコーデ #ファッション #コーデ",
    likes: 312,
    commentsCount: 42,
  },
  {
    id: "6",
    username: "mei_kobayashi",
    userAvatar: "https://xsgames.co/randomusers/avatar.php?g=female&rand=6",
    imageUrl: "https://source.unsplash.com/random/300x300?cafe,1",
    caption: "お気に入りのカフェ☕ #カフェ #コーヒー",
    likes: 97,
    commentsCount: 11,
  },
];

// ユーザー検索結果コンポーネント
const UserSearchResult = ({ user }: { user: any }) => {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    // ここでフォロー/アンフォローのAPIを呼び出す
  };

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition rounded-lg">
      <div className="flex items-center">
        <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
          <img
            src={user.avatarUrl}
            alt={user.username}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <Link
            href={`/profile/${user.username}`}
            className="font-semibold text-gray-800 dark:text-white hover:underline"
          >
            {user.username}
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.fullName}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
            {user.bio}
          </p>
        </div>
      </div>
      <button
        onClick={handleFollow}
        className={`px-3 py-1 text-sm rounded-md ${
          isFollowing
            ? "border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
            : "bg-primary text-white"
        }`}
      >
        {isFollowing ? "フォロー中" : "フォローする"}
      </button>
    </div>
  );
};

// ハッシュタグ検索結果コンポーネント
const HashtagSearchResult = ({ hashtag }: { hashtag: any }) => (
  <Link
    href={`/hashtags/${hashtag.name}`}
    className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition rounded-lg"
  >
    <div className="flex items-center">
      <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
        <span className="text-lg font-bold text-gray-600 dark:text-gray-300">
          #
        </span>
      </div>
      <div>
        <p className="font-semibold text-gray-800 dark:text-white">
          #{hashtag.name}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          投稿 {hashtag.postsCount.toLocaleString()}件
        </p>
      </div>
    </div>
    <svg
      className="w-5 h-5 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5l7 7-7 7"
      ></path>
    </svg>
  </Link>
);

// 投稿サムネイルコンポーネント
const PostThumbnail = ({ post }: { post: any }) => (
  <Link
    href={`/posts/${post.id}`}
    className="block aspect-square relative overflow-hidden rounded-md hover:opacity-90 transition"
  >
    <img
      src={post.imageUrl}
      alt={post.caption}
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-200">
      <div className="flex items-center space-x-4 text-white">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>{post.likes}</span>
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
          </svg>
          <span>{post.commentsCount}</span>
        </div>
      </div>
    </div>
  </Link>
);

type SearchTab = "users" | "hashtags" | "posts";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<SearchTab>("users");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(dummyUsers);
  const [hashtags, setHashtags] = useState(dummyHashtags);
  const [posts, setPosts] = useState(dummyPosts);

  // 検索クエリが変更されたときの処理
  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      // 本来はここでAPIを呼び出して検索結果を取得する
      setTimeout(() => {
        // 検索クエリに基づいてフィルタリング（ダミーデータ用）
        const filteredUsers = dummyUsers.filter(
          (user) =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const filteredHashtags = dummyHashtags.filter((hashtag) =>
          hashtag.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        // 投稿はキャプションで検索
        const filteredPosts = dummyPosts.filter((post) =>
          post.caption.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setUsers(filteredUsers);
        setHashtags(filteredHashtags);
        setPosts(filteredPosts);
        setLoading(false);
      }, 500); // 検索の遅延をシミュレート
    } else {
      // 検索クエリがない場合は元のデータを表示
      setUsers(dummyUsers);
      setHashtags(dummyHashtags);
      setPosts(dummyPosts);
    }
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">検索</h1>

      {/* 検索バー */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          placeholder="ユーザー、ハッシュタグ、投稿を検索"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-3 px-4 pl-10 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg
              className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        )}
      </div>

      {/* タブメニュー */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "users"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("users")}
        >
          ユーザー
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "hashtags"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("hashtags")}
        >
          ハッシュタグ
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "posts"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("posts")}
        >
          投稿
        </button>
      </div>

      {/* 検索結果 */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div>
          {/* ユーザー検索結果 */}
          {activeTab === "users" && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              {users.length > 0 ? (
                users.map((user) => (
                  <UserSearchResult key={user.id} user={user} />
                ))
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchQuery
                      ? `「${searchQuery}」に一致するユーザーは見つかりませんでした`
                      : "検索するユーザー名を入力してください"}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ハッシュタグ検索結果 */}
          {activeTab === "hashtags" && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              {hashtags.length > 0 ? (
                hashtags.map((hashtag) => (
                  <HashtagSearchResult key={hashtag.id} hashtag={hashtag} />
                ))
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchQuery
                      ? `「${searchQuery}」に一致するハッシュタグは見つかりませんでした`
                      : "検索するハッシュタグを入力してください"}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 投稿検索結果 */}
          {activeTab === "posts" && (
            <div>
              {posts.length > 0 ? (
                <div className="grid grid-cols-3 gap-1 md:gap-4">
                  {posts.map((post) => (
                    <PostThumbnail key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchQuery
                      ? `「${searchQuery}」に一致する投稿は見つかりませんでした`
                      : "検索するキーワードを入力してください"}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
