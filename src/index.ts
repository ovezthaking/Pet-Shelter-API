import express from 'express'
import type { Express, Request, Response } from 'express'
import { pets } from './data/pets'
import type { Pet } from './data/pets'
import cors from 'cors'

const PORT = 8000

const app: Express = express()


app.use(cors())

type PetQueryParams = {
    species?: string,
    adopted?: 'true' | 'false'
}

app.get('/', (
    req:Request<{}, unknown, {}, PetQueryParams>, 
    res:Response<Pet[]>
):void=> {

  const { species, adopted } = req.query

  let filteredPets: Pet[] = pets

  if(species){
    filteredPets = filteredPets.filter((pet: Pet): boolean => 
        pet.species.toLowerCase() === species.toLowerCase())
  }

  if(adopted){
    filteredPets = filteredPets.filter((pet: Pet): boolean => 
        pet.adopted === JSON.parse(adopted))
  }

  res.json(filteredPets)
})

app.get('/:id', (
    req: Request<{id: string}>, 
    res: Response<Pet | {error: string}>
): void | Response<{error: string}> => {

    const id: number = parseInt(req.params.id, 10)

    const pet: Pet | undefined = pets.find((pet: Pet): boolean => pet.id === id)

    if (!pet){
        return res.status(400).json({error: 'Pet not found by ID'})
    }

    res.status(200).json(pet)
})

app.use((req: Request, res: Response<{error: string}>): void => {
    res.status(404).json({error: 'Endpoint not found'})
})

app.listen(PORT, ():void => {
    console.log(`Listening on ${PORT}`)
})