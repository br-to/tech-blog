import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

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
				<p className={styles.date}>Monday, February 25, 2019 · 6 min read</p>
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
