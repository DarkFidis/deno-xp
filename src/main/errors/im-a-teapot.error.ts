import { HttpError } from './http-error.ts'
import { ErrorCode, ErrorStatusCode } from './http-error-codes.ts'

class TeapotError extends HttpError {
	public static defaultMessage = 'What do you think I am ?'
	constructor(
		message: string | Error = TeapotError.defaultMessage,
		orig?: Error,
	) {
		super(ErrorCode.IM_A_TEAPOT, ErrorStatusCode.IM_A_TEAPOT, message, orig)
	}
}

export { TeapotError }
