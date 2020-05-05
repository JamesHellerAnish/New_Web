const route = require('express').Router()
const passport = require('../passport')
const Users = require('../db').Users
const Progress = require('../db').Progress
const Questions = require('../db').Questions
const fetch = require('node-fetch')
const uniqid = require('uniqid')

//generates a unique string
function findUniqueKey(){
    let key

    //check unique key
    let next = true
    while(next){
        key = uniqid()
        Users.findOne({
            where:{
                referralKey: key
            }
        })
        .then((user)=>{
            if(!user){
                next = false
            }
        })
    }
    return key
}

// authenticate user 
// username:username of the user
// password:password of the user
route.post('/login', passport.authenticate('local', {
    failureRedirect: '/load/login',
    successRedirect: '/load/private'
}))

//logout user
route.get('/logout', function(req, res){
    req.logout();
    res.redirect('/load/login');
})

// create account
// username:username of the user
// password:password of the user
// firstName:firstName of the user
// lastName:lastName of the user
// phoneNumber:phoneNumber of the user
route.post('/signup', (req, res) => {

    // let key = findUniqueKey()

    Progress.create({
        answerCount: 0,
        points: 0,
        refferalCount: 0,
    })
    .then((progress)=>{
        Users.create ({
            progressId:progress.dataValues.id,
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber:req.body.phoneNumber,
            referralKey:uniqid(),
            lastAnswer:0
        })
        .then((user)=>{
            console.log(user)
            res.redirect('/load/login')
        })
        .catch((error)=>res.send(error))
    }) 
    .catch((error)=>{res.send(error)})   
})
//send OTP to the number
//phoneNumber:phoneNumber of the user
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


//verify the OTP
//phoneNumber:phoneNumber of the user
//otp: otp given
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

//resend the otp
//phoneNumber:phoneNumber of the user
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

//update the referralCount of the user who referred and the referral of the user 
//referralKey: referralKey of the user who referred
route.post('/refer',(req,res)=>{
    // update the count of referrals
    Users.findOne({
        where:{referralKey:req.body.referralKey},
        include:[{model:Progress}]
    })
    .then((user)=>{
        let count = user.dataValues.progress.dataValues.refferalCount + 1
        Progress.update({
            refferalCount : count,
        },{
            where:{
                id:user.dataValues.progress.dataValues.id
            }
        })
        .catch((error)=>{res.send(error)})
        Users.update({
            referral:user.dataValues.id
        },{
            where:{
                id:req.user.dataValues.id
            }
        })
        .then((user)=>{
            res.send(user)
        })
        .catch((error)=>{res.send(error)})
    })
    .catch((error)=>{console.log(error)})
})

exports = module.exports = route