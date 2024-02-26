import { Logger } from '@okapi/logger'

import { CacheManager } from '../utils/cache-manager'
import { RedisClientable } from './redis-client.ts'

export interface StaticRedisCacheManagerable<T> {
	new (
		log: Logger,
		redisClient: RedisClientable,
		prefix?: string,
	): CacheManager<T>
}
