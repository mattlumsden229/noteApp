const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/database')
const main = require('./routes/main')
const notes = require('./routes/notes')
const app = express()
require('dotenv').config({path: './config/.env'})


connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use('/notes', notes)
app.use('/', main)

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on  ${process.env.PORT}`)
})  