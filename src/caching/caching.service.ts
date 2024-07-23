import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class CachingService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  private redisPrefix: string = 'task_management_dev'

  async getCache(key: string) {
    try {
      const fullKey = this.buildCacheKey(this.redisPrefix, key);
      return await this.redisClient.get(fullKey);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async setCache(key: string, value: any, seconds: number) {
    try {
      const fullKey = this.buildCacheKey(this.redisPrefix, key);
      const options = {
        EX: seconds,
      };

      return await this.redisClient.set(fullKey, value, options);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteCache(key: string) {
    try {
      const fullKey = this.buildCacheKey(this.redisPrefix, key);
      return await this.redisClient.del(fullKey);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private buildCacheKey(prefix: string, suffix: string): string {
    return `${prefix}:${suffix}`;
  }
}
