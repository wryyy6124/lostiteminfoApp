"use client";

import { useState, useEffect } from "react";
import useAuth from "../useAuth";
import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import styles from "./PostPage.module.css";

export const dynamic = "force-dynamic";

export default function PostPage() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [lostitemName, setLostitemName] = useState("");
  const [findDate, setFindDate] = useState("");
  const [findTime, setFindTime] = useState("");
  const [findPlace, setFindPlace] = useState("");
  const [comment, setComment] = useState("");
  const [remarksColumn, setRemarksColumn] = useState("");

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
    };

    getSession();
  }, [router, supabase]);

  useAuth();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();

      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    let uploadedFilePath = "";

    try {
      let fileURL = "";

      if (file) {
        const uniqueFileName = `${Date.now()}_${file.name}`;

        const { data, error } = await supabase.storage
          .from("post_files")
          .upload(`public/${uniqueFileName}`, file);

        if (error) {
          throw new Error("画像のアップロードに失敗しました");
        }

        uploadedFilePath = data.path;

        const timestamp = new Date().toISOString();

        fileURL = `https://cxhwsktvngsmxnxfhyaj.supabase.co/storage/v1/object/public/post_files/public/${uniqueFileName}?t=${encodeURIComponent(
          timestamp
        )}`;

        console.log("Public URL:", fileURL); // パブリックURLをコンソールに表示
      }

      const { data: dbData, error: dbError } = await supabase
        .from("post")
        .insert([
          {
            lostitem_name: lostitemName,
            find_date: findDate,
            find_time: findTime || null, // ここで空の時間をnullとして扱う
            find_place: findPlace,
            comment: comment,
            file_url: fileURL,
            resolved: false,
            hidden: false,
            remarks_column: remarksColumn,
            created_at: new Date().toISOString().split("T")[0],
            created_by: session?.user?.id || "",
          },
        ]);

      if (dbError) {
        console.error("DB Error:", dbError);

        // 画像の削除
        if (uploadedFilePath) {
          await supabase.storage.from("post_files").remove([uploadedFilePath]);
        }

        throw new Error("データベースへの保存に失敗しました");
      }

      setSuccess("投稿が成功しました！");

      // フォームをリセット
      setLostitemName("");
      setFindDate("");
      setFindTime("");
      setFindPlace("");
      setComment("");
      setRemarksColumn("");
      setFile(null);
      setFilePreview(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
      <main className={`w-full pb-24`}>
        <div className={`w-full`}>
          <h2
            className={`w-full bg-neutral-100 text-lg font-bold text-red-500 z-10 sticky top-0 ${styles.contents_h2}`}
          >
            <div className={`w-full max-w-5xl mx-auto p-4`}>
              📝 新規スレッドを投稿する
            </div>
          </h2>
          <div className={`w-full max-w-5xl mx-auto pt-2 pb-10 px-5 mt-5`}>
            <div className={`w-full`}>
              <div
                className={`w-full max-w-3xl mx-auto mb-10 px-5 text-center text-lg font-bold text-teal-400`}
              >
                <p>投稿者 ID: {session?.user?.id}</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className={`mb-6`}>
                  <label
                    htmlFor="lostitemName"
                    className={`block text-lg font-bold text-black text-left mb-2`}
                  >
                    落し物:
                  </label>
                  <input
                    type="text"
                    id="lostitemName"
                    placeholder="落し物を入力してください"
                    value={lostitemName}
                    onChange={(e) => setLostitemName(e.target.value)}
                    required
                    className={`mt-1 p-2 border border-gray-300 rounded-md w-full`}
                  />
                </div>
                <div className={`flex flex-row gap-10 mb-6`}>
                  <div className={`flex-auto`}>
                    <label
                      htmlFor="findDate"
                      className={`block text-lg font-bold text-black text-left mb-2`}
                    >
                      発見日:
                    </label>
                    <input
                      type="date"
                      id="findDate"
                      value={findDate}
                      onChange={(e) => setFindDate(e.target.value)}
                      required
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                  <div className={`flex-auto`}>
                    <label
                      htmlFor="findTime"
                      className={`block text-lg font-bold text-black text-left mb-2`}
                    >
                      発見時間:
                    </label>
                    <input
                      type="time"
                      id="findTime"
                      value={findTime}
                      onChange={(e) => setFindTime(e.target.value)}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                </div>
                <div className={`mb-6`}>
                  <label
                    htmlFor="findPlace"
                    className={`block text-lg font-bold text-black text-left mb-2`}
                  >
                    発見場所:
                  </label>
                  <input
                    type="text"
                    id="findPlace"
                    placeholder="発見場所を入力してください"
                    value={findPlace}
                    onChange={(e) => setFindPlace(e.target.value)}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className={`mb-6`}>
                  <label
                    htmlFor="comment"
                    className={`block text-lg font-bold text-black text-left mb-2`}
                  >
                    コメント:
                  </label>
                  <textarea
                    id="comment"
                    placeholder="コメントを入力してください"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className={`mt-1 p-2 border border-gray-300 rounded-md w-full min-h-40 resize-y`}
                  ></textarea>
                </div>
                <div className={`mb-6`}>
                  <label
                    htmlFor="remarksColumn"
                    className={`block text-lg font-bold text-black text-left mb-2`}
                  >
                    備考欄:
                  </label>
                  <textarea
                    id="remarksColumn"
                    placeholder="その他の情報を入力してください"
                    value={remarksColumn}
                    onChange={(e) => setRemarksColumn(e.target.value)}
                    className={`mt-1 p-2 border border-gray-300 rounded-md w-full min-h-40 resize-y`}
                  ></textarea>
                </div>
                <div className={`bg-amber-50 p-5 rounded-lg`}>
                  <label
                    htmlFor="file"
                    className={`block text-lg font-bold text-black mb-2 text-left mb-2`}
                  >
                    画像ファイルをアップロード:
                  </label>
                  <input
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={`mt-4`}
                  />
                  {filePreview && (
                    <div className={`mt-4`}>
                      <p
                        className={`text-sm font-bold text-black text-left mb-2`}
                      >
                        プレビュー:
                      </p>
                      <Image
                        src={filePreview}
                        alt="プレビュー"
                        width={300}
                        height={300}
                        className={`mt-2 max-w-full h-auto`}
                      />
                    </div>
                  )}
                  <p className={`block mt-3 text-xs text-red-500 text-left`}>
                    不適切な画像のアップロードは禁止されています
                  </p>
                  <p className={`block mt-3 text-xs text-black text-left`}>
                    ファイル名は半角にしてください
                  </p>
                </div>
                <div className={`flex align-items: center justify-center`}>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`p-6 w-1/2 mt-12 bg-black text-white text-lg font-semibold rounded-lg mx-auto ${
                      loading ? "bg-gray-700" : "hover:bg-gray-900"
                    }`}
                  >
                    {loading ? "投稿中..." : "投稿する"}
                  </button>
                </div>
              </form>

              {error && <p className={`text-red-500 mt-10`}>{error}</p>}
              {success && <p className={`text-green-500 mt-10`}>{success}</p>}
            </div>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer
        className={`w-full bg-neutral-50 fixed bottom-0 ${styles.footer}`}
      >
        <ul className={`w-fit mx-auto flex gap-10 py-2`}>
          <Link href={`../../account`}>
            <span className={`text-3xl inline-block place-self-center p-2`}>
              🚪
            </span>
            <span className={`block text-sm font-bold text-center`}>戻る</span>
          </Link>
        </ul>
      </footer>
    </>
  );
}
