import AbstractTracker from "./AbstractTracker";
import TrackerStorage from "./TrackerStorage";
import { TrackerEvent } from "./Event";

const INTERVAL_DELAY = 1000;

export default class Tracker implements AbstractTracker {
	private storage: TrackerStorage;

	private eventList: TrackerEvent[];

	private interval: number | undefined = undefined;

	constructor() {
		this.storage = new TrackerStorage();
		this.eventList = this.storage.get();

		window.addEventListener("beforeunload", async (e) => {
			if ((e.target as ActiveElement).activeElement.tagName === "A")
				return this.storage.set(this.eventList);

			await this.fetchTracks();
			this.clearFetchInterval();
			this.storage.clear();
		});
	}

	/**
	 * Store tracker events
	 * @param event
	 * @param tags
	 */
	public async track(event: string, ...tags: string[]): Promise<void> {
		this.eventList.push({
			event,
			tags,
			title: document.title,
			url: document.location.href,
			ts: this.getTimeStampWithTimeZone(),
		});
		await this.checkIfFetchNeeded();
	}

	/**
	 * Check fetching condition
	 * @private
	 */
	private async checkIfFetchNeeded(): Promise<void> {
		if (this.eventList.length >= 3) {
			await this.fetchTracks();
			this.restartFetchInterval();
		}
	}

	/**
	 * Restart the interval for fetching events
	 * * @private
	 */
	private restartFetchInterval(): void {
		this.clearFetchInterval();
		this.interval = this.startFetchInterval();
	}

	/**
	 * Start the interval for fetching events
	 * * @private
	 */
	private startFetchInterval(): number {
		return window.setInterval(async () => {
			await this.fetchTracks();
		}, INTERVAL_DELAY);
	}

	/**
	 * Clear the interval
	 * * @private
	 */
	private clearFetchInterval(): void {
		window.clearInterval(this.interval);
	}

	/**
	 * Send the event list to server
	 * @private
	 */
	private async fetchTracks() {
		return fetch("http://localhost:8001/track", {
			method: "POST",
			body: JSON.stringify(this.eventList),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (res.ok) this.eventList = [];
			})
			.catch(() => {});
	}

	/**
	 * Getting the timestamp with time zone
	 * @private
	 */
	private getTimeStampWithTimeZone() {
		const ts = new Date();
		return ts.toISOString().replace("Z", this.prettyTimeZone(ts));
	}

	/**
	 * Prepare time zone
	 * @param date
	 * @private
	 */
	private prettyTimeZone(date: Date) {
		const tz = date.getTimezoneOffset();
		const sign = tz > 0 ? "-" : "+";
		const tzHours = Math.abs(tz) / 60;
		return `${sign}${tzHours < 10 ? "0" : ""}${tzHours}:00`;
	}
}

type ActiveElement = EventTarget & { activeElement: Element };
