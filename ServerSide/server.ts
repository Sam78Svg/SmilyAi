import express, { type Request, type Response } from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

app.get('/', (_req: Request, res: Response) => {
    console.log("Hello World")
    res.send("Listening")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
