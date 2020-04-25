const Sequelize = require('sequelize');
const path = require('path');
const Users = require('./db').Users

Users.create({
    username: 'anish',
    password:'anish',
    firstName:'Anish',
    lastName: 'Mondal',
    phoneNumber:'918377846694'
})