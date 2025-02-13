import { BlogCard, type BlogPost } from "@/components/BlogCard";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Page() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) {
		throw new Error(`Failed to fetch: ${res.status}`);
	}

	const blogPosts: BlogPost[] = await res.json();

	return (
		<div className={styles["blog-page"]}>
			<main className={styles.main}>
				<h1 className={styles.title}>All Posts</h1>
				<div className={styles.grid}>
					{blogPosts.map((post) => (
						<BlogCard key={post.id} post={post} />
					))}
				</div>
			</main>
		</div>
	);
}
