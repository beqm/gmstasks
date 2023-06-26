<script lang="ts">
	import DataStore from '$lib/stores/DataStore';
	import ActiveStore from '$lib/stores/ActiveStore';
	import default_img from '$lib/assets/default_img.png';
	import SymbolInput from '$lib/components/Form/SymbolInput.svelte';
	import Input from '$lib/components/Form/Input.svelte';
	import type { Character, MEvent, MSymbol } from '$lib/types/types';
	import EventSelect from '$lib/components/Form/EventSelect.svelte';

	let arcSymbolInputs: MSymbol[] = [
		{ name: 'VanishingJourney', level: 1, req_level: 200, exp: 1, gain: 8, active: false },
		{ name: 'ChuChu', level: 1, exp: 1, req_level: 210, gain: 8, active: false },
		{ name: 'Lachelein', level: 1, req_level: 220, exp: 1, gain: 8, active: false },
		{ name: 'Arcana', level: 1, req_level: 225, exp: 1, gain: 8, active: false },
		{ name: 'Morass', level: 1, req_level: 230, exp: 1, gain: 8, active: false },
		{ name: 'Esfera', level: 1, req_level: 235, exp: 1, gain: 8, active: false }
	];

	let sacSymbolInputs: MSymbol[] = [
		{ name: 'Cernium', level: 1, req_level: 260, exp: 1, gain: 8, active: false },
		{ name: 'Arcus', level: 1, req_level: 270, exp: 1, gain: 8, active: false },
		{ name: 'Odium', level: 1, req_level: 275, exp: 1, gain: 8, active: false }
	];

	let dailyBosses: MEvent[] = [
		{ name: 'Gollux', complete: false, active: false, amount: 1 },
		{ name: 'Easy_Normal_Arkarium', complete: false, active: false, amount: 1 },
		{ name: 'Normal_Hard_Hanmaru', complete: false, active: false, amount: 1 },
		{ name: 'Easy_Normal_Magnus', complete: false, active: false, amount: 1 },
		{ name: 'Easy_Normal_Papulatus', complete: false, active: false, amount: 1 },
		{ name: 'Easy_Normal_Hard_VonLeon', complete: false, active: false, amount: 1 },
		{ name: 'Easy_Normal_Chaos_Horntail', complete: false, active: false, amount: 1 },
		{ name: 'Normal_Hilla', complete: false, active: false, amount: 1 },
		{ name: 'Easy_Normal_Zakum', complete: false, active: false, amount: 1 },
		{ name: 'Normal_VonBon', complete: false, active: false, amount: 1 },
		{ name: 'Normal_Pierre', complete: false, active: false, amount: 1 },
		{ name: 'Normal_Crimson Queen', complete: false, active: false, amount: 1 },
		{ name: 'Normal_Vellum', complete: false, active: false, amount: 1 },
		{ name: 'Normal_OMNI-CLN', complete: false, active: false, amount: 1 },
		{ name: 'Normal_PinkBean', complete: false, active: false, amount: 1 }
	];

	let id = '';
	let img = '';
	let name = '';
	let job = '';
	let lvl = 1;

	const createCharacter = (): Character => {
		return {
			id: id,
			img: handleImageValidation(img),
			name: name,
			job: job,
			level: lvl,
			events: {
				arcanes: arcSymbolInputs,
				sacreds: sacSymbolInputs,
				dailies: [],
				weeklies: [],
				genericEvents: []
			}
		};
	};

	let message = '';
	let formController = 'create';

	export function showEditForm(charObj: Character): Character {
		id = charObj.id;
		img = charObj.img;
		name = charObj.name;
		job = charObj.job;
		lvl = charObj.level;
		arcSymbolInputs = charObj.events.arcanes;
		sacSymbolInputs = charObj.events.sacreds;

		showForm(false);
		formController = 'edit';
		return charObj;
	}

	const handleSubmit = () => {
		if (formController == 'edit') {
			$DataStore.map((char, index) => {
				if (char.id === id) {
					let newCharacterObj = createCharacter();
					if (char.id === $ActiveStore[0].id) {
						$ActiveStore = [newCharacterObj];
						localStorage.setItem('active_char', JSON.stringify(newCharacterObj));
					}
					$DataStore[index] = newCharacterObj;
					localStorage.setItem('local_chars', JSON.stringify($DataStore));
				}
			});
			closeForm();
		}

		if (formController == 'create') {
			console.log(dailyBosses);
			lvl = Math.min(Math.max(lvl, 1), 300);
			const arcanesLevels = [200, 210, 220, 225, 230, 235];
			const sacredsLevels = [260, 270, 275];

			sacSymbolInputs.forEach((arcane, index) => {
				arcane.active = lvl >= arcanesLevels[index] ? true : false;
			});

			sacSymbolInputs.forEach((sacred, index) => {
				sacred.active = lvl >= sacredsLevels[index] ? true : false;
			});

			const obj = createCharacter();
			obj.id = crypto.randomUUID();

			DataStore.update((data) => {
				let updatedData = [...data, obj];
				localStorage.setItem('local_chars', JSON.stringify(updatedData));
				return updatedData;
			});

			console.log($DataStore);
			closeForm();
		}
		formController = 'create';
	};
	// lvl = Math.min(Math.max(parseInt(levelInput.value), 1), 300);

	const handleImageValidation = (img_url: string) => {
		return img_url.endsWith('.jpg') || img_url.endsWith('.png') ? img : default_img;
	};

	const showForm = (clearInputs: boolean) => {
		let addCharModal = document?.querySelector('#add-char-modal') as HTMLDialogElement;
		addCharModal.showModal();

		if (clearInputs) {
			message = '';
			id = '';
			img = '';
			name = '';
			job = '';
			lvl = 1;
		}
	};

	const closeForm = () => {
		let addCharModal = document?.querySelector('#add-char-modal') as HTMLDialogElement;
		addCharModal.close();
	};
</script>

<div class="flex w-9/12">
	<button
		id="add-char-btn"
		on:click={() => showForm(true)}
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

<dialog id="add-char-modal" class="bg-theme-base text-theme-dark relative">
	<form class="h-[90%] overflow-y-auto" on:submit={handleSubmit}>
		<div class="w-full text-center font-bold text-lg mb-2">Add new Character</div>
		<div class="flex w-full h-2/4">
			<!-- Left Side -->
			<div class="w-2/4 flex flex-col items-center border-r border-theme-decorated">
				<!-- Character Section -->
				<div>
					<div class="w-full text-center font-bold text-xl mb-2">Character</div>
					<Input bind:value={img} inputLabel="Image" />
					<Input bind:value={name} inputLabel="Name" />
					<Input bind:value={job} inputLabel="Job" />
					<Input bind:value={lvl} inputLabel="Level" />
				</div>
				<!-- Symbol Section -->
				<div class="w-3/4">
					<div class="w-full text-center font-bold text-xl mb-2">Symbols</div>
					{#if lvl < 200}
						<div class="w-full text-center font-bold text-xl mb-2">Level has not met minimum requirements</div>
					{/if}
					<SymbolInput bind:value={arcSymbolInputs[0]} char_lvl={lvl} />
					<SymbolInput bind:value={arcSymbolInputs[1]} char_lvl={lvl} />
					<SymbolInput bind:value={arcSymbolInputs[2]} char_lvl={lvl} />
					<SymbolInput bind:value={arcSymbolInputs[3]} char_lvl={lvl} />
					<SymbolInput bind:value={arcSymbolInputs[4]} char_lvl={lvl} />
					<SymbolInput bind:value={arcSymbolInputs[5]} char_lvl={lvl} />

					<SymbolInput bind:value={sacSymbolInputs[0]} char_lvl={lvl} />
					<SymbolInput bind:value={sacSymbolInputs[1]} char_lvl={lvl} />
					<SymbolInput bind:value={sacSymbolInputs[2]} char_lvl={lvl} />
				</div>
			</div>

			<!-- Right Side -->
			<div class="w-2/4 flex flex-col items-center border-l border-theme-decorated">
				<!-- Events Section -->
				<div class="w-3/4">
					<div class="w-full text-center font-bold text-xl mb-2">Events</div>
					<EventSelect inputLabel="Daily_Bosses" bind:selectData={dailyBosses} />
				</div>
			</div>

			<!-- Buttons -->
			<div class="flex h-[10%] font-bold right-0 bottom-0 absolute m-2">
				<button
					on:click|preventDefault={closeForm}
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
</dialog>
