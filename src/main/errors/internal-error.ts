import { HttpError } from './http-error.ts'
import { ErrorCode, ErrorStatusCode } from './http-error-codes.ts'

class InternalError extends HttpError {
	constructor(message?: string | Error, orig?: Error) {
		super(ErrorCode.INTERNAL, ErrorStatusCode.INTERNAL, message, orig)
	}
}

export { InternalError }
