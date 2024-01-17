import dotenv from 'dotenv';
dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from '.';

// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: './drizzle' });

console.log('Migrations ran successfully!');
process.exit(0);
