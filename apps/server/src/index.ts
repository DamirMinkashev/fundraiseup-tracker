import Tracker from './clientTraker/Tracker';

(globalThis as typeof globalThis & { tracker: Tracker }).tracker =
	new Tracker();
