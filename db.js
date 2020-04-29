const Sequelize = require('sequelize');
const path = require('path');
const db = new Sequelize(
    {
        dialect: 'sqlite',
        storage: './test.db'
    }
)

const Users = db.define('user', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phoneNumber:{
        type:Sequelize.STRING,
        // allowNull:false,
        // unique:true
    },
    referralKey:{
        type:Sequelize.STRING,
        // allowNull:false,
        unique:true,
    },
    referral:{
        type:Sequelize.INTEGER,
        allowNull:true,
        unique:true
    }
})

const Progress = db.define('progress',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    answerCount: {
        type:Sequelize.INTEGER,
        allowNull:false
    },
    refferalCount: {
        type:Sequelize.INTEGER,
        allowNull:false
    },
})
Users.belongsTo(Progress)
const Question = db.define('question',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    catagory:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    text:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    option1:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    option2:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    option3:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    option4:{
        type:Sequelize.STRING,
        allowNull:false,
    },
})

const Points = db.define('points',{
    answerPoints:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    referralPoints:{
        type:Sequelize.INTEGER,
        allowNull:false,
    }
})

db.sync().then(() => console.log("Database is ready"))

exports = module.exports = {
    db,
    Users,
    Progress,
    Points
}
