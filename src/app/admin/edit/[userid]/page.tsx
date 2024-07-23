"use client";

import React from "react";
import { useState, FormEvent, useEffect } from "react";
import { supabaseAdmin as supabase } from "../../../../../lib/supabaseAdmin";
import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import useAuth from "@/app/useAuth";
import styles from "./UserId.module.css";
import Link from "next/link";

type SupabaseUser = {
  id: string;
  email?: string;
};

type UpdateProfileProps = {
  userid: string;
};

const EditUser = ({ params }: {params: UpdateProfileProps}) => {
  const [email, setEmail] = useState("");
  // const [temporaryPassword, setTemporaryPassword] = useState("");
  const [role, setRole] = useState("user");
  const [remarksColumn, setRemarksColumn] = useState("");
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const supabaseClient = createClientComponentClient();

  const userId = params.userid

  // ログインしていなかったら/loginへ遷移
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();
      setSession(session);
      console.log("Session:", session);
    };
    getSession();
  }, [supabaseClient.auth]);

  useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      // 管理者だとユーザー情報取得できる
      const { data, error } = await supabase.auth.admin.getUserById(userId);

      if (error) {
        console.error("Error fetching user:", error);
        alert("User not found");
      } else if (data) {
        const userData = data.user as SupabaseUser;
        setUser(userData);
        setEmail(userData.email || "");

        // プロフィール情報を取得するための修正
        const { data: profileData, error: profileError } = await supabase
          .from("profile")
          .select("role, remarks_column")
          .eq("id", userData.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError.message);
          alert("Profile not found");
        } else if (profileData) {
          setRole(profileData.role || "user");
          setRemarksColumn(profileData.remarks_column || "");
        }
      }
    };

    fetchUser();
  }, [userId]);

  // 画面上で変更した内容をバックエンドに保存
  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault();

    // authenticationで登録されているメールアドレスを更新
    try {
      const { error: emailError } = await supabase.auth.admin.updateUserById(
        userId,
        {
          email,
        }
      );

      if (emailError) {
        throw new Error(emailError.message);
      }

      // Tableで登録されている情報を更新
      const { error: profileError } = await supabase
        .from("profile")
        .update({
          role,
          updated_at: new Date(),
          updated_by: session?.user?.id || "",
          remarks_column: remarksColumn,
        })
        .eq("id", userId);

      if (profileError) {
        throw new Error(profileError.message);
      }

      alert("Profile updated successfully");

      // setEmail("");
      // setTemporaryPassword("");
      // setRole("user");
      // setRemarksColumn("");
    } catch (error) {
      if (error instanceof Error) {
        alert(`Failed to update profile: ${error.message}`);
      } else {
        alert("Failed to update profile: An unknown error occurred");
      }
    }
  };

  // 仮パスワード機能今回は非表示
  // const handleGenerateTemporaryPassword = async () => {
  //   const generatedPassword = Math.random().toString(36).slice(-8); // 仮パスワードを生成
  //   setTemporaryPassword(generatedPassword);

  //   try {
  //     const { error: passwordError } = await supabase.auth.admin.updateUserById(
  //       userId,
  //       {
  //         password: generatedPassword,
  //       }
  //     );

  //     if (passwordError) {
  //       throw new Error(passwordError.message);
  //     }

  //     alert("Temporary password generated and updated successfully");
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       alert(`Failed to generate temporary password: ${error.message}`);
  //     } else {
  //       alert(
  //         "Failed to generate temporary password: An unknown error occurred"
  //       );
  //     }
  //   }
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

      <main className="w-full pb-24">
        <h2
          className={`w-full bg-neutral-100 text-lg text-red-500 font-bold z-10 sticky top-0 ${styles.contents_h2}`}
        >
          <div className="w-full max-w-5xl mx-auto p-4">
            📝 ユーザー情報を修正する
          </div>
        </h2>
        <div className="w-full max-w-5xl mx-auto p-5 mt-5">
          <div className="w-full max-w-3xl mx-auto">
            <div className="mt-8 mb-8">
              <p>更新者 ID: {session?.user?.id}</p>
            </div>
            <form className="w-full" onSubmit={handleUpdateProfile}>
              <div className="mb-7">
                <label className="text-sm font-bold mb-1.5" htmlFor="id">
                  ユーザーID
                </label>
                <div className="mt-1 mb-2">
                  <input
                    type="text"
                    className="w-full text-sm p-3 rounded-md border-2 border-solid border-gray-200"
                    id="id"
                    name="id"
                    value={userId}
                    readOnly
                    placeholder="例: 8e752fef-6b7c-415f-ab17-2a86df38f235"
                  />
                </div>
              </div>

              <div className="mb-7">
                <label className="text-sm font-bold mb-1.5" htmlFor="email">
                  メールアドレス
                </label>
                <div className="mt-1 mb-2">
                  <input
                    type="text"
                    className="w-full text-sm p-3 rounded-md border-2 border-solid border-gray-200"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="例: abcde@gmail.com"
                  />
                </div>
              </div>

              <div className="mb-7">
                <label className="text-sm font-bold mb-1.5" htmlFor="role">
                  権限
                </label>
                <div className="mt-1 mb-2">
                  <div className="w-80">
                    <select
                      className={`${styles.select} w-full text-sm p-3 rounded-md border-2 border-solid border-blue-gray-200 focus:border-2`}
                      id="role"
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                    >
                      <option value="" disabled selected className="hidden">
                        ユーザーの権限を選択してください。
                      </option>
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* admin/adduserに合わせる形で今回は非表示にしています */}
              {/* <div className="mb-7">
                <label className="text-sm font-bold mb-1.5" htmlFor="password">
                  パスワード
                </label>
                <div className="mt-1 mb-2">
                  <input
                    type="text"
                    className="w-full text-sm p-3 rounded-md border-2 border-solid border-gray-200"
                    id="password"
                    name="password"
                    value={temporaryPassword}
                    placeholder="例: ab12%&=aet"
                  />
                </div>
              </div> */}

              <div className="mb-14">
                <label className="text-sm font-bold mb-1.5" htmlFor="remarks">
                  備考欄
                </label>
                <div className="mt-1 mb-2">
                  <textarea
                    className="w-full text-sm p-3 rounded-md border-2 border-solid border-gray-200"
                    id="remarks"
                    name="remarks"
                    value={remarksColumn}
                    onChange={(e) => setRemarksColumn(e.target.value)}
                    placeholder="登録理由等を必要に応じて記入ください。"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="block w-5/6 md:w-1/2 rounded-lg bg-gray-950 p-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
                >
                  ユーザー情報を修正する
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
          <li className={`text-center`}>
            <Link href="/admin/edit">
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

export default EditUser;
