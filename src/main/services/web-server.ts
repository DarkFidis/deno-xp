import { Application } from 'oak'

import { WebServerable, WebServerConfig } from '../types/web-server.ts'
import { ServiceBase } from './service-base.ts'
class WebServer extends ServiceBase<WebServerConfig> implements WebServerable {
	public static readonly defaultConfig: WebServerConfig = {
		listen: { port: 8343 },
		log: true,
		ping: true,
	}

	protected _app?: Application
	protected _server: any
	protected _url?: string

	constructor(log: any) {
		super('web-server', log, WebServer.defaultConfig)
	}

	public get app(): any | undefined {
		return this._app
	}

	public get log(): any {
		return this._log
	}

	public get server(): any {
		return this._server
	}

	public get url(): string | undefined {
		return this._url
	}

	public end(): Promise<boolean> {
		return new Promise((res) => {
			if (!this.app) {
				res(false)
			}
			this.log.info('Closing server ...')
			this.app.close()
			res(true)
		})
	}

	public init(opt?: Partial<WebServerConfig>): void {
		super.init(opt)
		const app = new Application()
		this._app = app
		this.registerMw(app)
	}

	public run(): Promise<boolean> {
		return new Promise((res) => {
			if (!this.app) {
				 res(false)
			}
			this._server = this.app.listen(this.config.listen)
			res(true)
		})
	}

	public registerMw(app: Application): void {
		this.registerPostMw(app)
		this.registerPingMw(app)
	}

	public registerPostMw(app: Application): void {
		app.use(async (ctx, next) => {
			await next()
			const { request, response } = ctx
			this.log.info(`${request.method} ${request.url} - ${response.status}`)
		})
	}

	public registerPingMw(app: Application): void {
		if (!this.config.ping) {
			return
		}
		app.use((ctx) => {
			ctx.response.status = 204
		})
	}
}

export { WebServer }
