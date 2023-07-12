import type { Character, MSymbol } from '$lib/types/types';
import defaultImg from '$lib/assets/default_img.png';

export const ExpReqArcane = [12, 15, 20, 27, 36, 47, 60, 75, 92, 111, 132, 155, 180, 207, 236, 267, 300, 335, 372];
export const ExpReqSacred = [29, 76, 141, 224, 325, 444, 581, 736, 909, 1100];
export const ArcaneDaily = [
	'Vanishing_Daily',
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

export function validateImage(character: Character) {
	return character.img.endsWith('.jpg') || character.img.endsWith('.png') ? character.img : defaultImg;
}

export function validateSymbols(symbols: Map<string, MSymbol>, charLvl: number) {
	let maxLvl = 20;
	let expReq = ExpReqArcane;

	let vanishing = symbols.get('Vanishing');
	if (vanishing && charLvl >= 205) {
		vanishing.gain = 18;
	}

	let chuchu = symbols.get('ChuChu');
	if (chuchu && charLvl >= 215) {
		chuchu.gain = 16;
	}

	let cernium = symbols.get('Cernium');
	if (cernium && charLvl >= 265) {
		cernium.gain = 15;
	}

	for (const [key, symbol] of symbols) {
		if (symbol.type == 'sacred') {
			maxLvl = 11;
			expReq = ExpReqSacred;
		}

		symbol.active = charLvl >= symbol.reqLevel ? true : false;
		symbol.level = Math.min(Math.max(symbol.level, 1), maxLvl);
		symbol.exp = Math.min(Math.max(symbol.exp, 0), expReq[symbol.level - 1]);
	}
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
