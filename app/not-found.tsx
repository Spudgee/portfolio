import type { Metadata } from "next";
import { InlineLink } from "@/components/inline-link";
import { PERSON } from "@/content/person";
import { PATHS } from "@/content/site";

export const metadata: Metadata = {
	title: { absolute: `Page not found – ${PERSON.name}` },
};

/** Served with a real 404 status for any unknown path. */
export default function NotFound() {
	return (
		<section
			aria-labelledby="not-found"
			className="grid grid-cols-4 gap-x-4 pt-12 sm:grid-cols-12 sm:gap-x-6 sm:pt-16"
		>
			<h1 id="not-found" className="col-span-full font-medium sm:col-span-3">
				Page not found
			</h1>
			<p className="col-span-full mt-2 sm:col-span-9 sm:mt-0">
				Nothing lives at this address.{" "}
				<InlineLink href={PATHS.home}>Go to the home page</InlineLink>.
			</p>
		</section>
	);
}
