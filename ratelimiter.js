const { RateLimiterRedis } = require('rate-limiter-flexible');
const redisClient = require('./redis');

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  points: 20, // 20 tasks
  duration: 60, // per 60 seconds
  keyPrefix: 'rateLimiter',
});

const secondLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  points: 1, // 1 task
  duration: 1, // per second
  keyPrefix: 'secondLimiter',
});

async function rateLimit(req, res, next) {
  const userId = req.query.userId || 'anonymous';
  try {
    await rateLimiter.consume(userId);
    await secondLimiter.consume(userId);
    next();
  } catch {
    res.status(429).json({ error: 'Too many requests' });
  }
}

module.exports = rateLimit;
