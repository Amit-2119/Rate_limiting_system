const express = require('express');
const taskQueue = require('./queue');
const rateLimit = require('./ratelimiter');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/process-task', rateLimit, async (req, res) => {
  const userId = req.query.userId || 'anonymous';
  const taskData = req.body.task || 'default task';
  await taskQueue.add({ userId, taskData });
  res.status(202).json({ message: 'Task added to queue' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
