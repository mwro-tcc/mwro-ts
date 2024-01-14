import {Sequelize, Options, Dialect } from "sequelize";


type allowedEnvironments = 'development' | 'production';
const environment = process.env.NODE_ENV as allowedEnvironments;

type config = {
   [key in allowedEnvironments]: Options
}

const commonConfig = {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    dialect: "postgres" as Dialect,
}
const config = {
    development: {
        ...commonConfig
    },
    production: {
        ...commonConfig,
        // Add other production configs as necessary here (eg: pool connections)
    }
}

const connectionString = `postgres://${config[environment].username}:${config[environment].password}@${config[environment].host}:${config[environment].port}/${config[environment].database}`

export const db = process.env.NODE_ENV === 'test' ? 
    new Sequelize('sqlite::memory:') 
    : new Sequelize(connectionString) 
