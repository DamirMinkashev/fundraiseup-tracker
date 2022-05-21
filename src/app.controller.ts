import { Controller, Get, Render } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Render("index")
	@Get(["/", "/1.html", "/2.html"])
	getHello() {
		this.appService.getHello();
	}
}
