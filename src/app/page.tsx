import { BlogCard } from "@/components/BlogCard";
import styles from "./page.module.css";

type BlogPost = {
	id: string;
	title: string;
	category: string;
	imageUrl: string;
	hasVideo?: boolean;
	slug: string;
};

const samplePosts: BlogPost[] = [
	{
		id: "1",
		title: "How University of South Carolina Helps Students Feel at Home",
		category: "Customer Stories",
		imageUrl:
			"https://sjc.microlink.io/JVSDo52E2FWpolm97kJe2ta73Tqkll7J0PF_La9kXssAojR_hgXqK35zjwGcrRe_ZE_7jhJ0pmAl6ma4mGKHfQ.jpeg",
		hasVideo: true,
		slug: "usc-student-support",
	},
	{
		id: "2",
		title: "Knowledge Base Maintenance: A Complete Guide",
		category: "Scaling Service",
		imageUrl:
			"https://sjc.microlink.io/JVSDo52E2FWpolm97kJe2ta73Tqkll7J0PF_La9kXssAojR_hgXqK35zjwGcrRe_ZE_7jhJ0pmAl6ma4mGKHfQ.jpeg",
		slug: "kb-maintenance",
	},
	{
		id: "3",
		title: "How University of South Carolina Helps Students Feel at Home",
		category: "Customer Stories",
		imageUrl:
			"https://sjc.microlink.io/JVSDo52E2FWpolm97kJe2ta73Tqkll7J0PF_La9kXssAojR_hgXqK35zjwGcrRe_ZE_7jhJ0pmAl6ma4mGKHfQ.jpeg",
		hasVideo: true,
		slug: "usc-student-support",
	},
	{
		id: "4",
		title: "Knowledge Base Maintenance: A Complete Guide",
		category: "Scaling Service",
		imageUrl:
			"https://sjc.microlink.io/JVSDo52E2FWpolm97kJe2ta73Tqkll7J0PF_La9kXssAojR_hgXqK35zjwGcrRe_ZE_7jhJ0pmAl6ma4mGKHfQ.jpeg",
		slug: "kb-maintenance",
	},
	{
		id: "5",
		title: "How University of South Carolina Helps Students Feel at Home",
		category: "Customer Stories",
		imageUrl:
			"https://sjc.microlink.io/JVSDo52E2FWpolm97kJe2ta73Tqkll7J0PF_La9kXssAojR_hgXqK35zjwGcrRe_ZE_7jhJ0pmAl6ma4mGKHfQ.jpeg",
		hasVideo: true,
		slug: "usc-student-support",
	},
	{
		id: "6",
		title: "Knowledge Base Maintenance: A Complete Guide",
		category: "Scaling Service",
		imageUrl:
			"https://sjc.microlink.io/JVSDo52E2FWpolm97kJe2ta73Tqkll7J0PF_La9kXssAojR_hgXqK35zjwGcrRe_ZE_7jhJ0pmAl6ma4mGKHfQ.jpeg",
		slug: "kb-maintenance",
	},
];

export default function Page() {
	return (
		<div className={styles["blog-page"]}>
			<main className={styles.main}>
				<h1 className={styles.title}>All Posts</h1>
				<div className={styles.grid}>
					{samplePosts.map((post) => (
						<BlogCard key={post.id} post={post} />
					))}
				</div>
			</main>
		</div>
	);
}
