<script lang="ts">
	import { onMount } from 'svelte';
	import { formatMillisecond } from '$lib/utils';

	let now = new Date();
	now.setMinutes(now.getMinutes() + now.getTimezoneOffset());
	let nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
	let ms = nextDay.getTime() - now.getTime();

	$: time = formatMillisecond(ms);

	onMount(() => {
		const timerId = setInterval(() => {
			now = new Date();
			now.setMinutes(now.getMinutes() + now.getTimezoneOffset());
			nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
			ms = nextDay.getTime() - now.getTime();

			time = formatMillisecond(ms);
		}, 1000);
		return () => {
			clearInterval(timerId);
		};
	});
</script>

{time}
