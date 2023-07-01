<script lang="ts">
	import { createEventDispatcher } from 'svelte/internal';
	const dispatch = createEventDispatcher();

	const changeEventSubPage = (path: string) => {
		let dailyBtn = document.querySelector('#event-daily') as HTMLButtonElement;
		let weeklyBtn = document.querySelector('#event-weekly') as HTMLButtonElement;

		if (path == 'daily') {
			dailyBtn.classList.add('bg-theme-decorated');
			dailyBtn.classList.remove('hover:bg-theme-softdecorated');

			weeklyBtn.classList.remove('bg-theme-decorated');
			weeklyBtn.classList.add('hover:bg-theme-softdecorated');
		} else if (path == 'weekly') {
			weeklyBtn.classList.add('bg-theme-decorated');
			weeklyBtn.classList.remove('hover:bg-theme-softdecorated');

			dailyBtn.classList.remove('bg-theme-decorated');
			dailyBtn.classList.add('hover:bg-theme-softdecorated');
		}
		dispatch('pagechange', path);
	};
</script>

<div class="w-full flex justify-center">
	<button
		id="event-daily"
		on:click={() => changeEventSubPage('daily')}
		class="p-2 mr-2 rounded-lg font-bold text-xl mt-10 bg-theme-decorated">Daily</button
	>
	<button
		id="event-weekly"
		on:click={() => changeEventSubPage('weekly')}
		class="p-2 mr-2 rounded-lg font-bold text-xl mt-10 hover:bg-theme-softdecorated">Weekly</button
	>
</div>
