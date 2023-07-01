export type MSymbol = {
	name: string;
	level: number;
	img_url: string;
	reqLevel: number;
	exp: number;
	gain: number;
	active: boolean;
};

export type MBoss = {
	name: string;
	img_url: string;
	difficulty: string;
	active: boolean;
	complete: boolean;
	mesos: number;
};

export type MEvent = {
	name: string;
	img_url: string;
	complete: boolean;
	difficulty?: string;
	active: boolean;
	amount: number;
	unique?: boolean;
};

export type MEvents = {
	arcaneSymbols: MSymbol[];
	sacredSymbols: MSymbol[];
	dailyEvents: MEvent[];
	weeklyEvents: MEvent[];
	dailyBosses: MBoss[];
	weeklyBosses: MBoss[];
};

export type Character = {
	id: string;
	img: string;
	name: string;
	job: string;
	level: number;
	track: MEvents;
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
};
