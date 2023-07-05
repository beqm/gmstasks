<script lang="ts">
	import { createEventDispatcher } from 'svelte/internal';

	const dispatch = createEventDispatcher();

	const changeSymbolSubPage = (path: string) => {
		let arcaneBtn = document.querySelector('#symbol-arcane') as HTMLButtonElement;
		let sacredBtn = document.querySelector('#symbol-sacred') as HTMLButtonElement;

		if (path == 'arcane') {
			arcaneBtn.classList.add('bg-theme-decorated');
			arcaneBtn.classList.remove('hover:bg-theme-softdecorated');

			sacredBtn.classList.remove('bg-theme-decorated');
			sacredBtn.classList.add('hover:bg-theme-softdecorated');
		} else if (path == 'sacred') {
			sacredBtn.classList.add('bg-theme-decorated');
			sacredBtn.classList.remove('hover:bg-theme-softdecorated');

			arcaneBtn.classList.remove('bg-theme-decorated');
			arcaneBtn.classList.add('hover:bg-theme-softdecorated');
		}

		dispatch('pagechange', path);
	};
</script>

<div class="w-full flex justify-center">
	<button
		id="symbol-arcane"
		on:click={() => changeSymbolSubPage('arcane')}
		class="p-2 mr-2 rounded-lg font-bold text-xl mt-10 bg-theme-decorated">Arcane</button
	>
	<button
		id="symbol-sacred"
		on:click={() => changeSymbolSubPage('sacred')}
		class="p-2 mr-2 rounded-lg font-bold text-xl mt-10 hover:bg-theme-softdecorated">Sacred</button
	>
</div>
