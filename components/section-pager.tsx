"use client";

import { attachWheelPaging } from "@/lib/wheel-paging";

/**
 * Wraps the home sections so a wheel step or trackpad swipe over them pages exactly one section.
 * A ref callback binds the listener to the element's lifetime, so no effect is needed.
 */
export function SectionPager({ children }: { children: React.ReactNode }) {
	return (
		<div ref={(element) => (element ? attachWheelPaging(element) : undefined)}>
			{children}
		</div>
	);
}
