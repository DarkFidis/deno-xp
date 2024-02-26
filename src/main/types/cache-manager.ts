import { Initializable } from './service.ts'

export interface CacheManagerConfig {
	ttl: number
}

export interface CacheData<T> {
	data?: T
	ttl?: number
}

export interface CacheGetOptions<T> {
	withTtl?: boolean
	sourceProvider?: CacheManagerSourceProvider<T>
	ttl?: number
}

export interface CacheManagerable<T> extends Initializable<CacheManagerConfig> {
	flushAll(): Promise<void>

	flush(key: string): Promise<boolean>

	get(key: string, options?: CacheGetOptions<T>): Promise<CacheData<T>>

	set(key: string, data: T, ttl?: number): Promise<void>

	del(key: string): Promise<boolean>

	clear(): Promise<void>

	load(key: string, withTtl?: boolean): Promise<CacheData<T>>

	save(key: string, data: T, ttl?: number): Promise<void>
}

export type CacheManagerSourceProvider<T> = (
	key: string,
) => Promise<CacheData<T>>
