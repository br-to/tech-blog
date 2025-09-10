# Repository Guidelines

## プロジェクト構成 / Module Organization
- `src/app`: Next.js App Router のルート/ページ/エラーハンドラ/API。例: `src/app/blog/[slug]/page.tsx`, `src/app/api/posts/route.ts`, `src/app/rss.xml/route.ts`。
- `src/components`: 再利用 UI（PascalCase、`.tsx`、対応する `*.module.css`）。
- `src/styles`: グローバル CSS と PostCSS 設定連携（`globals.css`, `variables.css`, `customMedia.css` など）。
- `src/constants` / `src/utils` / `src/types`: 定数・ユーティリティ・型定義。
- `public`: 画像などの静的アセット。
- `src/test`: テスト配置（現在は未整備）。
- `.env.local`: Notion とベースURLの設定（コミット禁止）。

## 開発・ビルド・実行コマンド
- `npm run dev`: 開発サーバ起動（Turbopack、既定は http://localhost:3000）。必要に応じ `PORT=3001 npm run dev`。
- `npm run build`: 本番ビルド（型チェック含む）。
- `npm run start`: 本番サーバ起動（`build` 必須）。
- `npm run lint`: Next.js の ESLint ルールで静的解析。
- `npx biome check .`: Biome による追加の Lint。
- `npx biome format --write .`: Biome による整形（`biome.json` 準拠）。
  - Node/NPM は Volta で固定: Node `23.11.1`, npm `11.6.0`（`package.json#volta`）。

## コーディング規約・命名
- 言語: TypeScript。暗黙の `any` を避け、型を明示。
- インデント: タブ（幅 2、`biome.json`）。
- 命名: コンポーネント=PascalCase、フック=`useXxx`、ユーティリティ=camelCase、CSS Modules=`*.module.css`。
- 参照順: `src/constants` → `src/utils` → `src/components` → `src/app` の依存方向を維持。

## テスト方針
- 現在、自動テストは未導入。`src/test` に追加してください。
- PR では主要ページの動作確認とスクリーンショット（Before/After）を添付。
- 将来的に Playwright/React Testing Library の導入を検討しています。

## コミット・プルリクエスト
- コミット: 簡潔な英語の要約を推奨（例: `feat: add share buttons`、`fix: handle 404 in blog page`）。
- PR 必須項目: 目的、変更点、動作確認手順、スクリーンショット、関連 Issue/リンク。
- マージ条件: `npm run lint` と `npm run build` がローカルで成功していること。
- UI 変更は GIF/画像、API 変更は curl/リクエスト例とレスポンス例を記載。

## セキュリティ・設定
- Notion トークン等の機密は `.env*` に置き、コミットしない。露出時は即時ローテーション。
- 本番は Vercel 等の環境変数機能を使用。
- `NEXT_PUBLIC_BASE_URL` は環境（開発/本番）に合わせて更新。
