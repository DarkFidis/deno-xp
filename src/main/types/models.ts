import { BinaryToTextEncoding } from 'node:crypto'
import { Method } from '../deps.ts'

import { Mapable, Optional } from './basic-types.ts'

export interface AccessTokenModel {
	defaultTtl: number
	findAccessToken: (accessTokenValue: string) => Promise<Optional<string>>
	getKey: (accessTokenValue: string) => string
	maxTtl: number
	saveAccessToken: (
		accessTokenValue: string,
		appKeyValue: string,
		expireAt: number,
	) => Promise<void>
}

export interface Api {
	description?: string
	endpoint?: string
	extra?: ApiExtra & { sandbox?: ApiExtra }
	id: Id
	logoUrl?: string
	name: string
	ownerId?: Id
	plugins?: string[]
	private?: boolean
	published?: boolean
	sandboxEndpoint?: string | null
	subscriptionWebhook?: string
	urlContext: URLContext
	version: string
}

export interface ApiExtra {
	agentClass?: ApiExtraAgentClass
	agentOptions?: ApiExtraAgentOptions
	auth?: ApiExtraAuth
	basicAuth?: ApiExtraBasicAuth
	cache?: ApiExtraCache
	/**
	 * Limit the maximum number of calls in given time, to protect the API from flooding
	 */
	callLimiter?: CallLimiter
	cors?: ApiExtraCors | false
	// https://jira.oxv.laposte.cloud/browse/LPOA-1180
	customEventsNs?: string
	excludedHeaders?: string[]
	includedHeaders?: string[]
	followRedirect?: boolean
	headers?: ApiExtraHeaders
	hmac?: ApiExtraHmac
	internetAccess?: boolean
	x509?: string[]
	httpCompression?: boolean
	sandboxHmac?: ApiExtraHmac // TODO remplacer extra.sandboxHmac par extra.sandbox.hmac pour homogénéiser
	/**
	 * Specify request headers names to send to kpi events
	 */
	kpiheaders?: Mapable<string>
	/**
	 * API plugins
	 */
	plugins?: ApiExtraPlugins
	proxy?: ApiExtraProxy
	/**
	 * Add query string parameter
	 */
	qs?: ApiExtraQs
	/**
	 * if false, allow invalid x.509 certificates in API calls
	 * @see https://github.com/request/request#requestoptions-callback
	 */
	strictSSL?: boolean
	/**
	 * Set a custom timeout for API calls
	 */
	timeout?: number
	/**
	 * JWT configuration, if set enables JWT support
	 */
	jwt?: ApiExtraJwt
	/**
	 * Data used by webhook client in case this option is enabled and quota is exceed
	 */
	webhook?: ApiExtraWebhook

	authTokenParams?: ApiExtraAuthTokenParams

	payload?: ApiExtraPayload

	/**
	 * Forward api internal errors (with status 500) to the client
	 */
	forwardApiInternalErrors?: boolean
}

export interface ApiExtraAuthTokenParams {
	url: string
	strictSSL?: boolean
	scopes?: string[]
	username: string
	password: string
}

export type ApiExtraAgentClass = 'Socks5Https' | 'Socks5Http'

/**
 * Auth gateway context that provides configuration items of the auth backend (URL, ...)
 */
export interface ApiExtraAuth {
	authorizeUrl?: string
	authorizeParams?: Mapable<string>
	tokenUrl?: string
}

export interface ApiExtraBasicAuth {
	pass?: string
	sendImmediately?: boolean
	user?: string
}

export interface ApiExtraCache {
	ttl?: number
}

export interface CallLimiter {
	/**
	 * Maximum number of calls in duration specified by quota time
	 */
	quotaCount: number
	/**
	 * Duration of quota limit count
	 */
	quotaTime: number
}

export interface ApiExtraCors {
	allowCredentials?: boolean
	allowHeaders?: string[]
	allowMethods?: string[]
	allowOrigin?: boolean | string | string[] | RegExp
	exposeHeaders?: string[]
	maxAge?: number
	preflightContinue?: boolean
}

export type ApiExtraHeaders = Mapable<unknown>

export interface ApiExtraHmac {
	algorithm?: string
	clientId?: string
	encoding?: BinaryToTextEncoding
	headerName?: string
	includeQuerystring?: boolean
	secret: string
	serviceLabel?: string
}
export interface ApiExtraJwt {
	algorithm?: string
	audience?: string
	cookie?: ApiExtraJwtCookie
	/**
	 * Expiration in seconds
	 */
	expiresIn?: number
	issuer?: string
	payload?: Mapable<string>
	privateKey?: string
	publicKey?: string
	secret?: string
	subject?: string
	xsrfToken?: boolean
}

export interface ApiExtraJwtCookie {
	domain?: string
}

export interface ApiExtraWebhook {
	url: string
	intoRequestLifeCycle?: boolean
}

export type ApiExtraAgentOptions = Mapable<unknown> & {
	/**
	 * Specify the x.509 certificate chain authority file to enable
	 * @see https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options
	 */
	ca?: string
	/**
	 * Specify the x.509 certificate file to enable
	 * @see https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options
	 */
	cert?: string
	/**
	 * Specify the x.509 certificate key file to enable
	 * @see https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options
	 */
	key?: string
	socksHost?: string
	socksPort?: number
}

export interface ApiExtraPlugin {
	after?: string
	before?: string
}

export type ApiExtraPlugins = ApiExtraPlugin[]

export interface ApiExtraProxy {
	address?: string
	pass?: string
	protocol?: 'http' | 'https'
	proxyProtocol?: 'http' | 'https'
	port?: number
	username?: string
}

export interface QuotaLimiter extends CallLimiter {
	/**
	 * Optional thresholds of quota counts used to notify webhook
	 */
	thresholds?: number[]
}

export type ApiExtraQs = Mapable<string>

export type ApiExtraPayload = Mapable<string>

export interface App {
	description?: string
	enabled?: boolean
	id: Id
	name: string
	lastActivity?: number
}

export interface AppContext {
	app: App
	appKey: AppKey
	user: User
}

export interface AppKey {
	id: Id
	sandbox?: boolean
	value: Key
}

export interface AppKeyModel {
	findAppContext: (appKeyValue: string) => Promise<Optional<AppContext>>
	getKey: (appKeyValue: string) => string
	keys: (keyof AppKey)[]
}

export type Id = string

export type Key = string

export interface Plan {
	id: Id
	name: string
	period?: number
	price?: number
	privacy: 'hidden' | 'private' | 'public'
	quotaLimiter?: QuotaLimiter
	suspendedUsersIds?: string[]
}

export interface Resource {
	endpoint?: string
	extra?: ApiExtra & { sandbox?: ApiExtra }
	id: Id
	method: Method
	remoteMethod?: Method
	name: string
	plugins?: string[]
	published?: boolean
	route: string
	sandboxEndpoint?: string
}

export interface ResourceContext {
	api: Api
	resource: Resource
}

export interface ResourceModel {
	keys: (keyof Resource)[]

	buildDynamicRouteCandidates(uriPathParts: string[]): string[][]

	findResourceContext(
		key: string,
		method: string,
		uriPathName: string,
	): Promise<ResourceContext | undefined>
}

export interface Subscription {
	enabled: boolean
	extra?: Mapable<unknown>
	id: Id
	timestamp: Timestamp
}

export interface SubscriptionContext {
	plan: Plan
	subscription: Subscription
}

export interface SubscriptionModel {
	keys: (keyof Subscription)[]

	getKey(appId: string, apiId: string): string

	findSubscriptionContext(
		appId: string,
		apiId: string,
	): Promise<Optional<SubscriptionContext>>
}

export type Timestamp = string

export type URLContext = string

export type URI = string // FIXME

export interface User {
	active?: boolean
	apiRightsIds?: string[]
	clientId?: string
	clientSecret?: string
	disabled?: boolean
	email: string
	extra?: Mapable<unknown> & {
		monitoringNotificationTo?: string
		excludeMonitoring?: boolean
		clientId?: string
	}
	id: Id
	rights?: string[]
	role?: string
	tradeName?: string
	username: string
	suspendedPlanIds?: string[]
}
