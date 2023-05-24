<script lang="ts">
	import DataStore from '$lib/stores/DataStore';
	import ActiveStore from '$lib/stores/ActiveStore';
	import Form from './Form.svelte';
	import ActiveDisplay from './ActiveDisplay.svelte';
	import ConfirmDelete from './ConfirmDelete.svelte';
	import { onMount } from 'svelte';
	import { StorageToStore } from '$lib/utils/StorageToStore';
	import type { Character } from '$lib/types/types';

	type FormType = Form;
	let FormComponentInstance: FormType;

	let isOverlayActive = false;
	let delModalInfo: Character;

	let toggleOverlay = () => {
		isOverlayActive = !isOverlayActive;
	};

	const editCharacter = (id: string) => {
		if (FormComponentInstance) {
			let [charObj] = $DataStore.filter((char) => char.id === id);
			FormComponentInstance.showEditForm(charObj);
		}
	};

	const activateCharacter = (id: string) => {
		let charObj = $DataStore.filter((char) => char.id === id);
		$ActiveStore = charObj;
		localStorage.setItem('active_char', JSON.stringify(charObj));
	};

	const showDelModal = (char: Character) => {
		delModalInfo = char;
	};

	onMount(() => {
		StorageToStore(DataStore, 'local_chars', '[]');
		StorageToStore(ActiveStore, 'active_char', '[]');
	});
</script>

<div class={isOverlayActive ? 'overlay' : 'hidden'}>
	<ConfirmDelete currentCharIteration={delModalInfo} toggleOverlayFunction={toggleOverlay} />
</div>

<main class="flex flex-col w-full items-center mt-10">
	<Form bind:this={FormComponentInstance} />

	<div class="flex flex-col w-9/12 bg-slate-600 rounded-lg drop-shadow-lg scroll-container">
		<table class="w-full table-fixed bg-slate-600 text-slate-300 text-slate-30 rounded-lg drop-shadow-lg">
			<tr class="font-bold text-lg w-full">
				<td class="w-1/5 text-center align-middle p-2 uppercase">image</td>
				<td class="w-1/5 text-center align-middle p-2 uppercase">name</td>
				<td class="w-1/5 text-center align-middle p-2 uppercase">job</td>
				<td class="w-1/5 text-center align-middle p-2 uppercase">level</td>
				<td class="w-[10%] text-center align-middle p-2" />
			</tr>
			{#if $DataStore.length > 0}
				{#each $DataStore as character (character.id)}
					<tr
						id={character.name}
						class="cursor-pointer border-b border-b-slate-800"
						on:click={() => activateCharacter(character.id)}
					>
						<td class="w-full align-middle flex justify-center">
							<ActiveDisplay currentCharIteration={character} />
							<img src={character.img} alt="Character" class="flex w-[33%] mr-auto" />
						</td>
						<td class="text-center align-middle p-2">{character.name}</td>
						<td class="text-center align-middle p-2">{character.job}</td>
						<td class="text-center align-middle p-2">{character.level}</td>
						<td class="text-center">
							<button
								on:click={() => editCharacter(character.id)}
								id="add-char-btn"
								class="bg-blue-500 m-2 p-3 ml-auto rounded-lg font-bold capitalize duration-200 active:scale-90"
							>
								<svg class="w-[1.7rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"
									><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
										d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
									/></svg
								>
							</button>
							<button
								on:click={() => showDelModal(character)}
								id="add-char-btn"
								class="bg-red-400 m-2 p-3 ml-auto rounded-lg font-bold capitalize duration-200 active:scale-90"
							>
								<svg class="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"
									><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
										d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
									/></svg
								>
							</button>
						</td>
					</tr>
				{/each}
			{/if}
		</table>
		{#if $DataStore.length == 0}
			<div class="text-center w-ful text-lg text-slate-300 font-bold p-5">No Data Available</div>
		{/if}
	</div>
</main>

<style>
	.scroll-container {
		max-height: 700px;
		overflow: auto;
	}
	.scroll-container::-webkit-scrollbar {
		width: 8px;
		--tw-bg-opacity: 1;
		background-color: rgb(30 41 59 / var(--tw-bg-opacity));
	}

	.scroll-container::-webkit-scrollbar-thumb {
		--tw-bg-opacity: 1;
		background-color: rgb(100 116 139 / var(--tw-bg-opacity));
		border-radius: 5px;
	}
</style>
