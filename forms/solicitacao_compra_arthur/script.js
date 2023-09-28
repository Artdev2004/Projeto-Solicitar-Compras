$(function(){
    var dtEmissao = FLUIGC.calendar('#dtEmissao');
    var dtVencimento = FLUIGC.calendar('#dtVencimento');
    var dtVencimento = FLUIGC.calendar('#dtVencimento');
    var dtReferencia = FLUIGC.calendar('#dtReferencia');

    var etapa = $("#etapa").val();

    if (etapa == "5" || etapa == 5){
        $("#gestor").show();
    }   
})
function escolhaGestor(escolha){
    var escolhaAtual;
    if(escolha !== escolhaAtual){
        $("#aprovaGestor").val(escolha);
        escolhaAtual = escolha;
    }
    
}
$(document).ready(() => {
    $("#aprovarGestorSim").on("click", function () {  
        let content = ` 
        <div style="text-align: center;">
            <img src="icons/warning.png" alt="" style="width: 100px;">
            <h3>Tem certeza que deseja aprovar?</h3>
            <div>
                <input type="button" id="sim" name="sim" onclick="escolhaGestor('Sim')">
                <input type="button" id="nao" name="nao" onclick="escolhaGestor('Não')">
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



