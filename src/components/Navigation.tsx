import { EXTERNAL_URLS } from "@/constants/externalUrls";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navigation.module.css";

export function Navigation() {
	return (
		<header className={styles.navigation}>
			<div className={styles.container}>
				<nav className={styles.nav}>
					<Link href="/" className={styles.logo}>
						Toi DevLog
					</Link>

					<div className={styles.sns}>
						<Link href={EXTERNAL_URLS.GITHUB} className={styles.item}>
							<Image src="/github.png" width={20} height={20} alt="github" />
						</Link>
						<Link href={EXTERNAL_URLS.LINKDEIN} className={styles.item}>
							<Image
								src="/linkedin.png"
								width={20}
								height={20}
								alt="Linkedin"
							/>
						</Link>
					</div>
				</nav>
			</div>
		</header>
	);
}
