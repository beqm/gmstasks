<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	export let label: string;
	export let control: number;

	$: color = control <= 25 ? 'bg-red' : control <= 60 ? 'bg-yellow' : control <= 99 ? 'bg-blue' : 'bg-green-100';
	$: progress = tweened(0, {
		duration: 1000,
		easing: cubicOut
	});
	$: progress.set(control);
</script>

<div class="w-full flex flex-col items-center">
	<div class="text-xl">{label}</div>
	<div class="h-[2.6rem] w-[80%] border border-primary-100 relative mb-4">
		<div class="absolute bottom-[.4rem] left-0 text-xl right-0 font-bold">{control}%</div>
		<div class="h-10 {color} justify-center items-center" style="width: {$progress}%" />
	</div>
</div>
