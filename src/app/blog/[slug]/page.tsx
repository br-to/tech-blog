import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

// 常に動的レンダリングを強制する これをいれないとbuildでこけるため
export const dynamic = "force-dynamic";
// 60秒間のキャッシュ
export const revalidate = 60;

export default async function Page({
	params,
}: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (!res.ok) {
		notFound();
	}

	const blogContent = await res.json();

	return (
		<div className={styles["blog-detail-page"]}>
			<main className={styles.main}>
				<h1 className={styles.title}>{blogContent.title}</h1>
				<p className={styles.date}>
					{format(new Date(blogContent.publishedAt), "yyyy/MM/dd")}
				</p>
				{blogContent.mdblocks.map((mdblock: any) => {
					const formattedMarkdown = mdblock.parent.replace(/\n/g, "  \n");
					return (
						<div className={styles.blocks} key={mdblock.blockId}>
							<Markdown
								remarkPlugins={[remarkGfm]}
								components={{
									ol: ({ node, ...props }) => (
										<ol className={styles.ol} {...props} />
									),
									li: ({ node, ...props }) => <li {...props} />,
								}}
							>
								{formattedMarkdown}
							</Markdown>
						</div>
					);
				})}
			</main>
		</div>
	);
}
