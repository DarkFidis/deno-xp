import { Api, ApiExtra, Resource } from './models.ts'
import { PartialGatewayContext } from './gateway.ts'

export interface Util {
	getApiExtra(partialCtx: PartialGatewayContext): ApiExtra | undefined
	getExtra(
		data: Api | Resource | undefined,
		sandbox?: boolean,
	): ApiExtra | undefined
	getResourceExtra(partialCtx: PartialGatewayContext): ApiExtra | undefined
}
