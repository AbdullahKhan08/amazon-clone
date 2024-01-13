import express from 'express'
const app = express()
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDb } from './db/connect'
import router from './routes/user'
dotenv.config()

const PORT = process.env.PORT || 8080

const allowedOrigins = [
  'http://localhost:5173', // frontend - client
]
// app.use(cors())
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
  })
)
app.use(express.json())
app.use('/api/v1/user', router)

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL as string)
    app.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}`)
    })
  } catch (error) {
    console.log('Error occured while connecting db', error)
  }
}

start()
