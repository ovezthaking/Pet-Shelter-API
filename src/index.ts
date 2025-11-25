import express from 'express'
import type { Express } from 'express'
import { pets } from './data/pets'

const PORT = 8000

const app: Express = express()


app.get('/', (req, res) => {
    res.json({pets: pets})
})

app.listen(PORT, ():void => {
    console.log(`Listening on ${PORT}`)
})