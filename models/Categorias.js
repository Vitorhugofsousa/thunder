const Sequelize = require('sequelize');
const sequelize = require('Sequelize');
const db = require("./db")

const Categoria = db.sequelize.define("categoria", {
    nome:{
        type: Sequelize.STRING,
        required:true,
        allowNull:false
    }
})


Categoria.sync({force: true})


module.exports = Categoria