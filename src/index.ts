import express from 'express'
import type { Express, Request, Response } from 'express'
import { pets } from './data/pets'
import type { Pet } from './data/pets'
import cors from 'cors'

const PORT = 8000

const app: Express = express()


app.use(cors())

app.get('/', (req: Request, res: Response<Pet[]>): void => {
    res.json(pets)
})

app.get('/:id', (req: Request<{id: string}>, 
    res: Response<Pet | {error: string}>): void | Response<{error: string}> => {

    const id: number = parseInt(req.params.id, 10)

    const pet: Pet | undefined = pets.find(pet => pet.id === id)

    if (!pet){
        return res.status(400).json({error: 'Pet not found'})
    }

    res.status(200).json(pet)
})

app.use((req: Request, res: Response<{error: string}>): void => {
    res.status(404).json({error: 'Endpoint not found'})
})

app.listen(PORT, ():void => {
    console.log(`Listening on ${PORT}`)
})