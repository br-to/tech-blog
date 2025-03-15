import { BlogCard, type BlogPost } from "@/components/BlogCard";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

// 常に動的レンダリングを強制する これをいれないとbuildでこけるため
export const dynamic = "force-dynamic";

export default async function Page({
	params,
}: { params: Promise<{ slug: string }> }) {
	const { slug: category } = await params;

	if (!category) {
		notFound();
	}

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?category=${encodeURIComponent(category)}`,
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

	const blogPosts: BlogPost[] = await res.json();

	return (
		<div className={styles["blog-page"]}>
			<main className={styles.main}>
				<h1 className={styles.title}>{category}</h1>
				<div className={styles.grid}>
					{blogPosts.map((post) => (
						<BlogCard key={post.id} post={post} />
					))}
				</div>
			</main>
		</div>
	);
}
