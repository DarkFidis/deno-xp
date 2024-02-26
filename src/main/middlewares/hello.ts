import { FastifyRequest, FastifyReply } from 'fastify'

export const helloMw = (_: FastifyRequest, res: FastifyReply) => {
    res.send({ message: 'Hello world !'})
}