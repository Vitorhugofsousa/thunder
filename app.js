////CARREGANDO MODULOS
const express = require('express')
const app = express();
const {engine} = require("express-handlebars");
const bodyParser = require('body-parser');
const path = require('path');
const session = require("express-session")
const flash = require("connect-flash")
const passport = require('passport')
require('./config/auth')(passport)
///CARREGANDO ROTAS
const forall = require("./routes/forall");
const user = require('./routes/user')
// CARREGANDO MODELS
const db = require("./models/db");
const Usuario = require("./models/usuario");
const categoria = require("./models/Categorias");
const inversores = require("./models/inversores");


//////CONFIGURAÇÕES DE MÓDULOS
//session
app.use(session({
  secret: "stormsessionunit",
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//middleware
app.use((req,res, next) => {
res.locals.success_msg = req.flash("success_msg")
res.locals.error_msg = req.flash("error_msg")
res.locals.error = req.flash("error")
res.locals.user = req.user || null;
next()
})


// Configurações Bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurações handlebars
app.engine('handlebars', engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

//public
app.use(express.static(path.join(__dirname, "public")))



//Rotas externas
app.use('/', forall)
app.use('/user', user)


//outras config
const PORT = 8080
app.listen(PORT,() => {
    console.log('servidor rodando!')
})