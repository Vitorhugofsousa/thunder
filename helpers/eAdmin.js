module.exports={
    eAdmin: function(req, res, next){

        if (req.isAuthenticated() && req.user.virtude == 1){
            return next();
        }
        req.flash("error_msg", "Você precisa ser um Administrador!!")
        res.redirect("/")
        req.session.admin = true
    }
}

