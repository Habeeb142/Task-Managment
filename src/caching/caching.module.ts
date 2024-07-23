import { Global, Module } from '@nestjs/common';
import * as redis from 'redis';
import { CachingService } from './caching.service';

export const REDIS_CLIENT = 'REDIS_CLIENT';

const redisProvider = {
  provide: REDIS_CLIENT,
  useFactory: async () => {
    try {
      const { REDIS_KEY, REDIS_PORT, REDIS_HOST } = process.env

      const redisConnection = redis.createClient({
        url: `${'redis://' + REDIS_HOST + ':' + REDIS_PORT}`,
        password: REDIS_KEY,
      });
      await redisConnection.connect();
      return redisConnection;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

@Global()
@Module({
  providers: [redisProvider, CachingService],
  exports: [redisProvider, CachingService, REDIS_CLIENT],
})
export class CachingModule {}
