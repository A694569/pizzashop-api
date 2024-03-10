import { Elysia } from 'elysia'
import { db } from '../../db/connection'
import { restaurants } from '../../db/schema'

export const getRestaurant = new Elysia().get('/restaurants', async () => {
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
