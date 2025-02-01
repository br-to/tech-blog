import Image from "next/image";
import Link from "next/link";
import styles from "./BlogCard.module.css";

type BlogPost = {
	id: string;
	title: string;
	category: string;
	imageUrl: string;
	slug: string;
};

type BlogCardProps = {
	post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
	return (
		<Link href={`/blog/${post.slug}`}>
			<article className={styles["blog-card"]}>
				<div className={styles["image-container"]}>
					<Image
						src={post.imageUrl || "/test.jpg"}
						alt={post.title}
						fill
						className={styles.image}
					/>
				</div>
				<div className={styles.content}>
					<span className={styles.category}>{post.category}</span>
					<h2 className={styles.title}>{post.title}</h2>
				</div>
			</article>
		</Link>
	);
}
