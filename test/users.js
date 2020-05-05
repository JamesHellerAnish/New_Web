Users = require('../db').Users
Progress = require('../db').Progress
uniquid = require('uniqid')
// Users.create({
//     username:'anish',
//     password:'anish',
//     firstName:'Anish',
//     lastName:'Mondal',
//     phoneNumber:'918377846694',
//     lastAnswer:-1,
//     referralKey:uniquid()
// })
// .then((data)=>{console.log(data)})
// Users.create({
//     username : 'bulu',
//     password : 'bulu',
//     firstName : 'Anish',
//     lastName : 'Mondal',
//     phoneNumber : '918377846694',
//     lastAnswer:-1,
//     referralKey:uniquid()
// })
// .then((data)=>{console.log(data)})
// Users.findAll({
//     include:[{
//         model:Progress
//     }]
// })
// .then((data)=>{
//     for(d of data){
//         console.log(d.dataValues)
//     }
// })
Users.update({
    lastAnswer:0
},{
    where:{
        
    }
})
.then((data)=>{console.log(data)})