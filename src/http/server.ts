import chalk from 'chalk'
import { Elysia } from 'elysia'
import { getRestaurant } from './routes/get-restaurant'
import { registerRestaurant } from './routes/register-restaurant'

new Elysia()
  .use(registerRestaurant)
  .use(getRestaurant)
  .get('/', () => {
    return 'Hello World'
  })
  .listen(3333, () => {
    console.log(chalk.green('🔥 HTTP Server Running!'))
  })
