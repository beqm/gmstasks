<script>
	import { onMount } from 'svelte';

	const SECOND = 1000;
	const MINUTE = SECOND * 60;
	const HOUR = MINUTE * 60;
	const DAY = HOUR * 24;

	let date = new Date();
	date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

	let time_nextday = new Date();
	time_nextday.setDate(date.getDate() + 1);
	time_nextday.setHours(0, 0, 0, 0);
	let gap = time_nextday.getTime() - date.getTime();

	let showHours = Math.floor((gap % DAY) / HOUR);
	let formattedHours = showHours.toString().padStart(2, '0');

	let showMinutes = Math.floor((gap % HOUR) / MINUTE);
	let formattedMinutes = showMinutes.toString().padStart(2, '0');

	let showSeconds = Math.floor((gap % MINUTE) / SECOND);
	let formattedSeconds = showSeconds.toString().padStart(2, '0');
	$: time = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

	onMount(() => {
		const timerId = setInterval(() => {
			let date = new Date();
			date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

			let time_nextday = new Date();
			time_nextday.setDate(date.getDate() + 1);
			time_nextday.setHours(0, 0, 0, 0);
			let gap = time_nextday.getTime() - date.getTime();

			let showHours = Math.floor((gap % DAY) / HOUR);
			let formattedHours = showHours.toString().padStart(2, '0');

			let showMinutes = Math.floor((gap % HOUR) / MINUTE);
			let formattedMinutes = showMinutes.toString().padStart(2, '0');

			let showSeconds = Math.floor((gap % MINUTE) / SECOND);
			let formattedSeconds = showSeconds.toString().padStart(2, '0');
			time = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
		}, 1000);
		return () => {
			clearInterval(timerId);
		};
	});
</script>

{time}
