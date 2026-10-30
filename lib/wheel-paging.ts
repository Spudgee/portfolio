/** A trackpad keeps sending wheel events while its momentum runs; this much quiet ends one gesture. */
const GESTURE_END_MS = 200;

/**
 * Turns one wheel step or one trackpad swipe into exactly one section, like a vertical carousel.
 * CSS snapping alone settles on the nearest section, so a short scroll falls back to where it began.
 * A section taller than the screen scrolls normally until its edge, then pages. Returns a cleanup.
 */
export function attachWheelPaging(container: HTMLElement) {
	let isGestureHandled = false;
	let gestureEndTimer: number | undefined;

	function handleWheel(event: WheelEvent) {
		// Pinch-zoom arrives as ctrl+wheel; sideways scrolls are not ours.
		if (event.ctrlKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
			return;
		}
		const sections = [
			...container.querySelectorAll<HTMLElement>("section[id]"),
		];
		const currentIndex = nearestSectionIndex(sections);
		const current = sections[currentIndex];
		const direction = Math.sign(event.deltaY);
		const rect = current.getBoundingClientRect();
		const hasMoreInside =
			direction > 0 ? rect.bottom > window.innerHeight + 1 : rect.top < -1;
		if (hasMoreInside) return;

		event.preventDefault();
		window.clearTimeout(gestureEndTimer);
		gestureEndTimer = window.setTimeout(() => {
			isGestureHandled = false;
		}, GESTURE_END_MS);
		if (isGestureHandled) return;
		isGestureHandled = true;

		const target = sections[currentIndex + direction];
		if (!target) return;
		const isReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		target.scrollIntoView({ behavior: isReducedMotion ? "auto" : "smooth" });
	}

	container.addEventListener("wheel", handleWheel, { passive: false });
	return () => {
		container.removeEventListener("wheel", handleWheel);
		window.clearTimeout(gestureEndTimer);
	};
}

/** The section whose top is closest to the top of the screen. */
function nearestSectionIndex(sections: readonly HTMLElement[]) {
	let nearestIndex = 0;
	let nearestDistance = Number.POSITIVE_INFINITY;
	for (const [index, section] of sections.entries()) {
		const distance = Math.abs(section.getBoundingClientRect().top);
		if (distance < nearestDistance) {
			nearestDistance = distance;
			nearestIndex = index;
		}
	}
	return nearestIndex;
}
