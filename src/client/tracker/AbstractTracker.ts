export default interface Tracker {
	track(event: string, ...tags: string[]): void;
}
