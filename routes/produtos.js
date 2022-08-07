const express = require("express");
const router = express.Router();
const sequelize = require("../moldes/bd");
const Categoria = require("../moldes/Categorias")
const Produto = require("../moldes/Produtos")
const Op = sequelize.Sequelize.Op;


router.get("/", (req, res)=>{
    Categoria.findAll().then((dados)=>{
        res.render("../views/produtos/cadProduto",{prod:true, categoria:dados});
    })
})


router.get("/categoria", (req, res)=>{
    //var para falar se tem produtos ou não
    var semProd = false;
    //var recebendo session do id categoria
    var categoria = req.session.categoria;
    //var para verificar se user escolheu alguma categoria
    var Categoriapes = req.session.categoriapes;
    if(Categoriapes){
        //resetando sessions
        req.session.categoria = null;
        req.session.categoriapes = false;
        //puxando tabela produto, mas produto especificos
        Produto.findAll({include:[{attributes:['nome'], model:Categoria,where:{id:categoria}}]}).then((produtos)=>{
            //puxando tabela categoria
            Categoria.findAll().then((categorias)=>{
                //verificando se existe algum produto  
                if(produtos.length > 0){
                    semProd = true;
                }
                //renderizando arquivo
                return res.render("../views/produtoCategoria.hbs",{semProd:semProd,prodcat:true, categorias:categorias, produto:produtos});
            })
        })
    }else{ 
        //puxando tabela produto 
        Produto.findAll({include:[{attributes:['nome'], model:Categoria}]}).then((produtos)=>{
            Categoria.findAll().then((categorias)=>{
                if(produtos.length > 0){
                    semProd = true;
                }
                //render para rota /produto/categoria
                return res.render("../views/produtoCategoria.hbs",{semProd:semProd,prodcat:true, categorias:categorias, produto:produtos})
            })
        
        })
    }
})

router.post("/categoria", (req, res)=>{
    //criando sessãos e  retornando para rota get
    req.session.categoriapes = true;
    req.session.categoria = req.body.idcate;
    
    res.redirect("/produto/categoria")
})

router.post("/add", (req, res)=>{
    const novoProduto = {
        valor:req.body.valor,
        idCategoria:req.body.categoria,
        marca_modelo:req.body.marcaModelo, 
        marca:req.body.marca,
        especificacoes:req.body.especificacoes,
        modelo:req.body.modelo,
        potencia_kWp_p:req.body.potencia,
        max_corrente_entrada:req.body.maxCorrente,
        tensao_max_entrada:req.body.tensaoMax,
        eficiencia_media:req.body.eficiencia,
        faixa_tensao_MPP:req.body.faixaTensao,
        potencia_max_modulos:req.body.potenciaMax,
        tensao_saida:req.body.tensaoSaida,
        tipo_instalacao:req.body.tipoInstalacao
    }

    Produto.create(novoProduto).then(()=>{
        res.redirect("/produto/ver");
    }).catch((err)=>{
        res.redirect("/")
        console.log(err)
    })
 
})

router.get("/ver", (req, res)=>{
    Categoria.findAll().then(categorias =>{
        res.render("../views/produtos/produtos.hbs", {categorias:categorias})
    })
    
    
})

router.post("/edit", (req, res)=>{
    var id = req.body.id;

    Produto.findByPk(id,{include:[{attributes:['nome'], model:Categoria}]}).then(produto=>{
        var idcate = produto.idCategoria
        Categoria.findAll({where:{id:{[Op.not]:idcate}}}).then(categorias =>{
            res.render("../views/produtos/edite.hbs",{categorias:categorias, nomeCatego:produto.categorium.nome, idCategoria:produto.idCategoria, id:produto.id, valor:produto.valor, marcamodelo:produto.marca_modelo, marca:produto.marca, especificacoes:produto.especificacoes, modelo:produto.modelo, potencia:produto.potencia_kWp_p, maxCorrente:produto.max_corrente_entrada, tensaoMax:produto.tensao_max_entrada, eficiencia:produto.eficiencia_media, faixaTensao:produto.faixa_tensao_MPP, potenciaMax:produto.potencia_max_modulos, tensaoSaida:produto.tensao_saida, tipoInstalacao:produto.tipo_instalacao  })
        })
            
    }).catch(erro=>{
        res.redirect("/")
        console.log(erro)
    })
})

router.post("/up", (req,res)=>{
    Produto.update({
        valor:req.body.valor,
        idCategoria:req.body.categoria,
        marca_modelo:req.body.marcaModelo, 
        marca:req.body.marca,
        especificacoes:req.body.especificacoes,
        modelo:req.body.modelo,
        potencia_kWp_p:req.body.potencia,
        max_corrente_entrada:req.body.maxCorrente,
        tensao_max_entrada:req.body.tensaoMax,
        eficiencia_media:req.body.eficiencia,
        faixa_tensao_MPP:req.body.faixaTensao,
        potencia_max_modulos:req.body.potenciaMax,
        tensao_saida:req.body.tensaoSaida,
        tipo_instalacao:req.body.tipoInstalacao
    },{where:{id:req.body.id}}).then(()=>{
        res.redirect("/produto/ver")
    }).catch((er)=>{
        res.redirect("/")
    })
})

router.post("/delet", (req, res)=>{
    Produto.destroy({where:{id:req.body.id}}).then(()=>{
        res.redirect("/produto/ver")
    }).catch((er)=>{
        res.redirect("/");
    })
})

router.post("/ver", (req, res)=>{
    var dado =  "%"+req.body.dados+"%";
    var carregar = req.body.carregar;
    var categoriaTrue = req.body.categoriaTrue;
    if(carregar){
        Produto.findAll({include:[{attributes:['nome'], model:Categoria}]}).then(produtos =>{
            return res.send({produtos:produtos})
        })
    }else{
        if(categoriaTrue){
            var idTipo = req.body.tipoCategoria
            Produto.findAll({include:[{attributes:['nome'], model:Categoria,where:{id:idTipo}}]}).then(produtos => {
                return res.send({produtos:produtos})
            })
        }else{ 
            var tipoPesquisa = req.body.tipo;     
            if(tipoPesquisa == 'modelo'){
                Produto.findAll({where:{modelo:{[Op.like]:dado}},include:[{attributes:['nome'], model:Categoria}]}).then(produtos =>{
                return res.send({produtos:produtos})
                })
            }
            if(tipoPesquisa == 'marca'){
                Produto.findAll({where:{marca:{[Op.like]:dado}},include:[{attributes:['nome'], model:Categoria}]}).then(produtos =>{
                    res.send({produtos:produtos})
                })
            }
            
        }
    }
})



module.exports = router;