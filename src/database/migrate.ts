import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from '.';
import { logger } from '../services/logger/logger';

// This will run migrations on the database, skipping the ones already applied
migrate(db, { migrationsFolder: './drizzle' }).then(() => {
    logger.info('Migrations ran successfully!');
    process.exit(0);
});