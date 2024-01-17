# mwro-ts

npm install pnpm install
npm i <pkg> pnpm add <pkg>
npm run <cmd> pnpm <cmd>

## Commands

### pnpm migration:generate

Compares the schema present on your schema snapshot on drizzle folder to the schemas present on src/database/schema. If it finds any difference, generates a migration for these changes.

If you run this command, be sure to check the generated migration SQL.

By itself, this command does not alter the database in any way.

### pnpm migration:drop

Deletes a migration on your drizzle folder, and also undoes the changes made from this migration on the snapshot folder.

By itself, this command does not alter the database in any way.

### pnpm migration:run

Runs all migrations that have not been executed against the database yet. It nows this by checking the drizzle schema and running a SELECT statement on the \_\_drizzle_migrations table.
