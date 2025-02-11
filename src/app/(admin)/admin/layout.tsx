import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import { AdminHeader } from "@/components/parts/AdminHeader";
import { Theme } from "@radix-ui/themes";

export const metadata: Metadata = {
	title: "Toi Devlog: Home",
	description: "This blog is Toi Kobara's devlog.",
	robots: "noindex",
};

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Theme>
			<AdminHeader />
			{children}
		</Theme>
	);
}
