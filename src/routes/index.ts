import express from "express"

const router = express.Router()

router.get('/', (_, res) => {
	res.send('Testing response')
})

export default router
