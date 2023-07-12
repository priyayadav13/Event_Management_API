const {Sequelize} = require("sequelize");

const {database,user,password,host}= require("../config/config")
const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: 'postgres',
  port: process.env.PORT
})

module.exports = sequelize