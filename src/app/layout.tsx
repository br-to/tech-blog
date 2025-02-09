import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import "@/styles/reset.css";
import "@/styles/globals.css";
import { Footer } from "@/components/parts/Footer";
import { Header } from "@/components/parts/Header";
import { Theme } from "@radix-ui/themes";

export const metadata: Metadata = {
	title: "Toi Devlog: Home",
	description: "This blog is Toi Kobara's devlog.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body>
				<Theme>
					<Header />
					{children}
					<Footer />
				</Theme>
			</body>
		</html>
	);
}
