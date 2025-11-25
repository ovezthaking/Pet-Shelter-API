import express from 'express'
import type { Express, Request, Response } from 'express'
import { pets } from './data/pets'
import type { Pet } from './data/pets'
import cors from 'cors'

const PORT = 8000

const app: Express = express()


app.use(cors())

app.use((req: Request, res: Response<{error: string}>): void => {
    res.status(404).json({error: 'Endpoint not found'})
})

app.listen(PORT, ():void => {
    console.log(`Listening on ${PORT}`)
})