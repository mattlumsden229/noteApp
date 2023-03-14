const express = require('express')
const router = express.Router()
const notes = require('../controller/notesController')

router.get('/', notes.mainPage)
router.get('/display/:id', notes.display)
router.post('/addNote', notes.addNote)
router.put('/display/:id/edit', notes.edit)
router.delete('/display/:id/delete', notes.delete)
module.exports = router
