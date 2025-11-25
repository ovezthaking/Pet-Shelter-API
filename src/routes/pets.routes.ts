import express from 'express'
import type { Router, Request, Response } from 'express'
import type { Pet } from '../data/pets'
import { pets } from '../data/pets'

export const petRouter: Router = express.Router()

type PetQueryParams = {
    species?: string,
    adopted?: 'true' | 'false',
    minAge?: string,
    maxAge?: string
}

petRouter.get('/', (
    req:Request<{}, unknown, {}, PetQueryParams>, 
    res:Response<Pet[]>
):void=> {

  const { species, adopted, minAge, maxAge } = req.query

  let filteredPets: Pet[] = pets

  if (species){
    filteredPets = filteredPets.filter((pet: Pet): boolean => 
        pet.species.toLowerCase() === species.toLowerCase())
  }

  if (adopted){
    filteredPets = filteredPets.filter((pet: Pet): boolean => 
        pet.adopted === JSON.parse(adopted))
  }

  if (maxAge){
    filteredPets = filteredPets.filter((pet: Pet): boolean =>
        pet.age <= JSON.parse(maxAge))
  }

  if (minAge){
    filteredPets = filteredPets.filter((pet: Pet): boolean =>
        pet.age >= JSON.parse(minAge))
  }

  res.json(filteredPets)
})

petRouter.get('/:id', (
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
