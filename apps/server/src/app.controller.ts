import { Controller, Get, Header, Res } from "@nestjs/common";
import { AppService } from "./app.service";
import { Response } from "express";
import * as path from "path";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get("/")
	@Header("Content-Type", "application/javascript")
	root(@Res() res: Response) {
		const filePath = path.join(__dirname, "..", "..", "tracker.js");
		return res.sendFile(filePath);
	}
}
