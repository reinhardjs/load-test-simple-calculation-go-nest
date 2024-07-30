// src/worker.ts
const { parentPort } = require('worker_threads');

// Listen for messages from the parent thread
parentPort?.on('message', async (task) => {
  // ignore iterations

  // Perform CPU intensive task
  let count = 0;
  for (let i = 1; i <= 5000; i++) {
    for (let j = 1; j <= 5000; j++) {
      count += i + j;
    }
  }

  // Send the result back to the parent thread
  parentPort?.postMessage(count);
});