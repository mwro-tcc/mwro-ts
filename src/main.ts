require('dotenv').config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' })

import express from "express"
import router from "./routes"

import { db } from "./database/models"

const app = express()
const port = process.env.PORT

app.use(router)

app.listen(port, () => {
	console.log(`mwro API listening on port ${port}`)
})

db.authenticate().then(() =>{
    console.log('Connection has been established successfully.');

}).catch(e=>{
    console.error('Unable to connect to the database:', e);
})

process.on("SIGINT", () => {
	console.log("Terminating mwro API...")
	process.exit()
})
