const Sequelize = require('sequelize');
const db = require("./db")

const Categoria = db.sequelize.define("categoria", {
    nome:{
        type: Sequelize.STRING,
        required:true,
        allowNull:false
    }
})


//Categoria.sync()


module.exports = Categoria