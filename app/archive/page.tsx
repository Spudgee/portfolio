import type { Metadata } from "next";
import Image from "next/image";
import { PillLink } from "@/components/pill-link";
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

/**
 * Columns fill top to bottom, so the first screen shows the top of every column, not the first few
 * images; loading the first eight eagerly covers four columns of two.
 */
const ABOVE_FOLD_COUNT = 8;

/** Are.na down or slow should cost the Archive its pictures, never the whole site its build. */
async function loadImages(): Promise<readonly ArchiveImage[] | null> {
	try {
		return await fetchArchiveImages(ARCHIVE_CHANNEL.slug);
	} catch {
		return null;
	}
}

/**
 * Images worth keeping, pulled from an Are.na channel: a grey label with a link out to the channel
 * on the same line, then a masonry grid, four across on desktop and two on phones, where each picture opens its site.
 */
export default async function ArchivePage() {
	const images = await loadImages();

	return (
		<section
			aria-labelledby="archive-heading"
			className="mx-auto max-w-[72rem]"
		>
			<div className="flex items-center justify-between gap-4">
				<h1 id="archive-heading" className="text-muted">
					Archive
				</h1>
				{/* PillLink pads outwards, so the text lines up with the column's right edge. */}
				<PillLink href={ARCHIVE_CHANNEL.url}>View on Are.na</PillLink>
			</div>

			{images === null || images.length === 0 ? (
				<p className="mt-4 text-muted">
					{images === null
						? "The archive could not load from Are.na just now."
						: "Nothing in the archive yet."}{" "}
					<a href={ARCHIVE_CHANNEL.url} className="text-ink underline">
						See it on Are.na
					</a>
					.
				</p>
			) : (
				<ul className="mt-4 columns-2 gap-4 md:columns-4">
					{images.map((image, index) => (
						<li key={image.id} className="mb-4 break-inside-avoid">
							<a href={image.href} className="group grid gap-2">
								{/* Are.na already serves resized copies; the 800px one stays sharp on 2x screens at this width. */}
								<Image
									src={image.src2x}
									alt={image.title}
									width={image.width * 2}
									height={image.height * 2}
									unoptimized
									loading={index < ABOVE_FOLD_COUNT ? "eager" : "lazy"}
									className="h-auto w-full bg-pill-soft transition-opacity duration-150 group-hover:opacity-85"
								/>
								<span className="truncate text-muted transition-colors group-hover:text-ink">
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
