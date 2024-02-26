import { LoggerConfig } from './logger.ts'
import { RedisClientConfig } from './redis-client.ts'
import { WebServerConfig } from './web-server.ts'
interface PrefixConfig {
	systemEvents: string
	logRequestPrefix: string
}
export interface Config {
	id: string
	name: string
	log: LoggerConfig
	redis: RedisClientConfig & { reconnectAfter: number }
	server: WebServerConfig
	codePluginCache: number
	prefix: PrefixConfig
	maxRequestSize: number
	excludesHeadersEncode: string[]
}
