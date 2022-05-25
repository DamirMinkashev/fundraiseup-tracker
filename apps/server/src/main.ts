import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors({
		origin: '*',
		methods: 'GET, PUT, POST, DELETE',
		allowedHeaders: 'Content-Type',
		maxAge: 86400, // 24h
	});
	await app.listen(8001);
}
bootstrap();
