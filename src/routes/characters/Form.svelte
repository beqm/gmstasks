<script lang="ts">
	import DataStore from '$lib/stores/DataStore';
	import ActiveStore from '$lib/stores/ActiveStore';
	import default_img from '$lib/assets/default_img.png';
	import type { Character, MSymbol } from '$lib/types/types';

	let arcSymbolInputs: MSymbol[] = [
		{ name: 'VanishingJourney', level: 1, exp: 1, gain: 8, active: false },
		{ name: 'ChuChu', level: 1, exp: 1, gain: 8, active: false },
		{ name: 'Lachelein', level: 1, exp: 1, gain: 8, active: false },
		{ name: 'Arcana', level: 1, exp: 1, gain: 8, active: false },
		{ name: 'Morass', level: 1, exp: 1, gain: 8, active: false },
		{ name: 'Esfera', level: 1, exp: 1, gain: 8, active: false }
	];

	let sacSymbolInputs: MSymbol[] = [
		{ name: 'Cernium', level: 1, exp: 1, gain: 8, active: false },
		{ name: 'Arcus', level: 1, exp: 1, gain: 8, active: false },
		{ name: 'Odium', level: 1, exp: 1, gain: 8, active: false }
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

	const handleLevelValidation = () => {
		let levelInput = document?.querySelector('#level') as HTMLInputElement;
		lvl = Math.min(Math.max(parseInt(levelInput.value), 1), 300);

		const inputs: Record<string, number> = {
			'VJ-input': 200,
			'Chu-input': 210,
			'Lach-input': 220,
			'Arcana-input': 225,
			'Moras-input': 230,
			'Esfera-input': 235,
			'Cernium-input': 260,
			'Arcus-input': 270,
			'Odium-input': 275
		};

		Object.entries(inputs).forEach(([id, value]) => {
			const input = document.querySelector<HTMLDivElement>(`#${id}`);
			if (input) {
				input.className =
					lvl >= value
						? 'text-theme-mid font-bold text-lg w-1/3 text-center border border-gray-500 bg-slate-700 rounded-lg'
						: 'hidden';
			}
		});
	};

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
		class="bg-green-300 m-2 p-2 ml-auto rounded-lg font-bold capitalize hover:bg-green-400 duration-200 active:scale-90 flex"
	>
		<svg class="w-8 p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor"
			><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
				d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
			/></svg
		>
		Character
	</button>
</div>

<dialog id="add-char-modal" class="bg-theme-mid">
	<form id="add-char-form" on:submit|preventDefault={handleSubmit}>
		<div class="flex flex-col w-full items-center">
			<div class="flex font-bold text-theme-mid text-2xl">Add new Character</div>
			<p class="font-bold text-red-300 p-2 text-lg">{message}</p>
		</div>

		<div class="flex w-full">
			<div class="flex flex-col w-2/6 items-center">
				<div class="flex w-full font-bold text-theme-mid justify-center text-2xl mb-10">Character</div>

				<label for="img" class="block text-m text-theme-mid font-bold text-lg">Image URL</label>
				<div class="mt-1">
					<input
						id="img"
						name="img"
						type="text"
						class="mb-8 bg-slate-500 focus:bg-slate-700 border-[0.15rem] rounded-lg border-gray-800 text-theme-mid text-xl"
						bind:value={img}
					/>
				</div>

				<label for="name" class="block text-m text-theme-mid font-bold text-lg">Name</label>
				<div class="mt-1">
					<input
						id="name"
						name="name"
						type="text"
						class="mb-8 bg-slate-500 focus:bg-slate-700 border-[0.15rem] rounded-lg border-gray-800 text-theme-mid text-xl"
						bind:value={name}
					/>
				</div>

				<label for="job" class="block text-m text-theme-mid font-bold text-lg mt-2">Job</label>
				<div class="mt-1">
					<input
						id="job"
						name="job"
						type="text"
						class="mb-8 bg-slate-500 focus:bg-slate-700 border-[0.15rem] rounded-lg border-gray-800 text-theme-mid text-xl"
						bind:value={job}
					/>
				</div>

				<label for="level" class="block text-m text-theme-mid font-bold text-lg mt-2">Level</label>
				<div class="mt-1">
					<input
						on:input={handleLevelValidation}
						maxlength="3"
						id="level"
						name="level"
						type="number"
						class="bg-slate-500 focus:bg-slate-700 outline-none border-[0.15rem] rounded-lg border-gray-800 text-theme-mid text-xl"
						bind:value={lvl}
					/>
				</div>
			</div>
			<div id="symbol-form" class="flex flex-col w-2/3">
				<div class="flex w-full font-bold text-theme-mid justify-center text-2xl mb-10">Symbols</div>

				<div class="flex flex-wrap">
					<button id="VJ-input" class="hidden" disabled>
						VanishingJourney
						<div class="flex mb-10 justify-evenly">
							<div class="flex flex-col w-1/4 justify-center">
								<label for="s-lvl" class="block text-m text-theme-mid font-bold text-lg">Level</label>
								<input
									id="s-lvl"
									name="s-lvl"
									type="text"
									class=" bg-slate-500 focus:bg-slate-700 border-[0.15rem] rounded-lg border-gray-800 text-theme-mid text-xl"
									bind:value={arcSymbolInputs[0].level}
								/>
							</div>

							<div class="flex flex-col w-1/4 justify-center">
								<label for="s-exp" class="block text-m text-theme-mid font-bold text-lg">Exp</label>
								<input
									id="s-exp"
									name="s-exp"
									type="text"
									class=" bg-slate-500 focus:bg-slate-700 border-[0.15rem] rounded-lg border-gray-800 text-theme-mid text-xl"
									bind:value={arcSymbolInputs[0].exp}
								/>
							</div>
						</div>
					</button>

					<div id="Chu-input" class="hidden">
						Chuchu
						<div class="flex mb-10 justify-evenly">
							<div class="flex flex-col w-1/4 justify-center">
								<label for="s-lvl" class="block text-m text-theme-mid font-bold text-lg">Level</label>
								<input
									id="s-lvl"
									name="s-lvl"
									type="text"
									class=" bg-slate-500 focus:bg-slate-700 border-[0.15rem] rounded-lg border-gray-800 text-theme-mid text-xl"
									bind:value={arcSymbolInputs[1].level}
								/>
							</div>

							<div class="flex flex-col w-1/4 justify-center">
								<label for="s-exp" class="block text-m text-theme-mid font-bold text-lg">Exp</label>
								<input
									id="s-exp"
									name="s-exp"
									type="text"
									class=" bg-slate-500 focus:bg-slate-700 border-[0.15rem] rounded-lg border-gray-800 text-theme-mid text-xl"
									bind:value={arcSymbolInputs[1].exp}
								/>
							</div>
						</div>
					</div>

					<div id="Lach-input" class="hidden">
						Lachelein
						<div class="flex mb-10 justify-evenly">
							<div class="flex flex-col w-1/4 justify-center">
								<label for="s-lvl" class="block text-m text-theme-mid font-bold text-lg">Level</label>
								<input
									id="s-lvl"
									name="s-lvl"
									type="text"
									class=" bg-slate-500 focus:bg-slate-700 border-[0.15rem] rounded-lg border-gray-800 text-theme-mid text-xl"
									bind:value={arcSymbolInputs[2].level}
								/>
							</div>

							<div class="flex flex-col w-1/4 justify-center">
								<label for="s-exp" class="block text-m text-theme-mid font-bold text-lg">Exp</label>
								<input
									id="s-exp"
									name="s-exp"
									type="text"
									class=" bg-slate-500 focus:bg-slate-700 border-[0.15rem] rounded-lg border-gray-800 text-theme-mid text-xl"
									bind:value={arcSymbolInputs[2].exp}
								/>
							</div>
						</div>
					</div>

					<div id="Arcana-input" class="hidden">
						Arcana
						<div class="flex mb-10 justify-evenly">
							<div class="flex flex-col w-1/4 justify-center">
								<label for="s-lvl" class="block text-m text-theme-mid font-bold text-lg">Level</label>
								<input
									id="s-lvl"
									name="s-lvl"
									type="text"
									class=" bg-slate-500 focus:bg-slate-700 border-[0.15rem] rounded-lg border-gray-800 text-theme-mid text-xl"
									bind:value={arcSymbolInputs[3].level}
								/>
							</div>

							<div class="flex flex-col w-1/4 justify-center">
								<label for="s-exp" class="block text-m text-theme-mid font-bold text-lg">Exp</label>
								<input
									id="s-exp"
									name="s-exp"
									type="text"
									class=" bg-slate-500 focus:bg-slate-700 border-[0.15rem] rounded-lg border-gray-800 text-theme-mid text-xl"
									bind:value={arcSymbolInputs[3].exp}
								/>
							</div>
						</div>
					</div>

					<div id="Moras-input" class="hidden">
						Morass
						<div class="flex mb-10 justify-evenly">
							<div class="flex flex-col w-1/4 justify-center">
								<label for="s-lvl" class="block text-m text-theme-mid font-bold text-lg">Level</label>
								<input
									id="s-lvl"
									name="s-lvl"
									type="text"
									class=" bg-slate-500 focus:bg-slate-700 border-[0.15rem] rounded-lg border-gray-800 text-theme-mid text-xl"
									bind:value={arcSymbolInputs[4].level}
								/>
							</div>

							<div class="flex flex-col w-1/4 justify-center">
								<label for="s-exp" class="block text-m text-theme-mid font-bold text-lg">Exp</label>
								<input
									id="s-exp"
									name="s-exp"
									type="text"
									class=" bg-slate-500 focus:bg-slate-700 border-[0.15rem] rounded-lg border-gray-800 text-theme-mid text-xl"
									bind:value={arcSymbolInputs[4].exp}
								/>
							</div>
						</div>
					</div>

					<div id="Esfera-input" class="hidden">
						Esfera
						<div class="flex mb-10 justify-evenly">
							<div class="flex flex-col w-1/4 justify-center">
								<label for="s-lvl" class="block text-m text-theme-mid font-bold text-lg">Level</label>
								<input
									id="s-lvl"
									name="s-lvl"
									type="text"
									class=" bg-slate-500 focus:bg-slate-700 border-[0.15rem] rounded-lg border-gray-800 text-theme-mid text-xl"
									bind:value={arcSymbolInputs[5].level}
								/>
							</div>

							<div class="flex flex-col w-1/4 justify-center">
								<label for="s-exp" class="block text-m text-theme-mid font-bold text-lg">Exp</label>
								<input
									id="s-exp"
									name="s-exp"
									type="text"
									class=" bg-slate-500 focus:bg-slate-700 border-[0.15rem] rounded-lg border-gray-800 text-theme-mid text-xl"
									bind:value={arcSymbolInputs[5].exp}
								/>
							</div>
						</div>
					</div>

					<div id="Cernium-input" class="hidden">
						Cernium
						<div class="flex mb-10 justify-evenly">
							<div class="flex flex-col w-1/4 justify-center">
								<label for="s-lvl" class="block text-m text-theme-mid font-bold text-lg">Level</label>
								<input
									id="s-lvl"
									name="s-lvl"
									type="text"
									class=" bg-slate-500 focus:bg-slate-700 border-[0.15rem] rounded-lg border-gray-800 text-theme-mid text-xl"
									bind:value={sacSymbolInputs[0].level}
								/>
							</div>

							<div class="flex flex-col w-1/4 justify-center">
								<label for="s-exp" class="block text-m text-theme-mid font-bold text-lg">Exp</label>
								<input
									id="s-exp"
									name="s-exp"
									type="text"
									class=" bg-slate-500 focus:bg-slate-700 border-[0.15rem] rounded-lg border-gray-800 text-theme-mid text-xl"
									bind:value={sacSymbolInputs[0].exp}
								/>
							</div>
						</div>
					</div>

					<div id="Arcus-input" class="hidden">
						Arcus
						<div class="flex mb-10 justify-evenly">
							<div class="flex flex-col w-1/4 justify-center">
								<label for="s-lvl" class="block text-m text-theme-mid font-bold text-lg">Level</label>
								<input
									id="s-lvl"
									name="s-lvl"
									type="text"
									class=" bg-slate-500 focus:bg-slate-700 border-[0.15rem] rounded-lg border-gray-800 text-theme-mid text-xl"
									bind:value={sacSymbolInputs[1].level}
								/>
							</div>

							<div class="flex flex-col w-1/4 justify-center">
								<label for="s-exp" class="block text-m text-theme-mid font-bold text-lg">Exp</label>
								<input
									id="s-exp"
									name="s-exp"
									type="text"
									class=" bg-slate-500 focus:bg-slate-700 border-[0.15rem] rounded-lg border-gray-800 text-theme-mid text-xl"
									bind:value={sacSymbolInputs[1].exp}
								/>
							</div>
						</div>
					</div>

					<div id="Odium-input" class="hidden">
						Odium
						<div class="flex mb-10 justify-evenly">
							<div class="flex flex-col w-1/4 justify-center">
								<label for="s-lvl" class="block text-m text-theme-mid font-bold text-lg">Level</label>
								<input
									id="s-lvl"
									name="s-lvl"
									type="text"
									class=" bg-slate-500 focus:bg-slate-700 border-[0.15rem] rounded-lg border-gray-800 text-theme-mid text-xl"
									bind:value={sacSymbolInputs[2].level}
								/>
							</div>

							<div class="flex flex-col w-1/4 justify-center">
								<label for="s-exp" class="block text-m text-theme-mid font-bold text-lg">Exp</label>
								<input
									id="s-exp"
									name="s-exp"
									type="text"
									class=" bg-slate-500 focus:bg-slate-700 border-[0.15rem] rounded-lg border-gray-800 text-theme-mid text-xl"
									bind:value={sacSymbolInputs[2].exp}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="flex w-full h-full">
			<div class="flex w-[85%]">
				<div class="flex flex-col w-2/5 items-center text-center">
					<img id="img-char-form" src={img} alt="Character" class="hidden" />

					<div class="w-full mt-auto h-8 text-center font-bold text-theme-mid text-lg">
						<div class="max-h-[50px] overflow-hidden">
							{name}
						</div>
					</div>
				</div>
			</div>

			<div class="flex mt-auto w-[15%]">
				<button
					on:click|preventDefault={closeForm}
					class="bg-gray-200 ml-auto m-2 p-2 rounded-lg font-bold capitalize hover:bg-gray-400 duration-200 active:scale-90"
				>
					Cancel
				</button>
				<button
					type="submit"
					id="create-char-btn"
					class="bg-green-300 m-2 p-2 rounded-lg font-bold capitalize hover:bg-green-400 duration-200 active:scale-90"
				>
					Confirm
				</button>
			</div>
		</div>
	</form>
</dialog>
