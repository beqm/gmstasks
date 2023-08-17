<script lang="ts">
	import MainStore from '$lib/stores/MainStore';
	import { mapToLocalStorage } from '$lib/utils/storage';
	import { fade } from 'svelte/transition';
	import { clickOutside } from '$lib/utils/clickOutside';

	export let currentCharIteration: Character;
	export let toggleOverlayFunction: any;
	let name: string;
	let showModal: boolean = false;

	$: {
		if (currentCharIteration !== undefined) {
			toggleOverlayFunction();
			toggleModal();
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
		mapToLocalStorage($MainStore.characters, 'characters');
		mapToLocalStorage($MainStore.dashboard, 'dashboard');
		toggleModal();
	};

	const toggleModal = () => {
		showModal = !showModal;
	};
</script>

{#if showModal}
	<div in:fade class="fixed top-0 left-0 right-0 bottom-0 bg-backdrop flex justify-center z-10">
		<div
			use:clickOutside={toggleModal}
			class="w-full sm:w-[50%] xl:w-[25%] min-w-[300px] flex flex-col bg-primary-300 rounded-lg mt-32 h-fit"
		>
			<div class="flex font-bold text-2xl p-2">Delete Character</div>

			<div class="flex font-bold text-xl p-2 justify-center">
				You are about to&nbsp; <p class="text-accent-100">DELETE '{name}'</p>
			</div>
			<div class="flex font-bold text-xl p-2 justify-center">Are you sure?</div>

			<div class="flex mt-auto">
				<button
					on:click={toggleModal}
					type="button"
					class="bg-primary-200 hover:bg-secondary-300 m-2 p-2 ml-auto rounded-lg font-bold capitalize duration-200 active:scale-90"
				>
					Cancel
				</button>
				<button
					on:click={() => delCharacter(currentCharIteration.id)}
					type="submit"
					id="create-char-btn"
					class="bg-secondary-200 m-2 p-2 rounded-lg font-bold capitalize hover:bg-secondary-100 duration-200 active:scale-90"
				>
					Delete
				</button>
			</div>
		</div>
	</div>
{/if}
