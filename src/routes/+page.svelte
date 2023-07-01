<script lang="ts">
	import { fly } from 'svelte/transition';
	import WeekTimer from '$lib/components/Timers/WeekTimer.svelte';
	import DayTimer from '$lib/components/Timers/DayTimer.svelte';
</script>

<div in:fly={{ x: -200, duration: 250 }} class="w-9/12 bg-theme-base rounded-lg mt-10 drop-shadow-lg">
	<div class="flex flex-col">
		<div>
			DAILY TIMER <DayTimer />
		</div>
		<div>
			SUNDAY TIMER <WeekTimer weekDayTarget={0} />
		</div>
		<div>
			MONDAY TIMER <WeekTimer weekDayTarget={1} />
		</div>
		<div>
			TUESDAY TIMER <WeekTimer weekDayTarget={2} />
		</div>
		<div>
			WEDNESDAY TIMER <WeekTimer weekDayTarget={3} />
		</div>
		<div>
			THURSDAY TIMER <WeekTimer weekDayTarget={4} />
		</div>
		<div>
			FRIDAY TIMER <WeekTimer weekDayTarget={5} />
		</div>
		<div>
			SATURDAY TIMER <WeekTimer weekDayTarget={6} />
		</div>
	</div>
</div>
