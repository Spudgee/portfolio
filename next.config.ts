import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/** About and Education became part of the home page; old links land there. */
	async redirects() {
		return [
			{ source: "/about", destination: "/", permanent: true },
			{ source: "/education", destination: "/", permanent: true },
		];
	},
};

export default nextConfig;
