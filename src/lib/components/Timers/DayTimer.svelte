<script lang="ts">
	import { onMount } from 'svelte';
	import { formatMillisecond } from '$lib/utils/validation';
	import { resetAllDailies, resetDashboard, resetWeeklyBosses, resetWeeklyEvents } from '$lib/utils/tasks';
	import MainStore from '$lib/stores/MainStore';
	import { mapToLocalStorage, tasksMapToObj } from '$lib/utils/storage';

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

			let last_d_reset = localStorage.getItem('daily_reset');
			if (!last_d_reset || last_d_reset !== now.toDateString()) {
				console.log('hello');
				localStorage.setItem('daily_reset', now.toDateString());
				resetAllDailies($MainStore);
				resetDashboard($MainStore, 'Daily');
				$MainStore = $MainStore;
				if ($MainStore.active) {
					let active = tasksMapToObj($MainStore.active);
					localStorage.setItem('active', JSON.stringify(active));
				}
				mapToLocalStorage($MainStore.characters, 'characters');
				mapToLocalStorage($MainStore.dashboard, 'dashboard');
			}

			if (now.getDay() == 1) {
				let last_m_reset = localStorage.getItem('monday_reset');
				if (!last_m_reset || last_m_reset !== now.toDateString()) {
					localStorage.setItem('monday_reset', new Date().toDateString());
					resetWeeklyEvents($MainStore);
					resetDashboard($MainStore, 'Weekly');
					$MainStore = $MainStore;
					if ($MainStore.active) {
						let active = tasksMapToObj($MainStore.active);
						localStorage.setItem('active', JSON.stringify(active));
					}
					mapToLocalStorage($MainStore.characters, 'characters');
					mapToLocalStorage($MainStore.dashboard, 'dashboard');
				}
			} else if (now.getDay() == 4) {
				let last_w_reset = localStorage.getItem('wednesday_reset');
				if (!last_w_reset || last_w_reset !== now.toDateString()) {
					localStorage.setItem('wednesday_reset', new Date().toDateString());
					resetWeeklyBosses($MainStore);
					resetDashboard($MainStore, 'Weekly');
					$MainStore = $MainStore;

					if ($MainStore.active) {
						let active = tasksMapToObj($MainStore.active);
						localStorage.setItem('active', JSON.stringify(active));
					}
					mapToLocalStorage($MainStore.characters, 'characters');
					mapToLocalStorage($MainStore.dashboard, 'dashboard');
				}
			}
		}, 1000);
		return () => {
			clearInterval(timerId);
		};
	});
</script>

{time}
