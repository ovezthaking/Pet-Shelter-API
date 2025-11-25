import express from 'express'
import { getPets, getPetById } from '../controllers/pets.controllers'
import type { Router } from 'express'
export const petRouter: Router = express.Router()
import { validateNumericId } from '../middleware/pets.middleware'

petRouter.get('/', getPets)

petRouter.get('/:id', validateNumericId, getPetById)
