import AbstractTracker from "./AbstractTracker";

export default class Tracker implements AbstractTracker {
	private eventList: Event[];

	constructor() {
		this.eventList = [];
	}

	/**
	 *
	 * @param event
	 * @param tags
	 */
	public track(event: string, ...tags: string[]): void {
		this.eventList.push({
			event,
			tags,
			title: document.title,
			url: document.location.href,
			ts: this.getTimeStampWithTimeZone(),
		});
	}

	/**
	 *
	 * @private
	 */
	private getTimeStampWithTimeZone() {
		const ts = new Date();
		return ts.toISOString().replace("Z", this.prettyTimeZone(ts));
	}

	/**
	 *
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

/**
 *
 */
interface Event {
	event: string;
	tags: string[];
	url: string;
	title: string;
	ts: string;
}
