<script lang="ts">
	import ActiveStore from '$lib/stores/ActiveStore';
	import { fly } from 'svelte/transition';
	import BossTrack from '$lib/components/Track/BossTrack.svelte';
	import EventTrack from '$lib/components/Track/EventTrack.svelte';
	import BossNavbar from '$lib/components/Track/BossNavbar.svelte';
	import DayTimer from '$lib/components/Timers/DayTimer.svelte';
	import WeekTimer from '$lib/components/Timers/WeekTimer.svelte';
	import DataStore from '$lib/stores/DataStore';
	import DashStore from '$lib/stores/DashStore';
	import { createDashBoardArray } from '$lib/utils';

	let currentPage = 'events';
	let currentBossSubPage = 'daily';
	let currentEventSubPage = 'daily';

	const changeBossSubPage = (e: CustomEvent<string>) => {
		currentBossSubPage = e.detail;
	};

	const changeEventSubPage = (e: CustomEvent<string>) => {
		currentEventSubPage = e.detail;
	};

	// const toggleToDashboard = (status: boolean) => {
	// 	$DataStore.map((char, index) => {
	// 		if ($ActiveStore) {
	// 			if (char.id === $ActiveStore.id) {
	// 				$ActiveStore.isTracked = status;
	// 				$DataStore[index] = $ActiveStore;

	// 				$ActiveStore = $ActiveStore;
	// 				$DataStore = $DataStore;
	// 				localStorage.setItem('active_char', JSON.stringify($ActiveStore));
	// 				localStorage.setItem('local_chars', JSON.stringify($DataStore));
	// 			}
	// 		}
	// 	});
	// };
	const toggleToDashboard = (status: boolean) => {
		if (!$ActiveStore?.isTracked) {
			DashStore.update((data) => {
				let updatedData = [...data];
				if ($ActiveStore) {
					let dashObjs = createDashBoardArray($ActiveStore);
					updatedData = updatedData.concat(dashObjs);
					localStorage.setItem('dashboard_items', JSON.stringify(updatedData));
				}
				return updatedData;
			});
		} else {
			if ($ActiveStore) {
				$DashStore = $DashStore.filter((item) => item.charId !== $ActiveStore?.id);
				localStorage.setItem('dashboard_items', JSON.stringify($DashStore));
			}
		}

		$DataStore.map((char, index) => {
			if ($ActiveStore) {
				if (char.id === $ActiveStore.id) {
					$ActiveStore.isTracked = status;
					$DataStore[index] = $ActiveStore;

					$ActiveStore = $ActiveStore;
					$DataStore = $DataStore;
					localStorage.setItem('active_char', JSON.stringify($ActiveStore));
					localStorage.setItem('local_chars', JSON.stringify($DataStore));
				}
			}
		});
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
</script>

<div class="flex w-full justify-center h-[850px]">
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
					{#if !$ActiveStore.isTracked}
						<button
							on:click={() => toggleToDashboard(true)}
							id="track-bosses-btn"
							class="border-b border-t border-theme-base p-4 hover:bg-theme-softdecorated">Add to Dashboard</button
						>
					{:else}
						<button
							on:click={() => toggleToDashboard(false)}
							id="track-bosses-btn"
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
						<EventTrack events={$ActiveStore.track.dailyEvents} />
					{:else if currentEventSubPage == 'weekly'}
						<EventTrack events={$ActiveStore.track.weeklyEvents} />
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
						<BossTrack bosses={$ActiveStore.track.dailyBosses} />
					{:else if currentBossSubPage == 'weekly'}
						<BossTrack bosses={$ActiveStore.track.weeklyBosses} />
					{/if}
				{/if}
			</div>
		</div>
	{/if}
</div>
