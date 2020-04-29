const route = require('express').Router()
const Users = require('../db').Users
const Progress = require('../db').Progress
const Points = require('../db').Points

route.get('/users',(req,res)=>{
    Users.findAll({
        include: [{
            model: Progress
        }]
    })
    .then((users)=>{
        res.send(users)
    })
})

exports = module.exports = route