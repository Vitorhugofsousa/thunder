const Sequelize = require('sequelize');
const db = require('./db');

const Usuario = db.sequelize.define('usuarios', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Pnome: {
        type: Sequelize.STRING(60),
        allowNull: false
    },
    Snome: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    dataN: {
            type: Sequelize.STRING(10),
            allowNull: false
    },
    Numero:{
        type: Sequelize.STRING(10),
        allowNull: false, 
    },
    localizacaoE: {
        type: Sequelize.STRING(250),
        allowNull: true
    },
    localizacaoC: {
        type: Sequelize.STRING(250),
        allowNull: true
    },
    email: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: true
    },
    senha: {
        type: Sequelize.STRING(250),
        allowNull: false
    },
    virtude: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }

})

//Usuario.sync()


module.exports = Usuario;


