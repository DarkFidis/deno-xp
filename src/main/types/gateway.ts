import { FastifyReply, FastifyRequest } from 'fastify'
import { IncomingHttpHeaders } from 'node:http'

import {
	Api,
	App,
	AppKey,
	Plan,
	Resource,
	Subscription,
	User,
} from './models.ts'
import { CacheManagerable } from './cache-manager.ts'

export interface PartialGatewayContext {
	api?: Api
	app?: App
	appKey?: AppKey
	appKeyValue?: AppKey['value']
	cacheTtl?: number
	cacheSave?: boolean
	errorRedirectUrl?: string
	subscription?: Subscription
	params?: Mapable<string>
	plan?: Plan
	planPlugins?: string[]
	provider?: RequestContextProvider
	requestId: string
	resource?: Resource
	user?: User
}

export interface GatewayContext {
	api: Api
	app: App
	appKey: AppKey
	appKeyValue: AppKey['value']
	cacheTtl?: number
	cacheSave?: boolean
	errorRedirectUrl?: string
	subscription: Subscription
	params: Mapable<string>
	plan: Plan
	planPlugins: string[]
	requestId: string
	resource: Resource
	user: User
}

export interface Durations {
	duration?: number
	requestTimestamp: number
	requestDuration?: number
	gatewayBeforeHandleTimestamp?: number
	gatewayHandleTimestamp?: number
	gatewayPluginsBeforeTimestamp?: number
	gatewayProxifyTimestamp?: number
	gatewayPluginsAfterTimestamp?: number
	gatewaySendTimestamp?: number
	gatewayHandleDuration?: number
	gatewayPluginsBeforeDuration?: number
	gatewayBeforePluginsBeforeTimestamp?: number
	gatewayProxifyDuration?: number
	gatewayPluginsAfterDuration?: number
	gatewaySendDuration?: number
	phoenixTimestamp?: PhoenixTimestampType
}

export type PhoenixTimestampType = {
	[k: string]: number
}

export interface ProviderResponse {
	body?: unknown
	headers?: IncomingHttpHeaders
	rawBody?: Buffer
	statusCode?: number
}

export interface ApiCachePluginData {
	statusCode: number
	headers?: IncomingHttpHeaders
	body?: string
}

export interface PluginResult {
	body?: unknown
	statusCode?: number
}

export interface CallCountLimiter {
	getActualCallCount: (
		{ quotaTime, ns }: { quotaTime: number; ns: string },
	) => Promise<number>
	lua: string
}

export type PluginType = 'before' | 'after'

export type PluginFn = (
	req: FastifyRequest,
	res: FastifyReply,
) => PluginResult | void | Promise<PluginResult | void>

export type Plugin = {
	[k in PluginType]?: PluginFn
}

export interface PluginWithCache<T> extends Plugin {
	redisCacheManager: CacheManagerable<T>
}

export interface RequestAuthTokenPlugin
	extends PluginWithCache<AuthTokenPluginData> {
	requestToken: (
		params: ApiExtraAuthTokenParams,
	) => Promise<AuthTokenPluginData>
}

export interface AuthTokenPluginData {
	accessToken: string
	scope: string
	tokenType: string
	expiresIn: number
}

export interface AuthTokenPluginResponseBody {
	access_token: string
	token_type: string
	expires_in: number
	scope: string
}

export interface EventData {
	hostname: string
	server: string
	timestamp: string
	type: string
	worker?: number
}

export interface ActivityEvent extends EventData {
	apiId?: string
	apiName?: string
	apiUrlContext?: string
	apiVersion?: string
	appId?: string
	appName?: string
	duration?: number
	gatewayDuration?: number
	gatewayPluginsBeforeDuration?: number
	gatewayHandleDuration?: number
	gatewayPluginsAfterDuration?: number
	gatewaySendDuration?: number
	ip: string
	lang?: string
	method?: string
	remoteMehtod?: string
	originPort?: number
	providerDuration?: number
	requestSize: number
	resourceId?: string
	resourceName?: string
	requestId?: string
	responseSize?: number
	sandbox: boolean
	statusCode: number
	subscriptionId?: string
	subscriptionPlan?: string
	url: string
	userAgent?: string
	userId?: string
	username?: string
}
