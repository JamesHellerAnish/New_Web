const Users = require('./db').Users
Users.findAll()
.then((users)=>{
    for(d of users){
        console.log(d)
    }
})