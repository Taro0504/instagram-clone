import { createClient } from "@supabase/supabase-js";

// 環境変数から Supabase の URL と匿名キーを取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// 認証されていないクライアントを作成（匿名ユーザー向け）
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// サーバーサイドでも使用可能なヘルパー関数
export const getServiceSupabase = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || "";
  return createClient(supabaseUrl, supabaseServiceKey);
};
