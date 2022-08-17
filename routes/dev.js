const express = require('express')
const router =  express.Router()
const sequelize = require("../models/db");
const Categoria = require("../models/Categorias")
const Produto = require("../models/inversores")
const Op = sequelize.Sequelize.Op;
const {eDev} = require("../helpers/eDev")


////////ROTAS DE PRODUTOS E EDIÇÃO DE PRODUTOS


router.get('/gerenciar-produtos', eDev, (req, res) => {
    var dev = req.session.dev
    if(dev){
      Categoria.findAll().then(categorias =>{
        return res.render('vm/vm-gerenciar_produtos', {dev:true, categorias:categorias})
    })
    
  }

router.post('/gerenciar-produtos', eDev, (req, res)=>{

  var dado =  "%"+req.body.dados+"%";
    var carregar = req.body.carregar;
    var categoriaTrue = req.body.categoriaTrue;
    if(carregar){
        Produto.findAll({include:[{attributes:['nome'], model:Categoria}]}).then(produtos =>{
          console.log(produtos)
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
    
})
router.get('/novo-produto', eDev, (req, res) => {
    var dev = req.session.dev
    if(dev){
      Categoria.findAll().then((dados)=>{
        return res.render('vm/vm-novo_produto', {dev:true, prod:true, categoria:dados});
    })
  }
    
})

router.post("/novo-produto", eDev, (req, res) => {
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
      res.redirect("/user/dev/gerenciar-produtos");
  }).catch((err)=>{
      res.redirect("/")
      console.log(err)
  })

})


router.get('/editar-produto', eDev, (req, res) => {
    var dev = req.session.dev
    if(dev){
    return res.render('vm/vm-editar_produto', {dev:true})
  }
    
})


router.post("/editar-produto", eDev, (req, res)=>{
  var id = req.body.id;

  Produto.findByPk(id,{include:[{attributes:['nome'], model:Categoria}]}).then(produto=>{
      var idcate = produto.idCategoria
      Categoria.findAll({where:{id:{[Op.not]:idcate}}}).then(categorias =>{
          res.render("vm/vm-editar_produto",{categorias:categorias, nomeCatego:produto.categorium.nome, idCategoria:produto.idCategoria, id:produto.id, valor:produto.valor, marcamodelo:produto.marca_modelo, marca:produto.marca, especificacoes:produto.especificacoes, modelo:produto.modelo, potencia:produto.potencia_kWp_p, maxCorrente:produto.max_corrente_entrada, tensaoMax:produto.tensao_max_entrada, eficiencia:produto.eficiencia_media, faixaTensao:produto.faixa_tensao_MPP, potenciaMax:produto.potencia_max_modulos, tensaoSaida:produto.tensao_saida, tipoInstalacao:produto.tipo_instalacao  })
      })
          
  }).catch(erro=>{
      res.redirect("/")
      console.log(erro)
  })
})

router.post("/editar-produto", eDev, (req,res)=>{
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
      res.redirect("/user/dev/gerenciar-produtos")
  }).catch((er)=>{
      res.redirect("/")
  })
})


router.get('/gerenciar-categorias', eDev, (req, res) => {
    var dev = req.session.dev
    if(dev){
      Categoria.findAll().then(categorias =>{
        return res.render('vm/vm-gerenciar_categorias', {dev:true, categorias:categorias})
    })
    
  }
    
})
router.get('/nova-categoria', eDev, (req, res) => {
    var dev = req.session.dev
    if(dev){
    return res.render('vm/vm-nova_categoria', {dev:true})
  }
    
})
router.get('/editar-categoria', eDev, (req, res) => {
    var dev = req.session.dev
    if(dev){
    return res.render('vm/vm-editar_categoria', {dev:true})
  }
    
})


router.get('/gerenciar-usuarios', eDev, (req, res) => {
    var dev = req.session.dev
    if(dev){
    return res.render('vm/vm-gerenciar_usuarios', {dev:true})
  }
    
})






module.exports = router