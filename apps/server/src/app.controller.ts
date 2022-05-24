import { Controller, Get, Header, Res } from "@nestjs/common";
import { Response } from "express";
import * as path from "path";

@Controller()
export class AppController {
	constructor() {}

	@Get("/")
	@Header("Content-Type", "application/javascript")
	@Header("Access-Control-Allow-Origin", "http://localhost:8000")
	@Header("Access-Control-Allow-Methods", "OPTIONS, POST, GET")
	@Header("Access-Control-Max-Age", "2592000")
	root(@Res() res: Response) {
		const filePath = path.join(__dirname, "..", "..", "tracker.js");
		return res.sendFile(filePath);
	}
}
