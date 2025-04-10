/**
 * 日付をフォーマットする関数
 * @param date フォーマットする日付
 * @param options 表示オプション
 * @returns フォーマットされた日付文字列
 */
export const formatDate = (
  date: Date | string,
  options: "relative" | "full" = "relative"
): string => {
  const d = typeof date === "string" ? new Date(date) : date;

  if (options === "full") {
    return d.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // 相対時間の計算
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "今";
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}分前`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}時間前`;
  } else if (diffInSeconds < 604800) {
    return `${Math.floor(diffInSeconds / 86400)}日前`;
  } else if (diffInSeconds < 2629746) {
    return `${Math.floor(diffInSeconds / 604800)}週間前`;
  } else if (diffInSeconds < 31556952) {
    return `${Math.floor(diffInSeconds / 2629746)}ヶ月前`;
  } else {
    return `${Math.floor(diffInSeconds / 31556952)}年前`;
  }
};

/**
 * ユーザー名のバリデーション関数
 * @param username ユーザー名
 * @returns バリデーション結果
 */
export const validateUsername = (
  username: string
): { isValid: boolean; message?: string } => {
  if (!username || username.length < 3) {
    return {
      isValid: false,
      message: "ユーザー名は3文字以上である必要があります",
    };
  }

  if (username.length > 30) {
    return {
      isValid: false,
      message: "ユーザー名は30文字以下である必要があります",
    };
  }

  // アルファベット、数字、アンダースコア、ピリオドのみ許可
  if (!/^[a-zA-Z0-9_.]+$/.test(username)) {
    return {
      isValid: false,
      message: "ユーザー名には英数字、アンダースコア、ピリオドのみ使用できます",
    };
  }

  return { isValid: true };
};

/**
 * 画像ファイルのバリデーション関数
 * @param file 検証するファイル
 * @returns バリデーション結果
 */
export const validateImageFile = (
  file: File
): { isValid: boolean; message?: string } => {
  const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  if (!validTypes.includes(file.type)) {
    return {
      isValid: false,
      message: "画像形式は JPG, PNG, GIF, WEBP のみ対応しています",
    };
  }

  // 10MB以下のファイルサイズ
  if (file.size > 10 * 1024 * 1024) {
    return {
      isValid: false,
      message: "画像サイズは10MB以下である必要があります",
    };
  }

  return { isValid: true };
};

/**
 * テキストの切り詰め関数
 * @param text 切り詰めるテキスト
 * @param maxLength 最大長
 * @returns 切り詰めたテキスト
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};
