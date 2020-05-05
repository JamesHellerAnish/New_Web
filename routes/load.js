const route = require('express').Router()
route.get('/',(req,res)=>{
    res.render('default_page')
})
route.get('/login', (req, res) => {
    if(req.user){
        res.render('profile')
    }
    res.render('login')
})
route.get('/signup', (req, res) => {
    if(req.user){
        res.render('profile')
    }
    res.render('signup')
})
route.get('/private', (req, res) => {
    if (req.user) {
        console.log(req.user.dataValues)
        return res.send("Visible to only logged in users")
    } else {
        res.redirect('/load/login')
    }
})
route.get('/public', (req, res) => {
    res.send("Visible to all")
})
route.get('/profile',(req,res)=>{
    if (req.user) {
        res.render('profile')
    } else {
        res.redirect('/load/login')
    }
})
route.get('/questions',(req,res)=>{
    if (req.user) {
        res.render('questions')
    } else {
        res.redirect('/load/login')
    }
})
route.get('/admin',(req,res)=>{
    res.render('admin')
})
route.get('/refer',(req,res)=>{
    if (req.user) {
        res.render('referral')
    } else {
        res.redirect('/load/login')
    }})
exports = module.exports = route