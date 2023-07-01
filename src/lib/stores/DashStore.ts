import { writable } from 'svelte/store';
import type { DashItem } from '$lib/types/types';

const DashStore = writable<DashItem[]>([]);
export default DashStore;
