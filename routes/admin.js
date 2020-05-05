const route = require('express').Router()
const Users = require('../db').Users
const Progress = require('../db').Progress
const Points = require('../db').Points
const Questions = require('../db').Questions
route.get('/users',(req,res)=>{
    Users.findAll({
        include: [{
            model: Progress
        }]
    })
    .then((users)=>{
        res.send(users)
    })
    .catch(error=>res.send(error))
})

route.post('/question',(req,res)=>{
    if(!req.body.text)
        throw 'Error : No text available'
    if(!req.body.option1)
        throw 'Error : No option1 available'
    if(!req.body.option2)
        throw 'Error : No option2 available'
    if(!req.body.option3)
        throw 'Error : No option3 available'
    if(!req.body.option4)
        throw 'Error : No option4 available'
    if(!req.body.answer)
        throw 'Error : No answer available'

    Questions.create({
        text:req.body.text,
        option1:req.body.option1,
        option2:req.body.option2,
        option3:req.body.option3,
        option4:req.body.option4,
        answer:req.body.answer
    })
    .then((data)=>{console.log(data)})
    .catch((error)=>{res.send(error)})
})

route.get('/user',(req,res)=>{
    Users.findOne({
        include:[{
            model:Progress
        }]
    },{
        where:{
            username:req.body.username
        }
    })
    .then(user=>res.send(user))
    .catch(error=>res.send(error))
})

exports = module.exports = route