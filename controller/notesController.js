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
            const allNotes = await Note.find()
            const notes = await Note.findOne({_id: req.params.id})
            res.render('displayNotes.ejs', {note: notes, allnotes: allNotes})
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
    },
    edit: async (req,res) => {
        try{
            await Note.findOneAndUpdate({_id:req.body.id},{
                title: req.body.title,
                notes: req.body.textarea
            })
            console.log('edit Complete')
            res.json('edit Complete')
        }catch(err){
            console.log(err)
        }
    },
    delete: async (req,res) => {
        try{
            await Note.findOneAndDelete({_id:req.body.id})
            console.log('Deleted note')
            res.json('Deleted note')
        }catch(err){
            console.log(err)
        }
    }
}