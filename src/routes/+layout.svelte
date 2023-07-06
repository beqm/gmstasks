<script>
	import '../app.postcss';
	import '$lib/styles/navbar.css';
	import DayTimer from '$lib/components/Timers/DayTimer.svelte';
	import ActiveStore from '$lib/stores/ActiveStore';
	import DataStore from '$lib/stores/DataStore';
	import DashStore from '$lib/stores/DashStore';
	import { onMount } from 'svelte';
	import { StorageToStore } from '$lib/utils';

	$: count = $DashStore.reduce((acc, obj) => {
		if (obj.status === false) {
			return acc + 1;
		} else {
			return acc;
		}
	}, 0);

	onMount(() => {
		StorageToStore(ActiveStore, 'active_char', '[]');
		StorageToStore(DataStore, 'local_chars', '[]');
		StorageToStore(DashStore, 'dashboard_items', '[]');
	});
</script>

<svelte:head>
	{#if count != 0}
		<title>({count}) GMSTASKS</title>
	{:else}
		<title>GMSTASKS</title>
	{/if}
</svelte:head>

<nav class="flex flex-col w-full font-bold text-center capitalize items-center text-theme-dark">
	<div class="flex w-3/6 m-2 rounded-lg p-1 drop-shadow-lg bg-theme-base">
		<div class="p-3 uppercase rounded-lg text-lg">GMSTASKS</div>

		<div class="flex">
			<div class="flex flex-col pl-5 pr-5 rounded-lg justify-center font-bold uppercase text-sm bg-theme-decorated">
				Reset <DayTimer />
			</div>
		</div>

		<ul class="flex ml-auto">
			<a href="/">
				<li class="p-2 m-1 hover:bg-theme-strongdecorated rounded-lg duration-200 active:scale-90">dashboard</li>
			</a>

			<a href="characters">
				<li class="p-2 m-1 hover:bg-theme-strongdecorated rounded-lg duration-200 active:scale-90">characters</li>
			</a>

			{#if $ActiveStore}
				<a href="track">
					<li class="flex p-2 m-1 hover:bg-theme-strongdecorated rounded-lg duration-200 active:scale-90">
						<svg
							class="w-[1.5rem] text-theme-decorated"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
							fill="currentColor"
							><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
								d="M256 0c17.7 0 32 14.3 32 32V42.4c93.7 13.9 167.7 88 181.6 181.6H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H469.6c-13.9 93.7-88 167.7-181.6 181.6V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V469.6C130.3 455.7 56.3 381.7 42.4 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H42.4C56.3 130.3 130.3 56.3 224 42.4V32c0-17.7 14.3-32 32-32zM107.4 288c12.5 58.3 58.4 104.1 116.6 116.6V384c0-17.7 14.3-32 32-32s32 14.3 32 32v20.6c58.3-12.5 104.1-58.4 116.6-116.6H384c-17.7 0-32-14.3-32-32s14.3-32 32-32h20.6C392.1 165.7 346.3 119.9 288 107.4V128c0 17.7-14.3 32-32 32s-32-14.3-32-32V107.4C165.7 119.9 119.9 165.7 107.4 224H128c17.7 0 32 14.3 32 32s-14.3 32-32 32H107.4zM256 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
							/></svg
						>
					</li>
				</a>
			{:else if !$ActiveStore}
				<a href="track" class="track-disabled">
					<li class="flex p-2 m-1 hover:bg-theme-strongdecorated rounded-lg duration-200 active:scale-90">
						<svg
							class="w-[1.5rem] text-theme-strongdecorated"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
							fill="currentColor"
							><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
								d="M256 0c17.7 0 32 14.3 32 32V42.4c93.7 13.9 167.7 88 181.6 181.6H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H469.6c-13.9 93.7-88 167.7-181.6 181.6V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V469.6C130.3 455.7 56.3 381.7 42.4 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H42.4C56.3 130.3 130.3 56.3 224 42.4V32c0-17.7 14.3-32 32-32zM107.4 288c12.5 58.3 58.4 104.1 116.6 116.6V384c0-17.7 14.3-32 32-32s32 14.3 32 32v20.6c58.3-12.5 104.1-58.4 116.6-116.6H384c-17.7 0-32-14.3-32-32s14.3-32 32-32h20.6C392.1 165.7 346.3 119.9 288 107.4V128c0 17.7-14.3 32-32 32s-32-14.3-32-32V107.4C165.7 119.9 119.9 165.7 107.4 224H128c17.7 0 32 14.3 32 32s-14.3 32-32 32H107.4zM256 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
							/></svg
						>
					</li>
				</a>
			{/if}
			{#if count > 0}
				<a href="/">
					<li class="p-[0.75rem] m-1 hover:bg-theme-strongdecorated rounded-lg duration-200 active:scale-90 relative">
						<div class="absolute right-2 top-4">{count}</div>

						<svg
							class="w-[1rem] text-theme-decorated"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 448 512"
							fill="currentColor"
							><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
								d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"
							/></svg
						>
					</li>
				</a>
			{/if}
		</ul>
	</div>
</nav>

<main class="flex w-full justify-center">
	<slot />
</main>

<style>
	.track-disabled {
		pointer-events: none;
		cursor: default;
	}
</style>
