import { Controller, Get, Header, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';

@Controller()
export class AppController {
	constructor() {}

	@Get('/')
	@Header('Content-Type', 'application/javascript')
	root(@Res() res: Response) {
		const filePath = path.join(__dirname, '..', '..', 'tracker.js');
		return res.sendFile(filePath);
	}
}
