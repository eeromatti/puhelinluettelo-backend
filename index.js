// librarys
const express = require('express')
const app = express()
require('dotenv').config()

const People = require('./models/people')
const morgan = require('morgan')
const cors = require('cors')

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


//virheidenkäsittely

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

// // routet
// hae kaikki
app.get('/api/people', (request, response, next) => {
  People.find({})
    .then(people => {
      console.log('Data haettu onnistuneesti:', people)
      response.json(people)
    })
    .catch(error => next(error))
})

// hae yksittäinen henkilö
app.get('/api/people/:id', (request, response, next) => {
  People.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
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

//päivitä henkilön tiedot
app.put('/api/people/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number
  }  

  People.findByIdAndUpdate(request.params.id,
    person, {new: true})
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
  })

//poista henkilön tiedot
app.delete('/api/people/:id', (request, response, next) => {
  People.findByIdAndDelete(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error=> next(error))
})




// tämä tulee kaikkien muiden middlewarejen ja routejen rekisteröinnin jälkeen!
app.use(errorHandler)




  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
