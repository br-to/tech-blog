import type { Metadata } from "next";
import "@/styles/reset.css";
import "@/styles/globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Analytics } from "@vercel/analytics/next";

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
				<Analytics />
				<Footer />
			</body>
		</html>
	);
}
