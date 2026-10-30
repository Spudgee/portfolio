/** "system" follows the OS; "light" and "dark" pin the palette with `data-theme` on <html>. */
export type ThemeChoice = "system" | "light" | "dark";

export const THEME_CHOICES: readonly ThemeChoice[] = [
	"system",
	"light",
	"dark",
];

const STORAGE_KEY = "theme";

/**
 * Runs in <head> before first paint so a pinned theme never flashes the other one. Pages are
 * prerendered, so the choice lives in localStorage rather than a cookie the server would read.
 */
export const THEME_BOOT_SCRIPT = `try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

const listeners = new Set<() => void>();

function readChoice(): ThemeChoice {
	const pinned = document.documentElement.dataset.theme;
	return pinned === "light" || pinned === "dark" ? pinned : "system";
}

/** Subscribes every switch on the page, and other tabs through the storage event. */
function subscribe(onChange: () => void) {
	listeners.add(onChange);
	function handleStorage(event: StorageEvent) {
		if (event.key !== STORAGE_KEY) return;
		applyChoice(
			event.newValue === "light" || event.newValue === "dark"
				? event.newValue
				: "system",
		);
	}
	window.addEventListener("storage", handleStorage);
	return () => {
		listeners.delete(onChange);
		window.removeEventListener("storage", handleStorage);
	};
}

function applyChoice(choice: ThemeChoice) {
	if (choice === "system") delete document.documentElement.dataset.theme;
	else document.documentElement.dataset.theme = choice;
	for (const listener of listeners) listener();
}

/** Pins or releases the theme and remembers it; storage can be blocked, and then it lasts for the visit. */
function setThemeChoice(choice: ThemeChoice) {
	applyChoice(choice);
	try {
		if (choice === "system") localStorage.removeItem(STORAGE_KEY);
		else localStorage.setItem(STORAGE_KEY, choice);
	} catch {
		// Private windows can refuse storage; the theme still applies to this page.
	}
}

/** The server cannot know the visitor's choice, so it renders "system" and the client corrects it. */
function readServerChoice(): ThemeChoice {
	return "system";
}

export const themeChoiceStore = {
	subscribe,
	readChoice,
	readServerChoice,
	setThemeChoice,
};
