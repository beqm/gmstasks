<script lang="ts">
	import { fly } from 'svelte/transition';
	import ProgressBar from '$lib/components/Dashboard/ProgressBar.svelte';
	import MainStore from '$lib/stores/MainStore';
	import { onMount } from 'svelte/internal';

	import { progressControl } from '$lib/utils/tasks';
	import { localStoragetoStore, saveMapToLocalStorage, tasksMapToObj } from '$lib/utils/storage';
	import { ArcaneWeekly, SacredDaily, ArcaneDaily, calculateSymbol } from '$lib/utils/validation';

	$: dailyBossesControl = progressControl($MainStore.dashboard, 'Boss', 'Daily');
	$: weeklyBossesControl = progressControl($MainStore.dashboard, 'Boss', 'Weekly');
	$: dailyEventControl = progressControl($MainStore.dashboard, 'Event', 'Daily');
	$: weeklyEventControl = progressControl($MainStore.dashboard, 'Event', 'Weekly');

	const handleComplete = (currTrack: DashItem) => {
		currTrack.status = true;
		let char = $MainStore.characters.get(currTrack.charId);
		if (char) {
			let item: MBoss | MEvent | undefined;
			if (currTrack.period == 'Daily' && currTrack.trackType == 'Boss') {
				item = char.track.dailyBosses.get(`${currTrack.trackInfo}${currTrack.trackName}`);
			} else if (currTrack.period == 'Weekly' && currTrack.trackType == 'Boss') {
				item = char.track.weeklyBosses.get(`${currTrack.trackInfo}${currTrack.trackName}`);
			} else if (currTrack.period == 'Daily' && currTrack.trackType == 'Event') {
				item = char.track.dailyEvents.get(`${currTrack.trackName}`);
			} else if (currTrack.period == 'Weekly' && currTrack.trackType == 'Event') {
				item = char.track.weeklyEvents.get(`${currTrack.trackName}`);
			}
			if (item) {
				item.complete = true;

				let symbol: MSymbol | undefined;
				if (ArcaneDaily.includes(currTrack.trackName)) {
					symbol = char.track.arcanes.get(currTrack.trackName.replace('_Daily', ''));
					if (symbol) {
						calculateSymbol(symbol, symbol.gain);
					}
				} else if (ArcaneWeekly.includes(currTrack.trackName)) {
					if (currTrack.symbol) {
						symbol = char.track.arcanes.get(currTrack.symbol);
						if (symbol) {
							calculateSymbol(symbol, 45);
						}
					}
				} else if (SacredDaily.includes(currTrack.trackName)) {
					symbol = char.track.sacreds.get(currTrack.trackName.replace('_Daily', ''));
					if (symbol) {
						calculateSymbol(symbol, symbol.gain);
					}
				}

				$MainStore.active = char;
				$MainStore.characters.set(char.id, char);
				let duplicate = tasksMapToObj($MainStore.active);
				localStorage.setItem('active', JSON.stringify(duplicate));

				saveMapToLocalStorage($MainStore.characters, 'characters');
				saveMapToLocalStorage($MainStore.dashboard, 'dashboard');
				$MainStore = $MainStore;
			}
		}
	};

	onMount(async () => {
		localStoragetoStore(MainStore);
		console.log($MainStore);
		dailyBossesControl = progressControl($MainStore.dashboard, 'Boss', 'Daily');
		weeklyBossesControl = progressControl($MainStore.dashboard, 'Boss', 'Weekly');
		dailyEventControl = progressControl($MainStore.dashboard, 'Event', 'Daily');
		weeklyEventControl = progressControl($MainStore.dashboard, 'Event', 'Weekly');
	});
</script>

<div class="flex w-full justify-center h-[850px]">
	<div
		in:fly={{ x: -200, duration: 250 }}
		class="flex flex-col items-center w-9/12 rounded-lg mt-10 drop-shadow-lg bg-theme-base"
	>
		<div class="w-full text-center font-bold text-3xl mt-4">Dashboard</div>
		<div class="justify-evenly w-[90%] mt-10 flex">
			<div class="w-[40%] text-center rounded-lg">
				<div class="text-2xl font-bold">Bosses</div>
				<div class="flex flex-col items-center p-4">
					<ProgressBar label="Dailies" control={dailyBossesControl} />
					<ProgressBar label="Weeklies" control={weeklyBossesControl} />
				</div>
			</div>
			<div class="w-[40%] text-center rounded-lg">
				<div class="text-2xl font-bold">Events</div>
				<div class="flex flex-col items-center p-4">
					<ProgressBar label="Dailies" control={dailyEventControl} />
					<ProgressBar label="Weeklies" control={weeklyEventControl} />
				</div>
			</div>
		</div>
		<div class="items-center w-[90%] mt-10 flex flex-col rounded-lg h-[400px]">
			<div class="text-2xl font-bold">Todo</div>
			<div class="flex flex-col w-[90%] bg-theme-soft m-4 max-h-[540px] overflow-y-auto">
				{#if $MainStore.dashboard.size == 0}
					<div class="text-center w-ful text-lg font-bold p-5">No Data Available</div>
				{:else}
					{#each [...$MainStore.dashboard] as [key, item]}
						{#if !item.status}
							<div class="flex p-4 justify-evenly w-full border-b border-theme-base">
								<div class="w-1/6 flex items-center justify-center">
									<img src={item.charImgUrl} alt="char_img" class="w-10" />
								</div>
								<div class="w-1/6 flex justify-center items-center max-w-[5.4rem] overflow-x-clip">
									{item.charName}
								</div>
								<div class="w-1/6 flex items-center justify-center">
									<img src={item.trackImgUrl} alt="track_img" class="w-10" />
								</div>

								<div class="w-1/6 flex justify-center items-center max-w-[8rem] overflow-x-clip">
									{#if item.trackInfo}
										{item.trackInfo.replace('_', ' ')}
									{/if}
									{item.trackName.replace('_', ' ')}
								</div>
								<div class="w-1/6 flex justify-center items-center max-w-[5.4rem] overflow-x-clip">
									{item.period}
								</div>

								<div class="w-1/6 flex justify-center items-center">Incomplete</div>
								<button class="flex justify-center items-center" on:click={() => handleComplete(item)}>
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
				{/if}
			</div>
		</div>
	</div>
</div>
