import { RouteOptions } from 'fastify'

import { helloMw } from '../middlewares/hello.ts'

export const router: RouteOptions = {
	handler: helloMw,
	method: 'GET',
	url: '/hello',
}
