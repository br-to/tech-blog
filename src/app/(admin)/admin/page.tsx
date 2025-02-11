import AdminDashboard from "@/components/sections/AdminDashboard";
import styles from "./page.module.css";

export default async function AdminPage() {
	const res = await fetch("http:localhost:3000/api/posts", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const { data } = await res.json();

	return (
		<div className={styles["admin-page"]}>
			<main className={styles.main}>
				<AdminDashboard posts={data} />
			</main>
		</div>
	);
}
