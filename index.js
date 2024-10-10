// librarys
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/people')

// middleware
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
// app.use(morgan(':method :url :status :response-time ms :nimi'))  
// morgan.token('nimi', function (request, response) {
//     if (request.method === 'POST' && request.body) {
//         return JSON.stringify({
//             name: request.body.name || '-',  
//             number: request.body.number || '-' 
//         })
//     }
//     return ''
// })


// // routet
app.get('/api/people', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

// // routet
// app.get('/api/persons/', (request, response) => {
//     response.json(persons)
//   })

// app.get('/api/persons/:id', (request, response) => {
//     const id = request.params.id
//     const person = persons.find(person => person.id === id)
//     if (person) {
//         response.json(person)
//       } else {
//         response.status(404).end()
//       }
//     })

// app.delete('/api/persons/:id', (request, response) => {
//     const id = request.params.id
//     persons = persons.filter(person => person.id !== id)
    
//     response.status(204).end()
//     })

//   app.post('/api/persons', (request, response) => {
//     const body = request.body

//     // Tarkista puuttuuko nimi tai numero
//     if (!body.name || !body.number) {
//         return response.status(400).json({ 
//             error: 'content missing' 
//         })
//     }

//     // Tarkista, onko nimi jo olemassa listassa
//     const exists = persons.find(person => person.name === body.name)
//     if (exists) {
//         return response.status(409).json({ 
//             error: 'the person has been added already' 
//         })
//     }
    
//     // Luo uusi henkilö
//     const person = {       
//         id: (Math.floor(Math.random() * 10000)).toString(),
//         name: body.name,
//         number: body.number
//     }

//     // Lisää henkilö listaan
//     persons = persons.concat(person)

//     // Palauta lisätty henkilö
//     response.json(person)
// })

// app.get('/info/', (request, response) => {
//     const count = persons.length 
//     const info = `Phonebook has info for ${count} people` 
//     const date = new Date()
//     const result = `
//     <p>Phonebook has info for ${count} people</p>
//     <p>${date}</p>
//     `
//     response.send(result)
// })
    

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
