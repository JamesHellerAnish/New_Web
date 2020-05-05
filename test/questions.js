Questions = require('../db').Questions
Questions.create({
    text:'Nunu is betichod',
    option1:'Sahi me?',
    option2:'Phir se',
    option3:'Zor se bolo',
    option4:'Jai mata di',
    answer:'a'
})
.then((data)=>{console.log(data)})
.catch((error)=>{res.send(error)})
Questions.create({
    text:'Nunu is betichod',
    option1:'Sahi me?',
    option2:'Phir se',
    option3:'Zor se bolo',
    option4:'Jai mata di',
    answer:'a'
})
.then((data)=>{console.log(data)})
// .catch((error)=>{res.send(error)})
// Questions.findAll()
// .then((data)=>{console.log(data[0])})