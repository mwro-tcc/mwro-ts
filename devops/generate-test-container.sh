#! /bin/bash

# Stoping container if already running from another session
docker stop mwro-test-db

# Removing container if already exists
docker rm mwro-test-db

# Creating container
docker run -d -v postgrestestdata:/var/lib/postgres --name mwro-test-db -p 5429:5432 -e POSTGRES_USER=mwro_test -e POSTGRES_PASSWORD=pswd_test -e POSTGRES_DB=mwro_db_test postgres:16

# Stoping container
docker stop mwro-test-db

echo "test container created!"
echo "you may now run run-tests.sh"
