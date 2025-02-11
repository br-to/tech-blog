import Link from "next/link";
import styles from "./AdminHeader.module.css";

export function AdminHeader() {
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<nav className={styles.nav}>
					<Link href="/" className={styles.logo}>
						Toi DevLog
					</Link>
					<Link href="/admin/create/" className={styles.link}>
						記事の追加
					</Link>
				</nav>
			</div>
		</header>
	);
}
