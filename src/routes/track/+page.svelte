<script lang="ts">
	import { fly } from 'svelte/transition';
	import BossTrack from '$lib/components/Track/BossTrack.svelte';
	import SubNavbar from '$lib/components/Track/SubNavbar.svelte';

	import DayTimer from '$lib/components/Timers/DayTimer.svelte';
	import WeekTimer from '$lib/components/Timers/WeekTimer.svelte';
	import SymbolNavbar from '$lib/components/Track/SymbolNavbar.svelte';
	import ArcaneTrack from '$lib/components/Track/ArcaneTrack.svelte';
	import SacredTrack from '$lib/components/Track/SacredTrack.svelte';
	import MainStore from '$lib/stores/MainStore';
	import { createDashBoardMap, localStoragetoStore, mapToLocalStorage, tasksMapToObj } from '$lib/utils/storage';
	import { onMount } from 'svelte';
	import EventTrack from '$lib/components/Track/EventTrack.svelte';

	let currentPage = 'events';
	let currentBossSubPage = 'daily';
	let currentEventSubPage = 'daily';
	let currentSymbolSubPage = 'arcane';

	const changeBossSubPage = (e: CustomEvent<string>) => {
		currentBossSubPage = e.detail;
	};

	const changeEventSubPage = (e: CustomEvent<string>) => {
		currentEventSubPage = e.detail;
	};

	const changeSymbolSubPage = (e: CustomEvent<string>) => {
		currentSymbolSubPage = e.detail;
	};

	const toggleToDashboard = (status: boolean) => {
		if ($MainStore.active) {
			$MainStore.active.isTracked = status;

			let localChar = $MainStore.characters.get($MainStore.active.id);
			if (localChar) {
				$MainStore.characters.set(localChar.id, $MainStore.active);
			}

			if (status) {
				let dashMap = createDashBoardMap($MainStore.active);
				dashMap.forEach((value, key) => {
					$MainStore.dashboard.set(key, value);
				});
			} else {
				$MainStore.dashboard.forEach((value, key) => {
					if (value.charId == $MainStore.active?.id) {
						$MainStore.dashboard.delete(key);
					}
				});
			}
			let char = tasksMapToObj($MainStore.active);
			localStorage.setItem('active', JSON.stringify(char));
			mapToLocalStorage($MainStore.characters, 'characters');
			mapToLocalStorage($MainStore.dashboard, 'dashboard');
			$MainStore = $MainStore;
		}
	};

	const changePage = (path: string) => {
		let trackEventsBtn = document.querySelector('#track-events-btn') as HTMLButtonElement;
		let trackBossesBtn = document.querySelector('#track-bosses-btn') as HTMLButtonElement;
		let trackSymbolsBtn = document.querySelector('#track-symbols-btn') as HTMLButtonElement;
		if (currentPage !== path) {
			currentPage = path;
			currentBossSubPage = 'daily';
			currentEventSubPage = 'daily';
			currentSymbolSubPage = 'arcane';

			if (path == 'events') {
				trackEventsBtn.classList.add('bg-secondary-100');
				trackEventsBtn.classList.remove('hover:bg-secondary-300');

				trackBossesBtn.classList.remove('bg-secondary-100');
				trackBossesBtn.classList.add('hover:bg-secondary-300');

				trackSymbolsBtn.classList.remove('bg-secondary-100');
				trackSymbolsBtn.classList.add('hover:bg-secondary-300');
			} else if (path == 'bosses') {
				trackBossesBtn.classList.add('bg-secondary-100');
				trackBossesBtn.classList.remove('hover:bg-secondary-300');

				trackEventsBtn.classList.remove('bg-secondary-100');
				trackEventsBtn.classList.add('hover:bg-secondary-300');

				trackSymbolsBtn.classList.remove('bg-secondary-100');
				trackSymbolsBtn.classList.add('hover:bg-secondary-300');
			} else {
				trackSymbolsBtn.classList.add('bg-secondary-100');
				trackSymbolsBtn.classList.remove('hover:bg-secondary-300');

				trackEventsBtn.classList.remove('bg-secondary-100');
				trackEventsBtn.classList.add('hover:bg-secondary-300');

				trackBossesBtn.classList.remove('bg-secondary-100');
				trackBossesBtn.classList.add('hover:bg-secondary-300');
			}
		}
	};
</script>

<div class="flex w-full justify-center h-full lg:h-[80vh]">
	{#if $MainStore.active}
		<div
			in:fly={{ x: -200, duration: 250 }}
			class="flex flex-col sm:flex-row w-full lg:w-9/12 rounded-lg mt-10 sm:mt-10 drop-shadow-lg bg-primary-300"
		>
			<!-- Navbar -->
			<div class="flex sm:flex-col sm:w-[20%] border border-primary-100">
				<div class="hidden sm:block">
					<img src={$MainStore.active.img} alt="current active character" class="w-full overflow-hidden" />
					<div class="max-h-[50px] overflow-hidden text-center font-bold sm:text-2xl">
						{$MainStore.active.name}
					</div>
				</div>

				<div class="flex sm:flex-col h-full w-full sm:mt-6 text-center font-bold">
					<button
						on:click={() => changePage('events')}
						id="track-events-btn"
						class="border-b border-t w-1/4 sm:w-full border-primary-100 p-4 bg-secondary-100">Events</button
					>
					<button
						on:click={() => changePage('bosses')}
						id="track-bosses-btn"
						class="border-b border-t w-1/4 sm:w-full border-primary-100 p-4 hover:bg-secondary-300">Bosses</button
					>
					<button
						on:click={() => changePage('symbols')}
						id="track-symbols-btn"
						class="border-b border-t w-1/4 sm:w-full border-primary-100 p-4 hover:bg-secondary-300">Symbols</button
					>
					{#if !$MainStore.active.isTracked}
						<button
							on:click={() => toggleToDashboard(true)}
							class="border-b border-t w-1/4 sm:w-full border-primary-100 p-4 hover:bg-secondary-300"
							>Add to Dashboard</button
						>
					{:else}
						<button
							on:click={() => toggleToDashboard(false)}
							class="border-b border-t w-1/4 sm:w-full border-primary-100 p-4 hover:bg-secondary-300"
							>Remove from Dashboard</button
						>
					{/if}
				</div>
			</div>
			<div class="w-full justify-center items-center sm:hidden">
				<div class="w-full flex justify-center">
					<img src={$MainStore.active.img} alt="current active character" />
				</div>
				<div class="max-h-[50px] overflow-hidden text-center font-bold sm:text-2xl">
					{$MainStore.active.name}
				</div>
			</div>

			<!-- Right Side -->
			<div class="w-full sm:w-[80%] h-[90%]">
				{#if currentPage == 'events'}
					<SubNavbar on:pagechange={changeEventSubPage} />
					{#if currentEventSubPage == 'daily'}
						<div class="w-full justify-center flex text-2xl font-bold mt-4">
							<DayTimer />
						</div>
					{:else if currentEventSubPage == 'weekly'}
						<div class="w-full justify-center flex text-2xl font-bold mt-4">
							<WeekTimer weekDayTarget={1} />
						</div>
					{/if}

					{#if currentEventSubPage == 'daily'}
						<div class="h-[80%]">
							<EventTrack events={[...$MainStore.active.track.dailyEvents.values()]} />
						</div>
					{:else if currentEventSubPage == 'weekly'}
						<div class="h-[80%]">
							<EventTrack events={[...$MainStore.active.track.weeklyEvents.values()]} />
						</div>
					{/if}
				{:else if currentPage == 'bosses'}
					<SubNavbar on:pagechange={changeBossSubPage} />
					{#if currentBossSubPage == 'daily'}
						<div class="w-full justify-center flex text-2xl font-bold mt-4">
							<DayTimer />
						</div>
					{:else if currentBossSubPage == 'weekly'}
						<div class="w-full justify-center flex text-2xl font-bold mt-4">
							<WeekTimer weekDayTarget={4} />
						</div>
					{/if}
					{#if currentBossSubPage == 'daily'}
						<div class="h-[80%]">
							<BossTrack bosses={[...$MainStore.active.track.dailyBosses.values()]} />
						</div>
					{:else if currentBossSubPage == 'weekly'}
						<div class="h-[80%]">
							<BossTrack bosses={[...$MainStore.active.track.weeklyBosses.values()]} />
						</div>
					{/if}
				{:else if currentPage == 'symbols'}
					<SymbolNavbar on:pagechange={changeSymbolSubPage} />
					{#if currentSymbolSubPage == 'arcane'}
						<ArcaneTrack />
					{:else if currentSymbolSubPage == 'sacred'}
						<SacredTrack />
					{/if}
				{/if}
			</div>
		</div>
	{/if}
</div>
