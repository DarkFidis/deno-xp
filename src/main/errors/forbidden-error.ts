import { HttpError } from './http-error.ts'
import { ErrorCode, ErrorStatusCode } from './http-error-codes.ts'

class ForbiddenError extends HttpError {
	public static defaultMessage =
		'You do not have the rights to perform this action'
	constructor(
		message: string | Error = ForbiddenError.defaultMessage,
		orig?: Error,
	) {
		super(ErrorCode.FORBIDDEN, ErrorStatusCode.FORBIDDEN, message, orig)
	}
}

export { ForbiddenError }
