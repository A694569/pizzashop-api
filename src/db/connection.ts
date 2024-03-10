import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { env } from '../env'
import * as schema from './schema'

const connection = postgres(env.DB_URL ?? '', { max: 1 })

export const db = drizzle(connection, { schema })
