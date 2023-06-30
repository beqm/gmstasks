<script lang="ts">
	import ActiveStore from '$lib/stores/ActiveStore';
	import { onMount } from 'svelte';
	import { StorageToStore } from '../../lib/utils/StorageToStore';
	import { fly } from 'svelte/transition';
	import type { Character, MBoss } from '$lib/types/types';
	import BossTrack from '$lib/components/Track/BossTrack.svelte';
	import EventTrack from '$lib/components/Track/EventTrack.svelte';
	import BossNavbar from '$lib/components/Track/BossNavbar.svelte';

	let currentChar: Character;
	let currentPage = 'events';
	let currentBossSubPage = 'daily';
	let currentEventSubPage = 'daily';
	let todoDailyBosses: MBoss[];

	const changeBossSubPage = (e: CustomEvent<string>) => {
		currentBossSubPage = e.detail;
	};

	const changeEventSubPage = (e: CustomEvent<string>) => {
		currentEventSubPage = e.detail;
	};

	const changePage = (path: string) => {
		let trackEventsBtn = document.querySelector('#track-events-btn') as HTMLButtonElement;
		let trackBossesBtn = document.querySelector('#track-bosses-btn') as HTMLButtonElement;
		if (currentPage !== path) {
			currentPage = path;
			currentBossSubPage = 'daily';
			currentEventSubPage = 'daily';

			if (path == 'events') {
				trackEventsBtn.classList.add('bg-theme-decorated');
				trackEventsBtn.classList.remove('hover:bg-theme-softdecorated');

				trackBossesBtn.classList.remove('bg-theme-decorated');
				trackBossesBtn.classList.add('hover:bg-theme-softdecorated');
			} else {
				trackBossesBtn.classList.add('bg-theme-decorated');
				trackBossesBtn.classList.remove('hover:bg-theme-softdecorated');

				trackEventsBtn.classList.remove('bg-theme-decorated');
				trackEventsBtn.classList.add('hover:bg-theme-softdecorated');
			}
		}
	};
	onMount(() => {
		StorageToStore(ActiveStore, 'active_char', '[]');
		if ($ActiveStore) {
			currentChar = $ActiveStore;
			todoDailyBosses = $ActiveStore.track.dailyBosses;
			console.log(currentChar);
		}
	});
</script>

<main class="flex w-full justify-center h-[850px]">
	{#if $ActiveStore}
		<div in:fly={{ x: -200, duration: 250 }} class="flex w-9/12 rounded-lg mt-10 drop-shadow-lg bg-theme-base">
			<!-- Navbar -->
			<div class="w-[20%] border-r border-theme-base">
				<img src={$ActiveStore.img} alt="current active character" class="w-full" />
				<div class="max-h-[50px] overflow-hidden text-center font-bold text-2xl">
					{$ActiveStore.name}
				</div>

				<div class="flex flex-col w-full mt-6 text-center font-bold">
					<button
						on:click={() => changePage('events')}
						id="track-events-btn"
						class="border-b border-t border-theme-base p-4 bg-theme-decorated">Events</button
					>
					<button
						on:click={() => changePage('bosses')}
						id="track-bosses-btn"
						class="border-b border-t border-theme-base p-4 hover:bg-theme-softdecorated">Bosses</button
					>
				</div>
			</div>
			<!-- Right Side -->
			<div class="w-[80%]">
				{#if currentPage == 'events'}
					<div class="text-center font-bold text-3xl mt-4">Events</div>
					<BossNavbar on:pagechange={changeEventSubPage} />

					{#if currentEventSubPage == 'daily'}
						<EventTrack events={$ActiveStore.track.dailyEvents} />
					{:else if currentEventSubPage == 'weekly'}
						<EventTrack events={$ActiveStore.track.weeklyEvents} />
					{/if}
				{:else if currentPage == 'bosses'}
					<div class="text-center font-bold text-3xl mt-4">Bosses</div>
					<BossNavbar on:pagechange={changeBossSubPage} />
					{#if currentBossSubPage == 'daily'}
						<BossTrack bosses={$ActiveStore.track.dailyBosses} />
					{:else if currentBossSubPage == 'weekly'}
						<BossTrack bosses={$ActiveStore.track.weeklyBosses} />
					{/if}
				{/if}
			</div>
		</div>
	{/if}
</main>
