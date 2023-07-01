import type { Writable } from 'svelte/store';
import type { Character } from '$lib/types/types';

export function StorageToStore(store: Writable<Character | Character[] | null>, key: string, initial: string): void {
	let localStorageValue: Character | Character[] = JSON.parse(localStorage.getItem(key) || initial);
	store.set(localStorageValue);
}

export function resetWBossTracks(localChars: Character[], activeChar: Character | null) {
	localChars.forEach((char) => {
		char.track.weeklyBosses.forEach((boss) => {
			boss.complete = false;
		});
	});

	if (activeChar !== null) {
		activeChar.track.weeklyBosses.forEach((boss) => {
			boss.complete = false;
		});
	}
}

export function resetWEventTracks(localChars: Character[], activeChar: Character | null) {
	localChars.forEach((char) => {
		char.track.weeklyEvents.forEach((event) => {
			event.complete = false;
		});
	});

	if (activeChar !== null) {
		activeChar.track.weeklyEvents.forEach((event) => {
			event.complete = false;
		});
	}
}

export function resetDailyTracks(localChars: Character[], activeChar: Character | null) {
	localChars.forEach((char) => {
		char.track.dailyEvents.forEach((event) => {
			event.complete = false;
		});
		char.track.dailyBosses.forEach((boss) => {
			boss.complete = false;
		});
	});

	if (activeChar !== null) {
		activeChar.track.dailyEvents.forEach((event) => {
			event.complete = false;
		});
		activeChar.track.dailyBosses.forEach((event) => {
			event.complete = false;
		});
	}
}

export function formatMillisecond(ms: number) {
	const SECOND = 1000;
	const MINUTE = SECOND * 60;
	const HOUR = MINUTE * 60;
	const DAY = HOUR * 24;

	let formattedTime = '';
	let days = Math.floor(ms / DAY);
	let hours = Math.floor((ms % DAY) / HOUR);
	let minutes = Math.floor((ms % HOUR) / MINUTE);
	let seconds = Math.floor((ms % MINUTE) / SECOND);
	if (days < 1) {
		formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
			.toString()
			.padStart(2, '0')}`;
	} else {
		formattedTime = `${days} days`;
	}

	return formattedTime;
}
