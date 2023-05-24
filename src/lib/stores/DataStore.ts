import { writable } from 'svelte/store'
import type { Character } from '$lib/types/types';

const DataStore = writable<Character[]>([])
export default DataStore;