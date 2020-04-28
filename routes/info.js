const route = require('express').Router()
const Users = require('../db').Users
const Progress = require('../db').Progress

route.get('/',(req,res)=>{
    Users.findOne({
        where:{
            id:req.user.dataValues.id
        },
        include: [{
            model: Progress
        }]
    })
    .then((user)=>{
        console.log(user)
        res.send(user)
    })
    .catch((error)=>{console.log(error)})
})

exports = module.exports = route