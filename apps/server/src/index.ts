import Tracker from "./tracker/Tracker";

(globalThis as typeof globalThis & { tracker: Tracker }).tracker =
	new Tracker();
