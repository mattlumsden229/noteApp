const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true
    }
  })
  
  module.exports = mongoose.model('Note', NoteSchema)