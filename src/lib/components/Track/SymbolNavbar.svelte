<script lang="ts">
	import { createEventDispatcher } from 'svelte/internal';

	const dispatch = createEventDispatcher();

	const changeSymbolSubPage = (path: string) => {
		let arcaneBtn = document.querySelector('#symbol-arcane') as HTMLButtonElement;
		let sacredBtn = document.querySelector('#symbol-sacred') as HTMLButtonElement;

		if (path == 'arcane') {
			arcaneBtn.classList.add('bg-secondary-200');
			arcaneBtn.classList.remove('hover:bg-secondary-100');

			sacredBtn.classList.remove('bg-secondary-200');
			sacredBtn.classList.add('hover:bg-secondary-100');
		} else if (path == 'sacred') {
			sacredBtn.classList.add('bg-secondary-200');
			sacredBtn.classList.remove('hover:bg-secondary-100');

			arcaneBtn.classList.remove('bg-secondary-200');
			arcaneBtn.classList.add('hover:bg-secondary-100');
		}

		dispatch('pagechange', path);
	};
</script>

<div class="w-full flex justify-center">
	<button
		id="symbol-arcane"
		on:click={() => changeSymbolSubPage('arcane')}
		class="p-2 mr-2 rounded-lg font-bold text-xl mt-10 bg-secondary-200">Arcane</button
	>
	<button
		id="symbol-sacred"
		on:click={() => changeSymbolSubPage('sacred')}
		class="p-2 mr-2 rounded-lg font-bold text-xl mt-10 hover:bg-secondary-100">Sacred</button
	>
</div>
