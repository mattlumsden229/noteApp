const express = require('express')
const router = express.Router()
const notes = require('../controller/notesController')

router.get('/', notes.mainPage)
router.post('/addNote', notes.addNote)
module.exports = router