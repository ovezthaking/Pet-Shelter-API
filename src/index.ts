import express from 'express'
import type { Express, Request, Response } from 'express'
import { pets } from './data/pets'
import cors from 'cors'

const PORT = 8000

const app: Express = express()


app.use(cors())

app.get('/', (req: Request, res: Response): void => {
    res.json({pets: pets})
})

app.listen(PORT, ():void => {
    console.log(`Listening on ${PORT}`)
})