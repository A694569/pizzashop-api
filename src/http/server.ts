import chalk from 'chalk'
import { Elysia } from 'elysia'
import { env } from '../env'

import { registerRestaurant } from './routes/register-restaurant'
import { sendAuthLink } from './routes/send-auth-link'
import { authenticateFromLink } from './routes/authenticate-from-link'
import { signOut } from './routes/sign-out'
import { getProfile } from './routes/get-profile'
import { getManagedRestaurant } from './routes/get-managed-restaurant'

new Elysia()
  .onError(({ error, code, set }) => {
    switch (code) {
      case 'VALIDATION': {
        set.status = error.status

        return error.toResponse()
      }
      default: {
        return new Response(null, { status: 500 })
      }
    }
  })
  .use(registerRestaurant)
  .use(sendAuthLink)
  .use(authenticateFromLink)
  .use(signOut)
  .use(getProfile)
  .use(getManagedRestaurant)
  .get('/', () => {
    return 'Hello World'
  })
  .listen(env.PORT, () => {
    console.log(chalk.green('🔥 HTTP Server Running!'))
  })
