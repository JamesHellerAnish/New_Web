const Progress = require('./db').Progress
const Users = require('./db').Users

Users.findOne({
    include:[{
        model:Progress
    }]
})
.then((data)=>{console.log(data.dataValues.progress)})

// Points.create({
//     answerPoints: 2,
//     referralPoints: 5
// })

// Points.findOne()
// .then((point)=>{
//     console.log(point)
// })
