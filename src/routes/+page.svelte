<script lang="ts">
	import { fly } from 'svelte/transition';
	import WeekTimer from '$lib/components/Timers/WeekTimer.svelte';
	import DayTimer from '$lib/components/Timers/DayTimer.svelte';
</script>

<div in:fly={{ x: -200, duration: 250 }} class="w-9/12 bg-theme-base rounded-lg mt-10 drop-shadow-lg">dashboard</div>
