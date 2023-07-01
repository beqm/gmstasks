<script lang="ts">
	import { onMount } from 'svelte';
	import { formatMillisecond } from '$lib/utils';
	import { resetDailyTracks, resetWBossTracks, resetWEventTracks } from '$lib/utils';
	import DataStore from '$lib/stores/DataStore';
	import ActiveStore from '$lib/stores/ActiveStore';

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

			if (time == '00:00:01') {
				resetDailyTracks($DataStore, $ActiveStore);

				if (now.getDay() == 1) {
					resetWEventTracks($DataStore, $ActiveStore);
				} else if (now.getDay() == 4) {
					resetWBossTracks($DataStore, $ActiveStore);
				}

				$DataStore = $DataStore;
				$ActiveStore = $ActiveStore;
				localStorage.setItem('active_char', JSON.stringify($ActiveStore));
				localStorage.setItem('local_chars', JSON.stringify($DataStore));
			}
		}, 1000);
		return () => {
			clearInterval(timerId);
		};
	});
</script>

{time}
