<script lang="ts">
	import MainStore from '$lib/stores/MainStore';
	import { tasksMapToObj, saveMapToLocalStorage } from '$lib/utils/storage';
	import { ArcaneDaily, ArcaneWeekly, SacredDaily, calculateSymbol } from '$lib/utils/validation';

	export let events: MEvent[];

	const handleComplete = (currTrack: MEvent) => {
		currTrack.complete = true;
		if ($MainStore.active) {
			$MainStore.active = $MainStore.active;
			$MainStore.characters.set($MainStore.active.id, $MainStore.active);
			if (ArcaneDaily.includes(currTrack.name)) {
				let symbol = $MainStore.active.track.arcanes.get(currTrack.name.replace('_Daily', ''));
				if (symbol) {
					calculateSymbol(symbol, symbol.gain);
				}
			} else if (ArcaneWeekly.includes(currTrack.name)) {
				if (currTrack.symbol) {
					let symbol = $MainStore.active.track.arcanes.get(currTrack.symbol);
					if (symbol) {
						calculateSymbol(symbol, 45);
					}
				}
			} else if (SacredDaily.includes(currTrack.name)) {
				let symbol = $MainStore.active.track.sacreds.get(currTrack.name.replace('_Daily', ''));
				if (symbol) {
					calculateSymbol(symbol, symbol.gain);
				}
			}

			let char = tasksMapToObj($MainStore.active);
			localStorage.setItem('active', JSON.stringify(char));
			saveMapToLocalStorage($MainStore.characters, 'characters');

			let dashItem = $MainStore.dashboard.get(`${$MainStore.active.id}|${currTrack.name}`);
			if (dashItem) {
				dashItem.status = true;
				saveMapToLocalStorage($MainStore.dashboard, 'dashboard');
			}

			$MainStore = $MainStore;
		}
	};
</script>

<div class="w-full flex h-full text-center mt-4 font-bold text-lg justify-evenly">
	<div class="flex flex-col w-[45%]">
		<div class="text-2xl m-2">Todo</div>
		<div class="w-full flex flex-col overflow-y-auto">
			{#each events as event}
				{#if event.active && !event.complete}
					<div class="flex w-full border border-primary-100 p-2 justify-center items-center">
						<div class="w-1/3 flex justify-center">
							<img src={event.img_url} alt="event_img" class="w-1/3" />
						</div>
						<div class="w-1/3 max-w-[5.4rem] overflow-x-clip text-xs sm:text-lg">{event.name.replace('_', ' ')}</div>

						<button class="w-1/3 flex justify-center" on:click={() => handleComplete(event)}>
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
			{/each}
		</div>
	</div>
	<div class="flex flex-col w-[45%]">
		<div class="text-2xl m-2">Complete</div>
		<div class="w-full h-full flex flex-col max-h-[370px] sm:max-h-[490px] overflow-y-auto">
			{#each events as event}
				{#if event.active && event.complete}
					<div class="flex w-full border border-primary-100 p-2 justify-center items-center">
						<div class="w-1/3 flex justify-center">
							<img src={event.img_url} alt="event_img" class="w-1/3" />
						</div>
						<div class="w-1/3 max-w-[5.4rem] overflow-x-clip text-xs sm:text-lg">{event.name.replace('_', ' ')}</div>

						<button class="w-1/3 flex justify-center" disabled>
							<svg
								class="text-green justify-center items-center"
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
