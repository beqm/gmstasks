<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	export let inputLabel: string;
	export let selectData: MEvents;
	let showSelect = false;

	const toggleEventSelect = () => {
		showSelect = !showSelect;
	};

	const closeEventSelect = () => {
		showSelect = false;
	};

	onMount(() => {
		closeEventSelect();
	});
</script>

<div>
	<button
		class="flex items-center w-full bg-primary-200 border border-primary-100 text-xl cursor-pointer"
		type="button"
		on:click={toggleEventSelect}
	>
		<span class="p-2 text-sm sm:text-lg">{inputLabel.replace('_', ' ')}</span>
		<svg
			class="ml-auto mr-2 text-accent-100"
			xmlns="http://www.w3.org/2000/svg"
			height="1em"
			viewBox="0 0 448 512"
			fill="currentColor"
			><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
				d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
			/></svg
		>
	</button>
	{#if showSelect}
		<ul
			transition:slide
			id={inputLabel}
			class="flex flex-col items-center w-full border bg-primary-300 border-primary-100 text-xl max-h-[200px] mb-2 overflow-y-auto"
		>
			{#each [...selectData] as [key, item]}
				<li class="flex text-left w-full">
					<label class="p-2 text-sm sm:text-lg" for={item.name}>{item.name.replace('_', ' ')}</label>
					<input type="checkbox" id={item.name} class="ml-auto mr-4" bind:checked={item.active} />
				</li>
			{/each}
		</ul>
	{/if}
</div>
