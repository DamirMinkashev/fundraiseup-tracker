import AbstractTracker from "./AbstractTracker";

export default class Tracker implements AbstractTracker {
	track(event: string, ...tags: string[]): void {
		console.log(event);
	}
}
