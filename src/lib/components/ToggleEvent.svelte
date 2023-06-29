<script lang="ts">
	import type { MEvent } from '$lib/types/types';

	export let eventInfo: MEvent;

	const toggleBtn = () => {
		let ToggleInput = document?.querySelector(`#${eventInfo.name}`) as HTMLInputElement;
		let ToggleLabel = document?.querySelector('') as HTMLLabelElement;

		if (ToggleInput !== null && ToggleLabel !== null) {
			ToggleLabel.className = 'button';
		}
	};
</script>

<div class="flex flex-col items-center mb-4">
	<div class="font-bold text-lg p-2 text-slate-300">{eventInfo.name}</div>
	<input on:click={toggleBtn} type="checkbox" id={eventInfo.name} class="hidden" />
	<label for={eventInfo.name} class="button" />
</div>

<style>
	.button {
		--tw-text-opacity: 1;
		background-color: rgb(100 116 139 / var(--tw-text-opacity));
		width: 60px;
		height: 35px;
		border-radius: 20px;
		cursor: pointer;
		position: relative;
		transition: 0.2s;
	}
	.button::before {
		position: absolute;
		content: '';
		background-color: white;
		width: 32px;
		height: 32px;
		border-radius: 50px;
		margin: 2.5px;
		transition: 0.2s;
	}

	input:checked + .button {
		--tw-text-opacity: 1;
		background-color: rgb(30 41 59 / var(--tw-text-opacity));
	}
	input:checked + .button::before {
		transform: translateX(25px);
	}
</style>
