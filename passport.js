const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('./db').Users
const Progress = require('./db').Progress
passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    Users.findOne({
        include:[{
            model:Progress
        }]
    },{
        where:{
            id: id
        }
    }).then((user) => {
        if (!user) {
            return done(new Error("No such user"))
        }
        return done(null, user)
    }).catch((err) => {
        done(err)
    })
})

passport.use(new LocalStrategy(function (username, password, done) {
    Users.findOne({
        where: {
            username: username
        }
    }).then((user) => {
        if (!user) {
            return done(null, false, {message: "No such user"})
        }
        if (user.dataValues.password !== password) {
            return done(null, false, {message: "Wrong password"})
        }
        return done(null, user)
    }).catch((err) => {
        return done(err)
    })
}))

exports = module.exports = passport