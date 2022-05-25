import { TrackerEvent } from './TrackerEvent';

const STORAGE_KEY = 'eventList';

export default class TrackerStorage {
	constructor() {}

	/**
	 *
	 * @private
	 */
	public get(): TrackerEvent[] {
		const eventsListStr = window.localStorage.getItem(STORAGE_KEY);
		return eventsListStr ? JSON.parse(eventsListStr) : [];
	}

	/**
	 *
	 * @param list
	 */
	public set(list: TrackerEvent[]) {
		const storedEvents = this.get();
		window.localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify(storedEvents.concat(list)),
		);
	}

	/**
	 *
	 */
	public clear() {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
	}
}
