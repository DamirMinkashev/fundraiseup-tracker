import {
	Body,
	Controller,
	Options,
	HttpCode,
	Post,
	Req,
	UsePipes,
	ValidationPipe,
	ParseArrayPipe,
} from '@nestjs/common';
import { TrackerService } from './tracker.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller()
export class TrackerController {
	constructor(private readonly service: TrackerService) {}

	@Post('/track')
	@HttpCode(200)
	createEvents(
		@Body(
			new ParseArrayPipe({ items: CreateEventDto }),
			new ValidationPipe(),
		)
		events: CreateEventDto[],
	) {
		return this.service.createEventsFromList(events);
	}
}
