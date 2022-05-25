import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDocument, Tracks } from './schema/event.schema';

@Injectable()
export class TrackerService {
	constructor(@InjectModel(Tracks.name) private model: Model<EventDocument>) {}

	createEventsFromList(events: CreateEventDto[]) {
		return this.model.insertMany(events);
	}
}
