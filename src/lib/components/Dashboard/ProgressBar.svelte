<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	export let label: string;
	export let control: number;

	$: color =
		control <= 20 ? 'bg-red-700' : control <= 60 ? 'bg-orange-500' : control <= 99 ? 'bg-blue-400' : 'bg-green-600';
	$: progress = tweened(0, {
		duration: 1000,
		easing: cubicOut
	});
	$: progress.set(control);
</script>

<div class="w-full flex flex-col items-center">
	<div class="text-xl">{label}</div>
	<div class="h-[2.6rem] w-[80%] bg-theme-soft border border-theme-soft relative mb-4">
		<div class="absolute bottom-[.4rem] left-0 text-xl right-0 font-bold">{control}%</div>
		<div class="h-10 {color} justify-center items-center" style="width: {$progress}%" />
	</div>
</div>

<!-- <div class="w-10 h-10 m-2 border-2 border-solid border-gray-800 rounded-full border-t-white animate-spin" /> -->
