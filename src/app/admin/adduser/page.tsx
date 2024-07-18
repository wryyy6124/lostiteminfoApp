"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Link from "next/link";

import useAuth from "@/app/useAuth";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";

import styles from "./AddUser.module.css";

// 型定義（ユーザー登録フォームの状態管理用）
interface valuesType {
  email: string;
  password: string;
  // tmpPassword: string;
  role: string;
  remarks?: string;
}

const AddUser = (): React.JSX.Element => {
  const [values, setValues] = useState<valuesType>({
    email: "",
    password: "",
    // tmpPassword: "",
    role: "user",
    remarks: "",
  });
  const [session, setSession] = useState<Session | null>(null);

  const supabaseClient = createClientComponentClient();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();

      setSession(session);
    };

    getSession();
  }, [supabaseClient.auth]);

  useAuth();

  // フォームへ入力された内容で新規ユーザ追加を行なう。
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // 新規ユーザーを作成する。
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: values.email,
        password: values.password,
        email_confirm: true,
      });

      // 上記の作成APIの結果で処理を切り分けする。
      if (!error) {
        // 成功：profileテーブルへ「role」と「remarks」の内容を挿入する。
        await supabaseAdmin.from("profile").upsert({
          id: data.user.id,
          role: values.role,
          remarks_column: values.remarks,
          created_at: new Date(),
          created_by: session?.user?.id || "",
        });

        // 画面上のフォームを初期化する。
        setValues({
          email: "",
          password: "",
          // tmpPassword: "",
          role: "user",
          remarks: "",
        });

        // 登録完了の旨、メッセージ発呼する。
        alert("User created successfully");
      }
    } catch (error) {
      if (error instanceof Error) {
        // エラーメッセージ詳細
        alert(`Failed to create user: ${error.message}`);
      } else {
        // その他、原因不明のエラー
        alert("Failed to create user: An unknown error occurred");
      }
    }
  };

  // 仮パスワードの生成機能
  // const generatePassword = (): void => {
  //   // パスワードを生成
  //   const PASSWORD: string = Math.random().toString(36).slice(-8);

  //   // 生成した文字列をテキストフォームへ流し込む
  //   setValues({
  //     ...values,
  //     password: PASSWORD,
  //     tmpPassword: PASSWORD,
  //   });
  // };

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
          className={`w-full bg-neutral-100 text-lg text-red-500 font-bold z-10 sticky top-0 ${styles.contents_h2}`}
        >
          <div className={`w-full max-w-5xl mx-auto p-4`}>
            🙋 新規ユーザーを追加する
          </div>
        </h2>
        <div className={`w-full max-w-5xl mx-auto p-5 mt-5`}>
          <div className={`w-full max-w-3xl mx-auto`}>
            <form className={`w-full`} onSubmit={handleSubmit}>
              <div className={`mb-7`}>
                <h3 className={`text-sm font-bold mb-1.5`}>メールアドレス</h3>
                <div className={`mt-1 mb-2`}>
                  <input
                    type="email"
                    className={`w-full text-sm p-3 rounded-md border-2 border-solid border-gray-200`}
                    placeholder="例: abcde@gmail.com"
                    value={values.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                      setValues({
                        ...values,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className={`mb-7`}>
                <h3 className={`text-sm font-bold mb-1.5`}>権限</h3>
                <div className={`mt-1 mb-2`}>
                  <div className={`w-80`}>
                    <select
                      className={`${styles.select} w-full text-sm p-3 rounded-md border-2 border-solid border-blue-gray-200 focus:border-2`}
                      title="Role"
                      value={values.role}
                      onChange={(
                        e: React.ChangeEvent<HTMLSelectElement>
                      ): void =>
                        setValues({
                          ...values,
                          role: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 仮パスワードの生成。
              ID・PASSでの認証が実装された際の為、記述を残しておく
              <div className={`mb-7`}>
                <h3 className={`text-sm font-bold mb-1.5`}>仮パスワード</h3>
                <div className={`mt-1 mb-2`}>
                  <input
                    type="password"
                    className={`w-full text-sm p-3 rounded-md border-2 border-solid border-gray-200`}
                    name="password"
                    placeholder="例: ab12%&=aet"
                    value={values.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                      setValues({
                        ...values,
                        password: e.target.value
                      })
                    }
                  />
                  <div className={`flex flex-col items-center`}>
                    <div
                      className={`flex align-items: center justify-center pt-10 pb-10`}
                    >
                      発行パスワード:
                      {values.tmpPassword && (
                        <span className={`font-bold inline-block ml-2`}>
                          {values.tmpPassword}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={generatePassword}
                      className={`block w-5/6 md:w-1/2 rounded-lg bg-gray-950 p-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700`}
                    >
                      仮パスワードを生成
                    </button>
                  </div>
                </div>
              </div> */}

              <div className={`mb-14`}>
                <h3 className={`text-sm font-bold mb-1.5`}>備考欄</h3>
                <div className="mt-1 mb-2">
                  <textarea
                    className={`w-full text-sm p-3 rounded-md border-2 border-solid border-gray-200`}
                    name="remarks"
                    value={values.remarks}
                    onChange={(
                      e: React.ChangeEvent<HTMLTextAreaElement>
                    ): void =>
                      setValues({
                        ...values,
                        remarks: e.target.value,
                      })
                    }
                    placeholder="登録理由等を必要に応じて記入ください。"
                  />
                </div>
              </div>

              <div className={`flex justify-center`}>
                <button
                  type="submit"
                  className={`block w-5/6 md:w-1/2 rounded-lg bg-gray-950 p-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700`}
                >
                  ユーザーを追加する
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer
        className={`w-full bg-neutral-50 fixed bottom-0 ${styles.footer}`}
      >
        <ul className={`w-fit mx-auto flex py-2`}>
          <li className={`text-center cursor-pointer`}>
            <Link href="../../account">
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
};

export default AddUser;
