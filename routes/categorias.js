const express = require("express");
const router = express.Router();
const Categoria = require("../moldes/Categorias")

router.get("/", (req, res)=>{
    res.render("../views/categorias/cadCategorias",{cat:true});
})

router.post("/add", (req, res)=>{
    const novaCategoria = {
        nome:req.body.nome,
        slug:req.body.slug
    }
    const erros = [];
    for (const key in novaCategoria) {
        //Tirar os espaços
        novaCategoria[key] = novaCategoria[key].trim();
        //Verificadno se o campo email e nome está vazio, undefine ou null
        if(novaCategoria[key] == '' || typeof novaCategoria[key] == undefined || novaCategoria[key] == null){
            erros.push({mensagem:'O Campo '+ key + ' está vazio'})
        }
        //Removendo caracteres especiais
        novaCategoria[key] = novaCategoria[key].replace(/[^A-zÀ-ú\s]/gi,'')
        novaCategoria[key] = novaCategoria[key].trim();
        }  
        if(erros.length > 0){
            return res.redirect("/");
        }
        Categoria.create(novaCategoria).then(()=>{
            res.redirect("/categoria/ver");
        }).catch((err)=>{
            res.redirect("/")
            console.log("o erro foi "+ err)
        })
})

router.get("/ver", (req, res)=>{
    Categoria.findAll().then((categorias)=>{
        res.render("../views/categorias/categorias",{vcat:true, categorias:categorias})
    }).catch((err)=>{
        res.redirect("/")
    })
 })

router.post("/edit", (req, res)=>{
    var id = req.body.id;
    Categoria.findByPk(id).then((dados)=>{
        return res.render("../views/categorias/editCategorias",{id:dados.id, nome:dados.nome, slug:dados.slug});
        //res.redirect("/");

    }).catch((ero)=>{
        res.redirect("/")
        console.log(ero)
    })
})
    
router.post("/up", (req, res)=>{
    const novaCategoria = {
        nome:req.body.nome,
        slug:req.body.slug
    }
    const erros = [];
    for (const key in novaCategoria) {
        //Tirar os espaços
        novaCategoria[key] = novaCategoria[key].trim();
        //Verificadno se o campo email e nome está vazio, undefine ou null
        if(novaCategoria[key] == '' || typeof novaCategoria[key] == undefined || novaCategoria[key] == null){
            erros.push({mensagem:'O Campo '+ key + ' está vazio'})
        }
        //Removendo caracteres especiais
        novaCategoria[key] = novaCategoria[key].replace(/[^A-zÀ-ú\s]/gi,'')
        novaCategoria[key] = novaCategoria[key].trim();
        }  
        if(erros.length > 0){
            return req.redirect("/");
        }
    Categoria.update({
        nome:novaCategoria.nome,
        slug:novaCategoria.slug
    },{where:{id:req.body.id}}).then(()=>{
        res.redirect("/categoria/ver")
    }).catch((erro)=>{
        res.redirect("/")
    })
})

router.post("/delet", (req, res)=>{
    Categoria.destroy({where:{id:req.body.id}}).then(()=>{
        res.redirect("/categoria/ver")
    }).catch((err)=>{
        res.redirect("/categoria")
    })
})

module.exports= router;