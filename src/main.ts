import express from "express"
import router from "./routes"

require('dotenv').config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' })

const app = express()
const port = process.env.PORT

app.use(router)

app.listen(port, () => {
	console.log(`mwro API listening on port ${port}`)

})

process.on("SIGINT", () => {
	console.log("Terminating mwro API...")
	process.exit()
})
