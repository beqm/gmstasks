import data from '$lib/utils/default.json';
import type { Writable } from 'svelte/store';

export function initCharacter(): Character {
	let character: Character = {
		id: '',
		img: '',
		name: '',
		job: '',
		level: 1,
		isTracked: false,

		track: {
			arcanes: new Map(Object.entries(JSON.parse(JSON.stringify(data.arcanes)))),
			sacreds: new Map(Object.entries(JSON.parse(JSON.stringify(data.sacreds)))),
			dailyEvents: new Map(Object.entries(JSON.parse(JSON.stringify(data.dailyEvents)))),
			weeklyEvents: new Map(Object.entries(JSON.parse(JSON.stringify(data.weeklyEvents)))),
			dailyBosses: new Map(Object.entries(JSON.parse(JSON.stringify(data.dailyBosses)))),
			weeklyBosses: new Map(Object.entries(JSON.parse(JSON.stringify(data.weeklyBosses))))
		}
	};

	return character;
}

function createDashboardBoss(char: Character, boss: MBoss, period: 'Daily' | 'Weekly'): DashItem {
	return {
		charId: char.id,
		charImgUrl: char.img,
		charName: char.name,
		trackImgUrl: boss.img_url,
		trackInfo: boss.difficulty,
		trackName: boss.name,
		status: boss.complete,
		trackType: 'Boss',
		period
	};
}

function createDashboardEvent(char: Character, event: MEvent, period: 'Daily' | 'Weekly'): DashItem {
	let item = {
		charId: char.id,
		charImgUrl: char.img,
		charName: char.name,
		trackImgUrl: event.img_url,
		trackName: event.name,
		status: event.complete,
		trackType: 'Event',
		period,
		symbol: ''
	};

	if (event.symbol) {
		item.symbol = event.symbol;
	}
	return item;
}

export function saveMapToLocalStorage(data: Map<string, Character | DashItem>, localKey: string): void {
	localStorage.setItem(
		localKey,
		JSON.stringify(Object.fromEntries(data), (key, value) => {
			if (value instanceof Map) {
				return Object.fromEntries(value);
			}
			return value;
		})
	);
}

export function tasksMapToObj(char: Character): Character {
	let duplicate = structuredClone(char);
	duplicate.track = JSON.parse(
		JSON.stringify(duplicate.track, (key, value) => {
			if (value instanceof Map) {
				return Object.fromEntries(value);
			}
			return value;
		})
	);
	return duplicate;
}

export function tasksObjToMap(char: Character): Character {
	let duplicate = structuredClone(char);
	duplicate.track.arcanes = new Map(Object.entries(duplicate.track.arcanes));
	duplicate.track.sacreds = new Map(Object.entries(duplicate.track.sacreds));
	duplicate.track.dailyBosses = new Map(Object.entries(duplicate.track.dailyBosses));
	duplicate.track.weeklyBosses = new Map(Object.entries(duplicate.track.weeklyBosses));
	duplicate.track.dailyEvents = new Map(Object.entries(duplicate.track.dailyEvents));
	duplicate.track.weeklyEvents = new Map(Object.entries(duplicate.track.weeklyEvents));
	return duplicate;
}

export function localStoragetoStore(store: Writable<DStore>): void {
	let activeData: Character | null = JSON.parse(localStorage.getItem('active') || 'null');
	if (activeData) {
		activeData.track.arcanes = new Map(Object.entries(activeData.track.arcanes));
		activeData.track.sacreds = new Map(Object.entries(activeData.track.sacreds));
		activeData.track.dailyBosses = new Map(Object.entries(activeData.track.dailyBosses));
		activeData.track.weeklyBosses = new Map(Object.entries(activeData.track.weeklyBosses));
		activeData.track.dailyEvents = new Map(Object.entries(activeData.track.dailyEvents));
		activeData.track.weeklyEvents = new Map(Object.entries(activeData.track.weeklyEvents));
	}

	let localStorageCharData = localStorage.getItem('characters') || '{}';
	let charData = new Map<string, Character>(Object.entries(JSON.parse(localStorageCharData)));
	charData.forEach((value: Character) => {
		value.track.arcanes = new Map(Object.entries(value.track.arcanes));
		value.track.sacreds = new Map(Object.entries(value.track.sacreds));
		value.track.dailyBosses = new Map(Object.entries(value.track.dailyBosses));
		value.track.weeklyBosses = new Map(Object.entries(value.track.weeklyBosses));
		value.track.dailyEvents = new Map(Object.entries(value.track.dailyEvents));
		value.track.weeklyEvents = new Map(Object.entries(value.track.weeklyEvents));
	});

	let localStorageDashData = localStorage.getItem('dashboard') || '{}';
	let dashData = new Map<string, DashItem>(Object.entries(JSON.parse(localStorageDashData)));

	store.update((data) => {
		data.active = activeData;
		data.characters = charData;
		data.dashboard = dashData;
		return data;
	});
}

export function createDashBoardMap(char: Character) {
	let dashMap = new Map<string, DashItem>();
	char.track.dailyBosses.forEach((boss: MBoss) => {
		if (boss.active) {
			let item = createDashboardBoss(char, boss, 'Daily');
			dashMap.set(`${item.charId}|${item.trackInfo}${item.trackName}`, item);
		}
	});

	char.track.weeklyBosses.forEach((boss: MBoss) => {
		if (boss.active) {
			let item = createDashboardBoss(char, boss, 'Weekly');
			dashMap.set(`${item.charId}|${item.trackInfo}${item.trackName}`, item);
		}
	});
	char.track.dailyEvents.forEach((event: MEvent) => {
		if (event.active) {
			let item = createDashboardEvent(char, event, 'Daily');
			dashMap.set(`${item.charId}|${item.trackName}`, item);
		}
	});

	char.track.weeklyEvents.forEach((event: MEvent) => {
		if (event.active) {
			let item = createDashboardEvent(char, event, 'Weekly');
			dashMap.set(`${item.charId}|${item.trackName}`, item);
		}
	});
	return dashMap;
}
