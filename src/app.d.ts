// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

type MSymbol = {
	name: string;
	img_url: string;
	level: number;
	exp: number;
	gain: number;
	reqLevel: number;
	active: boolean;
	type: string;
};

type MSymbols = Map<string, MSymbol>;
type MEvents = Map<string, MEvent>;
type MBosses = Map<string, MBoss>;

type DStore = {
	active: Character | null;
	characters: Map<string, Character>;
	dashboard: Map<string, DashItem>;
};

type MBoss = {
	name: string;
	img_url: string;
	difficulty: string;
	active: boolean;
	complete: boolean;
	mesos: number;
	type: string;
};

type MEvent = {
	name: string;
	img_url: string;
	complete: boolean;
	active: boolean;
	amount: number;
	unique?: boolean;
	type: string;
	symbol?: string;
};

type MTasks = {
	arcanes: Map<string, MSymbol>;
	sacreds: Map<string, MSymbol>;
	dailyEvents: Map<string, MEvent>;
	weeklyEvents: Map<string, MEvent>;
	dailyBosses: Map<string, MBoss>;
	weeklyBosses: Map<string, MBoss>;
};

type Character = {
	id: string;
	img: string;
	name: string;
	job: string;
	level: number;
	track: MTasks;
	isTracked: boolean;
};

type DashItem = {
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

declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

declare type Item = import('svelte-dnd-action').Item;
declare type DndEvent<ItemType = Item> = import('svelte-dnd-action').DndEvent<ItemType>;
declare namespace svelte.JSX {
	interface HTMLAttributes<T> {
		onconsider?: (event: any & { target: any }) => void;
		onfinalize?: (event: any & { target: any }) => void;
	}
}
