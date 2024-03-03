#! /bin/bash

docker start mwro-test-db

pnpm test

docker stop mwro-test-db
