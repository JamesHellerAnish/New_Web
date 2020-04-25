const express = require('express')
const session = require('express-session')
const passport = require('./passport')
// const root = require('./routes/root')
const app = express()

app.set("view engine", "hbs")

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: 'somesecretstring',
    saveUninitialized: true,
    resave:true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use("/",express.static(__dirname+'/public'))
app.use('/public', require('./routes/public'))
app.use('/private', require('./routes/private'))
app.use('/root', require('./routes/root'))

app.listen(9876, () => console.log("Server running on http://localhost:9876"))
