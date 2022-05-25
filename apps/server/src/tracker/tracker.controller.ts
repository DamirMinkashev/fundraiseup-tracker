import { Body, Controller, Options, HttpCode, Post, Req } from '@nestjs/common';
import { TrackerService } from './tracker.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller()
export class TrackerController {
	constructor(private readonly service: TrackerService) {}

	@Post('/track')
	@HttpCode(200)
	createEvents(@Body() events: CreateEventDto[]) {
		return this.service.createEventsFromList(events);
	}
}
