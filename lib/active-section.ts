/**
 * Which home section fills the screen, for the nav's filled item. Read from layout on scroll rather
 * than stored, so it is right after any jump, resize or client navigation. Off the home page there
 * are no sections and nothing is active.
 */
function readActiveSection() {
	const sections = [
		...document.querySelectorAll<HTMLElement>("main section[id]"),
	];
	// The last section is often too short to reach mid-screen; at the very bottom it is the one in view.
	const isAtBottom =
		window.scrollY + window.innerHeight >=
		document.documentElement.scrollHeight - 2;
	if (isAtBottom && sections.length > 0)
		return sections[sections.length - 1].id;
	let activeId = "";
	for (const section of sections) {
		if (section.getBoundingClientRect().top <= window.innerHeight / 2) {
			activeId = section.id;
		}
	}
	return activeId;
}

function subscribe(onChange: () => void) {
	window.addEventListener("scroll", onChange, { passive: true });
	window.addEventListener("resize", onChange);
	window.addEventListener("hashchange", onChange);
	return () => {
		window.removeEventListener("scroll", onChange);
		window.removeEventListener("resize", onChange);
		window.removeEventListener("hashchange", onChange);
	};
}

/** The server cannot measure the page; the client fills the item in on hydration. */
function readServerActiveSection() {
	return "";
}

export const activeSectionStore = {
	subscribe,
	readActiveSection,
	readServerActiveSection,
};
