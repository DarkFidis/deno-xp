import { HttpError } from './http-error.ts'
import { ErrorCode, ErrorStatusCode } from './http-error-codes.ts'

class UnauthorizedError extends HttpError {
	public static defaultMessage = 'This action requires an authorization'
	constructor(
		message: string | Error = UnauthorizedError.defaultMessage,
		orig?: Error,
	) {
		super(
			ErrorCode.UNAUTHORIZED,
			ErrorStatusCode.UNAUTHORIZED,
			message,
			orig,
		)
	}
}

export { UnauthorizedError }
