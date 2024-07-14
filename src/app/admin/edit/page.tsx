import styles from "./Edit.module.css";

export default function EditListPage() {
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
      <main className={`w-full pb-20`}>
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
                <li
                  className={`border-b-2 border-b-solid border-gray-200 flex flex-wrap flex-row items-center justify-between w-full max-w-3xl mx-auto py-6`}
                >
                  <div className={`flex-auto`}>
                    <p className={`text-sm text-slate-800 font-bold`}>
                      abce123
                    </p>
                  </div>
                  <div className={`flex-none flex flex-row gap-x-2`}>
                    <button
                      className={`rounded-md bg-black text-white text-xs px-4 py-3`}
                    >
                      修正
                    </button>
                    <button
                      className={`rounded-md bg-black text-white text-xs px-4 py-3`}
                    >
                      削除
                    </button>
                  </div>
                </li>
                <li
                  className={`border-b-2 border-b-solid border-gray-200 flex flex-wrap flex-row items-center justify-between w-full max-w-3xl mx-auto py-6`}
                >
                  <div className={`flex-auto`}>
                    <p className={`text-sm text-slate-800 font-bold`}>
                      abce123
                    </p>
                  </div>
                  <div className={`flex-none flex flex-row gap-x-2`}>
                    <button
                      className={`rounded-md bg-black text-white text-xs px-4 py-3`}
                    >
                      修正
                    </button>
                    <button
                      className={`rounded-md bg-black text-white text-xs px-4 py-3`}
                    >
                      削除
                    </button>
                  </div>
                </li>
                <li
                  className={`border-b-2 border-b-solid border-gray-200 flex flex-wrap flex-row items-center justify-between w-full max-w-3xl mx-auto py-6`}
                >
                  <div className={`flex-auto`}>
                    <p className={`text-sm text-slate-800 font-bold`}>
                      abce123
                    </p>
                  </div>
                  <div className={`flex-none flex flex-row gap-x-2`}>
                    <button
                      className={`rounded-md bg-black text-white text-xs px-4 py-3`}
                    >
                      修正
                    </button>
                    <button
                      className={`rounded-md bg-black text-white text-xs px-4 py-3`}
                    >
                      削除
                    </button>
                  </div>
                </li>
                <li
                  className={`border-b-2 border-b-solid border-gray-200 flex flex-wrap flex-row items-center justify-between w-full max-w-3xl mx-auto py-6`}
                >
                  <div className={`flex-auto`}>
                    <p className={`text-sm text-slate-800 font-bold`}>
                      abce123
                    </p>
                  </div>
                  <div className={`flex-none flex flex-row gap-x-2`}>
                    <button
                      className={`rounded-md bg-black text-white text-xs px-4 py-3`}
                    >
                      修正
                    </button>
                    <button
                      className={`rounded-md bg-black text-white text-xs px-4 py-3`}
                    >
                      削除
                    </button>
                  </div>
                </li>
                <li
                  className={`border-b-2 border-b-solid border-gray-200 flex flex-wrap flex-row items-center justify-between w-full max-w-3xl mx-auto py-6`}
                >
                  <div className={`flex-auto`}>
                    <p className={`text-sm text-slate-800 font-bold`}>
                      abce123
                    </p>
                  </div>
                  <div className={`flex-none flex flex-row gap-x-2`}>
                    <button
                      className={`rounded-md bg-black text-white text-xs px-4 py-3`}
                    >
                      修正
                    </button>
                    <button
                      className={`rounded-md bg-black text-white text-xs px-4 py-3`}
                    >
                      削除
                    </button>
                  </div>
                </li>
                <li
                  className={`border-b-2 border-b-solid border-gray-200 flex flex-wrap flex-row items-center justify-between w-full max-w-3xl mx-auto py-6`}
                >
                  <div className={`flex-auto`}>
                    <p className={`text-sm text-slate-800 font-bold`}>
                      abce123
                    </p>
                  </div>
                  <div className={`flex-none flex flex-row gap-x-2`}>
                    <button
                      className={`rounded-md bg-black text-white text-xs px-4 py-3`}
                    >
                      修正
                    </button>
                    <button
                      className={`rounded-md bg-black text-white text-xs px-4 py-3`}
                    >
                      削除
                    </button>
                  </div>
                </li>
                <li
                  className={`border-b-2 border-b-solid border-gray-200 flex flex-wrap flex-row items-center justify-between w-full max-w-3xl mx-auto py-6`}
                >
                  <div className={`flex-auto`}>
                    <p className={`text-sm text-slate-800 font-bold`}>
                      abce123
                    </p>
                  </div>
                  <div className={`flex-none flex flex-row gap-x-2`}>
                    <button
                      className={`rounded-md bg-black text-white text-xs px-4 py-3`}
                    >
                      修正
                    </button>
                    <button
                      className={`rounded-md bg-black text-white text-xs px-4 py-3`}
                    >
                      削除
                    </button>
                  </div>
                </li>
                <li
                  className={`border-b-2 border-b-solid border-gray-200 flex flex-wrap flex-row items-center justify-between w-full max-w-3xl mx-auto py-6`}
                >
                  <div className={`flex-auto`}>
                    <p className={`text-sm text-slate-800 font-bold`}>
                      abce123
                    </p>
                  </div>
                  <div className={`flex-none flex flex-row gap-x-2`}>
                    <button
                      className={`rounded-md bg-black text-white text-xs px-4 py-3`}
                    >
                      修正
                    </button>
                    <button
                      className={`rounded-md bg-black text-white text-xs px-4 py-3`}
                    >
                      削除
                    </button>
                  </div>
                </li>
                <li
                  className={`border-b-2 border-b-solid border-gray-200 flex flex-wrap flex-row items-center justify-between w-full max-w-3xl mx-auto py-6`}
                >
                  <div className={`flex-auto`}>
                    <p className={`text-sm text-slate-800 font-bold`}>
                      abce123
                    </p>
                  </div>
                  <div className={`flex-none flex flex-row gap-x-2`}>
                    <button
                      className={`rounded-md bg-black text-white text-xs px-4 py-3`}
                    >
                      修正
                    </button>
                    <button
                      className={`rounded-md bg-black text-white text-xs px-4 py-3`}
                    >
                      削除
                    </button>
                  </div>
                </li>
                <li
                  className={`border-b-2 border-b-solid border-gray-200 flex flex-wrap flex-row items-center justify-between w-full max-w-3xl mx-auto py-6`}
                >
                  <div className={`flex-auto`}>
                    <p className={`text-sm text-slate-800 font-bold`}>
                      abce123
                    </p>
                  </div>
                  <div className={`flex-none flex flex-row gap-x-2`}>
                    <button
                      className={`rounded-md bg-black text-white text-xs px-4 py-3`}
                    >
                      修正
                    </button>
                    <button
                      className={`rounded-md bg-black text-white text-xs px-4 py-3`}
                    >
                      削除
                    </button>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </main>
      <footer
        className={`w-full bg-neutral-50 fixed bottom-0 ${styles.footer}`}
      >
        <ul className={`w-fit mx-auto flex gap-10 py-2`}>
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
}
