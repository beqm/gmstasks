export type MSymbol = {
	name: string;
	img_url: string;
	level: number;
	exp: number;
	gain: number;
	reqLevel: number;
	active: boolean;
	type: string;
};

export type MSymbols = Map<string, MSymbol>;
export type MEvents = Map<string, MEvent>;
export type MBosses = Map<string, MBoss>;

export type DStore = {
	active: Character | null;
	characters: Map<string, Character>;
	dashboard: Map<string, DashItem>;
};

export type MBoss = {
	name: string;
	img_url: string;
	difficulty: string;
	active: boolean;
	complete: boolean;
	mesos: number;
	type: string;
};

export type MEvent = {
	name: string;
	img_url: string;
	complete: boolean;
	active: boolean;
	amount: number;
	unique?: boolean;
	type: string;
	symbol?: string;
};

export type MTasks = {
	arcanes: Map<string, MSymbol>;
	sacreds: Map<string, MSymbol>;
	dailyEvents: Map<string, MEvent>;
	weeklyEvents: Map<string, MEvent>;
	dailyBosses: Map<string, MBoss>;
	weeklyBosses: Map<string, MBoss>;
};

export type Character = {
	id: string;
	img: string;
	name: string;
	job: string;
	level: number;
	track: MTasks;
	isTracked: boolean;
};

export type DashItem = {
	charId: string;
	charImgUrl: string;
	charName: string;
	trackImgUrl: string;
	trackInfo?: string;
	trackType: string;
	trackName: string;
	status: boolean;
	period: string;
	symbol?: string;
};
