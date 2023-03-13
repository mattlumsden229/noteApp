const Note = require('../model/notes')
module.exports = {
    mainPage: async (req,res) => {
        try{
            const notes = await Note.find()
            res.render('notes.ejs', {note: notes})
        } catch(err){
            console.error(err)
        }
    },
    display: async (req,res) => {
        try{
            console.log(req.params.id)
            const notes = await Note.findOne({_id: req.params.id})
            res.render('displayNotes.ejs', {note: notes})
        } catch(err){
            console.error(err)
        }
    },
    addNote: async (req,res) => {
        try{
            await Note.create({title: req.body.title, notes: req.body.content})
            console.log('note has been added!')
            res.redirect('/notes')
        }catch(err){
            console.log(err)
        }
    }
}