<script lang="ts">
	import { fly } from 'svelte/transition';
	import DataStore from '$lib/stores/DataStore';
	import ActiveStore from '$lib/stores/ActiveStore';
	import default_img from '$lib/assets/default_img.png';
	import SymbolInput from '$lib/components/Form/SymbolInput.svelte';
	import Input from '$lib/components/Form/Input.svelte';
	import EventSelect from '$lib/components/Form/EventSelect.svelte';
	import BossSelect from '$lib/components/Form/BossSelect.svelte';
	import type { Character, MEvent, MSymbol, MBoss } from '$lib/types/types';
	import { ARCSYMBOLS, DAILYBOSSES, DAILYEVENTS, SACSYMBOLS, WEEKLYBOSSES, WEEKLYEVENTS } from '$lib/utils/defaults';

	const initializeInputs = (): void => {
		arcSymbols = JSON.parse(JSON.stringify(SACSYMBOLS));
		sacSymbols = JSON.parse(JSON.stringify(ARCSYMBOLS));
		dailyBosses = JSON.parse(JSON.stringify(DAILYBOSSES));
		weeklyBosses = JSON.parse(JSON.stringify(WEEKLYBOSSES));
		dailyEvents = JSON.parse(JSON.stringify(DAILYEVENTS));
		weeklyEvents = JSON.parse(JSON.stringify(WEEKLYEVENTS));

		character_id = '';
		character_img = '';
		character_name = '';
		character_job = '';
		character_lvl = 1;
		resetDrop = false;
	};

	let arcSymbols: MSymbol[];
	let sacSymbols: MSymbol[];

	let dailyBosses: MBoss[];
	let weeklyBosses: MBoss[];
	let dailyEvents: MEvent[];
	let weeklyEvents: MEvent[];

	let character_id: string;
	let character_img: string;
	let character_name: string;
	let character_job: string;
	let character_lvl: number;
	let resetDrop = false;
	let showForm = false;
	let isNameEmpty = true;
	initializeInputs();

	const createCharacter = (): Character => {
		return {
			id: character_id,
			img: handleImageValidation(character_img),
			name: character_name,
			job: character_job,
			level: character_lvl,
			events: {
				arcanes: arcSymbols,
				sacreds: sacSymbols,
				dailyEvents,
				weeklyEvents,
				dailyBosses,
				weeklyBosses
			}
		};
	};

	let formController = 'create';

	export function showEditForm(charObj: Character): Character {
		character_id = charObj.id;
		character_img = charObj.img;
		character_name = charObj.name;
		character_job = charObj.job;
		character_lvl = charObj.level;
		arcSymbols = charObj.events.arcanes;
		sacSymbols = charObj.events.sacreds;
		dailyEvents = charObj.events.dailyEvents;
		weeklyEvents = charObj.events.weeklyEvents;
		dailyBosses = charObj.events.dailyBosses;
		weeklyBosses = charObj.events.weeklyBosses;

		toggleForm();
		formController = 'edit';
		return charObj;
	}

	const handleSubmit = () => {
		if (formController == 'edit') {
			$DataStore.map((char, index) => {
				if (char.id === character_id) {
					let newCharacterObj = createCharacter();
					if (char.id === $ActiveStore[0].id) {
						$ActiveStore = [newCharacterObj];
						localStorage.setItem('active_char', JSON.stringify(newCharacterObj));
					}
					$DataStore[index] = newCharacterObj;
					localStorage.setItem('local_chars', JSON.stringify($DataStore));
				}
			});
			resetDrop = true;
			toggleForm();
		}

		if (formController == 'create') {
			character_lvl = Math.min(Math.max(character_lvl, 1), 300);

			arcSymbols.forEach((arcane) => {
				arcane.active = character_lvl >= arcane.reqLevel ? true : false;
			});

			sacSymbols.forEach((sacred) => {
				sacred.active = character_lvl >= sacred.reqLevel ? true : false;
			});

			const obj = createCharacter();
			obj.id = crypto.randomUUID();

			DataStore.update((data) => {
				let updatedData = [...data, obj];
				localStorage.setItem('local_chars', JSON.stringify(updatedData));
				return updatedData;
			});

			initializeInputs();
			resetDrop = true;
			console.log($DataStore);
			toggleForm();
		}
		formController = 'create';
	};

	const handleImageValidation = (img_url: string) => {
		return img_url.endsWith('.jpg') || img_url.endsWith('.png') ? character_img : default_img;
	};

	const toggleForm = () => {
		showForm = !showForm;
	};
</script>

<div class="flex w-9/12">
	<button
		id="add-char-btn"
		on:click={toggleForm}
		class="bg-green-300 m-2 p-2 ml-auto rounded-lg font-bold capitalize hover:bg-green-400 duration-200 active:scale-90 flex text-theme-base"
	>
		<svg class="w-8 p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor"
			><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
				d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
			/></svg
		>
		Character
	</button>
</div>

{#if showForm}
	<div id="form-backdrop" class="backdrop flex justify-center items-center z-10">
		<div
			transition:fly={{ y: 200, duration: 250 }}
			id="add-char-modal"
			class="bg-theme-base text-theme-dark relative rounded-lg z-10"
		>
			<form class="h-[90%] overflow-y-auto" on:submit|preventDefault={handleSubmit}>
				<div class="w-full text-center font-bold text-2xl mb-2">Add new Character</div>
				<div class="flex w-full">
					<!-- Left Side -->
					<div class="w-2/4 flex flex-col items-center border-r border-theme-decorated">
						<!-- Character Section -->
						<div>
							<div class="w-full text-center font-bold text-xl mb-2">Character</div>
							<Input bind:value={character_img} inputLabel="Image" />
							<Input bind:value={character_name} inputLabel="Name" />
							<Input bind:value={character_job} inputLabel="Job" />
							<Input bind:value={character_lvl} inputLabel="Level" />
						</div>
						<!-- Symbol Section -->
						<div class="w-3/4">
							<div class="w-full text-center font-bold text-xl mb-2">Symbols</div>
							{#if character_lvl < 200}
								<div class="w-full text-center font-bold text-xl mb-2">Level has not met minimum requirements</div>
							{/if}
							<SymbolInput bind:value={arcSymbols[0]} char_lvl={character_lvl} />
							<SymbolInput bind:value={arcSymbols[1]} char_lvl={character_lvl} />
							<SymbolInput bind:value={arcSymbols[2]} char_lvl={character_lvl} />
							<SymbolInput bind:value={arcSymbols[3]} char_lvl={character_lvl} />
							<SymbolInput bind:value={arcSymbols[4]} char_lvl={character_lvl} />
							<SymbolInput bind:value={arcSymbols[5]} char_lvl={character_lvl} />

							<SymbolInput bind:value={sacSymbols[0]} char_lvl={character_lvl} />
							<SymbolInput bind:value={sacSymbols[1]} char_lvl={character_lvl} />
							<SymbolInput bind:value={sacSymbols[2]} char_lvl={character_lvl} />
						</div>
					</div>

					<!-- Right Side -->
					<div class="w-2/4 flex flex-col items-center border-l border-theme-decorated">
						<!-- Events Section -->
						<div class="w-3/4">
							<div class="w-full text-center font-bold text-xl mb-2">Events</div>
							<EventSelect inputLabel="Daily_Events" bind:selectData={dailyEvents} />
							<EventSelect inputLabel="Weekly_Events" bind:selectData={weeklyEvents} />
							<BossSelect inputLabel="Daily_Bosses" bind:selectData={dailyBosses} />
							<BossSelect inputLabel="Weekly_Bosses" bind:selectData={weeklyBosses} />
						</div>
					</div>

					<!-- Buttons -->
					<div class="flex h-[10%] font-bold right-0 bottom-0 absolute m-2">
						<button
							on:click|preventDefault={toggleForm}
							class="hover:bg-gray-500 p-2 mr-2 mt-auto ml-auto rounded-lg bg-theme-soft duration-200 active:scale-90"
						>
							Cancel
						</button>
						<button
							type="submit"
							id="create-char-btn"
							class="bg-green-300 p-2 ml-2 mt-auto rounded-lg text-theme-base hover:bg-green-500 duration-200 active:scale-90"
						>
							Confirm
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
	}
</style>
