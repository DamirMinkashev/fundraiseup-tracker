import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Tracks & Document;

@Schema()
export class Tracks {
	@Prop(String)
	event: string;

	@Prop([String])
	tags: string[];

	@Prop(String)
	url: string;

	@Prop(String)
	title: string;

	@Prop(String)
	ts: string;
}

export const EventSchema = SchemaFactory.createForClass(Tracks);
