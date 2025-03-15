import { format } from "date-fns";
import Link from "next/link";
import styles from "./BlogCard.module.css";
import { Chip } from "./Chip";

export type BlogPost = {
	id: string;
	title: string;
	publishedAt: string;
	contentTypes: string[];
	mainImage: string;
	slug: string;
	icon: string;
};

type BlogCardProps = {
	post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
	return (
		<article className={styles["blog-card"]}>
			<Link href={`/blog/${post.slug}`}>
				<p className={styles["image-container"]}>{post.icon}</p>
			</Link>
			<div className={styles.content}>
				{post.contentTypes && post.contentTypes.length > 0 && (
					<div className={styles.contentTypes}>
						{post.contentTypes.map((text) => (
							<Chip text={text} key={text} />
						))}
					</div>
				)}
				<p className={styles.date}>{format(post.publishedAt, "yyyy/MM/dd")}</p>
				<Link href={`/blog/${post.slug}`}>
					<h2 className={styles.title}>{post.title}</h2>
				</Link>
			</div>
		</article>
	);
}
