import type { Metadata } from "next";
import { ContentGroup } from "@/components/content-group";
import { type Row, RowList } from "@/components/row-list";
import { PERSON } from "@/content/person";
import { PATHS } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
	path: PATHS.stack,
	title: `Stack – ${PERSON.name}`,
	description: `The tools ${PERSON.name} builds with: ${PERSON.stack.flatMap((group) => group.tools).join(", ")}.`,
});

const STACK_ROWS: readonly Row[] = PERSON.stack.map((group) => ({
	key: group.area,
	primary: group.area,
	secondary: group.tools.join(", "),
}));

/** The tools, by area, in the same rows and pane as About. */
export default function StackPage() {
	return (
		<div className="mx-auto max-w-[40rem]">
			<h1 className="sr-only">Stack</h1>
			<ContentGroup id="tools" label="Tools">
				<RowList rows={STACK_ROWS} />
			</ContentGroup>
		</div>
	);
}
