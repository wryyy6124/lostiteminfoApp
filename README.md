
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
# lostiteminfoApp

# lostiteminfoApp

## 開発 Tips

### PullRequest

**1. プルリクエスト前の作業**

プルリクエストを上げる前に必ず、自分が作業を行なっているブランチで `git pull origin main` を行うこと。<br/>
もし、コンフリクトが発生したら、ローカル上で解決する、解決の仕方がわからない場合は、メンバーに相談すること。

**2. `git pull origin main` を行なった後の作業**

remote に変更があった場合は、 `git pull origin main` のコマンドを実行し、remote の変更を取り込む。<br/>
package に更新がないか、確認するため、 `npm install` コマンドを実行する。<br/>
`found 0 vulnerabilities` と表示されれば OK。

**3. プルリクエスト作成時**

- `PullRequestTemplate`を使ってください。
- 作ったブランチから main ブランチへマージするプルリクを作ってください。
- プルリクに issue 番号を紐付けてください。
- レビュアーに assign つけてください。（複数つけても OK）
- レビュー依頼の際は、PR 内にメンションコメント＆念の為 Slack にてレビュアーに声掛けお願いします。

**4. マージ**

- マージはスカッシュコミット（プルリク内のコミットを 1 つににまとめてコミット）でお願いします。
  - マージの際に`Marge Pull Request`ではなく`Squash and merge`を選んでマージしてください。

### Branch

### ブランチ命名規則（**プレフィックス**をつける）

- feature: 機能追加
- fix: コード修正
- bug: バグ修正

※ 該当項目がない場合は適宜追加

**＜例＞**

```
git checkout -b 'feature/todotop_layout'
git checkout -b 'fix/todotop_layout'
git checkout -b 'bug/todotop_layout'
```

### Commit

### コミットメッセージ

- 日本語もしくは英語で端的に

**＜例＞**

```
git commit -m 'Top画面 作成'
git commit -m 'create top layout'
```

## 推奨 VScode 拡張機能

- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph&ssr=false#qna) コミットの一覧 → 詳細を閲覧できる
- [Git History](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory) ファイルの履歴などを確認できる
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) 視覚的にリポジトリ、ブランチ、ファイル、コミットの状態を確認や操作することができる

