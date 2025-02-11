import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

export default async function Page({
	params,
}: {
	params: Promise<{
		slug: string;
	}>;
}) {
	const { slug } = await params;
	const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (res.status !== 200) {
		notFound();
	}

	const data: {
		title: string;
		content: string;
		created_at: Date;
	} = await res.json();

	console.log(data);

	return (
		<div className={styles["blog-detail-page"]}>
			<main className={styles.main}>
				<h1 className={styles.title}>{data.title}</h1>
				<p className={styles.date}>Monday, February 25, 2019 · 6 min read</p>
				<Markdown remarkPlugins={[remarkGfm]} className="markdown-body">
					{data.content}
				</Markdown>
			</main>
		</div>
	);
}
