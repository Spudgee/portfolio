"use client";

import { useSyncExternalStore } from "react";
import {
	THEME_CHOICES,
	type ThemeChoice,
	themeChoiceStore,
} from "@/lib/theme-choice";

const LABELS: Record<ThemeChoice, string> = {
	system: "Auto",
	light: "Light",
	dark: "Dark",
};

/**
 * One icon button that steps Auto → Light → Dark; its label names the current theme and the next.
 * `isRound` sets it in a 56px soft grey circle, as at the foot of the phone menu.
 */
export function ThemeSwitch({ isRound = false }: { isRound?: boolean }) {
	const choice = useSyncExternalStore(
		themeChoiceStore.subscribe,
		themeChoiceStore.readChoice,
		themeChoiceStore.readServerChoice,
	);
	const next =
		THEME_CHOICES[(THEME_CHOICES.indexOf(choice) + 1) % THEME_CHOICES.length];

	return (
		<button
			type="button"
			onClick={() => themeChoiceStore.setThemeChoice(next)}
			aria-label={`Theme: ${LABELS[choice]}. Switch to ${LABELS[next]}`}
			title={`Theme: ${LABELS[choice]}`}
			className={`grid cursor-pointer place-items-center transition-colors duration-150 ease-out focus-visible:outline-hidden motion-reduce:transition-none ${isRound ? "size-14 rounded-full bg-pill-soft text-ink hover:bg-pill focus-visible:bg-pill" : "size-11 text-muted hover:text-ink focus-visible:text-ink"}`}
		>
			<svg
				viewBox="0 0 24 24"
				aria-hidden="true"
				className={`fill-current ${isRound ? "size-5" : "size-[1.125rem]"}`}
			>
				{choice === "system" && (
					<>
						<circle
							cx="12"
							cy="12"
							r="8.25"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
						/>
						<path d="M12 3.75a8.25 8.25 0 0 1 0 16.5z" />
					</>
				)}
				{choice === "light" && (
					<>
						<circle cx="12" cy="12" r="4" />
						<path
							d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
						/>
					</>
				)}
				{choice === "dark" && (
					<path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z" />
				)}
			</svg>
		</button>
	);
}
