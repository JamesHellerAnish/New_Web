const express = require('express')
const session = require('express-session')
const passport = require('./passport')
const route = require('./routes/root')
const app = express()

app.set("view engine", "hbs")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(passport.initialize())
app.use(passport.session())
app.use(session({
    secret: 'somesecretstring',
    saveUninitialized: true,
    resave:true
}))

app.use("/",express.static(__dirname+'/public'))
app.use('/admin',route.admin )
app.use('/info', route.info )
app.use('/load', route.load )
app.use('/login', route.login )
app.use('/questions', route.questions )
// app.use('/adminInfo', route.adminInfo )
app.listen(9876, () => console.log("Server running on http://localhost:9876"))
