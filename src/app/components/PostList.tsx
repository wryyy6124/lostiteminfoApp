"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";

import useAuth from "../useAuth";
import styles from "../TopPage.module.css";

const PostList = (): JSX.Element => {
  const [session, setSession] = useState<Session | null>(null);
  const [posts, setPosts] = useState<any[]>([]);

  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // ページネーションのためのステートを追加
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 10;

  const supabase = createClientComponentClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect((): void => {
    const getSession = async (): Promise<void> => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (session) {
        const { data: posts, error } = await supabase
          .from("post")
          .select("*")
          .eq("hidden", false) // hiddenがfalseのレコードのみ取得
          .order("find_date", { ascending: false }); // find_dateで降順に並び替え;

        if (error) {
          console.error("Error fetching posts:", error);
        } else {
          setPosts(posts || []);
          setFilteredPosts(posts);
        }
      }
    };

    // URLパラメータから検索クエリを取得
    const searchQueryParam = searchParams.get("search");
    if (searchQueryParam) {
      setSearchQuery(searchQueryParam);
    }

    getSession();
  }, [supabase, searchParams]);

  useAuth();

  const navigateToDetail = useCallback(
    (postId: string): void => {
      // 現在の検索クエリをURLパラメータに保存
      const url = new URL(window.location.href);

      url.searchParams.set("search", searchQuery);
      history.replaceState(null, "", url.toString());

      router.push(`/post/${postId}`);
    },
    [router, searchQuery]
  );

  useEffect((): void => {
    const searchWords = searchQuery.toLowerCase().trim().split(/\s+/);

    const filtered = posts.filter((post) => {
      const dateFormatted = new Date(post.find_date).toLocaleDateString('ja-JP', {
        year: 'numeric', month: 'long', day: 'numeric'
      });

      const resolvedMatch = searchWords.includes("済")
        ? post.resolved
        : searchWords.includes("未")
        ? !post.resolved
        : true;

      return (
        resolvedMatch &&
        searchWords.every(
          (word) =>
            post.lostitem_name.toLowerCase().includes(word) ||
            dateFormatted.includes(word) ||
            word === "済" ||
            word === "未"
        )
      );
    });

    setFilteredPosts(filtered);
    setCurrentPage(1); // 検索クエリが変更されたときにページをリセット
  }, [searchQuery, posts]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  // ページネーションのためのハンドラを追加
  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const selectedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  return (
    <div className={`w-full max-w-5xl mx-auto py-10 px-5`}>
      {/* 見出し＋フィルターテキスト */}
      <div className={`w-full max-w-3xl mx-auto pb-3`}>
        <h2 className={`text-sm font-bold mb-1.5`}>おとしもの情報フィルター</h2>
        <input
          type="text"
          className={`w-full p-3 rounded-md border-2 border-solid border-gray-200`}
          name="filter"
          placeholder="🔍 キーワードを入力してください"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* 落とし物一覧 */}
      {selectedPosts ? (
        <>
          {/* 一覧本体 */}
          <ol className={`w-full max-w-3xl mx-auto ${styles.item_list}`}>
            {selectedPosts.map((post) => (
              <li
                key={post.id}
                className={`border-b-2 border-b-solid border-gray-200 flex flex-wrap flex-row items-center justify-between w-full max-w-3xl mx-auto py-6`}
              >
                {/* 解決フラグ */}
                <div
                  className={`z-0 border-2 border-solid text-center max-w-12 circle_width ${
                    post.resolved ? "is_paid" : ""
                  }`}
                >
                  <div className={`relative circle_height`}>
                    <p
                      className={`flex justify-center items-center absolute top-0 bottom-0 left-0 right-0 circle_letter`}
                    ></p>
                  </div>
                </div>

                {/* 落とし物情報 */}
                <div className={`flex-auto flex flex-col gap-y-2`}>
                  <h3 className={`text-xm font-bold text-black`}>
                    {post.lostitem_name}
                  </h3>
                  <p className={`text-xs text-slate-800`}>
                    発見日：{formatDate(post.find_date)}
                  </p>
                </div>

                {/* 詳細画面へ遷移 */}
                <div className={`flex-none`}>
                  <button
                    onClick={(): void => navigateToDetail(post.id)}
                    className={`rounded-md bg-black text-white text-xs px-6 py-3 font-semibold rounded-lg hover:bg-gray-700`}
                  >
                    詳細
                  </button>
                </div>
              </li>
            ))}
          </ol>

          {/* ページネーションのためのボタンを追加 */}
          <div className="my-6 flex justify-center flex-wrap gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={(): void => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
                className={`hover:transition-all py-2 px-4 rounded ${
                  currentPage === index + 1
                    ? "bg-gray-300"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        // 登録データが無い
        <p
          className={`flex flex-wrap flex-row items-center justify-between w-full max-w-3xl mx-auto py-6`}
        >
          現在の登録データは0件です。
        </p>
      )}
    </div>
  );
};

export default PostList;
