import { FastifyReply, FastifyRequest } from 'fastify'

export interface PostProcessHandler {
	handlePostProcess: (req: FastifyRequest, res: FastifyReply) => Promise<void>
	pendings: Promise<void>[]
}
