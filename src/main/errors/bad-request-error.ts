import { HttpError } from './http-error.ts'
import { ErrorCode, ErrorStatusCode } from './http-error-codes.ts'

class BadRequestError extends HttpError {
	constructor(message?: string | Error, orig?: Error) {
		super(ErrorCode.BAD_REQUEST, ErrorStatusCode.BAD_REQUEST, message, orig)
	}
}

export { BadRequestError }
