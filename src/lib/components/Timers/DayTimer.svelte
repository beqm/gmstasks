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

			if (time == '00:00:01') {
				resetDailyTasks($MainStore);
				resetDashboardTasks($MainStore, 'Daily');

				if (now.getDay() == 1) {
					resetWeeklyEventTasks($MainStore);
					resetDashboardTasks($MainStore, 'Weekly');
				} else if (now.getDay() == 4) {
					resetWeeklyBossTasks($MainStore);
					resetDashboardTasks($MainStore, 'Weekly');
				}

				$MainStore = $MainStore;
				localStorage.setItem('active', JSON.stringify($MainStore.active));
				localStorage.setItem('characters', JSON.stringify($MainStore.characters));
				localStorage.setItem('dashboard', JSON.stringify($MainStore.dashboard));
			}
		}, 1000);
		return () => {
			clearInterval(timerId);
		};
	});
</script>

{time}
