var dados = [];

function jogaProBanco(){

    let nome = document.querySelector("#nomeModal").value;
    let distancia = document.querySelector("#distanciaModal").value;
    let data  = document.querySelector("#dataModal").value;
    let tempo = document.querySelector("#tempoModal").value;
    let id = dados.length+1;

    registro = {}

    registro.id = id;
    registro.nome = nome;
    registro.distancia = distancia;
    registro.tempo = tempo;
    registro.data = data;

    dados.push(registro)

    localStorage.setItem("bancoLocal", JSON.stringify(dados))

    refreshTable()
}

function refreshTable(){

    document.querySelector("#tabelaRegistro>tbody").innerHTML = "";
    dados =JSON.parse(localStorage.getItem("bancoLocal"));
    dados.forEach(
        function(linha){
            let novaLinha = document.createElement('tr');
            novaLinha.innerHTML = `
            <td>${linha.id}</td>
            <td>${linha.nome}</td>
            <td>${linha.distancia}</td>
            <td>${linha.tempo}</td>
            <td>${linha.data}</td>
            <td><button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalUpdate" id="${linha.id}" onclick="abrirModalUpd(${linha.id})">Atualizar</button></td>
            <td><button type="button" class="btn btn-danger" id="deleta-${linha.id}" onclick="deleta(${linha.id})">Deletar</button></td>
            `;
            document.querySelector("#tabelaRegistro>tbody").appendChild(novaLinha)}
    );

    
    $("input").val("");
    $("#modalAdd").modal("hide")
    $("#modalUpdate").modal("hide")


}

function abrirModalUpd(idzin){
    $("#modalUpdate").modal('show');
    document.getElementById("idModalUpd").value = idzin;
}

function deleta(idLinha){

    for(let i= 0; i < dados.length; i++){
        if(dados[i].id == idLinha){
            dados.splice(i,1);
            var refreshId = 1
            dados.forEach(function(item) {
                item.id = refreshId
                refreshId++
            }
            )
            localStorage.setItem("bancoLocal", JSON.stringify(dados));
        }

    }
    refreshTable();
}

function atualiza(){

    let registroAnt = JSON.parse(localStorage.getItem("bancoLocal"));

    let nome = document.querySelector("#nomeModalUpd").value;
    let distancia = document.querySelector("#distanciaModalUpd").value;
    let data  = document.querySelector("#dataModalUpd").value;
    let tempo = document.querySelector("#tempoModalUpd").value;
    let id = dados.length+1;

    registroUpd = {}

    registroUpd.id = document.querySelector("#idModalUpd").value;
    registroUpd.nome = nome;
    registroUpd.distancia = distancia;
    registroUpd.tempo = tempo;
    registroUpd.data = data;

    updateRegistro(document.querySelector("#idModalUpd").value-1, registroUpd)
}


function updateRegistro(index, novoObjeto){
    let banco = JSON.parse(localStorage.getItem("bancoLocal"));
    banco[index] = novoObjeto;
    localStorage.setItem("bancoLocal",JSON.stringify(banco))

    refreshTable();
}
