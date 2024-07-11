import styles from "./DetailPage.module.css";

export default function detailPage() {
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
            className={`w-full bg-neutral-100 text-lg font-bold z-10 sticky top-0 ${styles.contents_h2}`}
          >
            <div className={`w-full max-w-5xl mx-auto p-4`}>
              🖼️ おとしもの情報詳細
            </div>
          </h2>
          <div className={`w-full max-w-5xl mx-auto mt-6`}>
            <div
              className={`w-full max-w-3xl mx-auto bg-neutral-100 p-6 relative`}
            >
              <div className={`mb-6`}>
                <div className={`text-xs text-gray-600`}>
                  <span className={`font-bold`}>登録日：</span>
                  <span>2024年6月15日</span>
                </div>
                <h3 className={`text-2xl font-bold py-4`}>自転車のかぎ</h3>
                <div className={`text-xs text-gray-600 leading-loose`}>
                  <span className={`inline-block mr-4`}>
                    <span className={`font-bold`}>発見日：</span>
                    <span>2024年6月15日</span>
                  </span>
                  <span className={`inline-block mr-4`}>
                    <span className={`font-bold`}>発見時間：</span>
                    <span>16時15分</span>
                  </span>
                  <span className={`inline-block`}>
                    <span className={`font-bold`}>発見場所：</span>
                    <span>休憩ルームのロッカー下</span>
                  </span>
                </div>
              </div>
              <p className={`w-full mx-auto max-w-2xl px-4`}>
                あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
                <br />
                あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
              </p>

              {/* 以下は「画像がアップロードされている場合」に出現する */}
              <div
                className={`w-full mx-auto max-w-xl max-w-lg bg-gray-300 text-center text-lg flex flex-col justify-center items-center mt-6 py-4`}
              >
                画像
                <br />
                <span className={`text-sm block`}>
                  ※アップロードが無ければ
                  <br />
                  何も表示されない
                </span>
              </div>

              {/* 以下は「解決済みフラグが設定されている」と出現する */}
              <div
                className={`z-0 absolute top-6 right-6 border-2 border-solid text-center max-w-12 circle_width is_paid ${styles.rotate345}`}
              >
                <div className={`relative circle_height`}>
                  <p
                    className={`flex justify-center items-center absolute top-0 bottom-0 left-0 right-0 circle_letter`}
                  ></p>
                </div>
              </div>
            </div>
            <div className={`w-full max-w-3xl mx-auto mt-6 px-6 pb-20`}>
              <h3 className={`text-lg font-bold mb-2`}>★管理者用設定</h3>
              <ul className={`text-sm pl-4 pb-20`}>
                <li className={`mb-2`}>
                  <input type="checkbox" id="adminEdit" name="adminEdit" />
                  <label className={`ml-2`} htmlFor="adminEdit">
                    このスレッドを編集する
                  </label>
                </li>
                <li className={`mb-2`}>
                  <input
                    type="checkbox"
                    id="adminDone"
                    name="adminDone"
                    checked
                  />
                  <label className={`ml-2`} htmlFor="adminDone">
                    このスレッドを「解決済み」に設定する
                  </label>
                </li>
                <li>
                  <input type="checkbox" id="adminHidden" name="adminHidden" />
                  <label className={`ml-2`} htmlFor="adminHidden">
                    このスレッドを「非表示ページ」に設定する
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <footer
        className={`w-full bg-neutral-50 fixed bottom-0 ${styles.footer}`}
      >
        <ul className={`w-fit mx-auto flex gap-6 py-2`}>
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
