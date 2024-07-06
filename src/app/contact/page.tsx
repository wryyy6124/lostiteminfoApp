import React from "react";
import styles from "./Contact.module.css";

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

      <main className="w-full mb-20">
        <h2
          className={`w-full bg-neutral-100 text-lg font-bold z-10 sticky top-0 ${styles.contents_h2}`}
        >
          <div className="w-full max-w-5xl mx-auto p-4">
            😥 ID・パスワードを忘れました
          </div>
        </h2>
        <div className="w-full max-w-5xl mx-auto p-5 mt-5">
          <div className="w-full max-w-3xl mx-auto pb-3">
            <form className="w-full" action="#">
              <h3 className="text-sm font-bold mb-1.5">登録メールアドレス</h3>
              <div className="mt-1 mb-2">
                <input
                  type="text"
                  className="w-full text-sm p-3 rounded-md border-2 border-solid border-gray-200"
                  name="email"
                  placeholder="ご登録のメールアドレスを入力してください。"
                />
              </div>
              <p className="text-gray-400 text-xs pb-8">
                例: abcde123@example.com
              </p>
              <p className="text-xs sm:text-base pb-12">
                当アプリの利用申込書へ記入頂いたメールアドレスを入力してください。
                <br />
                仮パスワードを発行後、ご登録のメールアドレス宛に送信致します。
                <br />
                もし登録したアドレス自体失念をしてしまった場合、管理者へ直接お問い合わせください。
              </p>
              {/* ボタンのリンク先やクリック時用のCSSなどはまだ未設定です*/}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="block w-5/6 md:w-1/2 rounded-lg bg-gray-950 p-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
                >
                  パスワードを再発行する
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

export default Login;
