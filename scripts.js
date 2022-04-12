var dados = [];

function saveDb(){
    registro = {}
    registro.id = dados.length+1;
    registro.nome = document.querySelector("#nomeModal").value;
    registro.distancia = document.querySelector("#distanciaModal").value;
    registro.tempo = document.querySelector("#tempoModal").value;
    registro.data = document.querySelector("#dataModal").value;
    dados.push(registro);
    localStorage.setItem("bancoLocal", JSON.stringify(dados));
    refreshTable();
}

function refreshTable(){
    document.querySelector("#tabelaRegistro>tbody").innerHTML = "";
    dados =JSON.parse(localStorage.getItem("bancoLocal"))// ?? [];
    dados.forEach(
        function(row){
            let newRow = document.createElement('tr');
            newRow.innerHTML = `
            <td>${row.id}</td>
            <td>${row.nome}</td>
            <td>${row.distancia}</td>
            <td>${row.tempo}</td>
            <td>${row.data}</td>
            <td><button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalUpdate" id="${row.id}" onclick="abrirModalUpd(${row.id})">Atualizar</button></td>
            <td><button type="button" class="btn btn-danger" id="deleta-${row.id}" onclick="deleteRow(${row.id})">Deletar</button></td>
            `;
            document.querySelector("#tabelaRegistro>tbody").appendChild(newRow)}
    );
    $("input").val("");
    $("#modalAdd").modal("hide")
    $("#modalUpdate").modal("hide")
}

function abrirModalUpd(index){
    $("#modalUpdate").modal('show');
    document.getElementById("idModalUpd").value = index;
}

function deleteRow(index){
  for(let i= 0; i < dados.length; i++){
        if(dados[i].id == index){
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
