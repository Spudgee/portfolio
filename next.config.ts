import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/** About is the home page now; old links to /about land there. */
	async redirects() {
		return [{ source: "/about", destination: "/", permanent: true }];
	},
};

export default nextConfig;
