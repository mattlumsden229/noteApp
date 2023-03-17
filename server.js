const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const morgan = require('morgan')
const passport = require('passport')
const flash = require('express-flash')
const cors = require('cors')
const connectDB = require('./config/database')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const main = require('./routes/main')
const notes = require('./routes/notes')
const app = express()
require('dotenv').config({path: './config/.env'})
// Passport config
require("./config/passport")(passport);

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

// sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )

  // passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use('/', main)
app.use('/notes', notes)

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on  ${process.env.PORT}`)
})  