import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/** Old pages folded into Work; Blog returns once there is writing. */
	async redirects() {
		return [
			{ source: "/about", destination: "/", permanent: true },
			{ source: "/education", destination: "/work", permanent: true },
			{ source: "/stack", destination: "/work", permanent: true },
			{ source: "/projects", destination: "/work", permanent: true },
			{ source: "/blog", destination: "/", permanent: false },
		];
	},
};

export default nextConfig;
