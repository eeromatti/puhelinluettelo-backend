const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to MangoDB')
mongoose.connect(url)
  .then(result => {
    console.log('connected to MangoDB')
  })
  .catch((error) => {
    console.log('error connecting to MangoDB:', error.message)
  })

const peopleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /\d{2,3}-\d{6,8}/.test(v)
      }
    }
  }
})

peopleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', peopleSchema, 'people')
module.exports = Person