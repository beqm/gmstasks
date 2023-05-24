import type { Writable } from 'svelte/store'
import type { Character } from '$lib/types/types';

export function StorageToStore(store: Writable<Character | Character[]>, key: string, initial: string): void {
    let localStorageValue: Character | Character[] = JSON.parse(localStorage.getItem(key) || initial);
    store.set(localStorageValue)
}