"use client";

import { useState, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { validateUsername, validateImageFile } from "@/lib/utils";

// ダミーデータ（実際のアプリでは認証済みユーザーからデータを取得）
const dummyUser = {
  id: "1",
  username: "username",
  fullName: "User Name",
  bio: "Webデベロッパー | 写真が好き | 旅行者 | 🇯🇵 東京在住",
  email: "user@example.com",
  phone: "090-1234-5678",
  gender: "not-specified",
  avatarUrl: "https://xsgames.co/randomusers/avatar.php?g=male",
};

export default function EditProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    username: dummyUser.username,
    fullName: dummyUser.fullName,
    bio: dummyUser.bio || "",
    email: dummyUser.email,
    phone: dummyUser.phone || "",
    gender: dummyUser.gender || "not-specified",
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    dummyUser.avatarUrl
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 入力フィールドの変更ハンドラ
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // エラーをクリア
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // アバター画像選択ハンドラ
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // 画像ファイルのバリデーション
      const validationResult = validateImageFile(file);
      if (!validationResult.isValid) {
        setErrors((prev) => ({
          ...prev,
          avatar: validationResult.message || "無効な画像ファイルです",
        }));
        return;
      }

      // エラーをクリア
      if (errors.avatar) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.avatar;
          return newErrors;
        });
      }

      // 画像プレビューを設定
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      setAvatarFile(file);
    }
  };

  // フォームのバリデーション
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // ユーザー名の検証
    const usernameValidation = validateUsername(formData.username);
    if (!usernameValidation.isValid) {
      newErrors.username = usernameValidation.message || "ユーザー名が無効です";
    }

    // 氏名の検証
    if (!formData.fullName.trim()) {
      newErrors.fullName = "氏名を入力してください";
    }

    // メールアドレスの検証
    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }

    return newErrors;
  };

  // 保存ボタンのハンドラ
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // フォームのバリデーション
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      setIsLoading(true);

      // TODO: 実際のデータ保存処理を実装
      // サンプルのため、単純に遅延を入れています
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // プロフィールページにリダイレクト
      router.push("/profile");
    } catch (err) {
      setErrors({
        form: "プロフィールの更新に失敗しました。もう一度お試しください。",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // アバター画像クリックハンドラ
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-6 border-b pb-4 dark:text-white dark:border-gray-700">
          プロフィール編集
        </h1>

        {errors.form && (
          <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-sm text-red-700 dark:text-red-400">
              {errors.form}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* アバター編集 */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-24 h-24 rounded-full overflow-hidden cursor-pointer mb-2 relative"
              onClick={handleAvatarClick}
            >
              {avatarPreview && (
                <img
                  src={avatarPreview}
                  alt="プロフィール写真"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 flex items-center justify-center transition">
                <svg
                  className="w-8 h-8 text-white opacity-0 hover:opacity-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleAvatarChange}
            />
            <button
              type="button"
              className="text-primary text-sm font-medium"
              onClick={handleAvatarClick}
            >
              プロフィール写真を変更
            </button>
            {errors.avatar && (
              <p className="text-sm text-red-600 mt-1 dark:text-red-400">
                {errors.avatar}
              </p>
            )}
          </div>

          <div className="space-y-6">
            {/* ユーザー名 */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
              >
                ユーザーネーム
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`input-field ${
                  errors.username ? "border-red-500" : ""
                }`}
              />
              {errors.username ? (
                <p className="text-sm text-red-600 mt-1 dark:text-red-400">
                  {errors.username}
                </p>
              ) : (
                <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
                  URLに表示されるユーザー名です。英数字、アンダースコア、ピリオドのみ使用できます。
                </p>
              )}
            </div>

            {/* 氏名 */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
              >
                氏名
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`input-field ${
                  errors.fullName ? "border-red-500" : ""
                }`}
              />
              {errors.fullName && (
                <p className="text-sm text-red-600 mt-1 dark:text-red-400">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* 自己紹介 */}
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
              >
                自己紹介
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                value={formData.bio}
                onChange={handleChange}
                className="input-field"
              />
              <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
                あなた自身について短い説明を書いてください。
              </p>
            </div>

            {/* メールアドレス */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
              >
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`input-field ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1 dark:text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            {/* 電話番号 */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
              >
                電話番号（任意）
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            {/* 性別 */}
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
              >
                性別（任意）
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input-field"
              >
                <option value="not-specified">指定しない</option>
                <option value="male">男性</option>
                <option value="female">女性</option>
                <option value="other">その他</option>
              </select>
            </div>

            {/* 送信ボタン */}
            <div className="flex space-x-3 pt-6 border-t dark:border-gray-700">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary disabled:opacity-50"
              >
                {isLoading ? "保存中..." : "変更を保存"}
              </button>
              <Link href="/profile" className="btn-secondary">
                キャンセル
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
