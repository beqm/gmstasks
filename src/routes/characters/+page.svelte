<script lang="ts">
	import DataStore from '$lib/stores/DataStore';
	import ActiveStore from '$lib/stores/ActiveStore';
	import Form from '$lib/components/Form/Form.svelte';
	import ActiveDisplay from '$lib/components/Form/ActiveDisplay.svelte';
	import ConfirmDelete from '$lib/components/Form/ConfirmDelete.svelte';
	import { onMount } from 'svelte';
	import { StorageToStore } from '$lib/utils';
	import type { Character } from '$lib/types/types';
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { fly } from 'svelte/transition';

	const flipDurationMs = 100;
	let delModalInfo: Character;
	let isOverlayActive = false;
	let dropTargetStyle = {
		b: 'green'
	};

	type FormType = Form;
	let FormComponentInstance: FormType;

	const handleConsider = (e: CustomEvent<DndEvent<Character>>) => {
		$DataStore = e.detail.items;
	};

	const handleFinalize = (e: CustomEvent<DndEvent<Character>>) => {
		$DataStore = e.detail.items;
		localStorage.setItem('local_chars', JSON.stringify($DataStore));
	};

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
		let [charObj] = $DataStore.filter((char) => char.id === id);
		$ActiveStore = charObj;
		localStorage.setItem('active_char', JSON.stringify(charObj));
	};

	const showDelModal = (char: Character) => {
		delModalInfo = char;
	};
</script>

<ConfirmDelete currentCharIteration={delModalInfo} toggleOverlayFunction={toggleOverlay} />

<div in:fly={{ x: -200, duration: 250 }} class="flex flex-col w-full items-center mt-10">
	<Form bind:this={FormComponentInstance} />
	<div class="flex flex-col w-9/12 bg-theme-base rounded-lg drop-shadow-lg scroll-container">
		<!-- Columns -->
		<div class="flex text-center justify-evenly text-lg font-bold w-full">
			<div class="w-1/5 align-middle p-2 uppercase">image</div>
			<div class="w-1/5 align-middle p-2 uppercase">name</div>
			<div class="w-1/5 align-middle p-2 uppercase">job</div>
			<div class="w-1/5 align-middle p-2 uppercase">level</div>
			<div class="w-[10%] align-middle p-2" />
		</div>
		{#if $DataStore.length > 0}
			<div
				use:dndzone={{ items: $DataStore, flipDurationMs: flipDurationMs, dropTargetStyle }}
				on:consider={handleConsider}
				on:finalize={handleFinalize}
			>
				<!-- Rows -->
				{#each $DataStore as character (character.id)}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						class="flex justify-evenly w-full cursor-pointer border-b border-theme-base"
						animate:flip={{ duration: flipDurationMs }}
						on:click={() => activateCharacter(character.id)}
					>
						<div class="w-1/5 align-middle flex justify-center">
							<ActiveDisplay currentCharIteration={character} />
							<img src={character.img} alt="Character" class="flex mr-auto" />
						</div>

						<div class="w-1/5 flex justify-center items-center">{character.name}</div>
						<div class="w-1/5 flex justify-center items-center">{character.job}</div>
						<div class="w-1/5 flex justify-center items-center">{character.level}</div>
						<div class="flex w-[10%] align-middle p-2">
							<button
								on:click={() => editCharacter(character.id)}
								id="add-char-btn"
								class="bg-blue-400 m-2 p-3 ml-auto rounded-lg font-bold capitalize duration-200 active:scale-90"
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
						</div>
					</div>
				{/each}
			</div>
		{:else if $DataStore.length == 0}
			<div class="text-center w-ful text-lg font-bold p-5">No Data Available</div>
		{/if}
	</div>
</div>
