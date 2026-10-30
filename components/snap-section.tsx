import type { Section } from "@/content/site";

/**
 * One screen of the home page's vertical carousel, laid out like a section of Brian Lovin's about
 * page: a small grey label, the summary statement at lead size where the section has one (only the
 * first does), then its rows or buttons, in a 40rem column centred on the screen both ways. The
 * fixed bar floats over the top padding.
 */
export function SnapSection({
	section,
	children,
}: {
	section: Section;
	children: React.ReactNode;
}) {
	return (
		<section
			id={section.id}
			aria-labelledby={`${section.id}-heading`}
			className="flex min-h-dvh snap-start flex-col justify-center py-24"
		>
			<div className="mx-auto w-full max-w-[40rem]">
				<h2 id={`${section.id}-heading`} className="text-muted">
					{section.label}
				</h2>
				{"statement" in section && (
					<p className="mt-4 text-lead font-medium text-pretty">
						{section.statement}
					</p>
				)}
				<div className={"statement" in section ? "mt-8" : "mt-4"}>
					{children}
				</div>
			</div>
		</section>
	);
}
