<script lang="ts">
	import { fly } from 'svelte/transition';
	import MainStore from '$lib/stores/MainStore';
	import SymbolInput from '$lib/components/Form/SymbolInput.svelte';
	import Input from '$lib/components/Form/Input.svelte';
	import EventSelect from '$lib/components/Form/EventSelect.svelte';
	import BossSelect from '$lib/components/Form/BossSelect.svelte';
	import { validateImage } from '$lib/utils/validation';
	import { createDashBoardMap, initCharacter, mapToLocalStorage, tasksMapToObj } from '$lib/utils/storage';
	import { validateSymbols } from '$lib/utils/validation';
	import { clickOutside } from '$lib/utils/clickOutside';

	let character: Character = initCharacter();
	let arcanes = Object.fromEntries(character.track.arcanes);
	let sacreds = Object.fromEntries(character.track.sacreds);

	let showForm = false;
	let formTitle: string;

	let formController = 'create';

	export function showEditForm(charObj: Character): Character {
		formController = 'edit';
		formTitle = 'Edit Character';
		character = charObj;
		arcanes = Object.fromEntries(charObj.track.arcanes);
		sacreds = Object.fromEntries(charObj.track.sacreds);
		openForm(false);
		return charObj;
	}

	const handleSubmit = () => {
		if (formController == 'create') {
			character.id = crypto.randomUUID();
		}

		character.level = Math.min(Math.max(character.level, 1), 300);

		character.img = validateImage(character);

		character.track.arcanes = new Map(Object.entries(arcanes));
		character.track.sacreds = new Map(Object.entries(sacreds));
		validateSymbols(character.track.arcanes, character.level);
		validateSymbols(character.track.sacreds, character.level);

		MainStore.update((data) => {
			data.active = character;
			data.characters.set(character.id, character);
			return data;
		});

		if (character.isTracked) {
			let dashMap = createDashBoardMap(character);

			$MainStore.dashboard.forEach((value, key) => {
				if (key.split('|')[0] == character.id) {
					$MainStore.dashboard.delete(key);
				}
			});

			dashMap.forEach((value, key) => {
				$MainStore.dashboard.set(key, value);
			});

			mapToLocalStorage($MainStore.dashboard, 'dashboard');
		}

		character = tasksMapToObj(character);
		localStorage.setItem('active', JSON.stringify(character));
		mapToLocalStorage($MainStore.characters, 'characters');
		$MainStore = $MainStore;

		closeForm();
	};

	const openForm = (clear: boolean = true) => {
		if (clear) {
			formController = 'create';
			character = initCharacter();
		}
		formTitle = 'Add new Character';
		showForm = true;
	};
	const closeForm = () => {
		character = initCharacter();
		formTitle = 'Add new Character';
		showForm = false;
	};
</script>

<button
	id="add-char-btn"
	on:click={() => openForm()}
	class="bg-green-100 text-light m-2 p-1 rounded-lg font-bold capitalize hover:bg-green-200 duration-200 active:scale-90 flex text-center justify-center items-center"
>
	<svg class="h-[1.5rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor"
		><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
			d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
		/></svg
	>
	<div class="flex items-center p-1">Character</div>
</button>

{#if showForm}
	<!-- Backdrop  -->
	<div class="fixed top-0 left-0 right-0 bottom-0 bg-backdrop flex justify-center items-center z-10">
		<form
			transition:fly={{ y: 200, duration: 250 }}
			use:clickOutside={closeForm}
			class="bg-primary-400 w-full h-full lg:h-fit lg:w-1/2 relative flex flex-col rounded-lg"
		>
			<div class="h-[10%] w-full text-center font-bold text-2xl mb-2 mt-2">{formTitle}</div>

			<div class="h-[80%] w-full">
				<div class="flex w-full mt-10">
					<!-- Left Side -->
					<div
						class="w-1/2 flex flex-col items-center border-r border-secondary-200 md:max-h-[500px] overflow-y-scroll"
					>
						<!-- Character Section -->
						<div>
							<div class="w-full text-center font-bold text-xl mb-2">Character</div>
							<Input bind:value={character.img} inputLabel="Image" />
							<Input bind:value={character.name} inputLabel="Name" />
							<Input bind:value={character.job} inputLabel="Job" />
							<Input bind:value={character.level} inputLabel="Level" isNumber={true} />
						</div>
						<!-- Symbol Section -->
						<div class="w-full flex flex-col items-center">
							<div class="w-full text-center font-bold text-xl mb-2">Symbols</div>
							{#if character.level < 200}
								<div class="w-full text-center font-bold text-xl mb-2">Level has not met minimum requirements</div>
							{/if}
							<div class="w-1/2">
								<SymbolInput
									bind:value={arcanes.Vanishing}
									char_lvl={character.level}
									img="/assets/symbol_icons/vanishing_icon.webp"
								/>
								<SymbolInput
									bind:value={arcanes.ChuChu}
									char_lvl={character.level}
									img="/assets/symbol_icons/chuchu_icon.webp"
								/>
								<SymbolInput
									bind:value={arcanes.Lachelein}
									char_lvl={character.level}
									img="/assets/symbol_icons/lachelein_icon.webp"
								/>
								<SymbolInput
									bind:value={arcanes.Arcana}
									char_lvl={character.level}
									img="/assets/symbol_icons/esfera_icon.webp"
								/>
								<SymbolInput
									bind:value={arcanes.Morass}
									char_lvl={character.level}
									img="/assets/symbol_icons/morass_icon.webp"
								/>
								<SymbolInput
									bind:value={arcanes.Esfera}
									char_lvl={character.level}
									img="/assets/symbol_icons/esfera_icon.webp"
								/>

								<SymbolInput
									bind:value={sacreds.Cernium}
									char_lvl={character.level}
									img="/assets/symbol_icons/cernium_icon.webp"
								/>
								<SymbolInput
									bind:value={sacreds.Arcus}
									char_lvl={character.level}
									img="/assets/symbol_icons/arcus_icon.webp"
								/>
								<SymbolInput
									bind:value={sacreds.Odium}
									char_lvl={character.level}
									img="/assets/symbol_icons/odium_icon.webp"
								/>
							</div>
						</div>
					</div>

					<!-- Right Side -->
					<div class="w-2/4 flex flex-col items-center border-l border-secondary-200 overflow-y-auto max-h-[500px]">
						<div class="w-3/4">
							<div class="w-full text-center font-bold text-xl mb-2">Events</div>
							<EventSelect inputLabel="Daily_Events" bind:selectData={character.track.dailyEvents} />
							<EventSelect inputLabel="Weekly_Events" bind:selectData={character.track.weeklyEvents} />
							<BossSelect inputLabel="Daily_Bosses" bind:selectData={character.track.dailyBosses} />
							<BossSelect inputLabel="Weekly_Bosses" bind:selectData={character.track.weeklyBosses} />
						</div>
					</div>
				</div>
			</div>

			<!-- Buttons -->
			<div class="flex justify-end h-[10%]">
				<div class="flex font-bold m-2 w-full sm:w-1/4 md:w-1/5">
					<button
						on:click|preventDefault={closeForm}
						type="button"
						class="bg-primary-200 hover:bg-secondary-300 w-1/2 p-2 mt-auto ml-auto rounded-lg bg-theme-soft duration-200 active:scale-90"
					>
						Cancel
					</button>
					<button
						on:click={handleSubmit}
						type="submit"
						id="create-char-btn"
						class="bg-green-100 p-2 ml-2 w-1/2 mt-auto rounded-lg text-light hover:bg-green-200 duration-200 active:scale-90"
					>
						Confirm
					</button>
				</div>
			</div>
		</form>
	</div>
{/if}
