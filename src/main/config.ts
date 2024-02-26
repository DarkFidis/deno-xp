import { dirname, fromFileUrl, resolve } from 'path'
import nodeConfig from "config";

const dir = dirname(fromFileUrl(import.meta.url))
Deno.env.set('NODE_CONFIG_DIR', resolve(dir, '..', '..', 'config'))

import { Config } from './types/config.ts'

const id = Deno.env.get('NODE_CONFIG_ENV') || Deno.env.get('NODE_ENV') ||
	'development'
const log = nodeConfig.has('log')
	? nodeConfig.get<Config['log']>('log')
	: { level: 'info', name: 'Fastify-GW' }
const prefix = nodeConfig.has('prefix')
	? nodeConfig.get<Config['prefix']>('prefix')
	: {
		logRequestPrefix: 'events',
		systemEvents: 'events-system',
	}
const redis = nodeConfig.has('redis')
	? nodeConfig.get<Config['redis']>('redis')
	: { host: '127.0.0.1', port: 6379, keyPrefix: 'okapi-dev:', reconnectAfter: 3000 }
const server = nodeConfig.has('server')
	? nodeConfig.get<Config['server']>('server')
	: { hsts: 31536000, listen: {} }
const codePluginCache = nodeConfig.has('codePluginCache') ? nodeConfig.get<Config['codePluginCache']>(
	'codePluginCache',
) : 60
const maxRequestSize = nodeConfig.has('server.maxRequestSize')
	? nodeConfig.get<Config['maxRequestSize']>('server.maxRequestSize')
	: 1024
const excludesHeadersEncode = nodeConfig.has('excludesHeadersEncode')
	? nodeConfig.get<Config['excludesHeadersEncode']>('excludesHeadersEncode')
	: ['soapaction']

export const config: Config = {
	codePluginCache,
	excludesHeadersEncode,
	id,
	log,
	maxRequestSize,
	name: 'okapi-api',
	prefix,
	redis,
	server,
}
