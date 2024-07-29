// src/worker.service.ts
import { Injectable } from '@nestjs/common';
import { Worker } from 'worker_threads';
import { promisify } from 'util';

@Injectable()
export class WorkerService {
  private runWorker(task: { iterations: number }): Promise<number> {
    return new Promise((resolve, reject) => {
      const worker = new Worker('./dist/worker.js'); // Path to compiled worker file
      worker.postMessage(task);

      worker.on('message', (result: number) => {
        resolve(result);
      });

      worker.on('error', (error) => {
        reject(error);
      });
    });
  }

  async performTask(iterations: number): Promise<number> {
    return this.runWorker({ iterations });
  }
}
