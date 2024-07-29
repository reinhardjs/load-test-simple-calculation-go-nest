import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkerService } from './worker.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, WorkerService],
})
export class AppModule {}
