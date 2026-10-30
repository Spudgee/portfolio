import type { Metadata } from "next";
import Image from "next/image";
import { ARCHIVE_CHANNEL } from "@/content/archive";
import { PERSON } from "@/content/person";
import { PATHS } from "@/content/site";
import { type ArchiveImage, fetchArchiveImages } from "@/lib/arena";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
	path: PATHS.archive,
	title: `Archive – ${PERSON.name}`,
	description: `Sites, type and images ${PERSON.name} keeps coming back to, collected on Are.na.`,
});

/** Are.na down or slow should cost the Archive its pictures, never the whole site its build. */
async function loadImages(): Promise<readonly ArchiveImage[] | null> {
	try {
		return await fetchArchiveImages(ARCHIVE_CHANNEL.slug);
	} catch {
		return null;
	}
}

/**
 * Images worth keeping, pulled from an Are.na channel: a grey label, a pill out to the channel,
 * then a masonry grid where each picture opens the site it came from.
 */
export default async function ArchivePage() {
	const images = await loadImages();

	return (
		<section
			aria-labelledby="archive-heading"
			className="mx-auto w-full max-w-[72rem] pt-24 pb-16"
		>
			<div className="flex items-center justify-between gap-4">
				<h1 id="archive-heading" className="text-muted">
					Archive
				</h1>
				<a
					href={ARCHIVE_CHANNEL.url}
					className="inline-flex min-h-11 items-center"
				>
					<span className="rounded-full bg-pill-soft px-4 py-1.5 transition-colors duration-150 ease-out hover:bg-pill motion-reduce:transition-none">
						View on Are.na
					</span>
				</a>
			</div>

			{images === null || images.length === 0 ? (
				<p className="mt-8 text-muted">
					{images === null
						? "The archive could not load from Are.na just now."
						: "Nothing in the archive yet."}{" "}
					<a href={ARCHIVE_CHANNEL.url} className="text-ink underline">
						See it on Are.na
					</a>
					.
				</p>
			) : (
				<ul className="mt-8 columns-2 gap-4 md:columns-3">
					{images.map((image) => (
						<li key={image.id} className="mb-4 break-inside-avoid">
							<a href={image.href} className="group grid gap-2">
								{/* Are.na already serves resized copies; the 800px one stays sharp on 2x screens at this width. */}
								<Image
									src={image.src2x}
									alt={image.title}
									width={image.width * 2}
									height={image.height * 2}
									unoptimized
									className="h-auto w-full bg-pill-soft transition-opacity duration-150 group-hover:opacity-85"
								/>
								<span className="text-muted transition-colors group-hover:text-ink">
									{image.title}
								</span>
							</a>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
