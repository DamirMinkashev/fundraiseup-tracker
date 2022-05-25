import AbstractTracker from './AbstractTracker';
import { TrackerEvent } from './TrackerEvent';

const INTERVAL_DELAY = 1000;

export default class Tracker implements AbstractTracker {
	private eventList: TrackerEvent[];

	private interval: number | undefined = undefined;

	constructor() {
		this.eventList = [];

		//This callback invoked when we:
		//1.Refreshing page
		//2.Closing page/browser
		//3.Click to link (1.html, etc)
		window.addEventListener('beforeunload', async () => {
			this.clearFetchInterval();
			if (this.eventList.length !== 0) await this.fetchTracks();
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
			if (this.eventList.length !== 0) await this.fetchTracks();
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
		return fetch('http://localhost:8001/track', {
			method: 'POST',
			body: JSON.stringify(this.eventList),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				if (res.ok) this.eventList = [];
			})
			.catch(() => {
				this.restartFetchInterval();
			});
	}

	/**
	 * Getting the timestamp with time zone
	 * @private
	 */
	private getTimeStampWithTimeZone() {
		const ts = new Date();
		return ts.toISOString().replace('Z', this.prettyTimeZone(ts));
	}

	/**
	 * Prepare time zone
	 * @param date
	 * @private
	 */
	private prettyTimeZone(date: Date) {
		const tz = date.getTimezoneOffset();
		const sign = tz > 0 ? '-' : '+';
		const tzHours = Math.abs(tz) / 60;
		return `${sign}${tzHours < 10 ? '0' : ''}${tzHours}:00`;
	}
}
