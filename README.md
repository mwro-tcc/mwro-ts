# mwro-ts

## Available pnpm Commands

### Generating Migrations

```sh
pnpm migration:generate
```

Compares the schema present on your schema snapshot on drizzle folder to the schemas present on src/database/schema. If it finds any difference, generates a migration for these changes.

If you run this command, be sure to check the generated migration SQL.

By itself, this command does not alter the database in any way.

### Deleting migrations

```sh
pnpm migration:drop
```

Deletes a migration on your drizzle folder, and also undoes the changes made from this migration on the snapshot folder.

By itself, this command does not alter the database in any way.

### Running Migrations

```sh
docker exec mwro_api_container pnpm migration:run
```

Runs all migrations that have not been executed against the database yet. It knows this by checking the drizzle schema and running a SELECT statement on the \_\_drizzle_migrations table.

This will perform changes to your database if there are any migrations to be ran.

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
