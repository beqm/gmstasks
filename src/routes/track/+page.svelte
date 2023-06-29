<script lang="ts">
	import ActiveStore from '$lib/stores/ActiveStore';
	import { onMount } from 'svelte';
	import { StorageToStore } from '../../lib/utils/StorageToStore';
	import { fly } from 'svelte/transition';

	let currentPage = 'events';

	const changePage = (path: string) => {
		let trackEventsBtn = document.querySelector('#track-events-btn') as HTMLButtonElement;
		let trackBossesBtn = document.querySelector('#track-bosses-btn') as HTMLButtonElement;
		currentPage = path;

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
	};
	onMount(() => {
		StorageToStore(ActiveStore, 'active_char', '[]');
	});
</script>

<main class="flex w-full justify-center">
	{#if $ActiveStore.length !== 0}
		<div in:fly={{ x: -200, duration: 250 }} class="flex w-9/12 rounded-lg mt-10 drop-shadow-lg bg-theme-base">
			<!-- Navbar -->
			<div class="w-[20%] border-r border-theme-base">
				<img src={$ActiveStore[0].img} alt="current active character" class="w-full" />
				<div class="max-h-[50px] overflow-hidden text-center font-bold text-2xl">
					{$ActiveStore[0].name}
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
					<div class="w-full flex text-center mt-10 font-bold text-lg justify-evenly">
						<div class="w-[45%] flex flex-col">
							<div>Todo</div>
							<div class="flex w-full border border-theme-base">
								<div class="w-1/4">img</div>
								<div class="w-1/4">name</div>
								<div class="w-1/4">time left</div>
								<button class="w-1/4">*complete*</button>
							</div>
						</div>
						<div class="w-[45%] flex flex-col">
							<div>Complete</div>
							<div class="flex w-full border border-theme-base">
								<div class="w-1/3">img</div>
								<div class="w-1/3">name</div>
								<button class="w-1/3">*complete*</button>
							</div>
						</div>
					</div>
				{:else if currentPage == 'bosses'}
					<div class="text-center font-bold text-3xl mt-4">Bosses</div>
					<div class="w-full flex text-center mt-10 font-bold text-lg">
						<div class="w-2/4">
							<div>Todo</div>
						</div>
						<div class="w-2/4">
							<div>Complete</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</main>
