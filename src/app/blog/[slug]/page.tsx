import { Chip } from "@/components/Chip";
import { format } from "date-fns";
import type { Metadata } from "next";
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
					url: `${process.env.NEXT_PUBLIC_BASE_URL}/ogp.jpg`,
					width: 1200,
					height: 630,
				},
			],
		},
	};
};

// 常に動的レンダリングを強制する これをいれないとbuildでこけるため
export const dynamic = "force-dynamic";

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
			// 10分キャッシュ
			next: { revalidate: 60 * 10 },
		},
	);

	if (!res.ok) {
		notFound();
	}

	const blogContent = await res.json();

	return (
		<div className={styles["blog-detail-page"]}>
			<main className={styles.main}>
				<p className={styles["icon"]}>{blogContent.icon}</p>
				<h1 className={styles.title}>{blogContent.title}</h1>
				<p className={styles.date}>
					{format(new Date(blogContent.publishedAt), "yyyy/MM/dd")} 公開
				</p>
				{blogContent.mdblocks.map((mdblock: any, index: number) => {
					const formattedParentMarkdown = mdblock.replace(/\n/g, "  \n");
					return (
						<div className={styles.blocks} key={`${mdblock}-${index}`}>
							<Markdown
								remarkPlugins={[remarkGfm]}
								components={{
									ol: ({ node, ...props }) => (
										<ol className={styles.ol} {...props} />
									),
									li: ({ node, ...props }) => <li {...props} />,
									// ブログ記事内のaタグは全て別タブ遷移にする
									a: ({ node, ...props }) => <a target="_blank" {...props} />,
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
													{children}
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
								{formattedParentMarkdown}
							</Markdown>
						</div>
					);
				})}
				{blogContent.contentTypes && blogContent.contentTypes.length > 0 && (
					<div className={styles.contentTypes}>
						{blogContent.contentTypes.map((text: string) => (
							<Chip text={text} key={text} />
						))}
					</div>
				)}
			</main>
		</div>
	);
}
