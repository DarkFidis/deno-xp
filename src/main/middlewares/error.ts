import { FastifyReply, FastifyRequest } from 'fastify'

import { ErrorData, ErrorMw, RichError } from '../types/middlewares.ts'

export const API_ERROR = { isApiError: true }

export const error: ErrorMw = {
	defaultCode: 'SERVICE_UNAVAILABLE',
	defaultMessage: 'Service unavailable',
	errorMw: async (err: RichError, __: FastifyRequest, res: FastifyReply) => {
		const data: ErrorData = {
			code: err.code || error.defaultCode,
			message: err.message || error.defaultMessage,
		}
		if (err.orig?.errors) {
			data.errors = err.orig.errors
		} else if (err.orig) {
			data.errors = [err.orig.toString()]
		}
		if (err.extra) {
			Object.assign(data, err.extra)
		}
		const statusCode = err.statusCode || 500
		res.statusCode = statusCode
		await res.send(data)
	},
}
