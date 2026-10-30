import express, { type Request, type Response } from 'express'
import cors from 'cors'
import authRoutes from './src/Routes/authRoutes.ts'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)

app.get('/', (_req: Request, res: Response) => {
    console.log("Hello World")
    res.send("Listening")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
