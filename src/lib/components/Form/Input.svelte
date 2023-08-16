<script lang="ts">
	export let value: string | number;
	export let inputLabel: string;
</script>

<label for={inputLabel} class="block font-bold text-sm sm:text-lg">{inputLabel}</label>
<div class="mt-1 mb-8">
	<input
		id={inputLabel}
		type="text"
		class=" bg-primary-200 h-6 sm:h-fit border border-primary-100 focus:border-secondary-300 text-sm sm:text-lg focus:bg-primary-300 outline-none"
		bind:value
	/>
</div>
