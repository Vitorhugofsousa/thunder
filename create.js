 /*const fs = require("fs")

const pastas = ['./public','./routes','./moldes','./helpers','./config','./views']

pastas.forEach(element => {
        if(!fs.existsSync(element)){
            fs.mkdirSync(element, (err)=>{
                if(err){
                    throw err
                }
                console.log('pasta criada com sucesso')
            })
        }
    }); 

    const subPastas = ['./views/partials', './views/layouts'];

    subPastas.forEach(element => {
        if(!fs.existsSync(element)){
            fs.mkdirSync(element, (err)=>{
                if(err){
                    throw err
                }
                console.log('pasta criada com sucesso')
            })
        }
    });
    
    if(!fs.existsSync("main.hbs")){ 
    fs.appendFile('./views/layouts/mai.hbs', "<!DOCTYPE html>\n<html lang='pt-br'>\n<head>\n <meta charset='utf-8'>\n <link rel='stylesheet' href='/css/bootstrap.css'>\n <meta http-equiv='X-UA-Compatible' content='IE=edge'>\n <title>blog</title>\n <meta name='viewport' content='width=device-width, initial-scale=1'>\n</head>\n<body>\n {{>navbar}}\n <div class='container mt-4'>\n    {{{body}}}\n  </div>\n<script src='/js/bootstrap.js'></script>\n</body>\n</html>", (erro)=>{
        if(erro){
            throw erro;
        }
        console.log('atualizado')
    })
     }
     */