import { Controller, Get, Render } from "@nestjs/common";
import { join } from "path";

@Controller()
export class ClientController {
	constructor() {}

	@Render("index")
	@Get(["/", "/1.html", "/2.html"])
	root() {}
}
