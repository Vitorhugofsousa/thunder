const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const hbs = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const produtos = require("./routes/produtos")
const categorias = require("./routes/categorias")

//CONFIGURANDO HANDLEBARS
app.engine("hbs", hbs.engine({
    extname:'hbs',
    defaultLayout:'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,

        allowProtoMethodsByDefault: true,
    }
}));
app.set("view engine", 'hbs');

//config bodtparser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//pasta com arquivos staticos
app.use(express.static(path.join(__dirname,"public")));

//config de session
app.use(session({
    secret:'qualquercoisaae',
    resave: false,
    saveUninitialized:true
}))


//rotas
app.use("/produto", produtos)
app.use("/categoria", categorias)

app.get("/", (req, res)=>{
    res.render("index");
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("http://localhost:"+PORT)
})