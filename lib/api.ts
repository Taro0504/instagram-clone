/**
 * API クライアントユーティリティ
 * Next.js API ルートやサーバーレス関数との通信を簡素化します
 */

// 基本的な API リクエスト関数
export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const res = await fetch(`/api/${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "APIリクエストに失敗しました");
  }

  return res.json();
}

// ユーザー関連 API
export const userAPI = {
  // ユーザープロフィールの取得
  getProfile: async (username: string) => {
    return fetchAPI<any>(`users/${username}`);
  },

  // プロフィールの更新
  updateProfile: async (data: any) => {
    return fetchAPI<any>("users/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // フォロー/アンフォロー
  toggleFollow: async (userId: string) => {
    return fetchAPI<any>(`users/${userId}/follow`, {
      method: "POST",
    });
  },

  // フォロワー一覧の取得
  getFollowers: async (userId: string) => {
    return fetchAPI<any>(`users/${userId}/followers`);
  },

  // フォロー中一覧の取得
  getFollowing: async (userId: string) => {
    return fetchAPI<any>(`users/${userId}/following`);
  },
};

// 投稿関連 API
export const postAPI = {
  // 投稿一覧の取得（タイムライン）
  getTimeline: async (page: number = 1, limit: number = 10) => {
    return fetchAPI<any>(`posts?page=${page}&limit=${limit}`);
  },

  // 特定ユーザーの投稿一覧
  getUserPosts: async (
    userId: string,
    page: number = 1,
    limit: number = 10
  ) => {
    return fetchAPI<any>(`users/${userId}/posts?page=${page}&limit=${limit}`);
  },

  // 投稿の詳細取得
  getPost: async (postId: string) => {
    return fetchAPI<any>(`posts/${postId}`);
  },

  // 新規投稿の作成
  createPost: async (data: FormData) => {
    return fetch("/api/posts", {
      method: "POST",
      body: data, // FormData はJSONに変換しない
    }).then((res) => {
      if (!res.ok) throw new Error("投稿の作成に失敗しました");
      return res.json();
    });
  },

  // 投稿の更新
  updatePost: async (postId: string, data: any) => {
    return fetchAPI<any>(`posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // 投稿の削除
  deletePost: async (postId: string) => {
    return fetchAPI<any>(`posts/${postId}`, {
      method: "DELETE",
    });
  },

  // いいねの切り替え
  toggleLike: async (postId: string) => {
    return fetchAPI<any>(`posts/${postId}/like`, {
      method: "POST",
    });
  },
};

// コメント関連 API
export const commentAPI = {
  // コメント一覧の取得
  getComments: async (postId: string, page: number = 1, limit: number = 20) => {
    return fetchAPI<any>(
      `posts/${postId}/comments?page=${page}&limit=${limit}`
    );
  },

  // コメントの追加
  addComment: async (postId: string, content: string) => {
    return fetchAPI<any>(`posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
  },

  // コメントの削除
  deleteComment: async (postId: string, commentId: string) => {
    return fetchAPI<any>(`posts/${postId}/comments/${commentId}`, {
      method: "DELETE",
    });
  },
};

// 検索関連 API
export const searchAPI = {
  // ユーザー検索
  searchUsers: async (query: string) => {
    return fetchAPI<any>(`search/users?q=${encodeURIComponent(query)}`);
  },

  // ハッシュタグ検索
  searchHashtags: async (query: string) => {
    return fetchAPI<any>(`search/hashtags?q=${encodeURIComponent(query)}`);
  },

  // 投稿検索
  searchPosts: async (query: string) => {
    return fetchAPI<any>(`search/posts?q=${encodeURIComponent(query)}`);
  },
};

// 通知関連 API
export const notificationAPI = {
  // 通知一覧の取得
  getNotifications: async (page: number = 1, limit: number = 20) => {
    return fetchAPI<any>(`notifications?page=${page}&limit=${limit}`);
  },

  // 未読通知数の取得
  getUnreadCount: async () => {
    return fetchAPI<any>("notifications/unread");
  },

  // 通知を既読にする
  markAsRead: async (notificationId?: string) => {
    return fetchAPI<any>("notifications/read", {
      method: "POST",
      body: JSON.stringify({ id: notificationId }), // notificationIdが未定義の場合、すべての通知を既読にする
    });
  },
};
