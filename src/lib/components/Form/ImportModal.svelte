<script lang="ts">
	import DataStore from '$lib/stores/DataStore';
	import ActiveStore from '$lib/stores/ActiveStore';
	import DashStore from '$lib/stores/DashStore';
	let isOpen: boolean = false;

	let toggleModal = () => {
		isOpen = !isOpen;
	};

	let importFile = () => {
		let input = document.querySelector('#import-submit') as HTMLInputElement;

		const [data] = input.files as FileList;
		if (data.type == 'application/json') {
			let reader = new FileReader();
			reader.addEventListener('load', () => {
				let result = JSON.stringify(reader.result).replace(/(?:\\[rn])+/g, '');
				let obj = JSON.parse(JSON.parse(result.replace("'", '')));

				if (obj.local_chars && obj.active_char && obj.dashboard_items) {
					localStorage.setItem('local_chars', obj.local_chars);
					localStorage.setItem('active_char', obj.active_char);
					localStorage.setItem('dashboard_items', obj.dashboard_items);
					$DataStore = JSON.parse(obj.local_chars);
					$ActiveStore = JSON.parse(obj.active_char);
					$DashStore = JSON.parse(obj.dashboard_items);
					toggleModal();
				}
			});

			if (data) {
				reader.readAsText(data);
			}
		}
	};
</script>

<button
	class="flex items-center bg-green-300 m-2 p-2 rounded-lg font-bold capitalize hover:bg-green-400 duration-200 active:scale-90 text-theme-base"
	on:click={toggleModal}
>
	<svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 384 512"
		><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
			d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 408c0 13.3-10.7 24-24 24s-24-10.7-24-24V305.9l-31 31c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l72-72c9.4-9.4 24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-31-31V408z"
		/></svg
	>
</button>

{#if isOpen}
	<div class="backdrop flex justify-center z-10">
		<div class="w-[25%] flex flex-col bg-theme-base text-theme-dark rounded-lg mt-32 h-fit">
			<div class="flex font-bold text-2xl p-2">Import Data</div>

			<div class="flex flex-col items-center m-5">
				<div class="flex font-bold text-xl p-2 justify-center">Select the file</div>
				<input type="file" id="import-submit" accept=".json" />
			</div>

			<div class="flex mt-auto">
				<button
					on:click={toggleModal}
					class="bg-theme-soft m-2 p-2 ml-auto rounded-lg font-bold capitalize hover:bg-gray-500 duration-200 active:scale-90"
				>
					Cancel
				</button>
				<button
					on:click={importFile}
					type="submit"
					class="bg-green-300 text-theme-base m-2 p-2 rounded-lg font-bold capitalize hover:bg-green-500 duration-200 active:scale-90"
				>
					Import
				</button>
			</div>
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
