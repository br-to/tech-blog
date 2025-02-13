import { BlogCard, type BlogPost } from "@/components/BlogCard";
import styles from "./page.module.css";

export default async function Page() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

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
