# mwro-ts

## Testing

For testing, you will need an existing postgres container prepared to be used by the integration tests.

To create this container, run:

```sh
sh devops/generate-test-container.sh
```

You only need to run this command once. After this, you may reuse the container as many times as you wish.

With the container ready, you may now run the following to run the test suites:

```sh
sh devops/run-tests.sh
```

## Available pnpm Commands

### pnpm migration:generate

Compares the schema present on your schema snapshot on drizzle folder to the schemas present on src/database/schema. If it finds any difference, generates a migration for these changes.

If you run this command, be sure to check the generated migration SQL.

By itself, this command does not alter the database in any way.

### pnpm migration:drop

Deletes a migration on your drizzle folder, and also undoes the changes made from this migration on the snapshot folder.

By itself, this command does not alter the database in any way.

### pnpm migration:run

Runs all migrations that have not been executed against the database yet. It nows this by checking the drizzle schema and running a SELECT statement on the \_\_drizzle_migrations table.

This will perform changes to your database if there are any migrations to be ran.

## Test Environment

Be sure to run `docker compose up` to have the test database container running.

After this, run `pnpm test` to run the test suites.

The `pnpm test` command will call `pnpm pretest` before executing. The pretest recreates the test database from scratch on each call.


## Info
npm install = pnpm install

npm i <pkg> = pnpm add <pkg>

npm run <cmd> =  pnpm <cmd>
