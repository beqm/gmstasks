<script lang="ts">
	import DataStore from '$lib/stores/DataStore';
	import ActiveStore from '$lib/stores/ActiveStore';
	import type { Character } from '$lib/types/types';

	export let currentCharIteration: Character;
	export let toggleOverlayFunction: any;

	let name: string;

	$: {
		if (currentCharIteration !== undefined) {
			toggleOverlayFunction();
			showModal();
			console.log(currentCharIteration.name);
			name = currentCharIteration.name;
		}
	}

	const delCharacter = (id: string) => {
		let delBtn = document.querySelector('#del-btn-overlay') as HTMLButtonElement;
		let delModal = document.querySelector('#del-btn-modal') as HTMLButtonElement;
		if (delBtn !== null && delModal !== null) {
			delBtn.className = 'hidden';
			delModal.className = 'hidden';
		}

		DataStore.update((data) => {
			let updatedData = data.filter((char) => char.id !== id);
			localStorage.setItem('local_chars', JSON.stringify(updatedData));
			return updatedData;
		});

		if ($ActiveStore[0].id == id) {
			$ActiveStore = [];
			localStorage.setItem('active_char', JSON.stringify($ActiveStore));
		}
		closeModal();
	};

	const closeModal = () => {
		let delModal = document.querySelector('#del-modal-content') as HTMLButtonElement;

		if (delModal !== null) {
			delModal.className = 'hidden';
			toggleOverlayFunction();
		}
	};

	const showModal = () => {
		let delModal = document.querySelector('#del-modal-content') as HTMLButtonElement;

		if (delModal !== null) {
			delModal.className = 'flex flex-col bg-slate-600 rounded-lg w-[25%] h-[20%] m-20';
		}
	};
</script>

<div id="del-modal-content" class="hidden">
	<div class="flex font-bold text-slate-300 text-2xl p-2">Delete Character</div>

	<div class="flex font-bold text-slate-300 text-xl p-2 justify-center">You are about to delete '{name}'</div>
	<div class="flex font-bold text-slate-300 text-xl p-2 justify-center">Are you sure?</div>

	<div class="flex mt-auto">
		<button
			on:click={closeModal}
			class="bg-gray-200 m-2 p-2 ml-auto rounded-lg font-bold capitalize hover:bg-gray-400 duration-200 active:scale-90"
		>
			Cancel
		</button>
		<button
			on:click={() => delCharacter(currentCharIteration.id)}
			type="submit"
			id="create-char-btn"
			class="bg-red-300 m-2 p-2 rounded-lg font-bold capitalize hover:bg-red-400 duration-200 active:scale-90"
		>
			Delete
		</button>
	</div>
</div>
