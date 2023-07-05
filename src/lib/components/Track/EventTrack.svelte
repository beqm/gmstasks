<script lang="ts">
	import type { MEvent } from '$lib/types/types';
	import ActiveStore from '$lib/stores/ActiveStore';
	import DataStore from '$lib/stores/DataStore';
	import DashStore from '$lib/stores/DashStore';
	import { ArcaneDaily, ArcaneWeekly, SacredDaily, calculateSymbol } from '$lib/utils';

	export let events: MEvent[];

	const handleComplete = (currTrack: MEvent) => {
		currTrack.complete = true;
		$ActiveStore = $ActiveStore;

		$DataStore.map((char, index) => {
			if ($ActiveStore) {
				if (char.id === $ActiveStore.id) {
					if (ArcaneDaily.includes(currTrack.name)) {
						let symbol = $ActiveStore.track.arcaneSymbols[ArcaneDaily.indexOf(currTrack.name)];
						calculateSymbol(symbol, symbol.gain);
					} else if (ArcaneWeekly.includes(currTrack.name)) {
						let symbol = $ActiveStore.track.arcaneSymbols[ArcaneWeekly.indexOf(currTrack.name)];
						calculateSymbol(symbol, 45);
					} else if (SacredDaily.includes(currTrack.name)) {
						let symbol = $ActiveStore.track.sacredSymbols[SacredDaily.indexOf(currTrack.name)];
						calculateSymbol(symbol, symbol.gain);
					}
					$DataStore[index] = $ActiveStore;
					localStorage.setItem('active_char', JSON.stringify($ActiveStore));
					localStorage.setItem('local_chars', JSON.stringify($DataStore));
				}
			}
		});

		$DashStore.map((item) => {
			if ($ActiveStore) {
				if (item.charId === $ActiveStore.id) {
					if (currTrack.name == item.trackName) {
						item.status = true;
						$DashStore = $DashStore;
						localStorage.setItem('dashboard_items', JSON.stringify($DashStore));
					}
				}
			}
		});
	};
</script>

<div class="w-full flex text-center mt-4 font-bold text-lg justify-evenly">
	<div class="flex flex-col w-[45%] justify-center">
		<div class="text-2xl m-2">Todo</div>
		<div class="w-full h-full flex flex-col max-h-[540px] overflow-y-auto border-t border-theme-decorated">
			{#each events as event}
				{#if event.active && !event.complete}
					<div class="flex w-full border border-theme-base p-2 justify-center items-center">
						<div class="w-1/4 flex justify-center">
							<img src={event.img_url} alt="event_img" class="w-1/2" />
						</div>
						<div class="w-1/4 max-w-[5.4rem] overflow-x-clip">{event.name.replace('_', ' ')}</div>

						<button class="w-1/4 flex justify-center" on:click={() => handleComplete(event)}>
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
	<div class="flex flex-col w-[45%] justify-center">
		<div class="text-2xl m-2">Complete</div>
		<div class="w-full h-full flex flex-col max-h-[540px] overflow-y-auto border-t border-theme-decorated">
			{#each events as event}
				{#if event.active && event.complete}
					<div class="flex w-full border border-theme-base p-2 justify-center items-center">
						<div class="w-1/4 flex justify-center">
							<img src={event.img_url} alt="event_img" class="w-1/2" />
						</div>
						<div class="w-1/4 max-w-[5.4rem] overflow-x-clip">{event.name.replace('_', ' ')}</div>

						<button class="w-1/4 flex justify-center" disabled>
							<svg
								class=" text-green-500 justify-center items-center"
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
