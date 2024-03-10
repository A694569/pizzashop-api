import chalk from 'chalk'
import { Elysia } from 'elysia'
import { getRestaurant } from './routes/get-restaurant'
import { registerRestaurant } from './routes/register-restaurant'
import { env } from '../env'
import { sendAuthLink } from './routes/send-auth-link'

new Elysia()
  .use(registerRestaurant)
  .use(getRestaurant)
  .use(sendAuthLink)
  .get('/', () => {
    return 'Hello World'
  })
  .listen(env.PORT, () => {
    console.log(chalk.green('🔥 HTTP Server Running!'))
  })
