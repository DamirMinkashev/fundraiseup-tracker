import { Body, Controller, Header, HttpCode, Post } from "@nestjs/common";
import { TrackerService } from "./tracker.service";
import { CreateEventDto } from "./dto/create-event.dto";

@Controller()
export class TrackerController {
	constructor(private readonly service: TrackerService) {}

	@Post("/track")
	@HttpCode(200)
	createEvents(@Body() req: CreateEventDto[]) {
		// req.on("data", (data) => {
		// 	console.log(data.toString());
		// });
		console.log(req);
	}
}
