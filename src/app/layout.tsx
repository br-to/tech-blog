import type { Metadata } from "next";
import "@/styles/reset.css";
import "@/styles/globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
	title: "br-to Devlog",
	description: "This blog is br-to's devlog.",
	openGraph: {
		title: "br-to Devlog",
		description: "This blog is br-to's devlog.",
		images: [
			{
				url: `${process.env.NEXT_PUBLIC_BASE_URL}/ogp.jpg`,
				width: 1200,
				height: 630,
			},
		],
	},
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
