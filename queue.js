const Queue = require('bull');
const redisClient = require('./redis');

const taskQueue = new Queue('taskQueue', {
  redis: { host: 'localhost', port: 6380 },
});

module.exports = taskQueue;
