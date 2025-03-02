import { Redis } from 'ioredis';


export const redisClient = new Redis({
    host: '127.0.0.1',
    port: Number(process.env.REDIS_PORT) || 6379,
    retryStrategy: (times) => Math.min(times * 50, 2000),
});

redisClient.on('connect', () => {
    console.log('✅ Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('❌ Redis connection error:', err);
});
