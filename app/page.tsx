import type { Metadata } from "next";
import { ContentGroup } from "@/components/content-group";
import { JsonLd } from "@/components/json-ld";
import { type Row, RowList } from "@/components/row-list";
import { SocialButtons } from "@/components/social-buttons";
import { EDUCATION } from "@/content/education";
import { EXPERIENCE } from "@/content/experience";
import { PERSON } from "@/content/person";
import { PATHS } from "@/content/site";
import { homeGraph } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import { yearSpan } from "@/lib/year-span";

export const metadata: Metadata = pageMetadata({
	path: PATHS.home,
	title: `${PERSON.name} – ${PERSON.headline}`,
	description: `${PERSON.name} is a product-focused engineer and a founding engineer at Doccy and Medlo, building telehealth and locum software for patients and clinicians.`,
});

const EDUCATION_ROWS: readonly Row[] = [
	{
		key: "degree",
		primary: EDUCATION.institution,
		secondary: EDUCATION.degree,
		aside: yearSpan(EDUCATION.start, EDUCATION.end),
		href: EDUCATION.institutionUrl,
	},
	{
		key: "major",
		primary: "Major",
		secondary: EDUCATION.major,
		aside: `GPA ${EDUCATION.gpa} · WAM ${EDUCATION.wam}`,
	},
];

const STACK_ROWS: readonly Row[] = PERSON.stack.map((group) => ({
	key: group.area,
	primary: group.area,
	secondary: group.tools.join(", "),
}));

const EXPERIENCE_ROWS: readonly Row[] = EXPERIENCE.map((role) => ({
	key: `${role.company}-${role.start}`,
	primary: role.company,
	secondary: role.title,
	aside: yearSpan(role.start, role.end),
	href: role.companyUrl,
}));

/** The handle is the last part of the profile URL: "Spudgee", "cooper-agustin". */
const CONTACT_ROWS: readonly Row[] = PERSON.socialLinks.map((link) => ({
	key: link.href,
	primary: link.label,
	secondary: new URL(link.href).pathname.split("/").filter(Boolean).at(-1),
	href: link.href,
}));

/**
 * The home page in three sections the nav jumps to. Home: who Cooper is (the statement and links,
 * then Education and Stack). Work: what he has built (Experience, then Projects). Contact: where to
 * reach him. Every group opens with the same grey label over the same rows.
 */
export default function HomePage() {
	return (
		<div className="mx-auto max-w-[40rem]">
			<JsonLd graph={homeGraph()} />
			<h1 className="sr-only">
				{PERSON.name}, {PERSON.headline}
			</h1>

			<section id="home" aria-label="Home" className="scroll-mt-24">
				<p className="text-row font-medium text-pretty md:text-lead">
					{PERSON.bio}
				</p>
				<div className="mt-6">
					<SocialButtons />
				</div>
				<div className="mt-16 grid gap-10">
					<ContentGroup id="education" label="Education">
						<RowList rows={EDUCATION_ROWS} />
					</ContentGroup>
					<ContentGroup id="stack" label="Stack">
						<RowList rows={STACK_ROWS} />
					</ContentGroup>
				</div>
			</section>

			<section
				id="work"
				aria-label="Work"
				className="mt-24 grid scroll-mt-24 gap-10"
			>
				<ContentGroup id="experience" label="Experience">
					<RowList rows={EXPERIENCE_ROWS} />
				</ContentGroup>
				<ContentGroup id="projects" label="Projects">
					<p className="text-muted">Projects are on the way.</p>
				</ContentGroup>
			</section>

			<section id="contact" aria-label="Contact" className="mt-24 scroll-mt-24">
				<ContentGroup id="elsewhere" label="Contact">
					<RowList rows={CONTACT_ROWS} />
				</ContentGroup>
			</section>
		</div>
	);
}
