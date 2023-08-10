<script lang="ts">
	import MainStore from '$lib/stores/MainStore';

	import Form from '$lib/components/Form/Form.svelte';
	import ActiveDisplay from '$lib/components/Form/ActiveDisplay.svelte';
	import ConfirmDelete from '$lib/components/Form/ConfirmDelete.svelte';
	import ImportModal from '$lib/components/Form/ImportModal.svelte';

	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { fly } from 'svelte/transition';
	import { saveMapToLocalStorage, tasksMapToObj } from '$lib/utils/storage';

	const flipDurationMs = 100;
	let delModalInfo: Character;
	let isOverlayActive = false;
	let dropTargetStyle = {
		b: 'green'
	};

	let exportData = () => {
		let localActive = localStorage.getItem('active');
		let localCharacters = localStorage.getItem('characters');
		let localDashboard = localStorage.getItem('dashboard');

		let data = {
			active: localActive,
			characters: localCharacters,
			dashboard: localDashboard
		};

		const a = document.createElement('a');
		const blob = new Blob(
			[
				JSON.stringify(
					data,
					(key, value) => {
						if (value instanceof Map) {
							return Object.fromEntries(value);
						}
						return value;
					},
					2
				)
			],
			{ type: 'application/json' }
		);
		const url = window.URL.createObjectURL(blob);
		a.href = url;
		a.download = 'data.json';
		a.click();
	};

	type FormType = Form;
	let FormComponentInstance: FormType;

	const handleConsider = (e: CustomEvent<DndEvent<Character>>) => {
		$MainStore.characters = new Map(e.detail.items.map((obj) => [obj.id, obj]));
	};

	const handleFinalize = (e: CustomEvent<DndEvent<Character>>) => {
		$MainStore.characters = new Map(e.detail.items.map((obj) => [obj.id, obj]));
		saveMapToLocalStorage($MainStore.characters, 'characters');
	};

	let toggleOverlay = () => {
		isOverlayActive = !isOverlayActive;
	};

	const editCharacter = (id: string) => {
		if (FormComponentInstance) {
			let charObj = $MainStore.characters.get(id);
			if (charObj) {
				FormComponentInstance.showEditForm(charObj);
			}
		}
	};

	const activateCharacter = (id: string) => {
		let charObj = $MainStore.characters.get(id);
		if (charObj) {
			$MainStore.active = charObj;
			charObj = tasksMapToObj(charObj);
			localStorage.setItem('active', JSON.stringify(charObj));
		}
	};

	const showDelModal = (char: Character) => {
		delModalInfo = char;
	};
</script>

<ConfirmDelete currentCharIteration={delModalInfo} toggleOverlayFunction={toggleOverlay} />

<div in:fly={{ x: -200, duration: 250 }} class="flex flex-col w-full items-center mt-10">
	<div class="flex w-full lg:w-9/12 justify-end">
		<ImportModal />
		<button
			on:click={exportData}
			class="flex justify-items-center bg-green-300 m-2 p-2 rounded-lg font-bold capitalize hover:bg-green-400 duration-200 active:scale-90 text-theme-base"
		>
			<svg class="h-[1.5rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"
				><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
				/></svg
			>
		</button>
		<Form bind:this={FormComponentInstance} />
	</div>
	<div
		class="flex flex-col w-full lg:w-9/12 overflow-y-scroll sm:max-h-[640px] bg-theme-base rounded-lg drop-shadow-lg scroll-container"
	>
		<!-- Columns -->
		<div class="flex text-center justify-evenly text-sm lg:text-lg font-bold w-full">
			<div class="w-1/6 align-middle p-2 uppercase" />
			<div class="w-1/6 align-middle p-2 uppercase">image</div>
			<div class="w-1/6 align-middle p-2 uppercase">name</div>
			<div class="w-1/6 align-middle p-2 uppercase">job</div>
			<div class="w-1/6 align-middle p-2 uppercase">level</div>
			<div class="w-1/6 align-middle p-2" />
		</div>
		{#if $MainStore.characters}
			{#if $MainStore.characters.size > 0}
				<div
					use:dndzone={{ items: [...$MainStore.characters.values()], flipDurationMs: flipDurationMs, dropTargetStyle }}
					on:consider={handleConsider}
					on:finalize={handleFinalize}
				>
					<!-- Rows -->
					{#each [...$MainStore.characters] as [key, char] (char.id)}
						<button
							class="flex justify-evenly w-full cursor-pointer border bg-theme-soft border-theme-soft"
							animate:flip={{ duration: flipDurationMs }}
							on:click={() => activateCharacter(char.id)}
						>
							<div class="w-1/6 items-center flex justify-center">
								<ActiveDisplay currentCharIteration={char} />
							</div>

							<div class="w-1/6 items-center flex justify-center">
								<img src={char.img} alt="Character" />
							</div>

							<div class="w-1/6 flex justify-center items-center overflow-hidden">{char.name}</div>
							<div class="w-1/6 flex justify-center items-center overflow-hidden">{char.job}</div>
							<div class="w-1/6 flex justify-center items-center">{char.level}</div>
							<div class="w-1/6 flex justify-center flex-wrap p-2">
								<button
									on:click={() => editCharacter(char.id)}
									id="add-char-btn"
									class="bg-blue-400 p-4 m-2 max-h-[70px] rounded-lg font-bold capitalize duration-200 active:scale-90"
								>
									<svg
										class=""
										height="1.2em"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
										fill="currentColor"
										><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
											d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
										/></svg
									>
								</button>
								<button
									on:click={() => showDelModal(char)}
									id="add-char-btn"
									class="bg-red-400 p-4 m-2 max-h-[70px] rounded-lg font-bold capitalize duration-200 active:scale-90"
								>
									<svg
										class=""
										height="1.2em"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 448 512"
										fill="currentColor"
										><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
											d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
										/></svg
									>
								</button>
							</div>
						</button>
					{/each}
				</div>
			{:else if $MainStore.characters.size == 0}
				<div class="text-center w-ful text-lg font-bold p-5">No Data Available</div>
			{/if}
		{:else}
			<div class="text-center w-ful text-lg font-bold p-5">No Data Available</div>
		{/if}
	</div>
</div>
