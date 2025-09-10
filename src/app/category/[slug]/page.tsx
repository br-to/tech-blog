import { notFound } from "next/navigation";
import { BlogCard, type BlogPost } from "@/components/BlogCard";
import { Pagination } from "@/components/Pagination";
import styles from "./page.module.css";

// 常に動的レンダリングを強制する これをいれないとbuildでこけるため
export const dynamic = "force-dynamic";

export default async function Page({
	params,
	searchParams,
}: {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { slug: category } = await params;
	const resolvedSearchParams = await searchParams;

	if (!category) {
		notFound();
	}

	const pageParam = resolvedSearchParams?.page;
	const currentPage = Math.max(
		1,
		Number(Array.isArray(pageParam) ? pageParam[0] : pageParam) || 1,
	);
	const PAGE_SIZE = 12;

	type PaginatedResponse = {
		items: BlogPost[];
		total: number;
		page: number;
		pageSize: number;
		totalPages: number;
	};

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?category=${encodeURIComponent(category)}&paginated=1&page=${currentPage}&pageSize=${PAGE_SIZE}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			// 60分キャッシュ
			next: { revalidate: 60 * 60 },
		},
	);

	if (!res.ok) {
		notFound();
	}

	const data: PaginatedResponse = await res.json();
	const pageItems = data.items;
	const totalPages = data.totalPages;
	const safePage = data.page;

	return (
		<div className={styles["category-page"]}>
			<main className={styles.main}>
				<h1 className={styles.title}>{category}</h1>
				<div className={styles.grid}>
					{pageItems.map((post) => (
						<BlogCard key={post.id} post={post} />
					))}
				</div>
				<Pagination
					currentPage={safePage}
					totalPages={totalPages}
					basePath={`/category/${category}`}
				/>
			</main>
		</div>
	);
}
