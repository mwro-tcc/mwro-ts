
import express from "express"
import router from "./routes"
const app = express()
const port = process.env.PORT

app.use(router)

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

process.on("SIGINT", () => {
	console.log("Terminating mwro API...")
	process.exit()
})
