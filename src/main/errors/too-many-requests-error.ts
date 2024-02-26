import { HttpError } from './http-error.ts'
import { ErrorCode, ErrorStatusCode } from './http-error-codes.ts'

class TooManyRequestsError extends HttpError {
	constructor(quotaCount: number, quotaTime: number, extra?: unknown) {
		const message =
			`max quota reached (${quotaCount} calls per ${quotaTime}s)`
		super(
			ErrorCode.TOO_MANY_REQUESTS,
			ErrorStatusCode.TOO_MANY_REQUESTS,
			message,
			undefined,
			extra,
		)
	}
}

export { TooManyRequestsError }
