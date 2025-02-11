import type { Metadata } from "next";
import "@/styles/reset.css";
import "@/styles/globals.css";
import { Footer } from "@/components/parts/Footer";
import { Header } from "@/components/parts/Header";

export const metadata: Metadata = {
	title: "Toi Devlog: Home",
	description: "This blog is Toi Kobara's devlog.",
};

export default function UserLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}
