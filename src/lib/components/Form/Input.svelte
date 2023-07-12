<script lang="ts">
	export let value: string | number;
	export let inputLabel: string;
</script>

<label for={inputLabel} class="block font-bold text-lg">{inputLabel}</label>
<div class="mt-1 mb-8">
	<input
		id={inputLabel}
		type="text"
		class=" bg-theme-softer border border-theme-base text-xl focus:bg-theme-softdecorated"
		bind:value
	/>
</div>
