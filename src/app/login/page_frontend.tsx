import React from "react";
import styles from "./Login.module.css";

const Login = () => {
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

      <main className="w-full">
        <h2
          className={`w-full bg-neutral-100 text-lg font-bold z-10 sticky top-0 ${styles.contents_h2}`}
        >
          <div className="w-full max-w-5xl mx-auto p-4">🔒 ログイン画面</div>
        </h2>
        <div className="w-full max-w-5xl mx-auto p-5 mt-5">
          <div className="w-full max-w-3xl mx-auto pb-3">
            <form className=" space-y-6 w-full" action="#">
              <div className="mb-14">
                <div className="mb-5">
                  <label
                    htmlFor="ID"
                    className="block text-sm font-bold leading-6 text-gray-950"
                  >
                    ID
                  </label>
                  <div className="mt-1 mb-2">
                    <input
                      id="ID"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="IDを入力してください"
                      className="block w-full rounded-md border-0 py-3 px-3 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="text-gray-400 text-xs">例: abcde123</p>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-bold leading-6 text-gray-950"
                  >
                    パスワード
                  </label>
                  <div className="mt-1 mb-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      placeholder="パスワードを入力してください"
                      className="block w-full rounded-md border-0 py-3 px-3 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="text-gray-400 text-xs">
                    8文字以上の英字・記号を入力
                  </p>
                </div>
              </div>

              {/* ボタンのリンク先やクリック時用のCSSなどはまだ未設定です*/}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="flex w-5/6 md:w-1/2 justify-center rounded-lg bg-gray-950 p-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
                >
                  ログイン
                </button>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="flex w-5/6 md:w-1/2 justify-center rounded-lg border-2 border-black bg-white p-3 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-100"
                >
                  ID・パスワードをお忘れですか 🤓
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
