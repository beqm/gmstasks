<script lang="ts">
	export let value: string | number;
	export let inputLabel: string;
	export let validateMsg: string = '';
</script>

<label for={inputLabel} class="block font-bold text-lg">{inputLabel}</label>
<div class="mt-1 mb-8">
	<input
		id={inputLabel}
		type="text"
		class=" bg-theme-softer border border-theme-base text-xl focus:bg-theme-softdecorated"
		bind:value
	/>
	{#if validateMsg}
		{#if value == ''}
			<div class="text-theme-decorated m-1">{validateMsg}</div>
		{:else}
			<div class="text-theme-decorated m-1 invisible">{validateMsg}</div>
		{/if}
	{/if}
</div>
