<script lang="ts">
	import { fly } from 'svelte/transition';
	import BossTrack from '$lib/components/Track/BossTrack.svelte';
	import EventTrack from '$lib/components/Track/EventTrack.svelte';
	import BossNavbar from '$lib/components/Track/BossNavbar.svelte';
	import DayTimer from '$lib/components/Timers/DayTimer.svelte';
	import WeekTimer from '$lib/components/Timers/WeekTimer.svelte';
	import SymbolNavbar from '$lib/components/Track/SymbolNavbar.svelte';
	import ArcaneTrack from '$lib/components/Track/ArcaneTrack.svelte';
	import SacredTrack from '$lib/components/Track/SacredTrack.svelte';
	import MainStore from '$lib/stores/MainStore';
	import { createDashBoardMap, localStoragetoStore, saveMapToLocalStorage, tasksMapToObj } from '$lib/utils/storage';
	import { onMount } from 'svelte';

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
				$MainStore.characters.set(localChar.id, localChar);
			}

			if (status) {
				let dashMap = createDashBoardMap($MainStore.active);
				$MainStore.dashboard = new Map([...$MainStore.dashboard, ...dashMap]);
			} else {
				$MainStore.dashboard.forEach((value, key) => {
					if (value.charId == $MainStore.active?.id) {
						$MainStore.dashboard.delete(key);
					}
				});
			}
			let char = tasksMapToObj($MainStore.active);
			localStorage.setItem('active', JSON.stringify(char));
			saveMapToLocalStorage($MainStore.characters, 'characters');
			saveMapToLocalStorage($MainStore.dashboard, 'dashboard');
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
				trackEventsBtn.classList.add('bg-theme-decorated');
				trackEventsBtn.classList.remove('hover:bg-theme-softdecorated');

				trackBossesBtn.classList.remove('bg-theme-decorated');
				trackBossesBtn.classList.add('hover:bg-theme-softdecorated');

				trackSymbolsBtn.classList.remove('bg-theme-decorated');
				trackSymbolsBtn.classList.add('hover:bg-theme-softdecorated');
			} else if (path == 'bosses') {
				trackBossesBtn.classList.add('bg-theme-decorated');
				trackBossesBtn.classList.remove('hover:bg-theme-softdecorated');

				trackEventsBtn.classList.remove('bg-theme-decorated');
				trackEventsBtn.classList.add('hover:bg-theme-softdecorated');

				trackSymbolsBtn.classList.remove('bg-theme-decorated');
				trackSymbolsBtn.classList.add('hover:bg-theme-softdecorated');
			} else {
				trackSymbolsBtn.classList.add('bg-theme-decorated');
				trackSymbolsBtn.classList.remove('hover:bg-theme-softdecorated');

				trackEventsBtn.classList.remove('bg-theme-decorated');
				trackEventsBtn.classList.add('hover:bg-theme-softdecorated');

				trackBossesBtn.classList.remove('bg-theme-decorated');
				trackBossesBtn.classList.add('hover:bg-theme-softdecorated');
			}
		}
	};
</script>

<div class="flex w-full justify-center h-[850px]">
	{#if $MainStore.active}
		<div in:fly={{ x: -200, duration: 250 }} class="flex w-9/12 rounded-lg mt-10 drop-shadow-lg bg-theme-base">
			<!-- Navbar -->
			<div class="w-[20%] border-r border-theme-base">
				<img src={$MainStore.active.img} alt="current active character" class="w-full" />
				<div class="max-h-[50px] overflow-hidden text-center font-bold text-2xl">
					{$MainStore.active.name}
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
					<button
						on:click={() => changePage('symbols')}
						id="track-symbols-btn"
						class="border-b border-t border-theme-base p-4 hover:bg-theme-softdecorated">Symbols</button
					>
					{#if !$MainStore.active.isTracked}
						<button
							on:click={() => toggleToDashboard(true)}
							class="border-b border-t border-theme-base p-4 hover:bg-theme-softdecorated">Add to Dashboard</button
						>
					{:else}
						<button
							on:click={() => toggleToDashboard(false)}
							class="border-b border-t border-theme-base p-4 hover:bg-theme-softdecorated">Remove from Dashboard</button
						>
					{/if}
				</div>
			</div>
			<!-- Right Side -->
			<div class="w-[80%]">
				{#if currentPage == 'events'}
					<div class="text-center font-bold text-3xl mt-4">Events</div>
					<BossNavbar on:pagechange={changeEventSubPage} />
					{#if currentEventSubPage == 'daily'}
						<div class="w-full justify-center flex text-2xl font-bold text-theme-decorateds mt-4">
							<DayTimer />
						</div>
					{:else if currentEventSubPage == 'weekly'}
						<div class="w-full justify-center flex text-2xl font-bold text-theme-decorateds mt-4">
							<WeekTimer weekDayTarget={1} />
						</div>
					{/if}

					{#if currentEventSubPage == 'daily'}
						<EventTrack events={[...$MainStore.active.track.dailyEvents.values()]} />
					{:else if currentEventSubPage == 'weekly'}
						<EventTrack events={[...$MainStore.active.track.weeklyEvents.values()]} />
					{/if}
				{:else if currentPage == 'bosses'}
					<div class="text-center font-bold text-3xl mt-4">Bosses</div>
					<BossNavbar on:pagechange={changeBossSubPage} />
					{#if currentBossSubPage == 'daily'}
						<div class="w-full justify-center flex text-2xl font-bold text-theme-decorateds mt-4">
							<DayTimer />
						</div>
					{:else if currentBossSubPage == 'weekly'}
						<div class="w-full justify-center flex text-2xl font-bold text-theme-decorateds mt-4">
							<WeekTimer weekDayTarget={4} />
						</div>
					{/if}
					{#if currentBossSubPage == 'daily'}
						<BossTrack bosses={[...$MainStore.active.track.dailyBosses.values()]} />
					{:else if currentBossSubPage == 'weekly'}
						<BossTrack bosses={[...$MainStore.active.track.weeklyBosses.values()]} />
					{/if}
				{:else if currentPage == 'symbols'}
					<div class="text-center font-bold text-3xl mt-4">Symbols</div>
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
