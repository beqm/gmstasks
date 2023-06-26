<script lang="ts">
	export let value: string | number;
	export let inputLabel: string;
</script>

<label for={inputLabel} class="block font-bold text-lg">{inputLabel}</label>
<div class="mt-1">
	<input
		id={inputLabel}
		type="text"
		class="mb-8 bg-theme-softer border border-theme-base text-xl focus:bg-theme-softdecorated"
		bind:value
	/>
</div>
