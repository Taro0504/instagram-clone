import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ユーザー名のバリデーション
export function validateUsername(username: string): {
  valid: boolean;
  message?: string;
} {
  if (!username) {
    return { valid: false, message: "ユーザー名は必須です。" };
  }

  if (username.length < 3) {
    return {
      valid: false,
      message: "ユーザー名は3文字以上である必要があります。",
    };
  }

  if (username.length > 20) {
    return {
      valid: false,
      message: "ユーザー名は20文字以下である必要があります。",
    };
  }

  if (!/^[a-zA-Z0-9._]+$/.test(username)) {
    return {
      valid: false,
      message:
        "ユーザー名には英数字、アンダースコア、ピリオドのみ使用できます。",
    };
  }

  return { valid: true };
}

// 画像ファイルのバリデーション
export function validateImageFile(file: File | null): {
  valid: boolean;
  message?: string;
} {
  if (!file) {
    return { valid: false, message: "ファイルが選択されていません。" };
  }

  // ファイルタイプのチェック
  const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      message: "JPG、PNG、GIF、またはWEBP形式の画像のみアップロードできます。",
    };
  }

  // ファイルサイズのチェック (10MB以下)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return {
      valid: false,
      message: "画像サイズは10MB以下である必要があります。",
    };
  }

  return { valid: true };
}

// 日付フォーマット
export function formatDate(date: string | Date): string {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;

  // 無効な日付の場合
  if (isNaN(d.getTime())) return "";

  // 1日以内の場合は「〇時間前」のような形式で表示
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - d.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) {
    const diffInMinutes = Math.floor(
      (now.getTime() - d.getTime()) / (1000 * 60)
    );
    return diffInMinutes <= 0 ? "たった今" : `${diffInMinutes}分前`;
  }

  if (diffInHours < 24) {
    return `${diffInHours}時間前`;
  }

  // 1週間以内の場合は「〇日前」
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}日前`;
  }

  // それ以外は yyyy/mm/dd 形式
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
}
