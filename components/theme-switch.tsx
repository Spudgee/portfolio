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

/** Three plain words; the chosen one is filled like the current page in the nav. */
export function ThemeSwitch() {
	const choice = useSyncExternalStore(
		themeChoiceStore.subscribe,
		themeChoiceStore.readChoice,
		themeChoiceStore.readServerChoice,
	);

	return (
		<fieldset className="flex gap-4">
			<legend className="sr-only">Theme</legend>
			{THEME_CHOICES.map((option) => (
				<button
					key={option}
					type="button"
					aria-pressed={choice === option}
					onClick={() => themeChoiceStore.setThemeChoice(option)}
					className="group inline-flex min-h-11 cursor-pointer items-center focus-visible:outline-hidden"
				>
					<span className="-mx-1 px-1 transition-colors duration-150 ease-out group-hover:bg-ink group-hover:text-paper group-focus-visible:bg-ink group-focus-visible:text-paper motion-reduce:transition-none group-aria-pressed:bg-ink group-aria-pressed:text-paper">
						{LABELS[option]}
					</span>
				</button>
			))}
		</fieldset>
	);
}
