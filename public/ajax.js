function send(e){
    var table = document.getElementById("listagem");   
    var tipo = document.getElementById("tipoPesquisa");

    if(e.value.length > 0){
    fetch('ver',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({dados:e.value, carregar:false,tipo:tipo.value})
    }).then(res => res.json()).then(data => {
        var produtos = data.produtos;
        table.innerHTML = '';
        for (const key in produtos) {
            table.innerHTML += `<tr><td class='acao'><div class="row">
            <form action="edit" method="post">
            <input type="hidden" name="id" value="${produtos[key].id}">
                <div class="col-auto">
                    <button class="btn btn-info"><box-icon name='edit'></box-icon></button>
                </div>
            </form>
            <form action="delet" method="post" >
                <input type="hidden" name="id" value="${produtos[key].id}">
                <div class="col-auto mt-2">
                    <button class="btn btn-danger"><box-icon name="trash"></box-icon></button>
                </div>
            </form>
        </div></td>
        <td>${produtos[key].categorium.nome}</td>
        <td>${produtos[key].valor}</td>
        <td>${produtos[key].marca_modelo}</td>
        <td>${produtos[key].marca}</td>
        <td>${produtos[key].especificacoes}</td>
        <td>${produtos[key].modelo}</td>
        <td>${produtos[key].potencia_kWp_p}</td>
        <td>${produtos[key].max_corrente_entrada}</td>
        <td>${produtos[key].tensao_max_entrada}</td>
        <td>${produtos[key].eficiencia_media}</td>
        <td>${produtos[key].faixa_tensao_MPP}</td>
        <td>${produtos[key].potencia_max_modulos}</td>
        <td>${produtos[key].tensao_saida}</td>
        <td>${produtos[key].tipo_instalacao}</td>
        </tr>`
        }
    })
    }else{
        carregar();
    }
    
}

function pesquisarc(e){
   
    fetch('ver',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({categoriaTrue:true,tipoCategoria:e.value,carregar:false})
    }).then(res => res.json()).then(data =>{
        var produtos = data.produtos;
        table.innerHTML = '';
        for (const key in produtos) {
            table.innerHTML += `<tr><td class='acao'><div class="row">
            <form action="edit" method="post">
            <input type="hidden" name="id" value="${produtos[key].id}">
                <div class="col-auto">
                    <button class="btn btn-info"><box-icon name='edit'></box-icon></button>
                </div>
            </form>
            <form action="delet" method="post" >
                <input type="hidden" name="id" value="${produtos[key].id}">
                <div class="col-auto mt-2">
                    <button class="btn btn-danger"><box-icon name="trash"></box-icon></button>
                </div>
            </form>
        </div></td>
        <td>${produtos[key].categorium.nome}</td>
        <td>${produtos[key].valor}</td>
        <td>${produtos[key].marca_modelo}</td>
        <td>${produtos[key].marca}</td>
        <td>${produtos[key].especificacoes}</td>
        <td>${produtos[key].modelo}</td>
        <td>${produtos[key].potencia_kWp_p}</td>
        <td>${produtos[key].max_corrente_entrada}</td>
        <td>${produtos[key].tensao_max_entrada}</td>
        <td>${produtos[key].eficiencia_media}</td>
        <td>${produtos[key].faixa_tensao_MPP}</td>
        <td>${produtos[key].potencia_max_modulos}</td>
        <td>${produtos[key].tensao_saida}</td>
        <td>${produtos[key].tipo_instalacao}</td>
        </tr>`
        }
    })
}


function carregar(){
   // var table = document.getElementById("listagem");  
    fetch('gerenciar-produtos',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({carregar:true})
    }).then(res => res.json()).then(data => {
        var produtos = data.produtos;
        console.log('true')
        table.innerHTML = '';
        for (const key in produtos) {
            table.innerHTML += `
    ${produtos[key].categorium.nome}    
    ${produtos[key].valor}
    ${produtos[key].marca_modelo}
    ${produtos[key].marca}
    ${produtos[key].especificacoes}
    ${produtos[key].modelo}
    ${produtos[key].potencia_kWp_p}
    ${produtos[key].max_corrente_entrada}
    ${produtos[key].tensao_max_entrada}
    ${produtos[key].eficiencia_media}
    ${produtos[key].faixa_tensao_MPP}
    ${produtos[key].potencia_max_modulos}
    ${produtos[key].tensao_saida}
    ${produtos[key].tipo_instalacao}`
        }
    })
}

carregar();