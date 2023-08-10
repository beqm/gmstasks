<script lang="ts">
	import MainStore from '$lib/stores/MainStore';
	import { saveMapToLocalStorage } from '$lib/utils/storage';

	export let currentCharIteration: Character;
	export let toggleOverlayFunction: any;
	let name: string;

	$: {
		if (currentCharIteration !== undefined) {
			toggleOverlayFunction();
			showModal();
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

		MainStore.update((data) => {
			data.characters.delete(id);
			if (data.active?.id == id) {
				data.active = null;
				localStorage.setItem('active', JSON.stringify($MainStore.active));
			}
			data.dashboard.forEach((value, key) => {
				if (value.charId == id) {
					data.dashboard.delete(key);
				}
			});
			return data;
		});

		$MainStore = $MainStore;
		saveMapToLocalStorage($MainStore.characters, 'characters');
		saveMapToLocalStorage($MainStore.dashboard, 'dashboard');
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

		delCharModal.className =
			'w-full sm:w-[50%] xl:w-[25%] min-w-[300px] flex flex-col bg-theme-base text-theme-dark rounded-lg mt-32';
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
			type="button"
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
