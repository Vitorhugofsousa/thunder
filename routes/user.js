const express = require('express')
const router =  express.Router()
const Sequelize = require('sequelize')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario')
const passport = require("passport")
const {forAll} = require("../helpers/forAll")
const admin = require('./admin')
const dev = require('./dev')






////ROTAS DE CADASTRO DE USUARIO E PÁGINA DE LOGIN

router.get("/sigin", (req,res)=>{
    res.render("pages/sigin")
})

router.post("/sigin", (req,res)=> {
    var erros = []

    if(!req.body.firstname || typeof req.body.firstname == undefined || req.body.firstname == null){
        erros.push({texto:"Nome inválido!"})
    }
    if(!req.body.lastname || typeof req.body.lastname == undefined || req.body.lastname == null){
        erros.push({texto:"Nome inválido!"})
    }
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto:"Email inválido!"})
    }
    if(!req.body.password || typeof req.body.password == undefined || req.body.password == null){
        erros.push({texto:"Senha inválida!"})
    }
    if(!req.body.localizacaoc || typeof req.body.localizacaoc == undefined || req.body.localizacaoc == null){
        erros.push({texto:"Insira Sua Localização!"})
    }
    if(!req.body.localizacaoe || typeof req.body.localizacaoe == undefined || req.body.localizacaoe == null){
        erros.push({texto:"Insira sua localização!"})
    }
    if(!req.body.data || typeof req.body.data == undefined || req.body.data == null){
        erros.push({texto:"Insira sua data de nascimento!"})
    }
    if(!req.body.number || typeof req.body.number == undefined || req.body.number == null){
        erros.push({texto:"Insira seu número de telefone!"})
    }
    
    if(req.body.firstname.length < 2 || req.body.firstname.length > 15){
        erros.push({texto:"Nome inválido! Crie um primeiro nome entre 2 a 15 caracteres!"})
        
    }
    if(req.body.lastname.length < 2 || req.body.lastname.length > 20){
        erros.push({texto:"Nome inválido! Crie um ultimo nome entre 5 a 20 caracteres!"})
        
    }
    if(req.body.password.length < 6 || req.body.password.length > 20){
        erros.push({texto:"Senha inválida! Crie uma senha com um valor dentre 6 a 20 caracteres!"})
        
    }
    if(req.body.password != req.body.confirmpassword){
        erros.push({texto: "As senhas apresentadas são diferentes, por favor, tente novamente."})
    }


    if(erros.length > 0){
        res.render("pages/sigin", {erros: erros})
    }else{
            Usuario.findOne({where:{email:req.body.email}}).then((usuario)=>{
                if(usuario){
                req.flash("error_msg", "Esse endereço de E-mail está indisponível, tente novamente!")
                res.redirect("/user/sigin")
                }else{

                    const novoUsuario = new Usuario({
                        Pnome:  req.body.firstname,
                        Snome: req.body.lastname,
                        email: req.body.email,
                        dataN: req.body.data,
                        localizacaoE: req.body.localizacaoe,
                        localizacaoC: req.body.localizacaoc,
                        Numero: req.body.number,
                        senha: req.body.password
                    })

                    bcrypt.genSalt(10, (erro, salt)=> {
                        bcrypt.hash(novoUsuario.senha, salt, (erro, hash)=> {
                            if(erro){
                                req.flash("error_msg", "Houve um erro durante o salvamento do perfil de usuário")
                                res.redirect("/user/sigin")
                            }

                            novoUsuario.senha = hash

                            novoUsuario.save().then(()=>{
                                req.flash("success_msg", "Usuario Criado com Sucesso!")
                                res.redirect("/")
                            }).catch((err)=>{
                                req.flash("error_msg", "Houve um erro ao Criar conta de usuário, tente novamente!")
                                res.redirect("/user/sigin")
                            })
                        })
                    })
                }
            }).catch((err)=>{
                req.flash("error_msg", "Houve um erro interno")
            })

    }

})

router.get("/login", (req,res)=>{
    res.render("pages/login")
})


router.post("/login", (req, res, next)=> {

    passport.authenticate("local", {
        successRedirect: "/user/",
        failureRedirect: "/user/login",
        failureFlash: true
    })(req,res, next)

})

router.get("/logout", (req,res)=>{
    delete req.session.usuario 
    delete req.session.admin
    delete req.session.dev 

    req.logout(function(err) {
        if (err) { return next(err) }
        req.flash("success_msg", "Deslogado com sucesso!")
        res.redirect('/')
      })
})






///////////ROTAS DISPONÍVEIS PARA TODOS OS USUÁRIOS

//ORÇAMENTOS
router.get('/orcamentos-recentes', forAll, (req, res) => {
    res.render('admin/p-seus-orcamentos')
})
//MEMORIAIS DESCRITIVOS
router.get('/memoriais-descritivos', forAll, (req, res) => {
    res.render('admin/p-seus-memoriais')
})



//VERIFICAR PRODUTOS DISPONÍVEIS
router.get('/produtos-disponiveis', forAll, (req, res) => {
    res.render('admin/p-produtos_view')
})

//VER INFORMAÇÕES SOBRE PRODUTOS E O SITE
router.get('/info', forAll, (req, res) => {
    res.render('admin/info')
})

//PÁGINA DE PERFIL
router.get('/', forAll, (req, res) => {
    var usuario = req.session.usuario
    var admin = req.session.admin
    var dev = req.session.dev
    if(usuario){
    
     return res.render("admin/profile", {usuario:true})
    }
    if(admin){
    
     return res.render("admin/profile", {admin:true})
    }
    if(dev){
    
     return res.render("admin/profile", {dev:true})
    }
    res.render('admin/profile', {usuario:false})
})


////////EDIÇÃO DE DADOS -------- PAG PERFIL DE USUARIO
router.get("/user/email", forAll, (req,res)=>{
    Usuario.findAll({where:{id:req.params.id}}).then((user)=> {
        if (user) {
            req.flash("error_msg", "Essa usuario sds")
            res.redirect("/user/")
        }
        res.render("user/", {user: user})
    }).catch((err) => {
        res.redirect("/user/")
    })
})

router.post("/user/email", forAll, (req,res)=> {
    Usuario.findOne({where:{id:req.body.id}}).then((user)=>{
    var erros = []

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto:"Email inválido!"})
    }

    if(erros.length > 0){
        res.render("user/", {user:user, erros: erros})
    }else{
        user.email = req.body.email

        user.save().then(()=>{
            req.flash("success_msg", "Email Editado com Sucesso!")
            res.redirect("/user/")
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro  interno ao salvar a edição do seu E-mail.")
                })
            }
        }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao editar o seu E-mail.")
        res.redirect("/user/")
        

    
})
})

router.get("/user/edit/localizacao", forAll, (req,res)=>{
    Usuario.findAll({where:{id:req.params.id}}).then((user)=> {
        if (user) {
            req.flash("error_msg", "Essa usuario sds")
            res.redirect("/user/")
        }
        res.render("user/", {user: user})
    }).catch((err) => {
        res.redirect("/user/")
    })
})

router.post("/user/edit/localizacao", forAll, (req,res)=> {
    Usuario.findOne({where:{id:req.body.id}}).then((user)=>{
    var erros = []

    if(!req.body.localizacaoc || typeof req.body.localizacaoc == undefined || req.body.localizacaoc == null){
        erros.push({texto:"Insira Sua Localização!"})
    }
    if(!req.body.localizacaoe || typeof req.body.localizacaoe == undefined || req.body.localizacaoe == null){
        erros.push({texto:"Insira sua localização!"})
    }
    if(erros.length > 0){
        res.render("user/", {erros: erros})
    }else{
        user.localizacaoC = req.body.localizacaoc
        user.localizacaoE = req.body.localizacaoe

        user.save().then(()=>{
            req.flash("success_msg", "Email Editado com Sucesso!")
            res.redirect("/user/")
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro  interno ao salvar a edição da sua Localização.")
                })
            }
        }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao editar a sua localização.")
        res.redirect("/user/")
        

    
})
})


router.get("/user/edit/localizacao", forAll, (req,res)=>{
    Usuario.findAll({where:{id:req.params.id}}).then((user)=> {
        if (user) {
            req.flash("error_msg", "Essa usuario sds")
            res.redirect("/user/")
        }
        res.render("user/", {user: user})
    }).catch((err) => {
        res.redirect("/user/")
    })
})

router.post("/user/edit/localizacao", forAll, (req,res)=> {
    Usuario.findOne({where:{id:req.body.id}}).then((user)=>{
    var erros = []

    if(req.body.password.length < 6 || req.body.password.length > 20){
        erros.push({texto:"Senha inválida! Crie uma senha com um valor dentre 6 a 20 caracteres!"})
        
    }
    if(req.body.password != req.body.confirmpassword){
        erros.push({texto: "As senhas apresentadas são diferentes, por favor, tente novamente."})
    }

    if(erros.length > 0){
        res.render("user/", { erros: erros})
    }else{
        user.senha = req.body.password

        bcrypt.genSalt(10, (erro, salt)=> {
            bcrypt.hash(user.senha, salt, (erro, hash)=> {
                if(erro){
                    req.flash("error_msg", "Houve um erro durante o salvamento da sua nova senha")
                    res.redirect("/user/sigin")
                }

                user.senha = hash

                user.save().then(()=>{
                    req.flash("success_msg", "Usuario Criado com Sucesso!")
                    res.redirect("/")
                }).catch((err)=>{
                    req.flash("error_msg", "Houve um erro ao Criar conta de usuário, tente novamente!")
                    res.redirect("/user/sigin")
                })
            })
        })
        
        user.save().then(()=>{
            req.flash("success_msg", "Email Editado com Sucesso!")
            res.redirect("/user/")
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro  interno ao salvar a edição da sua Localização.")
                })
            }
        }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao editar a sua localização.")
        res.redirect("/user/")
        

    
})
})


/////////////////ROTAS EXTERNAS DE USUÁRIO ADMNISTRADOR E DESENVOLVEDOR

router.use('/admin', admin)
router.use('/dev', dev)



module.exports = router