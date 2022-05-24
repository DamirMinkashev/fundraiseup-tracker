import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { TrackerModule } from "./tracker/tracker.module";

@Module({
	imports: [TrackerModule],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
