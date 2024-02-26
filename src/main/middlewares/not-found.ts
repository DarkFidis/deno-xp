import { FastifyReply, FastifyRequest } from 'fastify'

import { NotFoundError } from '../errors/not-found-error.ts'

const notFound = (__: FastifyRequest, res: FastifyReply) => {
	if (res.sent) {
		return
	}
	throw new NotFoundError()
}

export { notFound }
