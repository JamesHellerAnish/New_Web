const route = require('express').Router()
const Users = require('../db').Users
const Progress = require('../db').Progress
const Points = require('../db').Points

route.get('/',(req,res)=>{
    // console.log(req.user)
    Users.findOne({
        where:{
            id:req.user.dataValues.id
        },
        include: [{
            model: Progress
        }]
    })
    .then((user)=>{
        // console.log(user)
        res.send(user)
    })
    .catch((error)=>{console.log(error)})
})

route.get('/points',(req,res)=>{
    Points.findOne()
    .then((point)=>{
        // console.log(point)
        res.send(point)
    })
})

route.get('/referralCode',(req,res)=>{
    Users.findOne({
        where:{
            id:req.user.dataValues.id
        }
    })
    .then(user=>res.send(user))
})
exports = module.exports = route