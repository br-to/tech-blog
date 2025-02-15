import type { Metadata } from "next";
import "@/styles/reset.css";
import "@/styles/globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
	title: "br-to Devlog",
	description: "This blog is br-to's devlog.",
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
