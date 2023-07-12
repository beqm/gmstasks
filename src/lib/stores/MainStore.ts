import { writable } from 'svelte/store';
import type { DStore, Character, DashItem } from '$lib/types/types';

const MainStore = writable<DStore>({
	active: null,
	characters: new Map<string, Character>(),
	dashboard: new Map<string, DashItem>()
});
export default MainStore;
