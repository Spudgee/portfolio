import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/** About and Education became sections of the home page; old links land on the section. */
	async redirects() {
		return [
			{ source: "/about", destination: "/#about", permanent: true },
			{ source: "/education", destination: "/#education", permanent: true },
		];
	},
};

export default nextConfig;
