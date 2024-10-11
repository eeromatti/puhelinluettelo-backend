// librarys
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const People = require('./models/people')

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
// hae kaikki
app.get('/api/people', (request, response) => {
  People.find({})
    .then(people => {
      console.log('Data haettu onnistuneesti:', people)
      response.json(people)
    })
    .catch(error => {
      console.error('Virhe datan haussa:', error)
      response.status(500).send({ error: 'Tietojen haku epäonnistui' })
    })
})

// hae yksittäinen henkilö
app.get('/api/people/:id', (request, response) => {
  People.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})

//lisää henkilö
app.post('/api/people', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new People({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPeople => {
    response.json(savedPeople)
  })
})


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
