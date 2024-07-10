import React from "react";
import styles from "./AddUser.module.css";

const AddUser = () => {
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
          className={`w-full bg-neutral-100 text-lg text-red-500 font-bold z-10 sticky top-0 ${styles.contents_h2}`}
        >
          <div className="w-full max-w-5xl mx-auto p-4">
            🙋 新規ユーザーを追加する
          </div>
        </h2>
        <div className="w-full max-w-5xl mx-auto p-5 mt-5">
          <div className="w-full max-w-3xl mx-auto">
            <form className="w-full" action="#">
              <div className="mb-7">
                <h3 className="text-sm font-bold mb-1.5">ユーザーID</h3>
                <div className="mt-1 mb-2">
                  <input
                    type="text"
                    className="w-full text-sm p-3 rounded-md border-2 border-solid border-gray-200"
                    name="id"
                    placeholder="例: abcde123"
                  />
                </div>
              </div>

              <div className="mb-7">
                <h3 className="text-sm font-bold mb-1.5">メールアドレス</h3>
                <div className="mt-1 mb-2">
                  <input
                    type="text"
                    className="w-full text-sm p-3 rounded-md border-2 border-solid border-gray-200"
                    name="email"
                    placeholder="例: abcde@gmail.com"
                  />
                </div>
              </div>

              <div className="mb-7">
                <h3 className="text-sm font-bold mb-1.5">権限</h3>
                <div className="mt-1 mb-2">
                  <div className="w-80">
                    <select
                      required
                      className={`${styles.select} w-full text-sm p-3 rounded-md border-2 border-solid border-blue-gray-200 focus:border-2`}
                    >
                      <option value="" disabled selected className="hidden">
                        新規ユーザーの権限を選択してください。
                      </option>
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-7">
                <h3 className="text-sm font-bold mb-1.5">仮パスワード</h3>
                <div className="mt-1 mb-2">
                  <input
                    type="text"
                    className="w-full text-sm p-3 rounded-md border-2 border-solid border-gray-200"
                    name="password"
                    placeholder="例: ab12%&=aet"
                  />
                </div>
              </div>

              <div className="mb-14">
                <h3 className="text-sm font-bold mb-1.5">備考欄</h3>
                <div className="mt-1 mb-2">
                  <textarea
                    className="w-full text-sm p-3 rounded-md border-2 border-solid border-gray-200"
                    name="remarks"
                    placeholder="登録理由等を必要に応じて記入ください。"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="block w-5/6 md:w-1/2 rounded-lg bg-gray-950 p-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
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

export default AddUser;
