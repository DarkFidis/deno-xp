import { HttpError } from './http-error.ts'
import { ErrorCode, ErrorStatusCode } from './http-error-codes.ts'

class NotFoundError extends HttpError {
	public static defaultMessage = 'Resource not found'
	constructor(
		message: string | Error = NotFoundError.defaultMessage,
		orig?: Error,
		extra?: unknown,
	) {
		super(
			ErrorCode.NOT_FOUND,
			ErrorStatusCode.NOT_FOUND,
			message,
			orig,
			extra,
		)
	}
}

export { NotFoundError }
