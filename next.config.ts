import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/** Old pages now live as sections of the home page; their links land on the right section. */
	async redirects() {
		return [
			{ source: "/about", destination: "/", permanent: true },
			{ source: "/education", destination: "/#home", permanent: true },
			{ source: "/stack", destination: "/#home", permanent: true },
			{ source: "/work", destination: "/#work", permanent: true },
			{ source: "/projects", destination: "/#work", permanent: true },
			{ source: "/blog", destination: "/", permanent: false },
		];
	},
};

export default nextConfig;
