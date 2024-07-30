// src/worker.service.ts
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Worker } from 'worker_threads';

interface WorkerTask {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  task: any;
}

@Injectable()
export class WorkerService implements OnModuleDestroy {
  private workers: Worker[] = [];
  private tasksQueue: WorkerTask[] = [];
  private maxWorkers = require('os').cpus().length; // Number of CPU cores

  constructor() {
    // Initialize with a single worker
    this.addWorker();
  }

  private addWorker() {
    const worker = new Worker('./src/worker.js');
    worker.on('message', (result) => this.handleWorkerResult(worker, result));
    worker.on('error', (error) => this.handleWorkerError(worker, error));
    worker.on('exit', (code) => this.handleWorkerExit(worker, code));
    this.workers.push(worker);
  }

  private handleWorkerResult(worker: Worker, result: any) {
    const task = this.tasksQueue.shift();
    if (task) {
      task.resolve(result);
    }
    this.assignTask(worker);
  }

  private handleWorkerError(worker: Worker, error: any) {
    console.error(`Worker error: ${error}`);
    this.removeWorker(worker);
    this.addWorker();
  }

  private handleWorkerExit(worker: Worker, code: number) {
    console.error(`Worker stopped with exit code ${code}`);
    this.removeWorker(worker);
    this.addWorker();
  }

  private removeWorker(worker: Worker) {
    this.workers = this.workers.filter(w => w !== worker);
    worker.terminate();
  }

  private assignTask(worker: Worker) {
    if (this.tasksQueue.length > 0) {
      const { task } = this.tasksQueue[0];
      worker.postMessage(task);
    }
  }

  async executeTask(task: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.tasksQueue.push({ resolve, reject, task });
      if (this.tasksQueue.length > this.workers.length && this.workers.length < this.maxWorkers) {
        this.addWorker();
      }
      this.workers.forEach(worker => {
        if (worker.threadId) {
          this.assignTask(worker);
        }
      });
    });
  }

  onModuleDestroy() {
    this.workers.forEach(worker => worker.terminate());
  }
}
