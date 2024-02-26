import { HttpError } from './http-error.ts'
import { ErrorCode, ErrorStatusCode } from './http-error-codes.ts'

class GatewayTimeoutError extends HttpError {
	public static readonly defaultMessage = 'Service did not respond in time'
	constructor(
		message: string | Error = GatewayTimeoutError.defaultMessage,
		orig?: Error,
		extra?: unknown,
	) {
		super(
			ErrorCode.GATEWAY_TIMEOUT,
			ErrorStatusCode.GATEWAY_TIMEOUT,
			message,
			orig,
			extra,
		)
	}
}

export { GatewayTimeoutError }
