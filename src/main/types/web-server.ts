import { Server as HttpServer } from 'node:http'
import { Server as HttpsServer } from 'node:https'
import { ServerOptions } from 'node:https'
import { FastifyInstance, Logger } from '../deps.ts'

import { Serviceable } from './service.ts'

export interface WebServerConfig {
	name?: string
	version?: string
	baseUrl?: string | null
	listen: WebServerConfigListen
	log?: boolean
	ping?: boolean
	proxy?: WebServerConfigProxy
	serverOptions?: ServerOptions
	staticDir?: string
}

export interface WebServerConfigListen {
	port?: number
	host?: string
	path?: string
}

export interface StaticWebServerable {
	defaultConfig: WebServerConfig

	new (log: Logger): WebServerable
}

export interface WebServerable extends Serviceable<WebServerConfig> {
	readonly app?: FastifyInstance
	readonly server?: HttpServer | HttpsServer
	readonly url?: string
	readonly startedAt?: string
	registerMw(app: FastifyInstance): void
	registerErrorMw(app: FastifyInstance): void
	registerPingMw(app: FastifyInstance): void
}
