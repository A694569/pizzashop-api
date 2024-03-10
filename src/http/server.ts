import { Elysia, t } from 'elysia'
import chalk from 'chalk'
import { db } from '../db/connection'
import { restaurants, users } from '../db/schema'

new Elysia()
  .get('/', () => {
    return 'Hello World'
  })
  .get('/restaurants', async () => {
    const result = await db
      .select({
        id: restaurants.id,
        name: restaurants.name,
        description: restaurants.description,
        createdAt: restaurants.createdAt,
      })
      .from(restaurants)
    return result
  })
  .post(
    '/restaurants',
    async ({ body, set }) => {
      const { restaurantName, managerName, email, phone } = body
      const [manager] = await db
        .insert(users)
        .values({
          name: managerName,
          email,
          phone,
          role: 'manager',
        })
        .returning({
          id: users.id,
        })

      await db.insert(restaurants).values({
        name: restaurantName,
        managerId: manager.id,
      })

      set.status = 'No Content'
    },
    {
      body: t.Object({
        restaurantName: t.String(),
        managerName: t.String(),
        phone: t.String(),
        email: t.String({ format: 'email' }),
      }),
    },
  )
  .listen(3333, () => {
    console.log(chalk.green('🔥 HTTP Server Running!'))
  })
