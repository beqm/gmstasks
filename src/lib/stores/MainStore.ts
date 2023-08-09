import { writable } from 'svelte/store';

const MainStore = writable<DStore>({
	active: null,
	characters: new Map<string, Character>(),
	dashboard: new Map<string, DashItem>()
});
export default MainStore;
