const express = require('express')
const router =  express.Router()
const {eDev} = require("../helpers/eDev")

router.get('/gerenciar-produtos', eDev, (req, res) => {
    var dev = req.session.dev
    if(dev){
    return res.render('vm/vm-gerenciar_produtos', {dev:true})
  }
    
})
router.get('/novo-produto', eDev, (req, res) => {
    var dev = req.session.dev
    if(dev){
    return res.render('vm/vm-novo_produto', {dev:true})
  }
    
})
router.get('/editar-produto', eDev, (req, res) => {
    var dev = req.session.dev
    if(dev){
    return res.render('vm/vm-editar_produto', {dev:true})
  }
    
})
router.get('/gerenciar-categorias', eDev, (req, res) => {
    var dev = req.session.dev
    if(dev){
    return res.render('vm/vm-gerenciar_categorias', {dev:true})
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