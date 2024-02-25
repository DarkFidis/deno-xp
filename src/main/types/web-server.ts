import { Server as HttpServer } from 'node:http'
import { Server as HttpsServer } from 'node:https'
import { ServerOptions } from 'node:https'

import { Serviceable } from './service.ts'

export interface WebServerConfig {
	name?: string
	version?: string
	baseUrl?: string | null
	listen: WebServerConfigListen
	log?: boolean
	ping?: boolean
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

	new (log: any): WebServerable
}

export interface WebServerable extends Serviceable<WebServerConfig> {
	readonly app?: any
	readonly server?: HttpServer | HttpsServer
	readonly url?: string
	readonly startedAt?: string
	registerMw(app: any): void
	registerPingMw(app: any): void
}
