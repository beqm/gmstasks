<script lang="ts">
	import { fly } from 'svelte/transition';
	import DataStore from '$lib/stores/DataStore';
	import ActiveStore from '$lib/stores/ActiveStore';
	import default_img from '$lib/assets/default_img.png';
	import SymbolInput from '$lib/components/Form/SymbolInput.svelte';
	import Input from '$lib/components/Form/Input.svelte';
	import EventSelect from '$lib/components/Form/EventSelect.svelte';
	import BossSelect from '$lib/components/Form/BossSelect.svelte';
	import type { Character, MEvent, MSymbol, MBoss, MEvents } from '$lib/types/types';
	import data from '$lib/utils/default.json';

	let inputs: MEvents = data;
	const initializeInputs = (): void => {
		arcaneSymbols = JSON.parse(JSON.stringify(inputs.arcaneSymbols));
		sacredSymbols = JSON.parse(JSON.stringify(inputs.sacredSymbols));
		dailyBosses = JSON.parse(JSON.stringify(inputs.dailyBosses));
		weeklyBosses = JSON.parse(JSON.stringify(inputs.weeklyBosses));
		dailyEvents = JSON.parse(JSON.stringify(inputs.dailyEvents));
		weeklyEvents = JSON.parse(JSON.stringify(inputs.weeklyEvents));

		charImg = '';
		charName = '';
		charJob = '';
		charLvl = 1;

		resetDrop = false;
	};

	let arcaneSymbols: MSymbol[];
	let sacredSymbols: MSymbol[];

	let dailyBosses: MBoss[];
	let weeklyBosses: MBoss[];
	let dailyEvents: MEvent[];
	let weeklyEvents: MEvent[];

	let charId: string;
	let charImg: string;
	let charName: string;
	let charJob: string;
	let charLvl: number;

	let resetDrop = false;
	let showForm = false;

	initializeInputs();

	const createCharacter = (): Character => {
		return {
			id: crypto.randomUUID(),
			img: handleImageValidation(charImg),
			name: charName,
			job: charJob,
			level: charLvl,
			track: {
				arcaneSymbols,
				sacredSymbols,
				dailyEvents,
				weeklyEvents,
				dailyBosses,
				weeklyBosses
			}
		};
	};

	let formController = 'create';

	export function showEditForm(charObj: Character): Character {
		formController = 'edit';

		charId = charObj.id;
		charImg = charObj.img;
		charName = charObj.name;
		charJob = charObj.job;
		charLvl = charObj.level;
		arcaneSymbols = charObj.track.arcaneSymbols;
		sacredSymbols = charObj.track.sacredSymbols;
		dailyEvents = charObj.track.dailyEvents;
		weeklyEvents = charObj.track.weeklyEvents;
		dailyBosses = charObj.track.dailyBosses;
		weeklyBosses = charObj.track.weeklyBosses;

		toggleForm();
		return charObj;
	}

	const handleSubmit = () => {
		if (formController == 'edit') {
			$DataStore.map((char, index) => {
				if (char.id === charId) {
					let editedCharObj = createCharacter();
					if ($ActiveStore) {
						if (char.id === $ActiveStore.id) {
							$ActiveStore = editedCharObj;
							localStorage.setItem('active_char', JSON.stringify(editedCharObj));
						}
						$DataStore[index] = editedCharObj;
						localStorage.setItem('local_chars', JSON.stringify($DataStore));
					}
				}
			});
			resetDrop = true;
			toggleForm();
		}

		if (formController == 'create') {
			charLvl = Math.min(Math.max(charLvl, 1), 300);
			const charObj = createCharacter();

			arcaneSymbols.forEach((arcane) => {
				arcane.active = charLvl >= arcane.reqLevel ? true : false;
			});

			sacredSymbols.forEach((sacred) => {
				sacred.active = charLvl >= sacred.reqLevel ? true : false;
			});

			DataStore.update((data) => {
				let updatedData = [...data, charObj];
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
		return img_url.endsWith('.jpg') || img_url.endsWith('.png') ? charImg : default_img;
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
				<div class="w-full text-center font-bold text-2xl mb-2 mt-2">Add new Character</div>
				<div class="flex w-full">
					<!-- Left Side -->
					<div class="w-2/4 flex flex-col items-center border-r border-theme-decorated">
						<!-- Character Section -->
						<div>
							<div class="w-full text-center font-bold text-xl mb-2">Character</div>
							<Input bind:value={charImg} inputLabel="Image" />
							<Input bind:value={charName} inputLabel="Name" />
							<Input bind:value={charJob} inputLabel="Job" />
							<Input bind:value={charLvl} inputLabel="Level" />
						</div>
						<!-- Symbol Section -->
						<div class="w-3/4">
							<div class="w-full text-center font-bold text-xl mb-2">Symbols</div>
							{#if charLvl < 200}
								<div class="w-full text-center font-bold text-xl mb-2">Level has not met minimum requirements</div>
							{/if}
							<SymbolInput bind:value={arcaneSymbols[0]} char_lvl={charLvl} />
							<SymbolInput bind:value={arcaneSymbols[1]} char_lvl={charLvl} />
							<SymbolInput bind:value={arcaneSymbols[2]} char_lvl={charLvl} />
							<SymbolInput bind:value={arcaneSymbols[3]} char_lvl={charLvl} />
							<SymbolInput bind:value={arcaneSymbols[4]} char_lvl={charLvl} />
							<SymbolInput bind:value={arcaneSymbols[5]} char_lvl={charLvl} />

							<SymbolInput bind:value={sacredSymbols[0]} char_lvl={charLvl} />
							<SymbolInput bind:value={sacredSymbols[1]} char_lvl={charLvl} />
							<SymbolInput bind:value={sacredSymbols[2]} char_lvl={charLvl} />
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
