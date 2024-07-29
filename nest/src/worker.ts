// src/worker.ts
import { parentPort } from 'worker_threads';

// Listen for messages from the parent thread
parentPort?.on('message', async (task: { iterations: number }) => {
  let counter = 0;

  for (let i = 0; i < task.iterations; i++) {
    // Mocking a time-consuming task
    await new Promise((resolve) => setTimeout(resolve, 1000));
    counter++;
  }

  // Send the result back to the parent thread
  parentPort?.postMessage(counter);
});
