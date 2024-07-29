import { Injectable } from '@nestjs/common';
import { WorkerService } from './worker.service';

@Injectable()
export class AppService {
  constructor(private readonly workerService: WorkerService) {}

  getCalculate(): number {
    // let count = 0;
    // for (let i = 1; i <= 5000; i++) {
    //   for (let j = 1; j <= 5000; j++) {
    //     count += i + j;
    //   }
    // }
    return null
  }

  calculateWithWorker(): Promise<number> {
    return this.workerService.performTask(100);
  }
}
