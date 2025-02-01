import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css";
import styles from "./page.module.css";

export default function Page() {
	const markdown = `
  # 見出し1

  これはreact-markdownのサンプルです。

  ## 見出し2

  - リスト1
  - リスト2

  \`\`\`javascript
  const message = "Hello, world!";
  console.log(message);
  \`\`\`

  **太字**

  [リンク](https://www.google.com/)

  > 引用

  ## GFMの機能

  | ヘッダー1 | ヘッダー2 |
  |---|---|
  | セル1 | セル2 |

  ~~取り消し線~~

  - [x] タスク完了
  - [ ] タスク未完了

  [^1]: 脚注

   脚注付きテキスト[^1].
    `;

	return (
		<div className={styles["blog-detail-page"]}>
			<main className={styles.main}>
				<h1 className={styles.title}>記事テスト</h1>
				<p className={styles.date}>Monday, February 25, 2019 · 6 min read</p>
				<Markdown remarkPlugins={[remarkGfm]} className="markdown-body">
					{markdown}
				</Markdown>
			</main>
		</div>
	);
}
