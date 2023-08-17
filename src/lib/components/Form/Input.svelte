<script lang="ts">
	export let value: string | number;
	export let inputLabel: string;
	export let isNumber: boolean = false;

	const allowOnlyNumeric = (e: KeyboardEvent) => {
		let numericals = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
		if (!numericals.includes(e.key)) {
			e.preventDefault();
		}
	};
</script>

<label for={inputLabel} class="block font-bold text-sm sm:text-lg">{inputLabel}</label>
{#if !isNumber}
	<div class="mt-1 mb-8">
		<input
			id={inputLabel}
			type="text"
			class=" bg-primary-200 h-6 sm:h-fit border border-primary-100 focus:border-secondary-300 text-sm sm:text-lg focus:bg-primary-300 outline-none"
			bind:value
		/>
	</div>
{:else}
	<div class="mt-1 mb-8">
		<input
			on:keydown={allowOnlyNumeric}
			id={inputLabel}
			type="number"
			class=" bg-primary-200 h-6 sm:h-fit border border-primary-100 focus:border-secondary-300 text-sm sm:text-lg focus:bg-primary-300 outline-none"
			bind:value
		/>
	</div>
{/if}
