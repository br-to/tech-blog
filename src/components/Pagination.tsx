"use client";

import Link from "next/link";
import clsx from "clsx";
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
				className={clsx(styles.pageButton, {
					[styles.disabled]: currentPage === 1,
				})}
				href={buildHref(Math.max(1, currentPage - 1))}
				aria-disabled={currentPage === 1}
			>
				Prev
			</Link>

			{pages.map((page) => (
				<Link
					key={page}
					href={buildHref(page)}
					aria-current={page === currentPage ? "page" : undefined}
					className={clsx(styles.pageButton, {
						[styles.active]: page === currentPage,
					})}
				>
					{page}
				</Link>
			))}

			<Link
				className={clsx(styles.pageButton, {
					[styles.disabled]: currentPage === totalPages,
				})}
				href={buildHref(Math.min(totalPages, currentPage + 1))}
				aria-disabled={currentPage === totalPages}
			>
				Next
			</Link>
		</nav>
	);
}
