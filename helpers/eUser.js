module.exports = {
    eUser: function(req, res, next){

        if (req.isAuthenticated() && req.user.virtude == 0){
            return next();
        }
        req.flash("error_msg", "Você precisa estar usando uma conta!!")
        res.redirect("/")
        req.session.user = true

    }
}