import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TrackerModule } from './tracker/tracker.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		TrackerModule,
		MongooseModule.forRootAsync({
			useFactory: () => ({
				uri: 'mongodb://127.0.0.1:27017/tracker',
			}),
		}),
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
