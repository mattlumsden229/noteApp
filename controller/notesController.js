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
    addNote: async (req,res) => {
        try{
            await Note.create({title: req.body.title, notes: req.body.notes})
            console.log('note has been added!')
            res.redirect('/notes')
        }catch(err){
            console.log(err)
        }
    }
}