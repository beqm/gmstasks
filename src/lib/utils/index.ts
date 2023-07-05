import type { Writable } from 'svelte/store';
import type { Character, DashItem, MBoss, MEvent, MSymbol } from '$lib/types/types';

type StoreObjects = Character | Character[] | DashItem[];

export const ExpReqArcane = [12, 15, 20, 27, 36, 47, 60, 75, 92, 111, 132, 155, 180, 207, 236, 267, 300, 335, 372];
export const ExpReqSacred = [29, 76, 141, 224, 325, 444, 581, 736, 909, 1100];
export const ArcaneDaily = [
	'VanishingJourney_Daily',
	'ChuChu_Daily',
	'Lachelein_Daily',
	'Arcana_Daily',
	'Morass_Daily',
	'Esfera_Daily'
];
export const ArcaneWeekly = [
	'Erda_Spectrum',
	'Hungry_Muto',
	'Dream_Defender',
	'Spirit_Savior',
	'Ranheim_Defense',
	'Esfera_Guardian'
];
export const SacredDaily = ['Cernium_Daily', 'Arcus_Daily', 'Odium_Daily'];

export function StorageToStore(store: Writable<StoreObjects | null>, key: string, initial: string): void {
	let localStorageValue: StoreObjects = JSON.parse(localStorage.getItem(key) || initial);
	store.set(localStorageValue);
}

export function calculateSymbol(symbol: MSymbol, gain: number): MSymbol {
	if (symbol.type == 'arcane') {
		if (symbol.level == 20) {
			return symbol;
		} else {
			let currExpReq = ExpReqArcane[symbol.level - 1];
			// let maxExpReq = ExpReqArcane.slice(symbol.level - 1);
			// let sumExpReq = maxExpReq.reduce((acc, curr) => acc + curr, 0);

			if (symbol.exp + gain > currExpReq) {
				gain -= currExpReq - symbol.exp;
				symbol.exp = 0;
				symbol.level += 1;
				calculateSymbol(symbol, gain);
			} else if (symbol.exp + gain == currExpReq) {
				symbol.level += 1;
				symbol.exp = 0;
			} else {
				symbol.exp += gain;
			}
		}
	} else if (symbol.type == 'sacred') {
		if (symbol.level == 11) {
			return symbol;
		} else {
			let currExpReq = ExpReqSacred[symbol.level - 1];
			// let maxExpReq = ExpReqSacred.slice(symbol.level - 1);
			// let sumExpReq = maxExpReq.reduce((acc, curr) => acc + curr, 0);

			if (symbol.exp + gain > currExpReq) {
				gain -= currExpReq - symbol.exp;
				symbol.exp = 0;
				symbol.level += 1;
				calculateSymbol(symbol, gain);
			} else if (symbol.exp + gain == currExpReq) {
				symbol.level += 1;
				symbol.exp = 0;
			} else {
				symbol.exp += gain;
			}
		}
	}
	return symbol;
}

export function createDashBoardArray(char: Character) {
	let dashObjs: DashItem[] = [];
	char.track.dailyBosses.forEach((boss: MBoss) => {
		if (boss.active) {
			let dashObj: DashItem = {
				charId: char.id,
				charImgUrl: char.img,
				charName: char.name,
				trackImgUrl: boss.img_url,
				trackInfo: boss.difficulty,
				trackName: boss.name,
				status: boss.complete,
				trackType: 'Boss',
				period: 'Daily'
			};
			dashObjs.push(dashObj);
		}
	});

	char.track.weeklyBosses.forEach((boss: MBoss) => {
		if (boss.active) {
			let dashObj: DashItem = {
				charId: char.id,
				charImgUrl: char.img,
				charName: char.name,
				trackImgUrl: boss.img_url,
				trackInfo: boss.difficulty,
				trackName: boss.name,
				status: boss.complete,
				trackType: 'Boss',
				period: 'Weekly'
			};
			dashObjs.push(dashObj);
		}
	});
	char.track.dailyEvents.forEach((event: MEvent) => {
		if (event.active) {
			let dashObj: DashItem = {
				charId: char.id,
				charImgUrl: char.img,
				charName: char.name,
				trackImgUrl: event.img_url,
				trackName: event.name,
				status: event.complete,
				trackType: 'Event',
				period: 'Daily'
			};
			dashObjs.push(dashObj);
		}
	});

	char.track.weeklyEvents.forEach((event: MEvent) => {
		if (event.active) {
			let dashObj: DashItem = {
				charId: char.id,
				charImgUrl: char.img,
				charName: char.name,
				trackImgUrl: event.img_url,
				trackName: event.name,
				status: event.complete,
				trackType: 'Event',
				period: 'Weekly'
			};
			dashObjs.push(dashObj);
		}
	});
	return dashObjs;
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

export function resetDashboardTracks(dashBoardItems: DashItem[], period: 'Weekly' | 'Daily') {
	dashBoardItems.forEach((item) => {
		if (period == item.period) {
			item.status = false;
		}
	});
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
