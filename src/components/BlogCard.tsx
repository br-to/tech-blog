import { format } from "date-fns";
import Image from "next/image";
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
						src={post.mainImage || "/test.jpg"}
						alt={post.title}
						fill
						className={styles.image}
						sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
					/>
				</div>
				<div className={styles.content}>
					{post.contentTypes && post.contentTypes.length > 0 && (
						<div className={styles.contentTypes}>
							{post.contentTypes.map((text) => (
								<Chip text={text} key={text} />
							))}
						</div>
					)}
					<p className={styles.date}>
						{format(post.publishedAt, "yyyy/MM/dd")}
					</p>
					<h2 className={styles.title}>{post.title}</h2>
				</div>
			</article>
		</Link>
	);
}
