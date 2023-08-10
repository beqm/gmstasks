<script lang="ts">
	export let value: MSymbol;
	export let char_lvl: number;
	export let img: string;
	import { fade } from 'svelte/transition';
</script>

{#if value}
	{#if char_lvl >= value.reqLevel}
		<div transition:fade class="flex flex-col justify-center border border-theme-base p-2 text-center mt-4">
			<div class="flex justify-center">
				<img src={img} alt="Symbol Input" />
			</div>
			<div class="block font-bold text-lg">{value.name}</div>
			<div class="flex">
				<div class="flex flex-col w-2/4 mr-1">
					<label for={value.name + '-lvl'} class="block font-bold text-lg">LVL</label>
					<input
						id={value.name + '-lvl'}
						name={value.name + '-lvl'}
						type="number"
						class=" bg-theme-softer border border-theme-base text-xl focus:bg-theme-softdecorated"
						bind:value={value.level}
					/>
				</div>
				<div class="flex flex-col w-2/4">
					<label for="vj-exp" class="block font-bold text-lg">EXP</label>
					<input
						id={value.name + '-exp'}
						name={value.name + '-exp'}
						type="number"
						class=" bg-theme-softer border border-theme-base text-xl focus:bg-theme-softdecorated"
						bind:value={value.exp}
					/>
				</div>
			</div>
		</div>
	{/if}
{/if}
