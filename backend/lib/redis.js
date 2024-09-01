import Redis from "ioredis"
import dotenv from "dotenv";


dotenv.config();

export const redis = new Redis(process.env.UPSTASH_REDIS_URL);

//Redis is a key-value store
// await redis.set('sidd', 'first_redis');