const route = require('express').Router()
route.get('/',(req,res)=>{
    res.render('default_page')
})
route.get('/login', (req, res) => {
    res.render('login')
})
route.get('/signup', (req, res) => {
    res.render('signup')
})
route.get('/private', (req, res) => {
    if (req.user) {
        console.log(req.user.dataValues)
        return res.send("Visible to only logged in users")
    } else {
        res.redirect('/login')
    }
})
route.get('/public', (req, res) => {
    res.send("Visible to all")
})
route.get('/profile',(req,res)=>{
    res.render('profile')
})
exports = module.exports = route