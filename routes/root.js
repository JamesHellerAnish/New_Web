const route = require('express').Router()
const passport = require('../passport')
const Users = require('../db').Users
const Progress = require('../db').Progress
const Questions = require('../db').Questions
const fetch = require('node-fetch')
route.get('/',(req,res)=>{
    res.render('default_page')
})
route.get('/login', (req, res) => {
    res.render('login')
})
route.get('/signup', (req, res) => {
    res.render('signup')
})
route.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/private'
}))

route.post('/signup', (req, res) => {
    Users.create ({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber:req.body.phoneNumber
    })
    .then((createdUser)=>{
        Progress.create({
            answerCount: 0,
            points: 0,
            refferalCount: 0,
            userId:createdUser.id
        })
    })
    .then(()=>{
        res.redirect('/login')
    })
    .catch((error)=>res.send(error))
})

// 
route.post('/sendOTP',(req,res)=>{
    const phoneNumber = req.body.phoneNumber
    fetch('https://api.msg91.com/api/v5/otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            authkey:`312069A2VyUpmsqJ5e14d730P1`,
            template_id:`5ea01e66d6fc0545e17c3d0c`,
            mobile:phoneNumber,
            userip:`IPV4 User IP`
        })
    })
    .then(data=>{return data.json()})
    .then(data=>{res.send(data)})
    .catch(error=>console.log(error))
})
route.post('/verifyOTP',(req,res)=>{
    let mobile = req.body.phoneNumber
    let otp = req.body.otp
    let authentication_key = '312069A2VyUpmsqJ5e14d730P1'
    fetch('https://api.msg91.com/api/v5/otp/verify?mobile='+mobile+'&otp='+otp+'&authkey='+authentication_key, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

    })
    .then(data=>{return data.json()})
    .then(data=>{res.send(data)})
    .catch(error=>console.log(error))
})
route.post('/resendOTP',(req,res)=>{
    fetch('https://api.msg91.com/api/v5/otp/retry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            authkey:`312069A2VyUpmsqJ5e14d730P1`,
            mobile:req.body.phoneNumber,
            retrytype:'text'
        })
    })
    .then(data=>{return data.json()})
    .then(data=>{res.send(data)})
    .catch(error=>console.log(error))
})

route.get('questions',(req,res)=>{
    Users.findOne()
})

exports = module.exports = route