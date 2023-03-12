const Note = require('../model/notes')
module.exports = {
    mainPage: async (req,res) => {
        try{
            const notes = await Note.find()
            res.render('notes.ejs', {note: notes})
        } catch(err){
            console.error(err)
        }
    }
}