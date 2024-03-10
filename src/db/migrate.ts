import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { env } from '../env'
import chalk from 'chalk'

const sql = postgres(env.DB_URL ?? '', { max: 1 })
const db = drizzle(sql)
await migrate(db, { migrationsFolder: 'drizzle' })

console.log(chalk.green('Migrations applied successfully!'))

await sql.end()

process.exit()
