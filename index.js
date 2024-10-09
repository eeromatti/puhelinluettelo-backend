// librarys
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()


// middleware
app.use(cors('*'))
app.use(morgan(':method :url :status :response-time ms :nimi'))  
app.use(express.json())
morgan.token('nimi', function (request, response) {
    if (request.method === 'POST' && request.body) {
        return JSON.stringify({
            name: request.body.name || '-',  
            number: request.body.number || '-' 
        })
    }
    return ''
})

// data
let persons = [
    {
      id: "1",
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
      id: "2",
      name: "Ada Lovelace",
      number: "39-44-5323523"
    },
    {
      id: "3",
      name: "Dan Abramov",
      number: "12-43-234235"
    },
    {
      id: "4",
      name: "Mary Poppendieck",
      number: "39-23-6423122"
    }
  ]


// routet
app.get('/api/persons/', (request, response) => {
    response.json(persons)
  })

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    
    response.status(204).end()
    })

  app.post('/api/persons', (request, response) => {
    const body = request.body

    // Tarkista puuttuuko nimi tai numero
    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'content missing' 
        })
    }

    // Tarkista, onko nimi jo olemassa listassa
    const exists = persons.find(person => person.name === body.name)
    if (exists) {
        return response.status(409).json({ 
            error: 'the person has been added already' 
        })
    }
    
    // Luo uusi henkilö
    const person = {       
        id: (Math.floor(Math.random() * 10000)).toString(),
        name: body.name,
        number: body.number
    }

    // Lisää henkilö listaan
    persons = persons.concat(person)

    // Palauta lisätty henkilö
    response.json(person)
})

app.get('/info/', (request, response) => {
    const count = persons.length 
    const info = `Phonebook has info for ${count} people` 
    const date = new Date()
    const result = `
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>
    `
    response.send(result)
})
    

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
