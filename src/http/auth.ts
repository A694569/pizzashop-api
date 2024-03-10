import cookie from '@elysiajs/cookie'
import jwt from '@elysiajs/jwt'
import { Elysia, t, type Static } from 'elysia'
import { env } from '../env'
import { UnauthorizedError } from './errors/unauthorized'

const JWT_COOKIE_NAME = 'auth'

const jwtPayload = t.Object({
  sub: t.String(),
  restaurantId: t.Optional(t.String()),
})

export const auth = new Elysia()
  .error({
    UNAUTHORIZED: UnauthorizedError,
  })
  .onError(({ error, code, set }) => {
    switch (code) {
      case 'UNAUTHORIZED': {
        set.status = 401

        return {
          code,
          message: error.message,
        }
      }
    }
  })
  .use(
    jwt({
      secret: env.JWT_SECRET_KEY,
      schema: jwtPayload,
    }),
  )
  .use(cookie())
  .derive(({ jwt, cookie, setCookie, removeCookie }) => {
    return {
      getCurrentUser: async () => {
        const authCookie = cookie.auth
        const payload = await jwt.verify(authCookie)
        if (!payload) {
          throw new UnauthorizedError()
        }

        return {
          userId: payload.sub,
          restaurantId: payload.restaurantId,
        }
      },
      signUser: async (payload: Static<typeof jwtPayload>) => {
        const token = await jwt.sign({
          ...payload,
        })

        setCookie(JWT_COOKIE_NAME, token, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/',
        })
      },
      signOutUser: () => {
        removeCookie(JWT_COOKIE_NAME)
      },
    }
  })
