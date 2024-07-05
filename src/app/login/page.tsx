import React from "react";
import styles from "./styles.module.css";

const Login = () => {
  return (
    <div className={styles.container}>
      {/* とりあえず仮headerを置いてます */}
      <header className={styles.header}>
        <div>ロゴ</div>
        <p>落とし物インフォメーション</p>
        <p>ログイン画面</p>
      </header>

      <main className={styles.main}>
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
          <div className={styles.button}>
            <button
              type="submit"
              className="flex w-5/6 md:w-1/2 justify-center rounded-lg bg-gray-950 p-3 text-sm font-semibold leading-6 text-white shadow-sm"
            >
              ログイン
            </button>
          </div>
          <div className={styles.button}>
            <button
              type="submit"
              className="flex w-5/6 md:w-1/2 justify-center rounded-lg border-2 border-black bg-white p-3 text-sm font-semibold leading-6 text-black shadow-sm"
            >
              ID・パスワードをお忘れですか &#129299;
            </button>
          </div>
        </form>
      </main>
      {/* <Footer>が来る予定 */}
    </div>
  );
};

export default Login;
