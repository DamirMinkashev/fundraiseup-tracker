import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
	@IsString()
	@IsNotEmpty({ message: "Field 'event' should not be empty." })
	readonly event: string;

	@IsString({ each: true })
	@IsNotEmpty({ message: "Field 'tags' should not be empty." })
	readonly tags: string[];

	@IsString()
	@IsNotEmpty({ message: "Field 'url' should not be empty." })
	readonly url: string;

	@IsString()
	@IsNotEmpty({ message: "Field 'title' should not be empty." })
	readonly title: string;

	@IsDateString()
	@IsNotEmpty({ message: "Field 'ts' should not be empty." })
	readonly ts: string;
}
