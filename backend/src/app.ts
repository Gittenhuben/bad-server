import { errors } from 'celebrate'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { json, urlencoded } from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { PORT, DB_ADDRESS, ORIGIN_ALLOW, CACHE } from './config'
import errorHandler from './middlewares/error-handler'
import serveStatic from './middlewares/serverStatic'
import routes from './routes'
import limiter from './utils/rateLimiter'

const app = express()

app.enable('trust proxy');
app.use(limiter)

app.use(cors({ origin: ORIGIN_ALLOW, credentials: true }))

app.use(cookieParser())

app.use(serveStatic(path.join(__dirname, 'public'), CACHE.static))

app.use(urlencoded({ extended: true }))
app.use(json())

app.use(routes)

app.use(errors())
app.use(errorHandler)

const bootstrap = async () => {
    try {
        await mongoose.connect(DB_ADDRESS)
        app.listen(PORT, () => console.log(`Server Started, Port: ${PORT}`))
    } catch (error) {
        console.error(error)
    }
}

bootstrap()
