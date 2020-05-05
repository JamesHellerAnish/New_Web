const route = require('express').Router()
const Questions = require('../db').Questions
const Answered = require('../db').Answered
const Users = require('../db').Users
const Progress = require('../db').Progress
route.get('/',(req,res)=>{
    if(!req.user)
        throw 'Error : No user logged in'
    Questions.findOne({
        where:{
            id:req.user.dataValues.lastAnswer+1
        }
    })
    .then( async (question)=>{
        await Users.update({
            lastAnswered:req.user.dataValues.lastAnswer
        },{
            where:{
                id:req.user.dataValues.id
            }
        })
        res.send(question)
    })
    .catch((error)=>{
        console.log(error)
        res.send(error)
    })
})

route.post('/check', (req,res)=>{

    if(!req.body.answer)
        throw 'Error : No answer available'
    if(!req.user)
        throw 'Error : No user logged in'
    if(req.body.answer){
        Progress.update({
            answerCount:req.user.dataValues.progress.dataValues.answerCount+1
        },{
            where:{
                id : req.user.dataValues.progress.dataValues.id
            }
        })
    }
    
    Answered.create({
        userId:req.user.dataValues.id,
        questionId:req.user.dataValues.lastAnswer + 1
    })
    Users.update({
        lastAnswer:req.user.dataValues.lastAnswer + 1
    },{
        where:{
            id:req.user.dataValues.id
        }
    })
    .then((answered)=>{
        res.send(answered)
    })
    .catch((error)=>{
        console.log(error)
        res.send(error)
    })
})


exports = module.exports = route