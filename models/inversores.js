const Sequelize = require('sequelize');
const db = require("./db")
const Categoria = require("./Categorias")

const Inversores = db.sequelize.define('inversores',{
    valor:{
        type: Sequelize.FLOAT
    },
    habilitado:{
        type: Sequelize.INTEGER,
        defaultValue:1
    },
    marca_modelo:{
        type: Sequelize.STRING,
    },
    marca:{
        type: Sequelize.STRING,
    },
    especificacoes:{
        type: Sequelize.STRING,
    },
    modelo:{
        type: Sequelize.STRING,
    },
    potencia_kWp_p:{
        type: Sequelize.FLOAT,
    },
    max_corrente_entrada:{
        type: Sequelize.INTEGER,
    },
    tensao_max_entrada:{
        type: Sequelize.INTEGER,
    },
    eficiencia_media:{
        type: Sequelize.STRING,
    },
    faixa_tensao_MPP:{
        type: Sequelize.STRING,
    },
    potencia_max_modulos:{
        type: Sequelize.STRING,
    },
    tensao_saida:{
        type: Sequelize.STRING,
    },
    tipo_instalacao:{
        type: Sequelize.STRING,
    },
    idCategoria:{
        type: Sequelize.INTEGER,
        references:{model:'categoria',key:'id'},
        required:true,
        allowNull:false
    }
})

Inversores.belongsTo(Categoria, {foreignKey:'idCategoria', allowNull:false});


//Inversores.sync({force: true})

module.exports = Inversores;