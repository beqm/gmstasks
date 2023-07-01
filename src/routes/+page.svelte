<script lang="ts">
	import { fly } from 'svelte/transition';
	import ProgressBar from '$lib/components/Dashboard/ProgressBar.svelte';
	import { StorageToStore } from '$lib/utils';
	import DashStore from '$lib/stores/DashStore';
	import { onMount } from 'svelte/internal';

	let dailyBossesControl: number = 0;
	let weeklyBossesControl: number = 0;

	let dailyEventControl: number = 0;
	let weeklyEventControl: number = 0;

	const progressControl = (type: string, period: string) => {
		let counter: number = 0;
		let totalCounter: number = 0;
		for (let item of $DashStore) {
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

	onMount(async () => {
		StorageToStore(DashStore, 'dashboard_items', '[]');
		dailyBossesControl = progressControl('Boss', 'Daily');
		weeklyBossesControl = progressControl('Boss', 'Weekly');
		dailyEventControl = progressControl('Event', 'Daily');
		weeklyEventControl = progressControl('Event', 'Weekly');
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
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>
