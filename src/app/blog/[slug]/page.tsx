import { format } from "date-fns";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import styles from "./page.module.css";
import "@/styles/githubMarkdown.css";

export const generateMetadata = async ({
	params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
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

	const description = blogContent.mdblocks
		.filter((mdblock: any) => mdblock.type === "paragraph")
		.map((mdblock: any) => mdblock.parent.replace(/\n/g, "  \n"))
		.join(",");

	const metaDescription =
		description.length > 100 ? `${description.slice(0, 100)}...` : description;

	return {
		title: blogContent.title,
		description: metaDescription,
		openGraph: {
			title: blogContent.title,
			description: metaDescription,
			images: [
				{
					url: blogContent.mainImage,
					width: 1200,
					height: 630,
				},
			],
		},
	};
};

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
			<div className={styles["image-container"]}>
				<Image
					src={blogContent.mainImage}
					alt={blogContent.title}
					fill
					className={styles.image}
				/>
			</div>
			<main className={styles.main}>
				<h1 className={styles.title}>{blogContent.title}</h1>
				<p className={styles.date}>
					{format(new Date(blogContent.publishedAt), "yyyy/MM/dd")} 公開
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
									code: ({
										node,
										className,
										children,
										style,
										...props
									}: any) => {
										const language = className?.split("-")?.at(-1);

										if (!language) {
											return (
												<code className={className} {...props}>
													{formattedMarkdown}
												</code>
											);
										}

										return (
											<SyntaxHighlighter
												style={atomDark}
												language={language}
												PreTag="div"
												{...props}
											>
												{children?.toString() as string}
											</SyntaxHighlighter>
										);
									},
								}}
								className="markdown-body"
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
