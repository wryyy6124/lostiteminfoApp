"use client";
import React, { useState, useEffect } from "react";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Edit.module.css";
import { UUID } from "crypto";

const supabase = supabaseAdmin;

export default function EditListPage() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [remarks, setRemarks] = useState<{ [key: string]: { role: string; remarks: string } }>({});

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.auth.admin.listUsers();

      if (error) {
        alert(`Failed to list users: ${error.message}`);
      } else {
        setUsers(data.users);
      }

    //   const { data: profileData, error: profileError } = await supabase
    //   .from('profile')
    //   .select('id, role, remarks_column')
    //   .order('created_at', { ascending: false }); // created_atで降順に並び替え

    // if (profileError) {
    //   console.error('Error fetching profiles:', profileError);
    // } else if (profileData) {
    //   const remarksMap: { [key: string]: { role: string; remarks: string } } = {};
    //   profileData.forEach((profile: { id: string; role: string | null; remarks_column: string | null }) => {
    //     remarksMap[profile.id] = { role: profile.role ?? '未設定', remarks: profile.remarks_column ?? '' };
    //   });
    //   setRemarks(remarksMap);
    // }
    };
    fetchUsers();
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const deleteUser = async (userId: UUID) => {
    try {
      const { error } = await supabase.auth.admin.deleteUser(userId);

      if (error) {
        alert(`Failed to delete user: ${error.message}`);
      } else {
        alert("User deleted successfully");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`Failed to delete user: ${error.message}`);
      } else {
        alert("Failed to delete user: An unknown error occurred");
      }
    }
    // 削除されたユーザー以外を再表示
    setUsers(users.filter((user) => user.id !== userId));
  };

  // ページネーション関連
  const recordsPerPage = 16;
  const startIndex = (currentPage - 1) * recordsPerPage;
  const selectedUsers = users.slice(startIndex, startIndex + recordsPerPage);
  const totalPages = Math.ceil(users.length / recordsPerPage);

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
        <div className={`w-full`}>
          <h2
            className={`w-full bg-neutral-100 text-lg font-bold z-10 sticky top-0 ${styles.contents_h2}`}
          >
            <div className={`w-full max-w-5xl mx-auto p-4`}>
              🗒️ 登録済みユーザーのリスト
            </div>
          </h2>
          <div className={`w-full max-w-5xl mx-auto p-5`}>
            <div className={`w-full max-w-3xl mx-auto`}>
              <h3 className={`text-sm font-bold mb-1.5`}>
                登録済みユーザー一覧
              </h3>
              <ol className={`w-full max-w-3xl mx-auto ${styles.user_list}`}>
                {selectedUsers.map((user) => (
                  <li
                    key={user.id}
                    className={`border-b-2 border-b-solid border-gray-200 flex flex-wrap flex-row items-center justify-between w-full max-w-3xl mx-auto py-6`}
                  >
                    <div className={`flex-auto`}>
                      <p className={`text-sm text-slate-800 font-bold`}>
                        {user.email}
                      </p>
                      {/* 確認用。マージ前に消す予定です。 */}
                      <p className={`text-sm text-slate-800 font-bold`}>
                        {user.id}
                      </p>
                    </div>
                    <div className={`flex-none flex flex-row gap-x-2`}>
                      <button
                        className={`rounded-md bg-black text-white text-xs px-4 py-3`}
                        onClick={() => router.push(`edit/${user.id}`)}
                      >
                        修正
                      </button>
                      <button
                        className={`rounded-md bg-black text-white text-xs px-4 py-3`}
                        onClick={() => deleteUser(user.id)}
                      >
                        削除
                      </button>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-4 flex justify-center space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    disabled={currentPage === index + 1}
                    className={`py-2 px-4 rounded ${
                      currentPage === index + 1
                        ? "bg-gray-300"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer
        className={`w-full bg-neutral-50 fixed bottom-0 ${styles.footer}`}
      >
        <ul className={`w-fit mx-auto flex gap-10 py-2`}>
          <li className={`text-center`}>
            <Link href="/account">
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
