<script lang="ts">
	import { onMount } from 'svelte';
	import { formatMillisecond } from '$lib/utils/validation';
	import { resetDailyTasks, resetWeeklyBossTasks, resetWeeklyEventTasks, resetDashboardTasks } from '$lib/utils/tasks';
	import MainStore from '$lib/stores/MainStore';

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
			if (!last_d_reset || last_d_reset.replace('"', '') !== now.toDateString()) {
				localStorage.setItem('daily_reset', new Date().toDateString());
				resetDailyTasks($MainStore);
				resetDashboardTasks($MainStore, 'Daily');
				$MainStore = $MainStore;
				localStorage.setItem('active', JSON.stringify($MainStore.active));
				localStorage.setItem('characters', JSON.stringify($MainStore.characters));
				localStorage.setItem('dashboard', JSON.stringify($MainStore.dashboard));
			}

			let last_m_reset = localStorage.getItem('monday_reset');
			let last_w_reset = localStorage.getItem('wednesday_reset');

			if (now.getDay() == 1) {
				if (!last_m_reset || last_m_reset !== now.toDateString()) {
					localStorage.setItem('monday_reset', new Date().toDateString());
					resetWeeklyEventTasks($MainStore);
					resetDashboardTasks($MainStore, 'Weekly');
					$MainStore = $MainStore;
					localStorage.setItem('active', JSON.stringify($MainStore.active));
					localStorage.setItem('characters', JSON.stringify($MainStore.characters));
					localStorage.setItem('dashboard', JSON.stringify($MainStore.dashboard));
				}
			} else if (now.getDay() == 4) {
				if (!last_w_reset || last_w_reset !== now.toDateString()) {
					localStorage.setItem('wednesday_reset', new Date().toDateString());
					resetWeeklyBossTasks($MainStore);
					resetDashboardTasks($MainStore, 'Weekly');
					$MainStore = $MainStore;
					localStorage.setItem('active', JSON.stringify($MainStore.active));
					localStorage.setItem('characters', JSON.stringify($MainStore.characters));
					localStorage.setItem('dashboard', JSON.stringify($MainStore.dashboard));
				}
			}
		}, 1000);
		return () => {
			clearInterval(timerId);
		};
	});
</script>

{time}
