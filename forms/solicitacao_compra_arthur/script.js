$(document).ready(() => {
    var dtEmissao = FLUIGC.calendar('#dtEmissao');
    var dtVencimento = FLUIGC.calendar('#dtVencimento');
    var dtVencimento = FLUIGC.calendar('#dtVencimento');
    var dtReferencia = FLUIGC.calendar('#dtReferencia');
    
    var etapa = $("#etapa").val();
    
    if (etapa == "5" || etapa == 5){
        $("#gestor").show();
    }

})
$(document).ready(() => {
   var data = new Date();

   if(data.getMonth() + 1 < 10){
    $("#dtEmissao").val(data.getDate() + "/0" + (data.getMonth() + 1)  + "/" + data.getFullYear())
   }
   if(data.getDate() < 10){
    $("#dtEmissao").val("0" + data.getDate() +"/"+ (data.getMonth() + 1)  + "/" + data.getFullYear())
   }

})


$(document).ready(() => {
    // debugger
    $("#cep").on("blur", function() {
        $.getJSON("https://viacep.com.br/ws/"+ $("#cep").val() +"/json/", function(dados){
            console.log(dados)
            $("#estado").val(dados.uf);
            $("#cidade").val(dados.localidade);
            $("#endereco").val(dados.logradouro);
           
        })
    })
})



function setSelectedZoomItem(selectedItem){
   
  console.log(selectedItem);
}

function removedZoomItem(removedItem){
      console.log(removedItem);
}


function escolhaGestor(escolha){
    var escolhaAtual;
    if(escolha !== escolhaAtual){
        $("#aprovaGestor").val(escolha);
        escolhaAtual = escolha;
    }
    
}
function setUsuario(){
    var user =  $("#usuarioAtual").val();

    var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST)
    var ds = DatasetFactory.getDataset("colleague", null, [c1], null).values[0]

    $("#nome").val(ds.colleagueName) 
}
$(document).ready(() => {

    setUsuario();
    $("#aprovarGestorSim").on("click", function () {  
        let content = ` 
        <div style="text-align: center;">
            <img src="icons/warning.png" alt="" style="width: 100px;">
            <h3>Tem certeza que deseja aprovar?</h3>
            <div>
                <input type="button" id="confirmSim" value="Sim" name="sim" onclick="escolhaGestor('Sim')">
                <input type="button" id="confirmNao" value="Nao"name="nao" onclick="escolhaGestor('Não')">
            </div>
        </div>
    `
        let myModal = FLUIGC.modal({
            title: 'Confirmar',
            content: content,
            id: 'confirmar-modal'
        },
            function (err, data) {
                if (err) {
                   
                } else {
                    // fazer algo com os dados(data)
                }
            }
        )
    })

})



