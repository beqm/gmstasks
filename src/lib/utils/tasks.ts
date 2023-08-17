export const progressControl = (dashMap: Map<string, DashItem>, type: string, period: string): number => {
	let completedCounter = 0;
	let totalCounter = 0;

	for (const item of dashMap.values()) {
		if (item.period === period && item.trackType === type) {
			totalCounter++;
			if (item.status) {
				completedCounter++;
			}
		}
	}

	const progressPercentage = totalCounter === 0 ? 0 : (completedCounter / totalCounter) * 100;
	return Math.floor(progressPercentage);
};

export function resetWeeklyBosses(store: DStore) {
	store.active?.track.weeklyBosses.forEach((event) => (event.complete = false));

	store.characters.forEach((character) => {
		character.track.weeklyBosses.forEach((event) => (event.complete = false));
	});
}

export function resetWeeklyEvents(store: DStore) {
	store.active?.track.weeklyEvents.forEach((event) => (event.complete = false));

	store.characters.forEach((character) => {
		character.track.weeklyEvents.forEach((event) => (event.complete = false));
	});
}

export function resetAllDailies(store: DStore) {
	store.active?.track.dailyBosses.forEach((boss) => (boss.complete = false));
	store.active?.track.dailyEvents.forEach((event) => (event.complete = false));

	store.characters.forEach((character) => {
		character.track.dailyBosses.forEach((boss) => (boss.complete = false));
		character.track.dailyEvents.forEach((event) => (event.complete = false));
	});
}

export function resetDashboard(store: DStore, period: 'Weekly' | 'Daily') {
	store.dashboard.forEach((item) => {
		if (item.period === period) {
			item.status = false;
		}
	});
}
