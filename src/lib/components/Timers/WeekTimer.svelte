<script lang="ts">
	import { onMount } from 'svelte';
	import { formatMillisecond } from '$lib/utils';
	export let weekDayTarget: number;

	let now = new Date();
	now.setMinutes(now.getMinutes() + now.getTimezoneOffset());

	let distance = (weekDayTarget + 7 - now.getDay()) % 7;
	if (distance == 0) distance += 7;

	let targetDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + distance);

	let ms = targetDay.getTime() - now.getTime();

	$: time = formatMillisecond(ms);

	onMount(() => {
		const timerId = setInterval(() => {
			now = new Date();
			now.setMinutes(now.getMinutes() + now.getTimezoneOffset());
			distance = (weekDayTarget + 7 - now.getDay()) % 7;
			if (distance == 0) distance += 7;

			targetDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + distance);
			ms = targetDay.getTime() - now.getTime();

			time = formatMillisecond(ms);
		}, 1000);
		return () => {
			clearInterval(timerId);
		};
	});
</script>

{time}
