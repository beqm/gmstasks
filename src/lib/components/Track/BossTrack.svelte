<script lang="ts">
	import MainStore from '$lib/stores/MainStore';
	import { tasksMapToObj, mapToLocalStorage } from '$lib/utils/storage';

	export let bosses: MBoss[];

	const handleComplete = (currTrack: MBoss) => {
		currTrack.complete = true;
		if ($MainStore.active) {
			$MainStore.active = $MainStore.active;
			$MainStore.characters.set($MainStore.active.id, $MainStore.active);

			let char = tasksMapToObj($MainStore.active);
			localStorage.setItem('active', JSON.stringify(char));
			mapToLocalStorage($MainStore.characters, 'characters');

			let dashItem = $MainStore.dashboard.get(`${$MainStore.active.id}|${currTrack.name}|${currTrack.difficulty}`);
			if (dashItem) {
				dashItem.status = true;
				mapToLocalStorage($MainStore.dashboard, 'dashboard');
			}
			$MainStore = $MainStore;
		}
	};
</script>

<div class="w-full flex text-center mt-4 font-bold text-lg justify-evenly">
	<div class="flex flex-col w-[45%]">
		<div class="text-2xl m-2">Todo</div>
		<div class="w-full h-full flex flex-col max-h-[370px] sm:max-h-[490px] overflow-y-auto">
			{#each bosses as boss}
				{#if boss.active && !boss.complete}
					<div class="flex w-full border border-primary-100 p-2 justify-center items-center">
						<div class="w-[25%] flex justify-center">
							<img src={boss.img_url} alt="boss_img" class="w-1/3" />
						</div>
						<div class="w-[60%] text-left overflow-x-clip text-xs sm:text-lg">
							{boss.difficulty.replace('_', ' ')}
							{boss.name.replace('_', ' ')}
						</div>

						<button class="w-[15%] flex justify-center" on:click={() => handleComplete(boss)}>
							<svg
								class="text-accent-200 hover:text-accent-100 h-[1em] sm:h-[1.5em]"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
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
			{#each bosses as boss}
				{#if boss.active && boss.complete}
					<div class="flex w-full border border-primary-100 p-2 justify-center items-center">
						<div class="w-[25%] flex justify-center">
							<img src={boss.img_url} alt="boss_img" class="w-1/3" />
						</div>
						<div class="w-[60%] text-left overflow-x-clip text-xs sm:text-lg">
							{boss.difficulty.replace('_', ' ')}
							{boss.name.replace('_', ' ')}
						</div>

						<button class="w-[15%] flex justify-center" disabled>
							<svg
								class="text-green justify-center items-center h-[1em] sm:h-[1.5em]"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
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
