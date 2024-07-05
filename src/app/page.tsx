import styles from "./TopPage.module.css";

export default function TopPage() {
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
      <main className={`w-full`}>
        <div className={`w-full`}>
          <h2
            className={`w-full bg-neutral-100 text-lg font-bold sticky top-0  ${styles.contents_h2}`}
          >
            <div className={`w-full max-w-5xl mx-auto p-4`}>
              🗒️ おとしものリスト
            </div>
          </h2>
          <div className={`w-full max-w-5xl mx-auto p-5`}>
            <div className={`w-full max-w-3xl mx-auto pb-3`}>
              <h3 className={`text-sm font-bold mb-1.5`}>
                おとしもの情報フィルター
              </h3>
              <input
                type="text"
                className={`w-full p-3 rounded-md border-2 border-solid border-gray-200`}
                name="filter"
                placeholder="🔍 キーワードを入力してください"
              />
            </div>
            <ol className={`w-full max-w-3xl mx-auto ${styles.item_list}`}>
              <li
                className={`flex flex-wrap flex-row items-center w-full max-w-3xl mx-auto py-6 border-b-2 border-b-solid border-gray-200`}
              >
                <div
                  className={`border-2 border-solid text-center max-w-10 ${styles.circle_width} ${styles.is_paid}`}
                >
                  <div className={`relative ${styles.circle_height}`}>
                    <p
                      className={`flex justify-center items-center absolute top-0 bottom-0 left-0 right-0`}
                    ></p>
                  </div>
                </div>
                <div className={`flex-auto flex flex-col gap-y-2`}>
                  <h4 className={`text-sm font-bold text-black`}>
                    自転車のかぎ
                  </h4>
                  <p className={`text-xs text-slate-800`}>
                    発見日：2024年6月15日
                  </p>
                </div>
                <div className={`flex-none`}>
                  <button
                    className={`rounded-md bg-black text-white text-xs px-6 py-3`}
                  >
                    詳細
                  </button>
                </div>
              </li>
              <li
                className={`flex flex-wrap flex-row items-center w-full max-w-3xl mx-auto py-6 border-b-2 border-b-solid border-gray-200`}
              >
                <div
                  className={`border-2 border-solid text-center max-w-10 ${styles.circle_width} ${styles.is_unpaid}`}
                >
                  <div className={`relative ${styles.circle_height}`}>
                    <p
                      className={`flex justify-center items-center absolute top-0 bottom-0 left-0 right-0`}
                    ></p>
                  </div>
                </div>
                <div className={`flex-auto flex flex-col gap-y-2`}>
                  <h4 className={`text-sm font-bold text-black`}>
                    自転車のかぎ
                  </h4>
                  <p className={`text-xs text-slate-800`}>
                    発見日：2024年6月15日
                  </p>
                </div>
                <div className={`flex-none`}>
                  <button
                    className={`rounded-md bg-black text-white text-xs px-6 py-3`}
                  >
                    詳細
                  </button>
                </div>
              </li>
              <li
                className={`flex flex-wrap flex-row items-center w-full max-w-3xl mx-auto py-6 border-b-2 border-b-solid border-gray-200`}
              >
                <div
                  className={`border-2 border-solid text-center max-w-10 ${styles.circle_width} ${styles.is_unpaid}`}
                >
                  <div className={`relative ${styles.circle_height}`}>
                    <p
                      className={`flex justify-center items-center absolute top-0 bottom-0 left-0 right-0`}
                    ></p>
                  </div>
                </div>
                <div className={`flex-auto flex flex-col gap-y-2`}>
                  <h4 className={`text-sm font-bold text-black`}>
                    自転車のかぎ
                  </h4>
                  <p className={`text-xs text-slate-800`}>
                    発見日：2024年6月15日
                  </p>
                </div>
                <div className={`flex-none`}>
                  <button
                    className={`rounded-md bg-black text-white text-xs px-6 py-3`}
                  >
                    詳細
                  </button>
                </div>
              </li>
              <li
                className={`flex flex-wrap flex-row items-center w-full max-w-3xl mx-auto py-6 border-b-2 border-b-solid border-gray-200`}
              >
                <div
                  className={`border-2 border-solid text-center max-w-10 ${styles.circle_width} ${styles.is_unpaid}`}
                >
                  <div className={`relative ${styles.circle_height}`}>
                    <p
                      className={`flex justify-center items-center absolute top-0 bottom-0 left-0 right-0`}
                    ></p>
                  </div>
                </div>
                <div className={`flex-auto flex flex-col gap-y-2`}>
                  <h4 className={`text-sm font-bold text-black`}>
                    自転車のかぎ
                  </h4>
                  <p className={`text-xs text-slate-800`}>
                    発見日：2024年6月15日
                  </p>
                </div>
                <div className={`flex-none`}>
                  <button
                    className={`rounded-md bg-black text-white text-xs px-6 py-3`}
                  >
                    詳細
                  </button>
                </div>
              </li>
              <li
                className={`flex flex-wrap flex-row items-center w-full max-w-3xl mx-auto py-6 border-b-2 border-b-solid border-gray-200`}
              >
                <div
                  className={`border-2 border-solid text-center max-w-10 ${styles.circle_width} ${styles.is_unpaid}`}
                >
                  <div className={`relative ${styles.circle_height}`}>
                    <p
                      className={`flex justify-center items-center absolute top-0 bottom-0 left-0 right-0`}
                    ></p>
                  </div>
                </div>
                <div className={`flex-auto flex flex-col gap-y-2`}>
                  <h4 className={`text-sm font-bold text-black`}>
                    自転車のかぎ
                  </h4>
                  <p className={`text-xs text-slate-800`}>
                    発見日：2024年6月15日
                  </p>
                </div>
                <div className={`flex-none`}>
                  <button
                    className={`rounded-md bg-black text-white text-xs px-6 py-3`}
                  >
                    詳細
                  </button>
                </div>
              </li>
              <li
                className={`flex flex-wrap flex-row items-center w-full max-w-3xl mx-auto py-6 border-b-2 border-b-solid border-gray-200`}
              >
                <div
                  className={`border-2 border-solid text-center max-w-10 ${styles.circle_width} ${styles.is_unpaid}`}
                >
                  <div className={`relative ${styles.circle_height}`}>
                    <p
                      className={`flex justify-center items-center absolute top-0 bottom-0 left-0 right-0`}
                    ></p>
                  </div>
                </div>
                <div className={`flex-auto flex flex-col gap-y-2`}>
                  <h4 className={`text-sm font-bold text-black`}>
                    自転車のかぎ
                  </h4>
                  <p className={`text-xs text-slate-800`}>
                    発見日：2024年6月15日
                  </p>
                </div>
                <div className={`flex-none`}>
                  <button
                    className={`rounded-md bg-black text-white text-xs px-6 py-3`}
                  >
                    詳細
                  </button>
                </div>
              </li>
              <li
                className={`flex flex-wrap flex-row items-center w-full max-w-3xl mx-auto py-6 border-b-2 border-b-solid border-gray-200`}
              >
                <div
                  className={`border-2 border-solid text-center max-w-10 ${styles.circle_width} ${styles.is_unpaid}`}
                >
                  <div className={`relative ${styles.circle_height}`}>
                    <p
                      className={`flex justify-center items-center absolute top-0 bottom-0 left-0 right-0`}
                    ></p>
                  </div>
                </div>
                <div className={`flex-auto flex flex-col gap-y-2`}>
                  <h4 className={`text-sm font-bold text-black`}>
                    自転車のかぎ
                  </h4>
                  <p className={`text-xs text-slate-800`}>
                    発見日：2024年6月15日
                  </p>
                </div>
                <div className={`flex-none`}>
                  <button
                    className={`rounded-md bg-black text-white text-xs px-6 py-3`}
                  >
                    詳細
                  </button>
                </div>
              </li>
              <li
                className={`flex flex-wrap flex-row items-center w-full max-w-3xl mx-auto py-6 border-b-2 border-b-solid border-gray-200`}
              >
                <div
                  className={`border-2 border-solid text-center max-w-10 ${styles.circle_width} ${styles.is_unpaid}`}
                >
                  <div className={`relative ${styles.circle_height}`}>
                    <p
                      className={`flex justify-center items-center absolute top-0 bottom-0 left-0 right-0`}
                    ></p>
                  </div>
                </div>
                <div className={`flex-auto flex flex-col gap-y-2`}>
                  <h4 className={`text-sm font-bold text-black`}>
                    自転車のかぎ
                  </h4>
                  <p className={`text-xs text-slate-800`}>
                    発見日：2024年6月15日
                  </p>
                </div>
                <div className={`flex-none`}>
                  <button
                    className={`rounded-md bg-black text-white text-xs px-6 py-3`}
                  >
                    詳細
                  </button>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </main>
      <footer
        className={`w-full bg-neutral-50 fixed bottom-0 ${styles.footer}`}
      >
        <ul className={`w-fit mx-auto flex gap-10 py-2`}>
          <li className={`text-center`}>
            <span className={`text-3xl inline-block place-self-center p-2`}>
              📝
            </span>
            <span className={`block text-sm font-bold`}>アカウント情報</span>
          </li>
          <li className={`text-center`}>
            <span className={`text-3xl inline-block place-self-center p-2`}>
              🔓
            </span>
            <span className={`block text-sm font-bold`}>ログオフする</span>
          </li>
        </ul>
      </footer>
    </>
  );
}
