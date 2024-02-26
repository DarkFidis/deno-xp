import { ApiExtraJwt } from './models.ts'
import { FastifyRequest } from 'fastify'
import { PartialGatewayContext } from './gateway.ts'

export interface JwtPayloadOkapi {
	appKey?: string
}

export interface JwtPayload {
	okapi: JwtPayloadOkapi
	xsrfToken?: string
}

export interface Jwt {
	getAccessTokenValueFromRequest: (req: FastifyRequest) => string
	handleJwt: (req: FastifyRequest, ctx: PartialGatewayContext) => void
	verifyJwt: (
		accessTokenValue: string,
		secretOrPublicKey: string,
		jwtOptions: ApiExtraJwt,
	) => JwtPayload
}
