const express = require('express')
const router =  express.Router()
const {eAdmin} = require("../helpers/eAdmin")


router.get('/solic-novo', eAdmin, (req, res) => {
    var admin = req.session.admin
    if(admin){
    
        return res.render('admin/p-produtos_solic', {admin:true})
       }
})

router.get('/usuarios-cadastrados', eAdmin, (req, res) => {
    var admin = req.session.admin
    if(admin){
    
        return res.render('admin/p-lista_usuarios', {admin:true})
       }
})


module.exports = router