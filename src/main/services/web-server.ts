import fastify, { FastifyInstance, FastifyRequest, FastifyReply, FastifyPluginCallback } from 'fastify'
import cookie from 'fastify-cookie'
import { Logger } from 'winston'

import { error } from '../middlewares/error.ts'
import { WebServerable, WebServerConfig } from '../types/web-server.ts'
import { ServiceBase } from './service-base.ts'
import { router } from '../routes/router.ts'

class WebServer extends ServiceBase<WebServerConfig> implements WebServerable {
	public static readonly defaultConfig: WebServerConfig = {
		listen: { port: 3121 },
		log: true,
		ping: true,
	}

	protected _app?: FastifyInstance
	protected _url?: string

	constructor(log: Logger) {
		super('web-server', log, WebServer.defaultConfig)
	}

	public get app(): FastifyInstance | undefined {
		return this._app
	}

	public get log(): Logger {
		return this._log
	}

	public get url(): string | undefined {
		return this._url
	}

	public async end(): Promise<boolean> {
		if (!this.app) {
			return false
		}
		this.log.info('Closing server ...')
		await this.app.close()
		return true
	}

	public init(opt?: Partial<WebServerConfig>): void {
		super.init(opt)
		const app = fastify({ logger: false })
		this._app = app
		this.registerErrorMw(app)
		this.registerMw(app)
	}

	public async run(): Promise<boolean> {
		if (!this.app) {
			return false
		}
		await this.app.listen(this.config.listen)
		const serverAddress = this.app.addresses()[0]
		this.log.info(
			`Server listening on ${serverAddress.address}:${serverAddress.port}`,
		)
		return true
	}

	public registerMw(app: FastifyInstance): void {
		this.registerPostProcess(app)
		this.registerPlugins(app)
		this.registerPingMw(app)
		this.registerRoutes(app)
	}

	public registerErrorMw(app: FastifyInstance): void {
		app.setErrorHandler(error.errorMw)
	}

	public registerPingMw(app: FastifyInstance): void {
		if (!this.config.ping) {
			return
		}
		app.get('/ping', (__: FastifyRequest, res: FastifyReply) => {
			return res.code(204).send()
		})
	}

	public registerRoutes(app: FastifyInstance): void {
		app.route(router)
	}

	public registerPostProcess(app: FastifyInstance): void {
		app.addHook('onResponse', (req, res, done) => {
			this.log.info(`${req.method} ${req.url} - ${res.statusCode}`)
			done()
		})
	}

	public registerPlugins(app: FastifyInstance): void {
		app.register(cookie)
		app.register(import('fastify-form') as FastifyPluginCallback)
	}
}

export { WebServer }
