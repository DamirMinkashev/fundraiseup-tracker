import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
	getTrackerJs(): string {
		return "hello";
	}
}
