import express from 'express'
import type { Express } from 'express'

const PORT = 8000

const app: Express = express()


type petType = {
    name: string,
    species: string,
    adopted: boolean,
    age: number
}

const pets: petType[] = [
    {
    name: "Dogens",
    species: "Dog",
    adopted: false,
    age: 1
    },
    {
    name: "Catens",
    species: "Cat",
    adopted: true,
    age: 0.5
    },
]

app.get('/', (req, res) => {
    res.json({pets: pets})
})

app.listen(PORT, ():void => {
    console.log(`Listening on ${PORT}`)
})