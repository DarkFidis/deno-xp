import { HttpError } from './http-error.ts'
import { ErrorCode, ErrorStatusCode } from './http-error-codes.ts'

class ApiInternalError extends HttpError {
	public static readonly defaultMessage =
		'Internal Error: contact the API provider'

	constructor(
		message: string | Error = ApiInternalError.defaultMessage,
		orig?: Error,
	) {
		super(
			ErrorCode.API_INTERNAL_ERROR,
			ErrorStatusCode.INTERNAL,
			message,
			orig,
			{
				isApiError: true,
			},
		)
	}
}

export { ApiInternalError }
