<script lang="ts">
	export let value: string | number;
	export let inputLabel: string;
</script>

<label for={inputLabel} class="block font-bold text-sm sm:text-lg">{inputLabel}</label>
<div class="mt-1 mb-8">
	<input
		id={inputLabel}
		type="text"
		class=" bg-theme-softer h-6 sm:h-fit border border-theme-base text-sm sm:text-lg focus:bg-theme-softdecorated"
		bind:value
	/>
</div>
