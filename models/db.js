const Sequelize = require('sequelize');
const sequelize = new Sequelize('storm_db', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    port: '3306'
})



module.exports = {Sequelize: Sequelize, sequelize: sequelize};