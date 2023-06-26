export type MSymbol = {
	name: string;
	level: number;
	req_level: number;
	exp: number;
	gain: number;
	active: boolean;
};

export type MEvent = {
	name: string;
	complete: boolean;
	active: boolean;
	amount: number;
};

export type MEvents = {
	arcanes: MSymbol[];
	sacreds: MSymbol[];
	dailies: MEvent[];
	weeklies: MEvent[];
	genericEvents: MEvent[];
};

export type Character = {
	id: string;
	img: string;
	name: string;
	job: string;
	level: number;
	events: MEvents;
};
