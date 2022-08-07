module.exports={
    eDev: function(req, res, next){

        if (req.isAuthenticated() && req.user.virtude == 2){
            return next();
        }
        req.flash("error_msg", "Você não tem permissão para acessar essa rota!!")
        res.redirect("/")
        req.session.dev = true

    }


    
}

