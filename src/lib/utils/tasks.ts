import type { DStore, DashItem } from '$lib/types/types';

export const progressControl = (dashMap: Map<string, DashItem>, type: string, period: string) => {
	let counter: number = 0;
	let totalCounter: number = 0;
	dashMap.forEach((item) => {
		if (item.period == period && item.trackType == type) {
			totalCounter += 1;
			if (item.status) {
				counter += 1;
			}
		}
	});

	let result = (counter / totalCounter) * 100;
	if (result) {
		return Math.floor(result);
	} else {
		return 0;
	}
};

export function resetWeeklyBossTasks(store: DStore) {
	if (store.active) {
		store.active.track.weeklyBosses.forEach((events) => {
			events.complete = false;
		});
	}
	store.characters.forEach((value) => {
		value.track.weeklyEvents.forEach((event) => {
			event.complete = false;
		});
	});
}

export function resetWeeklyEventTasks(store: DStore) {
	if (store.active) {
		store.active.track.weeklyEvents.forEach((events) => {
			events.complete = false;
		});
	}
	store.characters.forEach((value) => {
		value.track.weeklyEvents.forEach((event) => {
			event.complete = false;
		});
	});
}

export function resetDailyTasks(store: DStore) {
	if (store.active) {
		store.active.track.dailyBosses.forEach((boss) => {
			boss.complete = false;
		});
		store.active.track.dailyEvents.forEach((events) => {
			events.complete = false;
		});
	}

	store.characters.forEach((value) => {
		value.track.dailyBosses.forEach((boss) => {
			boss.complete = false;
		});
		value.track.dailyEvents.forEach((event) => {
			event.complete = false;
		});
	});
}

export function resetDashboardTasks(store: DStore, period: 'Weekly' | 'Daily') {
	store.dashboard.forEach((item) => {
		if (period == item.period) {
			item.status = false;
		}
	});
}
