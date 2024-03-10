import chalk from 'chalk'
import { Elysia } from 'elysia'
import { env } from '../env'

import { getRestaurant } from './routes/get-restaurant'
import { registerRestaurant } from './routes/register-restaurant'
import { sendAuthLink } from './routes/send-auth-link'
import { authenticateFromLink } from './routes/authenticate-from-link'
import { signOut } from './routes/sign-out'

new Elysia()
  .use(registerRestaurant)
  .use(getRestaurant)
  .use(sendAuthLink)
  .use(authenticateFromLink)
  .use(signOut)
  .get('/', () => {
    return 'Hello World'
  })
  .listen(env.PORT, () => {
    console.log(chalk.green('🔥 HTTP Server Running!'))
  })
