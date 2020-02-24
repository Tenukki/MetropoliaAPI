const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const EventSchema = mongoose.Schema({
  event: {
    type: String,
    unique: true,
    require: true
  },
  location: {type: String, require: true},
  date: {type: String, require: true},
})

EventSchema.plugin(uniqueValidator)

EventSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const Event = mongoose.model("Event", EventSchema)

module.exports = Event