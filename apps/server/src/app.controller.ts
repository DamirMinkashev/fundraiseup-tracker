import { Controller, Get, Res } from "@nestjs/common";
import { AppService } from "./app.service";
import { Response } from "express";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get("/")
	root(@Res() res: Response) {
		res.status(200).send({
			test: "2213",
		});
	}
}
