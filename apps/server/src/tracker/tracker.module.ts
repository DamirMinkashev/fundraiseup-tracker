import { Module } from '@nestjs/common';
import { TrackerController } from './tracker.controller';
import { TrackerService } from './tracker.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tracks, EventSchema } from './schema/event.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Tracks.name, schema: EventSchema }]),
	],
	controllers: [TrackerController],
	providers: [TrackerService],
})
export class TrackerModule {}
