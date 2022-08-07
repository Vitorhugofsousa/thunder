module.exports={
    forAll: function(req, res, next){

        if (req.isAuthenticated() &&  req.user.virtude == 0 ){
            req.session.usuario = true
            return next();
        }
        if (req.isAuthenticated() && req.user.virtude == 1){
            req.session.admin = true
            return next();
        }
        if (req.isAuthenticated() &&  req.user.virtude == 2){
            req.session.dev = true
            return next();1
        }

        
        req.flash("error_msg", "Você precisa estar usando uma conta!!")
        res.redirect("/")
    }
}