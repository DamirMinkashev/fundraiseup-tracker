import { IsDateString, IsString, IsUrl } from "class-validator";

export class CreateEventDto {
	@IsString()
	readonly event: string;

	@IsString({ each: true })
	readonly tags: string[];

	@IsUrl()
	readonly url: string;

	@IsString()
	readonly title: string;

	@IsDateString()
	readonly ts: string;
}
