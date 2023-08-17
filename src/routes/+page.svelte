<script lang="ts">
	import { fly } from 'svelte/transition';
	import ProgressBar from '$lib/components/Dashboard/ProgressBar.svelte';
	import MainStore from '$lib/stores/MainStore';
	import { onMount } from 'svelte/internal';

	import { progressControl } from '$lib/utils/tasks';
	import { localStoragetoStore, mapToLocalStorage, tasksMapToObj } from '$lib/utils/storage';
	import { ArcaneWeekly, SacredDaily, ArcaneDaily, calculateSymbol } from '$lib/utils/validation';

	let searchQuery: string = '';

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

				mapToLocalStorage($MainStore.characters, 'characters');
				mapToLocalStorage($MainStore.dashboard, 'dashboard');
				$MainStore = $MainStore;
			}
		}
	};

	onMount(async () => {
		localStoragetoStore(MainStore);
		dailyBossesControl = progressControl($MainStore.dashboard, 'Boss', 'Daily');
		weeklyBossesControl = progressControl($MainStore.dashboard, 'Boss', 'Weekly');
		dailyEventControl = progressControl($MainStore.dashboard, 'Event', 'Daily');
		weeklyEventControl = progressControl($MainStore.dashboard, 'Event', 'Weekly');
	});
</script>

<div class="flex w-full justify-center lg:h-[80vh]">
	<div
		in:fly={{ x: -200, duration: 250 }}
		class="flex flex-col sm:flex-row items-center w-full lg:w-9/12 rounded-lg mt-10 drop-shadow-lg bg-primary-300"
	>
		<div class="w-full sm:w-[20%] h-full sm:border-r sm:border-primary-100">
			<div class="w-full text-center font-bold text-3xl mt-4">Dashboard</div>
			<div class="justify-evenly w-[90%] mt-10 flex flex-col">
				<div class="w-full text-center rounded-lg">
					<div class="text-2xl font-bold">Bosses</div>
					<div class="flex sm:flex-col items-center p-4">
						<ProgressBar label="Dailies" control={dailyBossesControl} />
						<ProgressBar label="Weeklies" control={weeklyBossesControl} />
					</div>
				</div>
				<div class="w-full text-center rounded-lg">
					<div class="text-2xl font-bold">Events</div>
					<div class="flex sm:flex-col items-center p-4">
						<ProgressBar label="Dailies" control={dailyEventControl} />
						<ProgressBar label="Weeklies" control={weeklyEventControl} />
					</div>
				</div>
			</div>
		</div>

		<div class="items-center w-full lg:w-[90%] flex flex-col rounded-lg p-2 h-full">
			<div class="text-2xl font-bold">Todo</div>
			<div class="flex flex-col w-full m-4">
				{#if $MainStore.dashboard.size == 0}
					<div class="text-center w-ful text-lg font-bold p-5">No Data Available</div>
				{:else}
					<div class="w-full flex justify-center sm:mb-4 p-2">
						<input
							class="w-full sm:w-1/2 h-10 bg-primary-200 text-center outline-none border border-primary-100 focus:border-secondary-300 focus:bg-primary-300"
							type="text"
							placeholder="Search.."
							bind:value={searchQuery}
						/>
					</div>
					<div class="max-h-[200px] sm:max-h-[590px] overflow-y-auto">
						{#each [...$MainStore.dashboard] as [_, item]}
							{#if !item.status}
								{#if item.charName.toLowerCase().includes(searchQuery) || item.trackName
										.toLowerCase()
										.includes(searchQuery) || item.trackInfo?.toLowerCase().includes(searchQuery) || item.period
										.toLowerCase()
										.includes(searchQuery)}
									<div class="flex p-4 justify-evenly w-full border border-primary-100">
										<div class="w-[25%] flex items-center overflow-x-clip">
											<img src={item.charImgUrl} alt="char_img" class="w-10" />
											{item.charName}
										</div>
										<div class="w-[30%] flex items-center text-sm lg:text-md overflow-x-clip">
											<img src={item.trackImgUrl} alt="track_img" class="w-10 mr-2" />
											{#if item.trackInfo}
												{item.trackInfo.replace('_', ' ')}
											{/if}
											{item.trackName.replace('_', ' ')}
										</div>

										<div class="w-[35%] flex items-center justify-center text-sm lg:text-md overflow-x-clip">
											{item.period}
										</div>

										<button class="w-[10%] flex justify-end items-center" on:click={() => handleComplete(item)}>
											<svg
												class="text-accent-200 hover:text-accent-100"
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
							{/if}
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
