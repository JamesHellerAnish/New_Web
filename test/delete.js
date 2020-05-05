const db = require('../db').db
const Answered = require('../db').Answered
// Sequelidb
db.query('DROP TABLE answereds',{
    model:Answered
})
.then(data=>console.log(data))