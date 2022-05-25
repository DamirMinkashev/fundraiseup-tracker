import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TrackerModule } from './tracker/tracker.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		TrackerModule,
		ConfigModule.forRoot(),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (config: ConfigService) => ({
				uri:
					config.get('MONGODB_URI') ??
					'mongodb://127.0.0.1:27017/tracker',
			}),
		}),
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
