import { connectToDatabase } from './services/database.service'
import { camRouter } from './routes/camera.router'


import express, { Express } from 'express'

const app: Express = express()
const port = 4002

connectToDatabase()
    .then(() => {
        app.use('/', camRouter)

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`)
        })
    })
    .catch(
        (error: Error) => {
        console.error('Database connection failed', error)
        process.exit()
    })