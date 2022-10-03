const Sequelize = require('sequelize');
const db = require("./db")
const Categoria = require("./Categorias")

const Modulosfv = db.sequelize.define('modulosfv',{
    marca_modelo_potencia:{
        type: Sequelize.STRING,
    },
    marca:{
        type: Sequelize.STRING,
    },
    estrutura_cristalina:{
        type: Sequelize.STRING,
    },
    especificacoes:{
        type: Sequelize.STRING,
    },
    modelo:{
        type: Sequelize.STRING,
    },
    potencia_Wp_Ppico:{
        type: Sequelize.FLOAT,
    },
    corrente_de_curto_circuito_do_FV_A_Isc:{
        type: Sequelize.FLOAT,
    },
    tensao_de_circuito_aberto_V_Voc:{
        type: Sequelize.FLOAT,
    },
    coeficiente_de_potencia_percentagemporceusius_Cpotência:{
        type: Sequelize.FLOAT,
    },
    coeficiente_de_temperatura_CVOC:{
        type: Sequelize.FLOAT,
    },
    coeficiente_de_temperatura_CIsc:{
        type: Sequelize.FLOAT,
    },
    temp_max_de_operacao_Tmaxop:{
        type: Sequelize.INTEGER,
    },
    eficiencia_do_módulo_hm:{
        type: Sequelize.INTEGER,
    },
    area_m:{
        type: Sequelize.FLOAT,
    },
    valor:{
        type: Sequelize.FLOAT
    },
    habilitado:{
        type: Sequelize.INTEGER,
        defaultValue:1
    },
    idCategoria:{
        type: Sequelize.INTEGER,
        references:{model:'categoria',key:'id'},
        required:true,
        allowNull:false
    }
})

Modulosfv.belongsTo(Categoria, {foreignKey:'idCategoria', allowNull:false});


//Modulosfv.sync()

module.exports = Modulosfv;