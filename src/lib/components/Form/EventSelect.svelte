<script lang="ts">
	import type { MEvent } from '$lib/types/types';

	export let inputLabel: string;
	export let selectData: MEvent[];

	const showEventSelect = () => {
		const EventItems = document.querySelector(`#${inputLabel}`);
		EventItems?.classList.toggle('invisible');
	};

	const handleCheck = (id: string) => {
		const EventItem = document.querySelector(`#${id}`) as HTMLInputElement;
		if (EventItem.checked == true) {
			let result = selectData.find((item) => item.name === id);
			if (result) {
				result!.active = true;
			}
		}
	};
</script>

<div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="flex items-center w-full bg-theme-softer border border-theme-base text-xl focus:bg-theme-softdecorated cursor-pointer"
		on:click={showEventSelect}
	>
		<span>{inputLabel}</span>
		<svg
			class="ml-auto mr-2 text-theme-decorated"
			xmlns="http://www.w3.org/2000/svg"
			height="1em"
			viewBox="0 0 448 512"
			fill="currentColor"
			><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
				d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
			/></svg
		>
	</div>

	<ul
		id={inputLabel}
		class="invisible flex flex-col items-center w-full bg-theme-softer border border-theme-base text-xl focus:bg-theme-softdecorated max-h-[140px] overflow-y-auto"
	>
		{#each selectData as item}
			<li class="flex text-left w-full">
				<label for={item.name}>{item.name}</label>
				<input type="checkbox" id={item.name} class="ml-auto mr-2" on:click={() => handleCheck(item.name)} />
			</li>
		{/each}
	</ul>
</div>
