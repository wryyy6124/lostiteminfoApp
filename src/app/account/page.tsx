import React from "react";
import styles from "./Account.module.css";
import Link from "next/link";

const Account = () => {
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
          className={`w-full bg-neutral-100 text-lg font-bold z-10 sticky top-0 ${styles.contents_h2}`}
        >
          <div className="w-full max-w-5xl mx-auto p-4">🔑 アカウント情報</div>
        </h2>
        <div className="w-full max-w-5xl mx-auto p-5 mt-5">
          <div className="w-full max-w-3xl mx-auto pb-5">
            <form className="w-full" action="#">
              <div>
                <label
                  className="text-sm font-bold mb-1.5"
                  htmlFor="oldPassword"
                >
                  旧パスワード
                </label>
                <div className="mt-1 mb-2">
                  <input
                    type="text"
                    className="w-full text-sm p-3 rounded-md border-2 border-solid border-gray-200"
                    id="oldPassword"
                    name="oldPassword"
                    placeholder="古いパスワードを入力してください"
                  />
                </div>
                <p className="text-gray-400 text-xs pb-8">
                  現在のパスワードを入力
                </p>
              </div>

              <div>
                <label
                  className="text-sm font-bold mb-1.5"
                  htmlFor="newPassword"
                >
                  新パスワード
                </label>
                <div className="mt-1 mb-2">
                  <input
                    type="text"
                    className="w-full text-sm p-3 rounded-md border-2 border-solid border-gray-200"
                    id="newPassword"
                    name="newPassword"
                    placeholder="新しいパスワードを入力してください"
                  />
                </div>
                <p className="text-gray-400 text-xs pb-8">
                  変更後のパスワードを入力
                </p>
              </div>

              {/* ボタンのリンク先やクリック時用のCSSなどはまだ未設定です*/}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="block w-5/6 md:w-1/2 rounded-lg bg-gray-950 p-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
                >
                  パスワードを変更する
                </button>
              </div>
            </form>
          </div>

          <div className={`w-full max-w-3xl mx-auto mt-6 px-6`}>
            <h3 className={`text-lg font-bold mb-2`}>★管理者権限ページ</h3>
            <ul className={`text-sm font-bold text-red-500 pl-4`}>
              <li className={`mb-3`}>
                {/* 遷移先で現状supabaseのエラーがでますが、後に解消予定です。 */}
                <Link className={`ml-1`} href="/post">
                  📝 新規スレッドを投稿する
                </Link>
              </li>
              <li className={`mb-3`}>
                <Link className={`ml-1`} href="/admin/adduser">
                  🙋 新規ユーザーを追加する
                </Link>
              </li>
              <li>
                <Link className={`ml-1`} href="/admin/edit">
                  🗒️ 登録済みユーザーのリスト
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <footer
        className={`w-full bg-neutral-50 fixed bottom-0 ${styles.footer}`}
      >
        <ul className={`w-fit mx-auto flex py-2`}>
          <li className={`text-center`}>
            <span className={`text-3xl inline-block place-self-center p-2`}>
              🚪
            </span>
            <span className={`block text-sm font-bold`}>戻る</span>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Account;