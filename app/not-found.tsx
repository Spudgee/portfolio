import type { Metadata } from "next";
import { InlineLink } from "@/components/inline-link";
import { PERSON } from "@/content/person";

export const metadata: Metadata = {
	title: { absolute: `Page not found – ${PERSON.name}` },
};

/** Served with a real 404 status for any unknown path. */
export default function NotFound() {
	return (
		<section
			aria-labelledby="not-found"
			className="grid grid-cols-4 gap-x-4 pt-16 sm:grid-cols-12 sm:gap-x-6 sm:pt-24"
		>
			<h1 id="not-found" className="col-span-full text-display font-medium">
				Page not found
			</h1>
			<p className="col-span-full mt-8 text-lead sm:col-span-8 sm:col-start-4 sm:mt-12 lg:col-span-6 lg:col-start-4">
				Nothing lives at this address.{" "}
				<InlineLink href="/">Go to the home page</InlineLink>.
			</p>
		</section>
	);
}
