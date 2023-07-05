<script lang="ts">
	import { fly } from 'svelte/transition';
	import ProgressBar from '$lib/components/Dashboard/ProgressBar.svelte';
	import { StorageToStore } from '$lib/utils';
	import DashStore from '$lib/stores/DashStore';
	import DataStore from '$lib/stores/DataStore';
	import ActiveStore from '$lib/stores/ActiveStore';
	import { onMount } from 'svelte/internal';
	import type { DashItem } from '$lib/types/types';

	const progressControl = (array: DashItem[], type: string, period: string) => {
		let counter: number = 0;
		let totalCounter: number = 0;
		for (let item of array) {
			if (item.period == period && item.trackType == type) {
				totalCounter += 1;
				if (item.status) {
					counter += 1;
				}
			}
		}
		let result = (counter / totalCounter) * 100;
		if (result) {
			return Math.floor(result);
		} else {
			return 0;
		}
	};

	$: dailyBossesControl = progressControl($DashStore, 'Boss', 'Daily');
	$: weeklyBossesControl = progressControl($DashStore, 'Boss', 'Weekly');
	$: dailyEventControl = progressControl($DashStore, 'Event', 'Daily');
	$: weeklyEventControl = progressControl($DashStore, 'Event', 'Weekly');

	const handleComplete = (currTrack: DashItem) => {
		currTrack.status = true;

		$DataStore.map((char) => {
			if ($ActiveStore) {
				if (char.id === currTrack.charId) {
					char.track.dailyBosses.forEach((track) => {
						if (track.name == currTrack.trackName && track.difficulty == currTrack.trackInfo) {
							track.complete = true;
						}
					});

					char.track.weeklyBosses.forEach((track) => {
						if (track.name == currTrack.trackName && track.difficulty == currTrack.trackInfo) {
							track.complete = true;
						}
					});

					char.track.dailyEvents.forEach((track) => {
						if (track.name == currTrack.trackName) {
							track.complete = true;
						}
					});

					char.track.weeklyEvents.forEach((track) => {
						if (track.name == currTrack.trackName) {
							track.complete = true;
						}
					});

					if (char.id == $ActiveStore.id) {
						$ActiveStore = char;
					}

					$ActiveStore = $ActiveStore;
					$DataStore = $DataStore;
					$DashStore = $DashStore;

					localStorage.setItem('active_char', JSON.stringify($ActiveStore));
					localStorage.setItem('local_chars', JSON.stringify($DataStore));
					localStorage.setItem('dashboard_items', JSON.stringify($DashStore));
				}
			}
		});
	};

	onMount(async () => {
		StorageToStore(DashStore, 'dashboard_items', '[]');
		dailyBossesControl = progressControl($DashStore, 'Boss', 'Daily');
		weeklyBossesControl = progressControl($DashStore, 'Boss', 'Weekly');
		dailyEventControl = progressControl($DashStore, 'Event', 'Daily');
		weeklyEventControl = progressControl($DashStore, 'Event', 'Weekly');
	});
</script>

<div class="flex w-full justify-center h-[850px]">
	<div
		in:fly={{ x: -200, duration: 250 }}
		class="flex flex-col items-center w-9/12 rounded-lg mt-10 drop-shadow-lg bg-theme-base"
	>
		<div class="w-full text-center font-bold text-3xl mt-4">Dashboard</div>
		<div class="justify-evenly w-[90%] mt-10 flex">
			<div class="w-[40%] bg-theme-soft text-center rounded-lg">
				<div class="text-2xl font-bold">Bosses</div>
				<div class="flex flex-col items-center p-4">
					<ProgressBar label="Dailies" control={dailyBossesControl} />
					<ProgressBar label="Weeklies" control={weeklyBossesControl} />
				</div>
			</div>
			<div class="w-[40%] bg-theme-soft text-center rounded-lg">
				<div class="text-2xl font-bold">Events</div>
				<div class="flex flex-col items-center p-4">
					<ProgressBar label="Dailies" control={dailyEventControl} />
					<ProgressBar label="Weeklies" control={weeklyEventControl} />
				</div>
			</div>
		</div>
		<div class="items-center w-[90%] mt-10 flex flex-col bg-theme-soft rounded-lg h-[400px]">
			<div class="text-2xl font-bold">Todo</div>
			<div class="flex flex-col w-[90%] bg-theme-strong m-4 max-h-[540px] overflow-y-auto">
				{#if !$DashStore}
					<div class="text-center w-ful text-lg font-bold p-5">No Data Available</div>
				{/if}
				{#each $DashStore as dashItem}
					{#if !dashItem.status}
						<div class="flex p-4 justify-evenly w-full border-b border-theme-base">
							<div class="w-1/6 flex items-center justify-center">
								<img src={dashItem.charImgUrl} alt="char_img" class="w-10" />
							</div>
							<div class="w-1/6 flex justify-center items-center max-w-[5.4rem] overflow-x-clip">
								{dashItem.charName}
							</div>
							<div class="w-1/6 flex items-center justify-center">
								<img src={dashItem.trackImgUrl} alt="track_img" class="w-10" />
							</div>

							<div class="w-1/6 flex justify-center items-center max-w-[8rem] overflow-x-clip">
								{#if dashItem.trackInfo}
									{dashItem.trackInfo.replace('_', ' ')}
								{/if}
								{dashItem.trackName.replace('_', ' ')}
							</div>
							<div class="w-1/6 flex justify-center items-center max-w-[5.4rem] overflow-x-clip">
								{dashItem.period}
							</div>

							<div class="w-1/6 flex justify-center items-center">Incomplete</div>
							<button class="flex justify-center items-center" on:click={() => handleComplete(dashItem)}>
								<svg
									class="text-theme-strongdecorated hover:text-theme-decorated"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									height="1.5em"
									viewBox="0 0 448 512"
									><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
										d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
									/></svg
								>
							</button>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>
