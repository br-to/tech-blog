"use client";

import styles from "./error.module.css";

export default function ErrorPage() {
	return (
		<div className={styles["server-error"]}>
			<h2 className={styles.title}>500</h2>
			<p className={styles.text}> Sorry, something went wrong.</p>
		</div>
	);
}
