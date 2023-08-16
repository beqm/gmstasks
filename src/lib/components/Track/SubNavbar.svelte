<script lang="ts">
	import { createEventDispatcher } from 'svelte/internal';
	const dispatch = createEventDispatcher();

	const changeEventSubPage = (path: string) => {
		let dailyBtn = document.querySelector('#event-daily') as HTMLButtonElement;
		let weeklyBtn = document.querySelector('#event-weekly') as HTMLButtonElement;

		if (path == 'daily') {
			dailyBtn.classList.add('bg-secondary-100');
			dailyBtn.classList.remove('hover:bg-secondary-300');

			weeklyBtn.classList.remove('bg-secondary-100');
			weeklyBtn.classList.add('hover:bg-secondary-300');
		} else if (path == 'weekly') {
			weeklyBtn.classList.add('bg-secondary-100');
			weeklyBtn.classList.remove('hover:bg-secondary-300');

			dailyBtn.classList.remove('bg-secondary-100');
			dailyBtn.classList.add('hover:bg-secondary-300');
		}
		dispatch('pagechange', path);
	};
</script>

<div class="w-full flex justify-center">
	<button
		id="event-daily"
		on:click={() => changeEventSubPage('daily')}
		class="p-2 mr-2 rounded-lg font-bold text-xl mt-10 bg-secondary-100">Daily</button
	>
	<button
		id="event-weekly"
		on:click={() => changeEventSubPage('weekly')}
		class="p-2 mr-2 rounded-lg font-bold text-xl mt-10 hover:bg-secondary-300">Weekly</button
	>
</div>
