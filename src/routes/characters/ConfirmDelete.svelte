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
		let delCharModal = document?.querySelector('#del-char-modal') as HTMLDialogElement;
		delCharModal.close();
		delCharModal.className = 'hidden';
	};

	const showModal = () => {
		let delCharModal = document?.querySelector('#del-char-modal') as HTMLDialogElement;
		delCharModal.showModal();

		delCharModal.className = 'w-[25%] flex flex-col bg-theme-base text-theme-dark rounded-lg mt-32';
	};
</script>

<dialog id="del-char-modal" class="hidden">
	<div class="flex font-bold text-2xl p-2">Delete Character</div>

	<div class="flex font-bold text-xl p-2 justify-center">
		You are about to&nbsp; <p class="text-theme-decorated">DELETE '{name}'</p>
	</div>
	<div class="flex font-bold text-xl p-2 justify-center">Are you sure?</div>

	<div class="flex mt-auto">
		<button
			on:click={closeModal}
			class="bg-theme-soft m-2 p-2 ml-auto rounded-lg font-bold capitalize hover:bg-gray-500 duration-200 active:scale-90"
		>
			Cancel
		</button>
		<button
			on:click={() => delCharacter(currentCharIteration.id)}
			type="submit"
			id="create-char-btn"
			class="bg-theme-strongdecorated m-2 p-2 rounded-lg font-bold capitalize hover:bg-theme-decorated duration-200 active:scale-90"
		>
			Delete
		</button>
	</div>
</dialog>
