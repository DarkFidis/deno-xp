import { Logger, Redis, RedisOptions } from '../deps.ts'

import { Serviceable } from './service.ts'

export type RedisClientConfig = RedisOptions

export interface StaticRedisClientable {
	new (log: Logger, opt?: Partial<RedisClientConfig>): RedisClientable

	asString(o: unknown): string | undefined

	joinHash(...hashes: (RedisHashPart | RedisHashPart[])[]): string
}

export interface RedisClientable extends Serviceable<RedisClientConfig> {
	redis: Redis

	clean(): Promise<boolean>
	handleConfig(
		configName: string,
		config?: string | number,
	): Promise<string[]>
}

export type RedisHashPart = string | number | undefined
