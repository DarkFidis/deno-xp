import { Got } from 'got'

import { RequestContext } from './middlewares.ts'
import { Api, App, Plan, Subscription, User } from './models.ts'

export interface Payload {
	plan: Plan
	api: Api
	subscription: Partial<Subscription>
	app: App
	user: Partial<User>
	quota?: {
		time: number
		value: number
		thresholds?: number[]
		limit: number
	}
}

export interface WebhookClientable {
	client: Got
	callWebhook: <T>(
		url: string,
		ctx: RequestContext,
		actualCallCount?: number,
	) => Promise<T>
	buildPayload: (ctx: RequestContext, actualCount?: number) => Payload
}
