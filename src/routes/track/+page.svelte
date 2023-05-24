<script lang="ts">
	import ActiveStore from '$lib/stores/ActiveStore';
	import { onMount } from 'svelte';
	import { StorageToStore } from '../../lib/utils/StorageToStore';
	import ToggleEvent from './ToggleEvent.svelte';

	onMount(() => {
		StorageToStore(ActiveStore, 'active_char', '[]');
	});
</script>

<main class="flex w-full justify-center">
	{#if $ActiveStore.length !== 0}
		<div class="flex w-9/12 bg-slate-600 rounded-lg mt-10 drop-shadow-lg text-slate-300 bg-[#43089471]">
			<div class="w-[20%]">
				<img src={$ActiveStore[0].img} alt="current active character" class="w-full border border-slate-500" />
				<div class="w-full mt-auto h-8 text-center font-bold text-slate-300 text-lg">
					<div class="max-h-[50px] overflow-hidden border border-slate-500">
						{$ActiveStore[0].name}
					</div>
				</div>
			</div>

			<div class=" w-[80%]">
				<div class="w-full font-bold text-3xl text-slate-300 justify-center flex">Track Events</div>
				<div class="w-full mt-10 flex">
					<div class="w-[25%] flex flex-col items-center">
						<ToggleEvent eventInfo={{ name: 'Ursus', complete: false, active: false, amount: 3 }} />
						<ToggleEvent eventInfo={{ name: 'Yu Garden', complete: false, active: false, amount: 1 }} />
						<ToggleEvent eventInfo={{ name: 'Weekly Bosses', complete: false, active: false, amount: 3 }} />
					</div>
					<div class="w-[25%] flex flex-col items-center">
						<ToggleEvent eventInfo={{ name: 'Monster Park', complete: false, active: false, amount: 3 }} />
						<ToggleEvent eventInfo={{ name: 'Arcane Dailies', complete: false, active: false, amount: 3 }} />
					</div>
					<div class="w-[25%] flex flex-col items-center">
						<ToggleEvent eventInfo={{ name: 'MNN BroadCast', complete: false, active: false, amount: 3 }} />
						<ToggleEvent eventInfo={{ name: 'Sacred Dailies', complete: false, active: false, amount: 3 }} />
					</div>
					<div class="w-[25%] flex flex-col items-center">
						<ToggleEvent eventInfo={{ name: 'Daily Gift', complete: false, active: false, amount: 1 }} />
						<ToggleEvent eventInfo={{ name: 'Daily Bosses', complete: false, active: false, amount: 3 }} />
					</div>
				</div>
				<div class="flex mt-auto">
					<button
						class="bg-green-300 m-2 p-2 ml-auto rounded-lg font-bold capitalize hover:bg-green-400 duration-200 active:scale-90 text-black"
					>
						Update
					</button>
				</div>
			</div>
		</div>
	{/if}
</main>
