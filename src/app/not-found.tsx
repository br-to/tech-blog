import styles from "./not-found.module.css";

export default function NotFound() {
	return (
		<div className={styles["not-found"]}>
			<h2 className={styles.title}>404</h2>
			<p className={styles.text}>Soryy the page could not be found.</p>
		</div>
	);
}
