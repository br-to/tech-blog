import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "sjc.microlink.io",
			},
		],
	},
};

export default nextConfig;
