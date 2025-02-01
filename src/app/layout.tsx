import type { Metadata } from "next";
import "@/styles/reset.css";
import "@/styles/globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

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
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
