import type { MEvent, MSymbol, MBoss } from '$lib/types/types';

export const ARCSYMBOLS: MSymbol[] = [
	{ name: 'VanishingJourney', level: 1, reqLevel: 200, exp: 1, gain: 8, active: false },
	{ name: 'ChuChu', level: 1, exp: 1, reqLevel: 210, gain: 8, active: false },
	{ name: 'Lachelein', level: 1, reqLevel: 220, exp: 1, gain: 8, active: false },
	{ name: 'Arcana', level: 1, reqLevel: 225, exp: 1, gain: 8, active: false },
	{ name: 'Morass', level: 1, reqLevel: 230, exp: 1, gain: 8, active: false },
	{ name: 'Esfera', level: 1, reqLevel: 235, exp: 1, gain: 8, active: false }
];

export const SACSYMBOLS: MSymbol[] = [
	{ name: 'Cernium', level: 1, reqLevel: 260, exp: 1, gain: 8, active: false },
	{ name: 'Arcus', level: 1, reqLevel: 270, exp: 1, gain: 8, active: false },
	{ name: 'Odium', level: 1, reqLevel: 275, exp: 1, gain: 8, active: false }
];

// Wrong prices, need to change to reboot price
export const DAILYBOSSES: MBoss[] = [
	{ name: 'Gollux', difficulty: '', mesos: 0, complete: false, active: false },
	{ name: 'Hanmaru', difficulty: 'Hard', mesos: 2_882_000, complete: false, active: false },
	{ name: 'Papulatus', difficulty: 'Normal', mesos: 2_664_500, complete: false, active: false },
	{ name: 'Magnus', difficulty: 'Normal', mesos: 2_592_500, complete: false, active: false },
	{ name: 'Arkarium', difficulty: 'Normal', mesos: 2_520_500, complete: false, active: false },
	{ name: 'VonLeon', difficulty: 'Hard', mesos: 2_450_000, complete: false, active: false },
	{ name: 'VonLeon', difficulty: 'Normal', mesos: 1_458_000, complete: false, active: false },
	{ name: 'Pink_Bean', difficulty: 'Normal', mesos: 1_404_500, complete: false, active: false },
	{ name: 'Horntail', difficulty: 'Chaos', mesos: 1_352_500, complete: false, active: false },
	{ name: 'OMNI-CLN', difficulty: 'Normal', mesos: 1_250_000, complete: false, active: false },
	{ name: 'Arkarium', difficulty: 'Easy', mesos: 1_152_000, complete: false, active: false },
	{ name: 'VonLeon', difficulty: 'Easy', mesos: 1_058_500, complete: false, active: false },
	{ name: 'Horntail', difficulty: 'Normal', mesos: 1_012_500, complete: false, active: false },
	{ name: 'VonBon', difficulty: 'Normal', mesos: 968_000, complete: false, active: false },
	{ name: 'Vellum', difficulty: 'Normal', mesos: 968_000, complete: false, active: false },
	{ name: 'Pierre', difficulty: 'Normal', mesos: 968_000, complete: false, active: false },
	{ name: 'Crimson_Queen', difficulty: 'Normal', mesos: 968_000, complete: false, active: false },
	{ name: 'Horntail', difficulty: 'Easy', mesos: 882_000, complete: false, active: false },
	{ name: 'Hilla', difficulty: 'Normal', mesos: 800_000, complete: false, active: false },
	{ name: 'Magnus', difficulty: 'Easy', mesos: 722_000, complete: false, active: false },
	{ name: 'Papulatus', difficulty: 'Easy', mesos: 684_500, complete: false, active: false },
	{ name: 'Hanmaru', difficulty: 'Normal', mesos: 648_000, complete: false, active: false },
	{ name: 'Zakum', difficulty: 'Normal', mesos: 612_500, complete: false, active: false },
	{ name: 'Zakum', difficulty: 'Easy', mesos: 200_000, complete: false, active: false }
];

export const WEEKLYBOSSES: MBoss[] = [
	{ name: 'Verus_Hilla', difficulty: 'Hard', mesos: 26_450_000, complete: false, active: false },
	{ name: 'Verus_Hilla', difficulty: 'Normal', mesos: 26_450_000, complete: false, active: false },
	{ name: 'Darknell', difficulty: 'Chaos', mesos: 26_450_000, complete: false, active: false },
	{ name: 'Gloom', difficulty: 'Chaos', mesos: 26_450_000, complete: false, active: false },
	{ name: 'Will', difficulty: 'Hard', mesos: 26_450_000, complete: false, active: false },
	{ name: 'Lucid', difficulty: 'Hard', mesos: 26_450_000, complete: false, active: false },
	{ name: 'Damien', difficulty: 'Hard', mesos: 26_450_000, complete: false, active: false },
	{ name: 'Lotus', difficulty: 'Hard', mesos: 26_450_000, complete: false, active: false },
	{ name: 'Darknell', difficulty: 'Normal', mesos: 26_450_000, complete: false, active: false },
	{ name: 'Gloom', difficulty: 'Normal', mesos: 26_450_000, complete: false, active: false },
	{ name: 'Will', difficulty: 'Normal', mesos: 26_450_000, complete: false, active: false },
	{ name: 'Lucid', difficulty: 'Normal', mesos: 26_450_000, complete: false, active: false },
	{ name: 'Will', difficulty: 'Easy', mesos: 26_450_000, complete: false, active: false },
	{ name: 'Lucid', difficulty: 'Easy', mesos: 26_450_000, complete: false, active: false },
	{ name: 'Slime', difficulty: 'Normal', mesos: 26_450_000, complete: false, active: false },
	{ name: 'Damien', difficulty: 'Normal', mesos: 26_450_000, complete: false, active: false },
	{ name: 'Lotus', difficulty: 'Normal', mesos: 26_450_000, complete: false, active: false },
	{ name: 'Akechi', difficulty: 'Normal', mesos: 26_450_000, complete: false, active: false },

	{ name: 'Papulatus', difficulty: 'Chaos', mesos: 26_450_000, complete: false, active: false },
	{ name: 'Vellum', difficulty: 'Normal', mesos: 21_012_500, complete: false, active: false },
	{ name: 'Magnus', difficulty: 'Hard', mesos: 19_012_500, complete: false, active: false },
	{ name: 'Pierre', difficulty: 'Normal', mesos: 16_200_000, complete: false, active: false },
	{ name: 'Crimson_Queen', difficulty: 'Normal', mesos: 16_200_000, complete: false, active: false },
	{ name: 'VonBon', difficulty: 'Normal', mesos: 16_200_000, complete: false, active: false },
	{ name: 'Princess No', difficulty: 'Normal', mesos: 15_312_000, complete: false, active: false },
	{ name: 'Zakum', difficulty: 'Chaos', mesos: 9_112_500, complete: false, active: false },
	{ name: 'Cygnus', difficulty: 'Normal', mesos: 9_112_500, complete: false, active: false },
	{ name: 'Pink_Bean', difficulty: 'Chaos', mesos: 1_404_500, complete: false, active: false },
	{ name: 'Hilla', difficulty: 'Hard', mesos: 800_000, complete: false, active: false },
	{ name: 'Cygnus', difficulty: 'Easy', mesos: 9_112_500, complete: false, active: false }
];

export const DAILYEVENTS: MEvent[] = [
	{ name: 'VanishingJourney_Daily', complete: false, active: false, amount: 1 },
	{ name: 'ChuChu_Daily', complete: false, active: false, amount: 1 },
	{ name: 'Lachelein_Daily', complete: false, active: false, amount: 1 },
	{ name: 'Arcana_Daily', complete: false, active: false, amount: 1 },
	{ name: 'Morass_Daily', complete: false, active: false, amount: 1 },
	{ name: 'Esfera_Daily', complete: false, active: false, amount: 1 },
	{ name: 'Cernium_Daily', complete: false, active: false, amount: 1 },
	{ name: 'Arcus_Daily', complete: false, active: false, amount: 1 },
	{ name: 'Odium_Daily', complete: false, active: false, amount: 1 },
	{ name: 'Yu_Garden', complete: false, active: false, amount: 1 },
	{ name: 'FairyBro_Daily', complete: false, active: false, amount: 1, unique: true },
	{ name: 'Tower_Oz', complete: false, active: false, amount: 5, unique: true },
	{ name: 'Monster_Park', complete: false, active: false, amount: 7, unique: true },
	{ name: 'Ursus', complete: false, active: false, amount: 3, unique: true },
	{ name: 'MNN', complete: false, active: false, amount: 2, unique: true }
];

export const WEEKLYEVENTS: MEvent[] = [
	{ name: 'VanishingJourney_Quest', complete: false, active: false, amount: 1 },
	{ name: 'ChuChu_Quest', complete: false, active: false, amount: 1 },
	{ name: 'Lachelein_Quest', complete: false, active: false, amount: 1 },
	{ name: 'Arcana_Quest', complete: false, active: false, amount: 1 },
	{ name: 'Morass_Quest', complete: false, active: false, amount: 1 },
	{ name: 'Esfera_Quest', complete: false, active: false, amount: 1 }
];
