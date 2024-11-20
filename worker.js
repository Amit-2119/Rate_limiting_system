
const taskQueue = require('./queue');

taskQueue.process(async (job) => {
  const { userId, taskData } = job.data;
  console.log(`Processing task for user ${userId}: ${taskData}`);
  // Simulate task processing
  await new Promise((res) => setTimeout(res, 1000));
});
