"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";

import PostList from "./components/PostList";
import useAuth from "./useAuth";
import styles from "./TopPage.module.css";

export const dynamic = "force-dynamic";

export default function TopPage(): JSX.Element {
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getSession = async (): Promise<void> => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (session) {
        const { data: profile, error } = await supabase
          .from("profile")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
        } else {
          setUserRole(profile.role);
        }
      }
    };

    getSession();
  }, [supabase]);

  // サインアウト
  const supabaseSignOut = async (): Promise<void> => {
    const response = confirm("アプリからログオフしますか？");

    // OKを返答
    if (response) {
      await supabase.auth.signOut();
      router.push(`/login`);
    }
  };

  useAuth();

  return (
    <>
      {/* ヘッダー */}
      <header className={`w-full`}>
        <div className={`w-full max-w-5xl mx-auto`}>
          <h1
            className={`flex flex-wrap flex-col gap-y-1.5 text-center mx-auto py-5 w-fit`}
          >
            <span
              className={`bg-neutral-100 rounded-e-full rounded-l-full text-3xl inline-block place-self-center p-2`}
            >
              📦
            </span>
            <span className={`block text-sm font-bold`}>
              おとしものインフォメーション
            </span>
          </h1>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className={`w-full pb-20`}>
        <div className={`w-full`}>
          <h2
            className={`w-full bg-neutral-100 text-lg font-bold z-10 sticky top-0 ${styles.contents_h2}`}
          >
            <div className={`w-full max-w-5xl mx-auto p-4`}>
              🗒️ おとしものリスト
            </div>
          </h2>

          {/* アカウント権限検証用 */}
          {userRole === "admin" ? (
            <div
              className={`w-full max-w-3xl mx-auto pt-10 px-5 text-center text-lg font-bold text-teal-400`}
            >
              {userRole}権限用の画面です。
            </div>
          ) : null}

          {/* 落とし物リストのコンポーネント呼び出し */}
          <PostList />
        </div>
      </main>

      {/* フッター */}
      <footer
        className={`w-full bg-neutral-50 fixed bottom-0 ${styles.footer}`}
      >
        <ul className={`w-fit mx-auto flex gap-10 py-2`}>
          <li className={`text-center cursor-pointer`}>
            <Link href={`/account`}>
              <span className={`text-3xl inline-block place-self-center p-2`}>
                📝
              </span>
              <span className={`block text-sm font-bold`}>アカウント情報</span>
            </Link>
          </li>
          <li
            className={`text-center cursor-pointer`}
            onClick={supabaseSignOut}
          >
            <span className={`text-3xl inline-block place-self-center p-2`}>
              🔓
            </span>
            <span className={`block text-sm font-bold`}>ログオフする</span>
          </li>
        </ul>
      </footer>
    </>
  );
}
