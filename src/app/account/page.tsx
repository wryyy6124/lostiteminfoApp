"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";

import useAuth from "../useAuth";
import styles from "./Account.module.css";

export default function AccountPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (session) {
        const { data: user } = await supabase
          .from("profile")
          .select("role")
          .eq("id", session.user.id)
          .single();
        setUserRole(user?.role || null);
      }
    };

    getSession();
  }, [supabase]);

  useAuth();

  return (
    <>
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

      <main className={`w-full pb-24`}>
        <h2
          className={`w-full bg-neutral-100 text-lg font-bold z-10 sticky top-0 ${styles.contents_h2}`}
        >
          <div className={`w-full max-w-5xl mx-auto p-4`}>
            🔑 アカウント情報
          </div>
        </h2>
        {/* 管理者権限限定機能 */}
        {userRole === "admin" ? (
          <div className={`w-full max-w-3xl mx-auto`}>
            <div
              className={`w-full max-w-3xl mx-auto pt-10 px-5 text-center text-lg font-bold text-teal-400`}
            >
              以下は{userRole}権限限定のリンク導線です。
            </div>
            <div
              className={`w-full max-w-xl w-fit mx-auto bg-yellow-50 p-5 mt-5`}
            >
              <h3 className={`text-lg font-bold mb-4`}>★管理者権限ページ</h3>
              <ul
                className={`text-xm font-bold text-red-500 max-w-3xl w-fit mx-auto`}
              >
                <li className={`mb-6`}>
                  <Link href={`../post`}>📝 新規スレッドを投稿する</Link>
                </li>
                <li className={`mb-6`}>
                  <Link href={`../admin/adduser`}>
                    🙋 新規ユーザーを追加する
                  </Link>
                </li>
                <li>
                  <Link href={`../admin/edit`}>
                    🗒️ 登録済みユーザーのリスト
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ) : null}
      </main>
      <footer
        className={`w-full bg-neutral-50 fixed bottom-0 ${styles.footer}`}
      >
        <ul className={`w-fit mx-auto flex py-2`}>
          <li className={`text-center`}>
            <Link href={`/`}>
              <span className={`text-3xl inline-block place-self-center p-2`}>
                🚪
              </span>
              <span className={`block text-sm font-bold`}>戻る</span>
            </Link>
          </li>
        </ul>
      </footer>
    </>
  );
}
