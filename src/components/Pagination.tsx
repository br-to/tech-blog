"use client";

import Link from "next/link";
import styles from "./Pagination.module.css";

type PaginationProps = {
	currentPage: number;
	totalPages: number;
	basePath: string;
};

export function Pagination({
	currentPage,
	totalPages,
	basePath,
}: PaginationProps) {
	if (totalPages <= 1) return null;

	const buildHref = (page: number) => {
		const search = page > 1 ? `?page=${page}` : "";
		return `${basePath}${search}`;
	};

	// シンプルに全ページ表示（総ページ数が小さい前提）
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<nav className={styles.pagination} aria-label="Pagination">
			<Link
				className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ""}`}
				href={buildHref(Math.max(1, currentPage - 1))}
				aria-disabled={currentPage === 1}
			>
				Prev
			</Link>

			{pages.map((p) => (
				<Link
					key={p}
					href={buildHref(p)}
					aria-current={p === currentPage ? "page" : undefined}
					className={`${styles.pageButton} ${p === currentPage ? styles.active : ""}`}
				>
					{p}
				</Link>
			))}

			<Link
				className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ""}`}
				href={buildHref(Math.min(totalPages, currentPage + 1))}
				aria-disabled={currentPage === totalPages}
			>
				Next
			</Link>
		</nav>
	);
}
